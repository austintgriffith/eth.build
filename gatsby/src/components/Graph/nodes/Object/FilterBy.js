function FilterBy() {
  this.addInput("obj", "");
  this.addOutput("", "");
  this.addProperty("value", "");
  this.widget = this.addWidget(
    "text",
    "filter",
    "",
    this.setValue.bind(this)
  );
  this.widgets_up = true;
  this.size = [190, 30];
  this._value = null;
}

FilterBy.title = "filter by";

FilterBy.prototype.onAdded = function() {
  this.widget.value = this.properties.value
};

FilterBy.prototype.setValue = function(v) {
  this.properties.value = v;
  this.widget.value = v;
};

FilterBy.prototype.getTitle = function() {
  if (this.flags.collapsed) {
    return "filter." + this.properties.value;
  }
  return this.title;
};

FilterBy.prototype.onPropertyChanged = function(name, value) {
  this.widget.value = value;
};

FilterBy.prototype.onExecute = function() {
  let input = this.getInputData(0)
  if(input){
    let output = []
    if (this.properties.value) {
      for(let i in input){
        let item = JSON.stringify(input[i]);
      //  console.log("searching",item,"for ",this.properties.value)
        if(item.toLowerCase().indexOf(this.properties.value.toLowerCase())>=0){
          output.push(input[i])
        }
      }
      this.setOutputData(0, output);
    }
  }
};

export default FilterBy
