function SortBy() {
  this.addInput("obj", "");
  this.addOutput("", "");
  this.addProperty("reverse", false);
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

SortBy.title = "sort by";

SortBy.prototype.onAdded = function() {
  this.widget.value = this.properties.value
};

SortBy.prototype.setValue = function(v) {
  this.properties.value = v;
  this.widget.value = v;
};

SortBy.prototype.getTitle = function() {
  if (this.flags.collapsed) {
    return "sort." + this.properties.value;
  }
  return this.title;
};

SortBy.prototype.onPropertyChanged = function(name, value) {
  this.widget.value = value;
};

SortBy.prototype.onExecute = function() {
  let input = this.getInputData(0)
  if(input){
    let data = JSON.parse(JSON.stringify(input));
    if (data != null && this.properties.value) {
      data.sort((a,b)=>{
        if(a && b){
          let aStr = a[this.properties.value]
          let aValue
          if(aStr && aStr.indexOf("0x")==0){
            aValue = parseInt(aStr,16)
          }else{
            aValue = parseInt(aStr)
          }

          let bStr = b[this.properties.value]
          let bValue
          if(bStr && bStr.indexOf("0x")==0){
            bValue = parseInt(bStr,16)
          }else{
            bValue = parseInt(bStr)
          }

          if(this.properties.reverse){
            return aValue - bValue
          }else{
            return bValue - aValue
          }
        }
      })
      //console.log("sorted data and the best is",parseInt(data[0][this.properties.value],16),"and the worst is",parseInt(data[data.length-1][this.properties.value],16))
      this.setOutputData(0, data);
    }
  }
};

export default SortBy
