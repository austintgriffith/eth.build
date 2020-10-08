function DelayEvent() {
  this.size = [120, 30];
  this.addProperty("time_in_ms", 1000);
  this.addInput("", -1);
  this.addOutput("", -1);
  this.timeout = false
}

DelayEvent.title = "Buffer";

DelayEvent.prototype.onAction = function(action, param) {
  if(this.timeout) clearTimeout(this.timeout)
  this.timeout = setTimeout(()=>{
    this.trigger()
  },this.properties.time_in_ms)
};

export default DelayEvent;
