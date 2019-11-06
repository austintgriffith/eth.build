function ObjectProperty() {
  this.addOutput("obj", "");
  this.addInput("json", "string");
  this.addProperty("value", "");
  this.size = [140, 30];
  this._value = "";
}

ObjectProperty.title = "Parse";



ObjectProperty.prototype.onExecute = function() {
  var data = this.getInputData(0);
  if (data != null) {
    try{
      this.properties.value = JSON.parse(data);
    }catch(e){}
    this.setOutputData(0, this.properties.value);
  }
};

export default ObjectProperty
