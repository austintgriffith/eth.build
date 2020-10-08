const BurnerProvider = require('burner-provider');
const Web3 = require('web3');

const defaultProvider = "https://rpc.eth.build:46234"

function Web3Recover() {
  this.addInput("[message]","string")
  this.addInput("[signature]","string")
  this.addOutput("address", "string");
  this.properties = { message: "",  signature: "" };
  this.signatures = [] //cache each after signing
}

Web3Recover.title = "Recover";

Web3Recover.prototype.onExecute = async function() {
  let optionalMessage = this.getInputData(0)
  if(typeof optionalMessage != "undefined" && optionalMessage!=this.properties.message){
    this.onPropertyChanged("message",optionalMessage)
  }
  let optionalSignature = this.getInputData(1)
  if(typeof optionalSignature != "undefined" && optionalSignature!=this.properties.signature){
    this.onPropertyChanged("signature",optionalSignature)
  }
  this.setOutputData(0,this.address?this.address.toLowerCase():this.address)
};

Web3Recover.prototype.onPropertyChanged = async function(name, value){
  this.properties[name] = value;

  try{
    console.log("RECOVER",this.properties['message'],this.properties['signature'])
    if(this.properties['message']&&this.properties['signature']){
      if(!this.web3) this.web3 = new Web3();
      this.address = this.web3.eth.accounts.recover(this.properties['message'], this.properties['signature'])
    }
  }catch(e){}

  return true;
};

export default Web3Recover
