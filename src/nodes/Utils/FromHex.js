var Web3 = require('web3');

function UtilsFromWei() {
  this.addInput("input", "string");
  this.addOutput("output", "string")
  this.properties = {}
  this.size[0] = 160
}

UtilsFromWei.title = "From Hex";

UtilsFromWei.prototype.onStart = function() {
  this.web3 = new Web3()
}


UtilsFromWei.prototype.onExecute = function() {
  if (this.inputs[0] && this.getInputData(0)) {
    if(!this.web3){
      this.web3 = new Web3()
    }
    try{
      this.setOutputData(0,this.web3.utils.hexToUtf8(this.getInputData(0)))
    }catch(e){
      console.log(e)
    }
  }else{
    this.setOutputData(0,null)
  }
};

export default UtilsFromWei
