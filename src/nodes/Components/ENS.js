var Web3 = require('web3');
var EthereumENS = require('ethereum-ens');

const defaultProvider = "https://mainnet.infura.io/v3/e59c464c322f47e2963f5f00638be2f8"

function ENS() {
  this.addInput("","string")
  this.addOutput("address","string")
  this.properties = { provider: defaultProvider };
  this.cached = false
  this.size[0] = 210
}

ENS.title = "ENS";

ENS.prototype.onAdded = function() {
  this.connectWeb3()
}

ENS.prototype.connectWeb3 = function() {
  if(this.properties.provider){
    try{
      this.web3 = new Web3(this.properties.provider)
      this.ens = new EthereumENS(this.web3);
      this.cached = false
    }catch(e){
      console.log(e)
    }

  }
}

ENS.prototype.onExecute = async function() {
  let input = this.getInputData(0)

  if(input && input.indexOf(".eth")>0 && (!this.cached || this.cached!=input)){
    this.cached = input
    this.value = await this.ens.resolver(this.cached).addr()
    if(this.value) this.value=this.value.toLowerCase()
  }

  this.setOutputData(0,this.value)

};

ENS.prototype.onPropertyChanged = async function(name, value){
    this.properties[name] = value;
    if(name=="provider"){
      this.connectWeb3()
    }
  return true;
};

export default ENS
