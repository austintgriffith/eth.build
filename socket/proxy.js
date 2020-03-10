const https = require('https')
var httpProxy = require('http-proxy');
const express = require('express')
const fs = require('fs')
var cors = require('cors')
var app = express()

// navigate to: https://localhost:9545

app.use(cors())

var proxy = httpProxy.createProxyServer();

app.post('/', (req, res) => {
  console.log("hit!")
  proxy.web(req, res, {
      //target: 'http://10.0.0.237:8545'
      target: 'http://localhost:44387/'
      //target: 'http://10.0.0.188:8545'
    });
    console.log("served!")
})

app.post('/build', (req, res) => {
  console.log("build set hit!")
  proxy.web(req, res, {
      //target: 'http://10.0.0.237:8545'
      target: 'http://localhost:44387/'
      //target: 'http://10.0.0.188:8545'
    });
    console.log("served!")
})


app.get('/', (req, res) => {
  console.log("hit!")
  proxy.web(req, res, {
      //target: 'http://10.0.0.237:8545'
      target: 'http://localhost:44387/'
      //target: 'http://10.0.0.188:8545'
    });
    console.log("served!")
})

app.get('/price', (req, res) => {
  console.log("hit price!")
  proxy.web(req, res, {
      //target: 'http://10.0.0.237:8545'
      target: 'http://localhost:44387/'
      //target: 'http://10.0.0.188:8545'
    });
    console.log("served!")
})

app.get('/build', (req, res) => {
  console.log("build get hit!")
  proxy.web(req, res, {
      //target: 'http://10.0.0.237:8545'
      target: 'http://localhost:44387/'
      //target: 'http://10.0.0.188:8545'
    });
    console.log("served!")
})

app.post('/socket.io', (req, res) => {
  console.log("hit!")
  proxy.web(req, res, {
      //target: 'http://10.0.0.237:8545'
      target: 'http://localhost:44387/socket.io'
      //target: 'http://10.0.0.188:8545'
    });
    console.log("served!")
})

app.get('/socket.io', (req, res) => {
  console.log("hit!")
  proxy.web(req, res, {
      //target: 'http://10.0.0.237:8545'
      target: 'http://localhost:44387/socket.io'
      //target: 'http://10.0.0.188:8545'
    });
    console.log("served!")
})

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(44386, () => {
  console.log('Listening 44386...')
})
