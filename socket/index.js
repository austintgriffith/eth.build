const express = require("express");
const bodyParser = require("body-parser")
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const keccak256 = require('keccak256')
var cors = require('cors')


let storage = {}

app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => {
  console.log("GET!",req.query)
  let value = storage[req.query.key]
  res.send({ response: value }).status(200);
})

app.post("/", (req, res) => {
  console.log("POST",req.body)
  if(req.body && req.body.string){
    let value = req.body.string
    let key = "0x"+keccak256(value).toString('hex')
    storage[key] = value
    res.send({ response: key }).status(200);
  }else{
    res.send({ error: "no string in body" }).status(400);
  }

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
