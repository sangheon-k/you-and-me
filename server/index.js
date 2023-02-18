const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server })

server.listen(8080, () => {
  console.log('Listening on http:localhost:8080');
})

wss.on('connection', (socket) => {
  console.log(socket)
})