var Web3 = require('web3');
var web3 = new Web3();

function MathHexToNumber() {
  this.addInput("", 0, { label: "" });
  this.addOutput("", 0, { label: "" });
  this.value = "";
  this.size = [100, 26];
}

MathHexToNumber.title = "HexToNumber";
MathHexToNumber.menu = "math/hextonumber";

MathHexToNumber.prototype.onExecute = function() {
  if (this.inputs[0] && this.getInputData(0) && typeof this.getInputData(0) == "string") {
    try{
      this.value = web3.utils.hexToNumber(this.getInputData(0))
      this.setOutputData(0,this.value)
    }catch(e){
      console.log("ERROR",e)
    }
  }else{
    this.value = 0
  }
};

MathHexToNumber.prototype.getTitle = function() {
  if (this.flags.collapsed) {
    return this.inputs[0].label;
  }
  return this.title;
};

MathHexToNumber.prototype.onDrawBackground = function(ctx) {
  //show the current value
  this.inputs[0].label = this.value;
};

export default MathHexToNumber
