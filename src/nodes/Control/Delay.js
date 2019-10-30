function DelayEvent() {
  this.size = [120, 30];
  this.addProperty("time_in_ms", 1000);
  this.addInput("event", -1);
  this.addOutput("on_time", -1);

  this._pending = [];
}

DelayEvent.title = "Delay";

DelayEvent.prototype.onAction = function(action, param) {
  var time = this.properties.time_in_ms;
  if (time <= 0) {
    this.trigger(null, param);
  } else {
    this._pending.push([time, param]);
  }
};

DelayEvent.prototype.onExecute = function() {
  var dt = this.graph.elapsed_time * 1000; //in ms

  if (this.isInputConnected(1)) {
    this.properties.time_in_ms = this.getInputData(1);
  }

  for (var i = 0; i < this._pending.length; ++i) {
    var action = this._pending[i];
    action[0] -= dt;
    if (action[0] > 0) {
      continue;
    }

    //remove
    this._pending.splice(i, 1);
    --i;

    //trigger
    this.trigger(null, action[1]);
  }
};

DelayEvent.prototype.onGetInputs = function() {
  return [["event", -1], ["time_in_ms", "number"]];
};
export default DelayEvent;
