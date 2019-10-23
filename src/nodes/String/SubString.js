
function SubString() {
  this.addInput("string", 0);
  this.addInput("start", "number");
  this.addInput("length", "number");
  this.addOutput("output", "string");
  this.properties =  {start:null,length:null}
  this.value = 0;
  this.size[0] = 190
}

SubString.title = "SubString";

SubString.prototype.onExecute = function() {
  if (this.inputs[0]) {
    this.value = this.getInputData(0);
  }
  if (this.inputs[1]) {
    this.properties.start = this.getInputData(1);
  }
  if (this.inputs[2]) {
    this.properties.length = this.getInputData(2);
  }
  if(this.value){
    if(this.properties.start != null){
      if(this.properties.length != null){
        this.setOutputData(0,this.value.substr(this.properties.start,this.properties.length))
      }else{
        this.setOutputData(0,this.value.substr(this.properties.start))
      }
    }else{
      this.setOutputData(0,this.value)
    }
  }

};

export default SubString
