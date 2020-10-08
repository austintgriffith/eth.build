function ObjectIndex() {
  this.addInput("obj", "");
  this.addInput("index", "number");
  this.addOutput("value", "string,object,array");
  this.addOutput("index", "number");

  this.size = [190, 60];
  this._value = null;
}

ObjectIndex.title = "index";

ObjectIndex.prototype.getTitle = function() {
  if (this.flags.collapsed) {
    return "in["+this.index+"]" + this.properties.value;
  }
  return this.title;
};

ObjectIndex.prototype.onExecute = function() {
  var obj = this.getInputData(0);
  var index = this.getInputData(1);
  if (obj && typeof index == "number") {
    this.keys = Object.keys(obj)
    //console.log(this.keys)
    this.index = this.keys[index]
    this.value = obj[this.index]
    //console.log(obj)
    //console.log("INDEX",this.index)
    //console.log("VALUE",this.value)
  }
  this.setOutputData(0,this.value)
  this.setOutputData(1,parseInt(this.index))
};

export default ObjectIndex
