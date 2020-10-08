function ObjectProperty() {
  this.addInput("", "array,object");
  this.addOutput("", "array,object");
  this.addProperty("value", "");
  this.widget = this.addWidget(
    "text",
    "key",
    "",
    this.setValue.bind(this)
  );
  this.widgets_up = true;
  this.size = [190, 30];
  this._value = null;
}

ObjectProperty.title = "key";
ObjectProperty.desc = "Inserts a key into an object";

ObjectProperty.prototype.onAdded = function() {
  this.widget.value = this.properties.value
};

ObjectProperty.prototype.setValue = function(v) {
  this.properties.value = v;
  this.widget.value = v;
};

ObjectProperty.prototype.getTitle = function() {
  if (this.flags.collapsed) {
    return "key." + this.properties.value;
  }
  return this.title;
};

ObjectProperty.prototype.onPropertyChanged = function(name, value) {
  this.widget.value = value;
};

ObjectProperty.prototype.onExecute = function() {
  let data = this.getInputData(0);
  if(data){
    data = JSON.stringify(data)
    if(data){
      data = JSON.parse(data)
      data[this.properties.value] = ""+this.properties.value
      this.setOutputData(0,data)
    }
  }

};

export default ObjectProperty
