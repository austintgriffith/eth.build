function DisplayType() {
  this.addInput("", "");
  this.addOutput("", "string");
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

export default DisplayType
