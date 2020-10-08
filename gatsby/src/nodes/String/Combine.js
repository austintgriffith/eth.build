
function Combine() {
  this.size = [110, 30];
  this.addInput("A", 0);
  this.addInput("B", 0);
  this.addInput("C", 0);
  this.addOutput("output", "string");
  this.value = 0;
}

Combine.title = "Combine";
Combine.desc = "join concat string";

Combine.prototype.onExecute = function() {
  if (this.inputs[0]) {
    this.a = this.getInputData(0);
  }
  if (this.inputs[1]) {
    this.b = this.getInputData(1);
  }
  if (this.inputs[2]) {
    this.c = this.getInputData(2);
  }
  this.value = ""
  this.value += this.a?this.a:""
  this.value += this.b?this.b:""
  this.value += this.c?this.c:""

  if(this.value){
    this.setOutputData(0,this.value)
  }

};

export default Combine
