const { toChecksumAddress } = require('ethereum-checksum-address')

function ToHex() {
  this.addInput("input", "");
  this.addOutput("output", "string")
  this.size[0] = 200
}

ToHex.title = "To Checksum";

ToHex.prototype.onExecute = function() {
  let input = this.getInputData(0)
  if (this.inputs[0] && input) {
    this.setOutputData(0,toChecksumAddress(input))
  }else{
    this.setOutputData(0,null)
  }
};

export default ToHex
