const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get("/", (req, res) => {
  res.send({ response: "Hit me socket-side, homie." }).status(200);
})

io.on("connection", socket => {
  console.log("New client connected")
  socket.on('eth.build', function(id, msg){
    console.log("SOCKET ACTION",id,msg)
    io.emit(id, msg);
  });
  socket.on("disconnect", () => console.log("Client disconnected"))
});

io.on("subscribe", function (event, headers) {
  socket.join(event);
});

server.listen(port, () => console.log(`Listening on port ${port}`));
