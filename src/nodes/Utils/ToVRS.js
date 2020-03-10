
function ToVRS() {
  this.addInput("sig", "string");
  this.addOutput("v", "string")
  this.addOutput("r", "string")
  this.addOutput("s", "string")
  this.properties = {}
  this.size[0] = 160
}

ToVRS.title = "To VRS";

ToVRS.prototype.onExecute = function() {
  let sig = this.getInputData(0)
  if (sig && this.sig != sig) {
    this.sig = sig

    this.r = sig.substr(0,66) ;
    this.s = "0x" + sig.substr(66,64) ;
    this.v = 28 ;
  }

  this.setOutputData(0,this.v)
  this.setOutputData(1,this.r)
  this.setOutputData(2,this.s)
};

export default ToVRS
