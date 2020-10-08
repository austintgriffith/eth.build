function UtilsToWei() {
  this.addInput("input", "number");
  this.addOutput("output", "number")
  this.properties = {decimals: 18}
  this.size[0] = 170
}

UtilsToWei.title = "To Wei";

UtilsToWei.prototype.onExecute = function() {
  let input = this.getInputData(0)
  if (this.inputs[0] && typeof input != "undefined") {
    this.setOutputData(0,input*10**18)
  }else{
    this.setOutputData(0,null)
  }
};

export default UtilsToWei
