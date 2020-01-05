var RLP = require('rlp');

function UtilsFromWei() {
  this.addInput("", "");
  this.addInput("", "");
  this.addInput("", "");
  this.addOutput("output", "string")
  this.size[0] = 190
}

UtilsFromWei.title = "RLP Encode";

UtilsFromWei.prototype.onExecute = function() {

  let dataArray = []

  if (typeof this.getInputData(0) != "undefined" && this.getInputData(0) != null) {
    dataArray.push(this.getInputData(0))
  }

  if (typeof this.getInputData(1) != "undefined" && this.getInputData(1) != null) {
    dataArray.push(this.getInputData(1))
  }

  if (typeof this.getInputData(2) != "undefined" && this.getInputData(2) != null) {
    dataArray.push(this.getInputData(2))
  }

  this.setOutputData(0,RLP.encode(dataArray))
  //var address = ("0x"+keccak256().toString('hex')).slice(12).substring(14)
};

export default UtilsFromWei
