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
  console.log("Connection to Client ๐ฅ");

  socket.on("enterRoom", (roomName, done) => {
    socket.join(roomName);
    done(roomName);
    socket.to(roomName).emit('welcome');
  })

})

/*
  TODO
  ๋ฉ์ธ์ง ๋ฐ์ดํฐ ์ ์ฅ ๋ฐ ์๋ก๊ณ ์นจ์ ๋ฉ์ธ์ง ๋ฐฐ์ด ๋ณด๋ด๊ธฐ
  ๋๋ค์ ์ ์ฅ
  ์์ผ io ์ฌ์ฉ
*/ 