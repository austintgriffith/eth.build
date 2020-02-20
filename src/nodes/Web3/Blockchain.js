var Web3 = require('web3');

const defaultProvider = "https://mainnet.infura.io/v3/e59c464c322f47e2963f5f00638be2f8"

function Blockchain() {
  this.addInput("[blockchain]","string")
  this.addOutput("blockchain","string")
  this.addOutput("balance()","function")
  this.addOutput("nonce()","function")
  this.addOutput("blockNumber()","function")
  this.addOutput("transaction()","function")
  this.addOutput("send()","function")
  this.properties = { address: "", provider: defaultProvider };
  this.size[0] = 210
}

Blockchain.title = "Blockchain";

Blockchain.prototype.onAdded = async function() {
  this.connectWeb3()
}

Blockchain.prototype.connectWeb3 = function() {
  if(this.properties.provider){
    try{
      this.web3 = new Web3(this.properties.provider)
    }catch(e){
      console.log(e)
    }
  }
}

Blockchain.prototype.onExecute = function() {
  let optionalProvider = this.getInputData(0)
  if(typeof optionalProvider != "undefined" && optionalProvider!=this.properties.provider){
    this.onPropertyChanged("provider",optionalProvider)
  }else if(typeof optionalProvider == "undefined"){
    if(this.properties.provider!=defaultProvider){
      this.onPropertyChanged("provider",defaultProvider)
    }
  }
  this.setOutputData(0,this.properties.provider)
  this.setOutputData(1,{
    name:"balance",
    args:[{name:"address",type:"string"}],
    function:async (args)=>{
      if(args.address){
        let balance = await this.web3.eth.getBalance(args.address)
        return balance
      }
      return 0
    }
  })
  this.setOutputData(2,{
    name:"nonce",
    args:[{name:"address",type:"string"}],
    function:async (args)=>{
      //console.log(this.web3.eth)
      let count = await this.web3.eth.getTransactionCount(args.address)
      //console.log("count of ",args.address,count)
      return count
    }
  })
  this.setOutputData(3,{
    name:"blockNumber",
    args:[],
    function:async (args)=>{
      //console.log(this.web3.eth)
      let count = await this.web3.eth.getBlockNumber()
      //console.log("count of ",args.address,count)
      return count
    }
  })
  this.setOutputData(4,{
    name:"transaction",
    args:[{name:"hash",type:"string"}],
    function:async (args)=>{
      //console.log(this.web3.eth)
      let count = await this.web3.eth.getTransaction(args.hash)
      //console.log("count of ",args.address,count)
      return count
    }
  })
  this.setOutputData(5,{
    name:"send",
    args:[{name:"signed",type:"string"}],
    function:async (args)=>{

      console.log("sending...",args)

      let transactionHash = await new Promise((resolve, reject) => {
        this.web3.eth.sendSignedTransaction(args.signed).on('transactionHash', function(hash){
            resolve(hash)
        }).on('error', (e)=>{
          global.setSnackbar({msg:e.toString()})
        });
      });

      console.log("sent...",transactionHash)

      return transactionHash
    }
  })
};

Blockchain.prototype.onPropertyChanged = async function(name, value){
  this.properties[name] = value;
  if(name=="provider"){
    this.connectWeb3()
  }
  return true;
};

export default Blockchain
