const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server })

server.listen(8080, () => {
  console.log('Listening on http:localhost:8080');
})

const sockets = [];

wss.on('connection', (socket) => {
  sockets.push(socket);
  socket["nickname"] = 'Anon';
  console.log('Connected to Browser ✅');
  socket.on('close', () => console.log('Disconnected From the Browser ❌'))
  socket.on('message', (req) => {
    const message = JSON.parse(req)
    switch (message.type) {
      case "message":
        sockets.forEach(aSocket => aSocket.send(`${socket.nickname}: ${message.payload}`))
        break;
      case "nickname":
        socket["nickname"] = message.payload
        break;
    }
  })
  socket.send(`hello!! ${socket.nickname}`)
}) 

/*
  TODO
  메세지 데이터 저장 및 새로고침시 메세지 배열 보내기
  닉네임 저장
  소켓 io 사용
*/ 