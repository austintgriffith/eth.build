var codec = require('json-url')('lzw');

function Compress() {
  this.size = [110, 30];
  this.addInput("", "string");
  this.addOutput("", "string");
  this.value = 0;
  this.cached = false
}

Compress.title = "Compress";

Compress.prototype.onExecute = async function() {

  //this.setOutputData(0,this.value)
  let input = this.getInputData(0)
  if(input!=this.cached){
    this.cached = input
    try{
      this.value = await codec.compress(this.cached)
    }catch(e){console.log(e)}
  }

  this.setOutputData(0,this.value)
};

export default Compress
