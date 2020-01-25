const https = require('https')
var httpProxy = require('http-proxy');
const express = require('express')
const fs = require('fs')
var cors = require('cors')
var app = express()


const { exec } = require('child_process');
exec('ganache-cli -h 0.0.0.0 -p 46235', (err, stdout, stderr) => {
  if (err) {
    //some err occurred
    console.error(err)
  } else {
   // the *entire* stdout and stderr (buffered)
   console.log(`stdout: ${stdout}`);
   console.log(`stderr: ${stderr}`);
  }
});




app.use(cors())

var proxy = httpProxy.createProxyServer();

app.post('/', (req, res) => {
  console.log("hit!")
  proxy.web(req, res, {
      //target: 'http://10.0.0.237:8545'
      target: 'http://0.0.0.0:46235'
      //target: 'http://10.0.0.188:8545'
    });
    console.log("served!")
})

app.get('/', (req, res) => {
  console.log("hit!")
  proxy.web(req, res, {
      //target: 'http://10.0.0.237:8545'
      target: 'http://0.0.0.0:46235'
      //target: 'http://10.0.0.188:8545'
    });
    console.log("served!")
})

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(46234, () => {
  console.log('Listening 46234...')
})
