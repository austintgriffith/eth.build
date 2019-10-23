function UtilsFromWei() {
  this.addInput("input", "number");
  this.addOutput("output", "number")
  this.properties = {decimals: 18}
  this.size[0] = 160
}

UtilsFromWei.title = "From Wei";

UtilsFromWei.prototype.onExecute = function() {
  if (this.inputs[0] && this.getInputData(0)) {
    this.setOutputData(0,this.getInputData(0)/10**18)
  }else{
    this.setOutputData(0,null)
  }
};

export default UtilsFromWei
