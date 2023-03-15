const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { instrument } = require('@socket.io/admin-ui');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const PORT = 8080;

const ioServer = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://admin.socket.io'],
    credentials: true,
  },
});

instrument(ioServer, {
  auth: false,
  mode: 'development',
});

app.use(cors());

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

function countPublicRooms() {
  const { sids, rooms } = ioServer.sockets.adapter;
  const publicRooms = [];

  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      !publicRooms.includes(key) && publicRooms.push(key);
    }
  });

  return publicRooms;
}

function countPeopleInRoom(roomName) {
  return ioServer.sockets.adapter.rooms.get(roomName)?.size;
}

ioServer.on('connect', (socket) => {
  console.log('Connection to Client 🔥');
  socket['nickname'] = 'Anon';
  ioServer.sockets.emit('roomList', countPublicRooms());

  socket.on('enterRoom', (roomName, done) => {
    socket.join(roomName);
    done(roomName);
    socket
      .to(roomName)
      .emit('welcome', socket.nickname, countPeopleInRoom(roomName));
    ioServer.sockets.emit('roomListChange', countPublicRooms());
  });

  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit('bye', socket.nickname, countPeopleInRoom(room) - 1)
    );
  });

  socket.on('disconnect', () => {
    ioServer.sockets.emit('roomListChange', countPublicRooms());
  });

  socket.on('newMessage', (message, room, done) => {
    socket.to(room).emit('newMessage', `${socket.nickname}: ${message}`);
    done();
  });

  socket.on('nickname', (nickname) => (socket['nickname'] = nickname));
});

/*
  TODO
  메세지 데이터 저장 및 새로고침시 메세지 배열 보내기
  닉네임 저장
  소켓 io 사용
*/
