let base64url = require('base64url')

function Base64Decode() {
  this.addInput("string", "string");
  this.addOutput("output", "string");
  this.properties =  {}
  this.value = 0;
  this.size[0] = 240
  this.decodedValue = -1
}

Base64Decode.title = "Base64 Decode";

Base64Decode.prototype.onExecute = function() {
  if (this.inputs[0]) {
    this.value = this.getInputData(0);
  }
  if(this.value && this.value != this.decodedValue){
    this.decodedValue = this.value
    this.bytes = base64url.toBuffer(this.value)
    this.decoded = Buffer.from(this.bytes).toString('hex');
  }
  this.setOutputData(0,"0x"+this.decoded)

};

export default Base64Decode
