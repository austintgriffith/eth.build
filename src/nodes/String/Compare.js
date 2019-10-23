function StringLength() {
  this.addInput("string", "string");
  this.addOutput("length", "number");
  this.size = [140, 26];
}

StringLength.title = "Length";
StringLength.description = "get string character count" //added for search

StringLength.prototype.onExecute = function() {
  if (this.inputs[0] && this.getInputData(0) && typeof this.getInputData(0) == "string") {
    this.value = this.getInputData(0).length;
    this.setOutputData(0,this.value)
    this.outputs[0].label = this.value
  }else{
    this.value = null
  }
};

StringLength.prototype.getTitle = function() {
  if (this.flags.collapsed) {
    return "Length("+this.value+")";
  }
  return this.title;
};

export default StringLength
