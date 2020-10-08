var RLP = require('rlp');

function RLPEncode() {
  this.addInput("", "");
  this.addInput("", "");
  this.addInput("", "");
  this.addInput("", "");
  this.addInput("", "");
  this.addInput("", "");
  this.addOutput("output", "string")
  this.size[0] = 190
}

RLPEncode.title = "RLP Encode";

RLPEncode.prototype.onExecute = function() {

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

  if (typeof this.getInputData(3) != "undefined" && this.getInputData(3) != null) {
    dataArray.push(this.getInputData(3))
  }

  if (typeof this.getInputData(4) != "undefined" && this.getInputData(4) != null) {
    dataArray.push(this.getInputData(4))
  }

  if (typeof this.getInputData(5) != "undefined" && this.getInputData(5) != null) {
    dataArray.push(this.getInputData(5))
  }

  try{
    this.setOutputData(0,RLP.encode(dataArray))//.toString('hex')
  }catch(e){
    console.log(e)
  }

  //var address = ("0x"+keccak256().toString('hex')).slice(12).substring(14)
};

export default RLPEncode
