const BurnerProvider = require('burner-provider');
const Web3 = require('web3');

const defaultProvider = "https://rpc.eth.build:46234" //some junk url because you don't need a provider to sign messages but web3.js still needs a provider

function Web3Sign() {
  this.addInput("[privatekey]","string")
  this.addInput("[provider]","string")
  this.addInput("[message]","string")
  this.addInput("sign",-1)
  this.addOutput("address", "string");
  this.addOutput("message", "string");
  this.addOutput("signature", "string");
  this.addOutput("signed",-1)
  this.properties = { message: "", privateKey: "", provider: defaultProvider, signature: null, autoSign: true };
  this.signatures = [] //cache each after signing
}

Web3Sign.title = "Sign";

Web3Sign.prototype.onAction = async function() {
  if(this.properties['message'] && this.address){
    this.sign()
  }
}

Web3Sign.prototype.onExecute = async function() {
  let optionalPrivateKey = this.getInputData(0)
  if(typeof optionalPrivateKey != "undefined" && optionalPrivateKey!=this.properties.privateKey){
    this.onPropertyChanged("privateKey",optionalPrivateKey)
  }
  let optionalProvider = this.getInputData(1)
  if(typeof optionalProvider != "undefined" && optionalProvider!=this.properties.provider){
    this.onPropertyChanged("provider",optionalProvider)
  }
  let optionalMessage = this.getInputData(2)
  if(typeof optionalMessage != "undefined" && optionalMessage!=this.properties.message){
    this.onPropertyChanged("message",optionalMessage)
  }
  this.setOutputData(0,this.address?this.address.toLowerCase():this.address)
  this.setOutputData(1,this.properties.message)
  this.setOutputData(2,this.signature)
};

Web3Sign.prototype.onPropertyChanged = async function(name, value){
  this.properties[name] = value;

  if(name=="privateKey"||name=="provider"){
    try{
      console.log("private key / provider updated...",this.properties['privateKey'])
      if(this.properties['privateKey']){
        this.web3 = new Web3(new BurnerProvider({
          rpcUrl: this.properties['provider'],
          privateKey: this.properties['privateKey']
        }));
      }else{
        this.web3 = new Web3(this.properties['provider']);
      }
      let accounts = await this.web3.eth.getAccounts()
      console.log("accounts",accounts[0])
      this.address = accounts[0]
    }catch(e){}
  }

  if(this.properties['message'] && this.properties['autoSign'] && this.address){
    this.sign()
  }

  return true;
};

Web3Sign.prototype.sign = async function(){
  console.log("this.properties['message']",this.properties['message'],"this.properties['autoSign']",this.properties['autoSign'],"this.address",this.address)
  if(this.signatures[this.address+this.properties['message']]){
    this.signature = this.signatures[this.address+this.properties['message']];
    //this.trigger("stream_ready", video);
  }else{
    try{
      this.signature = await this.web3.eth.sign(this.properties['message'],this.address)
    //  this.signatures[this.address+this.properties['message']]
    }catch(e){}
  }
  console.log("SIG",this.signature)

}


export default Web3Sign
