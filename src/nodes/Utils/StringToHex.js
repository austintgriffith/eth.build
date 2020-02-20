var Web3 = require('web3');

function ToHex() {
  this.addInput("input", "");
  this.addOutput("output", "string")
  this.properties = {}
  this.size[0] = 160
}

ToHex.title = "To Hex";

ToHex.prototype.onStart = function() {
  this.web3 = new Web3()
}


ToHex.prototype.onExecute = function() {
  if (this.inputs[0] && this.getInputData(0)) {
    if(!this.web3){
      this.web3 = new Web3()
    }
    this.setOutputData(0,this.web3.utils.utf8ToHex(""+this.getInputData(0)))
  }else{
    this.setOutputData(0,null)
  }
};

export default ToHex
