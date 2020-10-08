var Web3 = require('web3');

const defaultProvider = "https://mainnet.infura.io/v3/e59c464c322f47e2963f5f00638be2f8"

function Web3TxCount() {
  this.addInput("address","string")
  this.addInput("[blockchain]","string")
  this.addOutput("txcount","number")
  this.properties = { address: "", provider: defaultProvider };

  setInterval(this.check.bind(this),1777)
}

Web3TxCount.title = "Web3 Tx Count";
Web3TxCount.menu = "web3/txcount";

Web3TxCount.prototype.onAdded = async function() {
  this.connectWeb3()
}

Web3TxCount.prototype.check = async function() {
  //console.log("CHECK")
  if(this.properties.address && this.web3){
    //console.log("getTransactionCount--->")
    try{
      //console.log("GET TX COUNT!",this.properties.address,this.web3)
      this.txcount = await this.web3.eth.getTransactionCount(this.properties.address)
      //console.log("GOT TX COUNT!",this.txcount)

    }catch(e){}
    //console.log("getTransactionCount===>",this.txcount)
  }
}

Web3TxCount.prototype.connectWeb3 = function() {
  if(this.properties.provider){
    //console.log("CONNECTING TO",this.properties.provider)
    this.web3 = new Web3(this.properties.provider)
    this.check()
  }
}

Web3TxCount.prototype.onExecute = function() {
  let optionalProvider = this.getInputData(1)
  if(typeof optionalProvider != "undefined" && optionalProvider!=this.properties.provider){
    this.onPropertyChanged("provider",optionalProvider)
  }else if(typeof optionalProvider == "undefined"){
    if(this.properties.provider!=defaultProvider){
      //console.log("SET BACK TO DEFAULT!!!")
      this.onPropertyChanged("provider",defaultProvider)
    }
  }
  let optionalAddress = this.getInputData(0)
  if(typeof optionalAddress != "undefined" && optionalAddress!=this.properties.address){
    if(optionalAddress.indexOf("0x")<0){
      optionalAddress = "0x"+optionalAddress
    }
    this.onPropertyChanged("address",optionalAddress)
    this.check()
  }
  this.setOutputData(0,this.txcount)
};

Web3TxCount.prototype.onPropertyChanged = async function(name, value){
  //console.log("check "+name,this.properties[name],value)
  //if(this.properties[name]!=value){
    this.properties[name] = value;
    //console.log("property change",name,value)
    if(name=="provider"){
      this.connectWeb3()
    }
    if(name=="address"){
      this.check()
    }
  //}
  return true;
};

export default Web3TxCount
