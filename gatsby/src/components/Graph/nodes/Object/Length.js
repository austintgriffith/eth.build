function ObjectLength() {
  this.addInput("object", "");
  this.addOutput("length", "");
  this.addProperty("value", "");

  this.size = [190, 30];
  this.value = null;
}

ObjectLength.title = "length";


ObjectLength.prototype.getTitle = function() {
  if (this.flags.collapsed) {
    return this.value;
  }
  return this.title;
};

ObjectLength.prototype.onExecute = function() {
  var data = this.getInputData(0);
  //console.log("GETTING LENGTH OF ",data)
  if (typeof data != "undefined" && data != null && typeof data.length == "number") {
    //console.log("data.length",data.length)
    this.value = data.length
    if(!this.value) this.value=0
    //console.log("this.value",this.value)
  }else if(data){
    this.value = Object.keys(data).length
  }
  if(!this.value) this.value = 0
  if(typeof this.value != "undefined" && this.value != null ) {
    this.outputs[0].label = this.value
  }
  this.setOutputData(0, this.value );
};

export default ObjectLength
