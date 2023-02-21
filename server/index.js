const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const PORT = 8080;
const io = socketIO(server, {
  cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"]
	}
});

app.use(cors());

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
})

io.on('connection', socket => {
  console.log("Connection to Client 🔥");

  socket.on("enterRoom", (roomName, done) => {
    socket.join(roomName);
    done(roomName);
    socket.to(roomName).emit('welcome');
  })

})

/*
  TODO
  메세지 데이터 저장 및 새로고침시 메세지 배열 보내기
  닉네임 저장
  소켓 io 사용
*/ 