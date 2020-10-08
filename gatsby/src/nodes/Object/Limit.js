function Limit() {
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

Limit.title = "limit";

Limit.prototype.onAdded = function() {
  this.widget.value = this.properties.value
};

Limit.prototype.setValue = function(v) {
  this.properties.value = v;
  this.widget.value = v;
};

Limit.prototype.getTitle = function() {
  if (this.flags.collapsed) {
    return "limit." + this.properties.value;
  }
  return this.title;
};

Limit.prototype.onPropertyChanged = function(name, value) {
  this.widget.value = value;
};

Limit.prototype.onExecute = function() {
  let input = this.getInputData(0)
  if(input){
    let data = JSON.parse(JSON.stringify(input));
    if (data != null && this.properties.value) {
      this.setOutputData(0, data.splice(0,this.properties.value));
    }
  }
};

export default Limit
