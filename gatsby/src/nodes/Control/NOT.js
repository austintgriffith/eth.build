function NOT() {
  this.addInput("",0)
  this.addOutput("", "");
  this.size = [100,50];
}

NOT.title = "NOT";

NOT.prototype.onExecute = function() {
  this.setOutputData(0, (!this.getInputData(0)));
};


export default NOT
