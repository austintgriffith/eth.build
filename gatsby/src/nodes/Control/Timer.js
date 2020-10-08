function TimerEvent() {
  this.addProperty("interval", 3000);
  this.addProperty("event", "tick");
  this.addOutput("on_tick", -1);
  this.time = 0;
  this.last_interval = 3000;
  this.triggered = false;
  this.size[0] = 140
}

TimerEvent.title = "Timer";
TimerEvent.desc = "clock, repeat";

TimerEvent.prototype.onStart = function() {
  this.time = 0;
};

TimerEvent.prototype.getTitle = function() {
  return "Timer";
};

TimerEvent.on_color = "#AAA";
TimerEvent.off_color = "#222";

TimerEvent.prototype.onDrawBackground = function() {
  this.boxcolor = this.triggered
  ? TimerEvent.on_color
  : TimerEvent.off_color;
  this.triggered = false;
};

TimerEvent.prototype.onExecute = function() {
  var dt = this.graph.elapsed_time * 1000; //in ms

  var trigger = this.time == 0;

  this.time += dt;
  this.last_interval = Math.max(
    1,
    this.getInputOrProperty("interval") | 0
  );

  if (
    !trigger &&
    (this.time < this.last_interval || isNaN(this.last_interval))
  ) {
    if (this.inputs && this.inputs.length > 1 && this.inputs[1]) {
      this.setOutputData(1, false);
    }
    return;
  }

  this.triggered = true;
  this.time = this.time % this.last_interval;
  this.trigger("on_tick", this.properties.event);
  if (this.inputs && this.inputs.length > 1 && this.inputs[1]) {
    this.setOutputData(1, true);
  }
  this.outputs[0].label = this.last_interval.toString()+"ms"
};

TimerEvent.prototype.onGetInputs = function() {
  return [["interval", "number"]];
};

TimerEvent.prototype.onGetOutputs = function() {
  return [["tick", "boolean"]];
};

export default TimerEvent
