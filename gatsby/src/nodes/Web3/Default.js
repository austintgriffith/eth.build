var Web3 = require('web3');

const defaultProvider = "https://mainnet.infura.io/v3/e59c464c322f47e2963f5f00638be2f8"

function Miner() {
  this.addInput("[blockchain]","string")
  this.properties = { provider: defaultProvider };
  this.size[0] = 210
}

Miner.title = "Default";
Miner.title_color = "#BB4444";

Miner.prototype.onAdded = async function() {
  this.connectWeb3()
}

Miner.prototype.connectWeb3 = function() {
  if(this.properties.provider){
    try{
      this.web3 = new Web3(this.properties.provider)
    }catch(e){
      console.log(e)
    }

  }
}

Miner.prototype.onExecute = function() {
  let optionalProvider = this.getInputData(1)
  if(typeof optionalProvider != "undefined" && optionalProvider!=this.properties.provider){
    this.onPropertyChanged("provider",optionalProvider)
  }else if(typeof optionalProvider == "undefined"){
    if(this.properties.provider!=defaultProvider){
      this.onPropertyChanged("provider",defaultProvider)
    }
  }

};

Miner.prototype.onPropertyChanged = async function(name, value){
    this.properties[name] = value;
    if(name=="provider"){
      this.connectWeb3()
    }
  return true;
};

export default Miner
