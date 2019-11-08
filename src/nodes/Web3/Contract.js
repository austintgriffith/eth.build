var Web3 = require('web3');

const defaultProvider = "https://mainnet.infura.io/v3/e59c464c322f47e2963f5f00638be2f8"

function Contract() {
  this.addInput("[blockchain]",0)
  this.addInput("address","string")
  this.addInput("abi","object")
  //this.addOutput("[network]",0)
  this.addOutput("someFunction()","function")


  this.properties =  {
    title:"Contract",
    provider: defaultProvider
  }
  this.size = [320, 240];
}

Contract.title = "Contract";
Contract.prototype.getTitle = function() {
  return this.properties.title;
};


Contract.prototype.onExecute = function() {
  this.setOutputData(0,{
    name:"someFunction",
    args:[{name:"address",type:"string"}],
    function:(args)=>{
      console.log("RUN A FUNCTION BUT IN THIS CONTEXT!",args)
      return 42424242
    }
  })
}


Contract.prototype.connectWeb3 = function() {
  if(this.properties.provider){
    try{
      this.web3 = new Web3(this.properties.provider)
    }catch(e){
      console.log(e)
    }
  }
}

export default Contract
