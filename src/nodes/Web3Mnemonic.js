const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/hdkey');

function Web3Mnemonic() {
  this.addInput("[mnemonic]","string")
  this.addInput("[index]","number")
  this.addInput("generate",-1)
  this.addOutput("private key", "string");
  this.addOutput("mnemonic", "string");
  this.properties = { mnemonic: "", index: 0 };
}

Web3Mnemonic.title = "Web3 Mnemonic";
Web3Mnemonic.menu = "web3/mnemonic";

Web3Mnemonic.prototype.onExecute = function() {
  let optionalMnemonic = this.getInputData(0)
  if(typeof optionalMnemonic != "undefined" && optionalMnemonic!=this.properties.mnemonic){
    this.onPropertyChanged("mnemonic",optionalMnemonic)
  }
  let optionalIndex = this.getInputData(1)
  if(typeof optionalIndex != "undefined" && optionalIndex!=this.properties.index){
    this.onPropertyChanged("index",optionalIndex)
  }
  this.setOutputData(0,this.value)
  this.setOutputData(1,this.properties.mnemonic)
};
Web3Mnemonic.prototype.onAction = async function(name){
  console.log("ACTION",name)
  if(name=="generate"){
    console.log("Generating Mnemonic...")
    this.onPropertyChanged("mnemonic",require("bip39").generateMnemonic())
  }
}

Web3Mnemonic.prototype.onPropertyChanged = async function(name, value){
  this.properties[name] = value;

  if(this.properties.mnemonic){
    const seed = await bip39.mnemonicToSeed(this.properties.mnemonic)
    const hdwallet = hdkey.fromMasterSeed(seed);
    const wallet_hdpath = "m/44'/60'/0'/0/";
    const wallet = hdwallet.derivePath(wallet_hdpath + this.properties.index).getWallet();
    this.value = "0x"+wallet._privKey.toString('hex');
  }

  if(this.value&&this.value.length>8){
    this.outputs[0].label = this.value.substr(0,6)+"..."+this.value.substr(this.value.length-4)
  }


  return true;
};

export default Web3Mnemonic
