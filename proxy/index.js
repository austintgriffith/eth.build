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
  proxy.web(req, res, {
      //target: 'http://10.0.0.237:8545'
      target: 'http://10.0.0.237:8545'
      //target: 'http://10.0.0.188:8545'
    });
})

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(9545, () => {
  console.log('Listening...')
})
