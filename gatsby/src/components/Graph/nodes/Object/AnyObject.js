
function Combine() {
  this.size = [110, 30];
  this.addInput("A", 0);
  this.addInput("B", 0);
  this.addInput("C", 0);
  this.addOutput("output", "object,array");
  this.value = 0;
}

Combine.title = "Any";

Combine.prototype.onExecute = function() {

  this.value = this.getInputData(0) || this.getInputData(1) || this.getInputData(2)

  if(this.value){
    this.setOutputData(0,this.value)
  }

};

export default Combine
