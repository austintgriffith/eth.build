var EthUtil = require('ethereumjs-util');

function Web3KeyPair() {
  this.addInput("[private key]","string")
  this.addOutput("address", "string");
  this.addOutput("sign", -1) //action
  this.properties = { privateKey: "" };
}

Web3KeyPair.title = "Web3 Key Pair";
Web3KeyPair.menu = "web3/keypair";

Web3KeyPair.prototype.onExecute = function() {
  let optionalPrivateKey = this.getInputData(0)
  if(typeof optionalPrivateKey != "undefined" && optionalPrivateKey!=this.properties.privateKey){
    if(typeof optionalPrivateKey.indexOf == "function" && optionalPrivateKey.indexOf("0x")<0){
      optionalPrivateKey = "0x"+optionalPrivateKey
    }
    this.onPropertyChanged("privateKey",optionalPrivateKey)
  }
  this.setOutputData(0,this.address)
};

Web3KeyPair.prototype.onPropertyChanged = async function(name, value){
  this.properties[name] = value;

  try{
    if(this.properties.privateKey){
      this.address = "0x"+EthUtil.privateToAddress(this.properties.privateKey).toString('hex')
    }
  }catch(e){
    console.error(e)
  }
  
  return true;
};

export default Web3KeyPair
