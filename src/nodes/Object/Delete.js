function ObjectProperty() {
  this.addInput("obj", "");
  this.addOutput("", "");
  this.addProperty("value", "");
  this.widget = this.addWidget(
    "text",
    "prop.",
    "",
    this.setValue.bind(this)
  );
  this.widgets_up = true;
  this.size = [190, 30];
  this._value = null;
}

ObjectProperty.title = "Delete";

ObjectProperty.prototype.setValue = function(v) {
  this.properties.value = v;
  this.widget.value = v;
};

ObjectProperty.prototype.getTitle = function() {
  if (this.flags.collapsed) {
    return "in." + this.properties.value;
  }
  return this.title;
};

ObjectProperty.prototype.onPropertyChanged = function(name, value) {
  this.widget.value = value;
};

ObjectProperty.prototype.onExecute = function() {
  let input = this.getInputData(0)
  if(input){
    console.log("string and parse",input)
    let data
    try{
      data = JSON.parse(JSON.stringify(input));
    }catch(e){
      console.log(e)
    }

    if (data != null && typeof data[this.properties.value]!="undefined") {
      delete data[this.properties.value]
    }
    this.setOutputData(0,data)
  }
};

export default ObjectProperty
