function StringSearch() {
    this.addInput("string", "string");
    this.addInput("find", "string");
    this.addInput("start", "string");
    this.addOutput("index", "number");
    this.size = [140, 70];
  }
  
  StringSearch.title = "Search";
  StringSearch.description = "get index of a substring"
  
  StringSearch.prototype.onExecute = function() {
    if ((this.inputs[0] && this.getInputData(0) && typeof this.getInputData(0) == "string") &&
        (this.inputs[1] && this.getInputData(1) && typeof this.getInputData(1) == "string")) {

      if (this.inputs[2] && this.getInputData(2) && typeof this.getInputData(2) == "string") {
        this.value = this.getInputData(0).indexOf(this.getInputData(1), this.getInputData(2));
      } else {
        this.value = this.getInputData(0).indexOf(this.getInputData(1));
      }
      this.setOutputData(0,this.value)
      this.outputs[0].label = this.value
    } else {
      this.value = null
    }
  };
  
  StringSearch.prototype.getTitle = function() {
    if (this.flags.collapsed) {
      return "Search("+this.value+")";
    }
    return this.title;
  };
  
  export default StringSearch
  