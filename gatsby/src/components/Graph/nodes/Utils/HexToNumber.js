var Web3 = require('web3');

function ToNumber() {
  this.addInput("",0)
  this.addOutput("", "number");
  this.size = [210, 30];
}

ToNumber.title = "HexToNumber";

ToNumber.prototype.onExecute = function() {
let input = this.getInputData(0)
if(!input){
  this.value = 0
}else{
  if(!this.web3){
    this.web3 = new Web3()
  }
  let strVal = ""+this.getInputData(0)
  if(strVal.indexOf("0x")<0){
    strVal = "0x"+strVal
  }
  this.value = ""+this.web3.utils.hexToNumberString(strVal)
}
  this.setOutputData(0, this.value);
};


export default ToNumber
