function BasicVariable() {
  this.size = [60, 30];
  this.addInput("in");
  this.addOutput("out");
  this.properties = { varname: "var", global: true };
  this.value = null;
}

BasicVariable.title = "Variable";

BasicVariable.prototype.onExecute = function() {
  if(typeof this.getInputData(0) != "undefined"){
    this.value = this.getInputData(0);
    if(this.graph)
    this.graph.vars[ this.properties.varname ] = this.value;
    if(this.properties.global)
    global[this.properties.varname] = this.value;
    this.setOutputData(0, this.value );
  }else{
    if(this.graph)
      this.value =  this.graph.vars[ this.properties.varname ]
    if(this.properties.global)
      this.value = global[this.properties.varname]
    this.setOutputData(0, this.value )
  }
};

BasicVariable.prototype.getTitle = function() {
  return this.properties.varname;
};

export default BasicVariable
