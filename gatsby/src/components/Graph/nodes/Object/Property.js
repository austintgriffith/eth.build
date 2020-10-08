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

ObjectProperty.title = "property";
ObjectProperty.desc = "Outputs the property of an object";

ObjectProperty.prototype.onAdded = function() {
  this.widget.value = this.properties.value
};

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
  var data = this.getInputData(0);
  if (data != null) {
    this.setOutputData(0, data[this.properties.value]);
  }
};

export default ObjectProperty
