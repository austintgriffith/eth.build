

function LeadingZeros() {
  this.addInput("input", "string");
  this.addInput("difficulty", "number");
  this.addOutput("number", "number")
  this.properties = {}
  this.size[0] = 240
}

LeadingZeros.title = "Leading Zeros";

LeadingZeros.prototype.onExecute = function() {
  if (this.inputs[0] && this.getInputData(0)) {
    let inputString = this.getInputData(0)
    let difficulty = this.getInputData(1)
    if(inputString && difficulty){
      this.value = parseInt(inputString.substr(2,difficulty),16)
    }

  }
  this.setOutputData(0,this.value)
};

export default LeadingZeros
