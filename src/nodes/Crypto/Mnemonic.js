const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/hdkey');

function Mnemonic() {
  this.addInput("[mnemonic]","string")
  this.addInput("[index]","number")
  this.addInput("generate",-1)
  this.addOutput("private key", "string");
  this.addOutput("mnemonic", "string");
  this.properties = { index: 0 };
}

Mnemonic.title = "Mnemonic";

Mnemonic.prototype.onExecute = function() {
  let optionalMnemonic = this.getInputData(0)
  if(typeof optionalMnemonic != "undefined" && optionalMnemonic!=this.mnemonic){
    this.mnemonic = optionalMnemonic
    this.generatePrivateKey()
  }else{
    //if no mnemonic generated, generate one
    if(!this.mnemonic){
        this.onAction()
    }
  }
  let optionalIndex = this.getInputData(1)
  if(typeof optionalIndex != "undefined" && optionalIndex!=this.properties.index){
    this.properties.index = optionalIndex
    this.generatePrivateKey()
  }
  this.setOutputData(0,this.value)
  this.setOutputData(1,this.mnemonic)
};
Mnemonic.prototype.onAction = async function(name){
  console.log("Generating Mnemonic...")
  this.mnemonic = require("bip39").generateMnemonic()
  this.generatePrivateKey()
}
Mnemonic.prototype.generatePrivateKey = async function(){
  try{
    const seed = await bip39.mnemonicToSeed(this.mnemonic)
    const hdwallet = hdkey.fromMasterSeed(seed);
    const wallet_hdpath = "m/44'/60'/0'/0/";
    let fullPath = wallet_hdpath + this.properties.index
    console.log("fullPath",fullPath)
    const wallet = hdwallet.derivePath(fullPath).getWallet();
    this.value = "0x"+wallet._privKey.toString('hex');
  }catch(e){
    console.log(e)
  }  
}


export default Mnemonic
