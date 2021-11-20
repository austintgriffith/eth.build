function StringReplace() {
    this.addInput("string", "string");
    this.addInput("pattern", "string");
    this.addInput("replacement", "string");
    this.addOutput("output", "strings")
    this.size = [140, 70];
  }
  
  StringReplace.title = "Replace";
  StringReplace.description = "replace a pattern or substring"
  
  StringReplace.prototype.onExecute = function() {
    if ((this.inputs[0] && this.getInputData(0) && typeof this.getInputData(0) == "string") &&
        (this.inputs[1] && this.getInputData(1) && typeof this.getInputData(1) == "string") &&
        (this.inputs[2] && this.getInputData(2) && typeof this.getInputData(2) == "string")) {

        this.value = this.getInputData(0).replace(this.getInputData(1), this.getInputData(2));
        this.setOutputData(0,this.value)
    } else {
        this.value = null
    }
  };
  
  StringReplace.prototype.getTitle = function() {
    if (this.flags.collapsed) {
      return "Replace("+this.value+")";
    }
    return this.title;
  };
  
  export default StringReplace
  