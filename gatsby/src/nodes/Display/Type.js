function DisplayType() {
  this.addInput("", "");
  this.addOutput("", 0);
}

DisplayType.title = "Type";

DisplayType.prototype.getTitle = function() {
  if (this.flags.collapsed) {
    return this.inputs[0].label;
  }
  return this.title;
};

DisplayType.prototype.onDrawBackground = function(ctx) {
  this.value = typeof this.getInputData(0);
  this.inputs[0].label = this.value
  this.setOutputData(0,this.value)
};

DisplayType.prototype.onExecute = function() {
  this.setOutputData(0,this.getInputData(0))
}

export default DisplayType
