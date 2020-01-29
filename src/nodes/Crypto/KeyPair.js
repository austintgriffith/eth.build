var EthUtil = require('ethereumjs-util');

function Web3KeyPair() {
  this.addInput("[private key]","string")
  this.addInput("generate",-1)
  this.addOutput("private key", "string");
  this.addOutput("public key", "string");
  this.addOutput("address", "string");
}

Web3KeyPair.title = "Key Pair";
Web3KeyPair.description = "private public cryptography keypair";

Web3KeyPair.prototype.onAction = function() {
  var chars = "0123456789abcdef";
  let str = ""
  for (var i = 0; i < 64; i++)
  str += chars[(Math.floor(Math.random() * 16))];
  //this.onPropertyChanged("privateKey","0x"+str)
  this.privateKey = "0x"+str
  this.updateAddress()
}

Web3KeyPair.prototype.onExecute = function() {
  let optionalPrivateKey = this.getInputData(0)
  if(typeof optionalPrivateKey != "undefined" && optionalPrivateKey!=this.privateKey){
    if(optionalPrivateKey && typeof optionalPrivateKey.indexOf == "function" && optionalPrivateKey.indexOf("0x")<0){
      optionalPrivateKey = "0x"+optionalPrivateKey
    }
    //this.onPropertyChanged("privateKey",optionalPrivateKey)
    this.privateKey = optionalPrivateKey
    this.updateAddress()
  }
  this.setOutputData(0,this.privateKey)
  this.setOutputData(1,this.publicKey)
  this.setOutputData(2,this.address)
};

Web3KeyPair.prototype.onAdded = async function(){
  this.updateAddress()
}

Web3KeyPair.prototype.updateAddress = async function(){
  try{
    if(this.privateKey){
      console.log("PK",this.privateKey)
      this.publicKey = "0x"+EthUtil.privateToPublic(this.privateKey).toString('hex')
      this.address = "0x"+EthUtil.privateToAddress(this.privateKey).toString('hex')
    }else{
      //console.log("NO this.properties.privateKey")
    }
  }catch(e){
    console.error(e)
  }
  return true;
};

export default Web3KeyPair
