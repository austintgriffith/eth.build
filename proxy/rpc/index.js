const https = require('https')
var httpProxy = require('http-proxy');
const express = require('express')
const fs = require('fs')
var cors = require('cors')
var app = express()
const Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:46235"));

const EthereumTx = require('ethereumjs-tx').Transaction
let pk = fs.readFileSync("./faucetPrivateKey.txt")
pk = pk.toString().trim()
let address = fs.readFileSync("./faucetAddress.txt")
address = address.toString().trim()
console.log("firing up faucet at address ",address)
const privateKey = Buffer.from(
  pk.replace("0x",""),
  'hex',
)

app.use(cors())

var proxy = httpProxy.createProxyServer();

proxy.on('error', function (err, req, res) {
  console.log(err)
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end('sad trombone');
});

app.post('/', (req, res) => {
  try{
    //console.log("hit!")
    proxy.web(req, res, {
        //target: 'http://10.0.0.237:8545'
        target: 'http://0.0.0.0:46235'
        //target: 'http://10.0.0.188:8545'
      });
      console.log("served POST!")
  }catch(e){
    console.log(e)
  }
})

app.get('/', (req, res) => {
  try{
    //console.log("hit!")
    proxy.web(req, res, {
        //target: 'http://10.0.0.237:8545'
        target: 'http://0.0.0.0:46235'
        //target: 'http://10.0.0.188:8545'
      });
      console.log("served GET!")
  }catch(e){
    console.log(e)
  }

})

app.get('/faucet', (req, res) => {
  console.log("faucet")
  console.log(req.query)

/*
  const txParams = {
    nonce: '0x00',
    gasPrice: '0x09184e72a000',
    gasLimit: '0x2710',
    to: req.query.address,
    value: '0x01',
    data: '0x00',
  }

  // The second parameter is not necessary if these values are used
  const tx = new EthereumTx(txParams)
  tx.sign(privateKey)
  const serializedTx = tx.serialize()

  console.log("serializedTx",serializedTx)*/

  web3.eth.getTransactionCount(address, function (err, nonce) {

    console.log("nonce:",nonce)
    var tx =  new EthereumTx({
      nonce: nonce,
      gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
      gasLimit: 30000,
      to: req.query.address,
      value: 10000000000000000,
      data: "0x",
    });
    tx.sign(Buffer.from(privateKey, 'hex'));

    var raw = '0x' + tx.serialize().toString('hex');
    web3.eth.sendSignedTransaction(raw, function (err, transactionHash) {
      console.log(transactionHash);
      res.send(transactionHash)
    });
  });


})


https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(46234, () => {
  console.log('Listening 46234...')
})
