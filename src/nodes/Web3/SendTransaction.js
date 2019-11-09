var Web3 = require('web3');

const defaultProvider = "https://mainnet.infura.io/v3/e59c464c322f47e2963f5f00638be2f8"

function Web3SendTransaction() {
  this.addInput("signed","string")
  this.addInput("[blockchain]","string")
  this.addInput("send",-1)
  this.addOutput("hash","string")
  this.addOutput("receipt","object")
  this.properties = { address: "", provider: defaultProvider };
}

Web3SendTransaction.title = "Send Tx";

Web3SendTransaction.prototype.onAdded = async function() {
  this.connectWeb3()
}

Web3SendTransaction.prototype.onAction = function(event, tx, raw) {
  //console.log("ACTION",event,tx,raw)

  let transaction = raw

  console.log("transaction",transaction)

  if(!transaction){
    transaction = this.getInputData(0)
  }

  console.log("transaction",transaction)

  //console.log("TX",transaction)
  if(transaction){
    console.log("SENDING")
    if(!this.web3){
      this.connectWeb3()
    }
    console.log("this.web3",this.web3)
    this.web3.eth.sendSignedTransaction(transaction, (err, transactionHash) => {
      if(err){
        console.log("ERROR",err)
      }
      console.log("TRANSACTION",transactionHash)
      this.transactionHash = transactionHash
      this.checkForReceipt()
    });
  }
}

Web3SendTransaction.prototype.checkForReceipt = async function() {
  if(this.transactionHash){
    console.log("Checking for receipt of "+this.transactionHash)
    this.receipt = await this.web3.eth.getTransactionReceipt(this.transactionHash)
    console.log(this.receipt)
    //if(!this.receipt){
      setTimeout(this.checkForReceipt.bind(this),1000)
    //}
  }

}

Web3SendTransaction.prototype.connectWeb3 = function() {
  if(this.properties.provider){
    console.log("WEB3 CONNECTING TO",this.properties.provider)
    this.web3 = new Web3(this.properties.provider)
  }
}

Web3SendTransaction.prototype.onExecute = function() {
  let optionalProvider = this.getInputData(1)
  if(typeof optionalProvider != "undefined" && optionalProvider!=this.properties.provider){
    this.onPropertyChanged("provider",optionalProvider)
  }else if(typeof optionalProvider == "undefined"){
    if(this.properties.provider!=defaultProvider){
      console.log("SET BACK TO DEFAULT!!!")
      this.onPropertyChanged("provider",defaultProvider)
    }
  }
  this.setOutputData(0,this.transactionHash)
  this.setOutputData(1,this.receipt)
};

Web3SendTransaction.prototype.onPropertyChanged = async function(name, value){
  console.log("check "+name,this.properties[name],value)
  this.properties[name] = value;
  console.log("property change",name,value)
  if(name=="provider"){
    try{
      this.connectWeb3()
    }catch(e){}
  }
  return true;
};

export default Web3SendTransaction
