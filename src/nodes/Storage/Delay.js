function Memory() {
  this.size = [120, 30];
  this.addInput("set", 0);
  this.addOutput("get", 0);
  this.properties = {delay: 250}
  this._pending = [];
}

Memory.title = "Delay";

Memory.prototype.onExecute = function() {
  let nextValue = this.getInputData(0)
  if(nextValue != this.properties.value){
    setTimeout(()=>{
      this.properties.value = nextValue
    },this.properties.delay)
  }
  this.setOutputData(0,this.properties.value)
};

export default Memory;
