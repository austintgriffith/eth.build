function Memory() {
  this.size = [120, 30];
  this.addInput("set", 0);
  this.addOutput("get", 0);
  this.properties = {title:"Memory"}
  this._pending = [];
}

Memory.title = "Memory";
Memory.prototype.getTitle = function() {
  return this.properties.title;
};

Memory.prototype.onAction = function() {
  this.properties.value = null
}

Memory.prototype.onExecute = function() {
  let nextValue = this.getInputData(0)
  if(nextValue && nextValue != this.properties.value){
    if(nextValue.length>0){
      this.properties.value = nextValue
    }
  }
  this.setOutputData(0,this.properties.value)
};

export default Memory;
