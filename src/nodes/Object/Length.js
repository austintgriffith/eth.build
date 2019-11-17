function ObjectLength() {
  this.addInput("object", "");
  this.addOutput("length", "");
  this.addProperty("value", "");

  this.size = [190, 30];
  this.value = null;
}

ObjectLength.title = "length";


ObjectLength.prototype.getTitle = function() {
  if (this.flags.collapsed) {
    return this.value;
  }
  return this.title;
};

ObjectLength.prototype.onExecute = function() {
  var data = this.getInputData(0);
  if (data != null && typeof data.length == "function") {
    this.value = data.length()
  }else if(data){
    this.value = Object.keys(data).length
  }
  if(this.value) {
    this.outputs[0].label = this.value
  }
  this.setOutputData(0, this.value );
};

export default ObjectLength
