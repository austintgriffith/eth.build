function ObjectProperty() {
  this.addInput("obj", "");
  this.addOutput("json", "string");
  this.addProperty("value", "");
  this.size = [140, 30];
  this._value = "";
}

ObjectProperty.title = "JSON";



ObjectProperty.prototype.onExecute = function() {
  var data = this.getInputData(0);
  if (data != null) {
    try{
      this.properties.value = JSON.stringify(data);
    }catch(e){}
    this.setOutputData(0, this.properties.value);
  }
};

export default ObjectProperty
