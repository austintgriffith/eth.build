function ObjectProperty() {
  this.addOutput("obj", "");
  this.addOutput("", -1);
  this.addInput("json", "string");

  this.size[0] = 140
  this.value = ""
  this.data = ""
  this.cached = ""
}

ObjectProperty.title = "Parse";


ObjectProperty.prototype.onExecute = function() {
  var data = this.getInputData(0);
  console.log("DATA AT THIS POINT ",data,typeof data)
  if (data != null) {
    try{
      console.log("COMPARING",data,this.data)
       if(data != this.cached){
         this.cached = data
         let parsed = JSON.parse(data);
         this.data = parsed
         this.setOutputData(0, this.data);
         this.trigger("")
         console.log("this.data",this.data)
       }
    }catch(e){
      console.log(e)
    }
    this.setOutputData(0, this.value);
  }
}

export default ObjectProperty
