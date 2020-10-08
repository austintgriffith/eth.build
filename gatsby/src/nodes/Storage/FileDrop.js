const axios = require('axios');

function FileRead() {
  this.addOutput("output", "string");
  this.size = [194,36]
}

FileRead.title = "File Drop";

FileRead.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    return;
  }
  ctx.fillStyle = "white";
  if(this.name){
    ctx.fillText(this.name+" ("+this.length+")", 10, 20);
  }else{
    ctx.fillText("(Drag and drop file)", 10, 20);
  }

};

FileRead.prototype.onExecute = function() {
  if(this.contents && this.outputs[0]!=this.contents){
    this.setOutputData(0, this.contents);
  }
};

FileRead.prototype.onDropFile = function(file) {
  //console.log("dropped file",file)
  this.file = file
  var that = this;

  var reader = new FileReader();
  reader.onload = (event) => {
    this.contents = event.target.result
    this.length = event.target.result.length
    this.setOutputData(0, this.contents);
  }
  this.properties.file = JSON.stringify(file)
  //console.log("file:",file)
  this.name = file.name
  reader.readAsText(file)
};

export default FileRead
