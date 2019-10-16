function DisplayType() {
  this.addInput("", "");
}

DisplayType.title = "Display Type";
DisplayType.menu = "display/type";

DisplayType.prototype.getTitle = function() {
  if (this.flags.collapsed) {
    return this.inputs[0].label;
  }
  return this.title;
};

DisplayType.prototype.onDrawBackground = function(ctx) {
  this.inputs[0].label = typeof this.getInputData(0);
};

export default DisplayType
