function AND() {
  this.addInput("",0)
  this.addInput("",0)
  this.addOutput("", "");
  this.size = [110,50];
}

AND.title = "AND";

AND.prototype.onExecute = function() {
  this.setOutputData(0, (this.getInputData(0)&&this.getInputData(1)));
};


export default AND
