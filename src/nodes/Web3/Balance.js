var Web3 = require('web3');

const defaultProvider = "https://mainnet.infura.io/v3/e59c464c322f47e2963f5f00638be2f8"

function Web3Balance() {
  this.addInput("address","string")
  this.addInput("[blockchain]","string")
  this.addInput("check",-1)
  this.addOutput("balance","number")
  this.properties = { address: "", provider: defaultProvider };
  this.size[0] = 210
}

Web3Balance.title = "Balance";

Web3Balance.prototype.onAdded = async function() {
  this.connectWeb3()
}

Web3Balance.prototype.onAction = async function() {
  this.connectWeb3()
}

Web3Balance.prototype.checkBalance = async function() {
//  console.log("CHECK BALANCE")
  if(this.properties.address && this.web3){
//    console.log("BALANCE--->")
    this.balance = await this.web3.eth.getBalance(this.properties.address)
//    console.log("BALANCE===>",this.balance)
  }
}

Web3Balance.prototype.connectWeb3 = function() {
  if(this.properties.provider){
//    console.log("CONNECTING TO",this.properties.provider)
    try{
      this.web3 = new Web3(this.properties.provider)
      this.checkBalance()
    }catch(e){
      console.log(e)
    }

  }
}

Web3Balance.prototype.onExecute = function() {
  let optionalProvider = this.getInputData(1)
  if(typeof optionalProvider != "undefined" && optionalProvider!=this.properties.provider){
    this.onPropertyChanged("provider",optionalProvider)
  }else if(typeof optionalProvider == "undefined"){
    if(this.properties.provider!=defaultProvider){
//      console.log("SET BACK TO DEFAULT!!!")
      this.onPropertyChanged("provider",defaultProvider)
    }
  }
  let optionalAddress = this.getInputData(0)
  if(typeof optionalAddress != "undefined" && optionalAddress!=this.properties.address){
    if(optionalAddress.indexOf("0x")<0){
      optionalAddress = "0x"+optionalAddress
    }
    this.onPropertyChanged("address",optionalAddress)
    this.checkBalance()
  }
  this.setOutputData(0,this.balance)
  if(typeof this.balance !="undefined" && this.balance!=null){
    this.outputs[0].label = this.balance
  }
};

Web3Balance.prototype.onPropertyChanged = async function(name, value){
//  console.log("check "+name,this.properties[name],value)
  //if(this.properties[name]!=value){
    this.properties[name] = value;
//    console.log("property change",name,value)
    if(name=="provider"){
      this.connectWeb3()
    }
    if(name=="address"){
      this.checkBalance()
    }
  //}
  return true;
};

export default Web3Balance
