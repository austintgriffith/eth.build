const axios = require('axios');

function NetworkRequest() {
  this.addInput("[url]","string")
  this.addInput("request",-1)//action
  this.addOutput("output", "string");
  this.properties = { url: "", debounce: 1000};
  this.size[0] = 180
}

NetworkRequest.title = "Request";

NetworkRequest.prototype.onAdded = function() {
  this.doRequest();
};

NetworkRequest.prototype.onAction = function(action, param) {
  this.doRequest();
};

NetworkRequest.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    return;
  }
  if(this.value){
    this.outputs[0].label = this.value.length
  }
};

NetworkRequest.prototype.onExecute = function() {
  let optionalUrl = this.getInputData(0)
  if(optionalUrl && optionalUrl!=this.properties.url){
    this.onPropertyChanged("url",optionalUrl)
  }
  this.setOutputData(0,this.value)
  this.outputs[0].type = typeof this.value
};

NetworkRequest.prototype.onPropertyChanged = function(name, value) {
  this.properties[name] = value;
  if (name == "url" && value != "") {
    this.doRequest();
  }
  return true;
};

NetworkRequest.prototype.doRequest = async function() {
  if (this.properties.url == "") {
    this.value = null;
    return;
  }
  if(this.lastRequestTime){
    //skip making the request if multiple calls come in within the debounce period
    let lastTimeAgo = Date.now()-this.lastRequestTime
    if(lastTimeAgo < this.properties.debounce){
      return
    }
  }
  this.lastRequestTime = Date.now()
  try{
    let result = await axios.get(this.properties.url)
    if(result && result.data){
      this.value = result.data
    }
  }catch(e){}
};

export default NetworkRequest
