var EthUtil = require('ethereumjs-util');

function Web3KeyPair() {
  this.addInput("[private key]","string")
  this.addInput("generate",-1)
  this.addOutput("private key", "string");
  this.addOutput("public key", "string");
  this.addOutput("address", "string");
  this.properties = { privateKey: "" };
}

Web3KeyPair.title = "Key Pair";
Web3KeyPair.description = "private public cryptography keypair";

Web3KeyPair.prototype.onAction = function() {
  var chars = "0123456789abcdef";
  let str = ""
  for (var i = 0; i < 64; i++)
  str += chars[(Math.floor(Math.random() * 16))];
  this.onPropertyChanged("privateKey","0x"+str)
}

Web3KeyPair.prototype.onExecute = function() {
  let optionalPrivateKey = this.getInputData(0)
  if(typeof optionalPrivateKey != "undefined" && optionalPrivateKey!=this.properties.privateKey){
    if(optionalPrivateKey && typeof optionalPrivateKey.indexOf == "function" && optionalPrivateKey.indexOf("0x")<0){
      optionalPrivateKey = "0x"+optionalPrivateKey
    }
    this.onPropertyChanged("privateKey",optionalPrivateKey)
  }
  this.setOutputData(0,this.properties.privateKey)
  this.setOutputData(1,this.publicKey)
  this.setOutputData(2,this.address)
};

Web3KeyPair.prototype.onPropertyChanged = async function(name, value){
  this.properties[name] = value;

  try{

    if(this.properties.privateKey){
      //console.log("PK this.properties.privateKey")
      this.publicKey = "0x"+EthUtil.privateToPublic(this.properties.privateKey).toString('hex')
      this.address = "0x"+EthUtil.privateToAddress(this.properties.privateKey).toString('hex')
    }else{
      //console.log("NO this.properties.privateKey")
    }

  }catch(e){
    console.error(e)
  }

  return true;
};

export default Web3KeyPair
