function StringSplit() {
  this.addInput("string", "string");
  this.addOutput("output", "array,object")
  this.properties = {delimiter: "\n"}
}

StringSplit.title = "Split";

StringSplit.prototype.onExecute = function() {
  if (this.inputs[0] && this.getInputData(0) && typeof this.getInputData(0) == "string") {
    this.value = this.getInputData(0).split(this.properties.delimiter);
    this.setOutputData(0,this.value)
  }else{
    this.value = null
  }
};

StringSplit.prototype.getTitle = function() {
  if (this.flags.collapsed) {
    return this.inputs[0].label;
  }
  return this.title;
};

StringSplit.prototype.onDrawBackground = function(ctx) {
  //show the current value
  if(this.value) this.outputs[0].label = this.value.length+" items";
};

export default StringSplit
