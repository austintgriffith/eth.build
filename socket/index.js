const express = require("express");
const bodyParser = require("body-parser")
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = 44387;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const keccak256 = require('keccak256')
var cors = require('cors')

const fs = require('fs');

let storage = {}


let coinmarketcapBuffer = {}
let coinmarketcapBufferTimestamp = {}

app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => {
  console.log("GET!",req.query)
  let value = storage[req.query.key]
  res.send({ response: value }).status(200);
})

app.get("/price", (req, res) => {
  console.log("GET PRICE!",req.query)

  let symbol = "ETH"
  if(req.query && req.query.symbol){
    symbol = req.query.symbol
  }

  if(!coinmarketcapBuffer[symbol] || !coinmarketcapBufferTimestamp[symbol] || coinmarketcapBufferTimestamp[symbol]+30000 < Date.now()){
    console.log("getting price data for "+symbol+" and reseting buffer time to ",coinmarketcapBufferTimestamp[symbol])
    coinmarketcapBufferTimestamp[symbol] = Date.now()
    const rp = require('request-promise');
    const requestOptions = {
      method: 'GET',
      uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
      qs: {
        symbol: symbol
      },
      headers: {
        'X-CMC_PRO_API_KEY': fs.readFileSync("coinmarketcap.key").toString().trim()
      },
      json: true,
      gzip: true
    };

    rp(requestOptions).then(response => {
      console.log('API call response:', response.data);
      coinmarketcapBuffer[symbol] = response.data
      res.send(response.data).status(200);
    }).catch((err) => {
      console.log('API call error:', err.message);
      res.send("Failed to get data from coinmarketcap").status(400);
    });

  }else{
    res.send(coinmarketcapBuffer[symbol]).status(200)
  }








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

app.get("/build", (req, res) => {
  console.log("GET BUILD",req.query)
  try{
    let cleanKey = req.query.key.replace(/[^A-Za-z0-9]/g, '');
    console.log("LOADING",cleanKey)
    let loaded = fs.readFileSync("gamesaves/"+cleanKey).toString()
    if(loaded){
      res.send({ compressed: loaded }).status(200);
    }else{
      res.send("Sorry").status(200);
    }
  }catch(e){console.log("ERR GETTING",3)}

})


app.post("/build", (req, res) => {
  console.log("BUILD",req.body)
  if(req.body&&req.body.compressed){
    let key = keccak256(req.body.compressed).toString('hex')
    fs.writeFileSync("gamesaves/"+key,req.body.compressed)
    console.log("SAVE",req.body.compressed,"AND SAVE TO SOME RANDOM KEY AND RETURN IT",key)
    res.send({key}).status(200);
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
