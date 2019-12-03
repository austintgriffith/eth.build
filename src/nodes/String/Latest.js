
function Combine() {
  this.size = [110, 30];
  this.addInput("A", 0);
  this.addInput("B", 0);
  this.addInput("C", 0);
  this.addOutput("output", "string");
  this.value = 0;
}

Combine.title = "Latest";

Combine.prototype.onExecute = function() {
  let in1 = this.getInputData(0)
  if( this.in1 != in1 ){
    this.in1 = in1
    this.value = in1
  }
  let in2 = this.getInputData(1)
  if( this.in2 != in2 ){
    this.in2 = in2
    this.value = in2
  }

  let in3 = this.getInputData(2)
  if( this.in3 != in3 ){
    this.in3 = in3
    this.value = in3
  }

  if(typeof this.value != "undefined"){
    this.setOutputData(0,this.value)
  }

};

export default Combine
