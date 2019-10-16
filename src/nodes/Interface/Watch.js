
function Watch() {
  this.size = [60, 30];
  this.addInput("value", 0, { label: "" });
  this.value = 0;
}

Watch.title = "Watch";

Watch.prototype.onExecute = function() {
  if (this.inputs[0]) {
    this.value = this.getInputData(0);
  }
};

Watch.prototype.getTitle = function() {
  if (this.flags.collapsed) {
    return this.inputs[0].label;
  }
  return this.title;
};

Watch.toString = function(o) {
  if (o == null) {
    return "null";
  } else if (o.constructor === Number) {
    return o.toFixed(3);
  } else if (o.constructor === Array) {
    var str = "[";
    for (var i = 0; i < o.length; ++i) {
      str += Watch.toString(o[i]) + (i + 1 != o.length ? "," : "");
    }
    str += "]";
    return str;
  } else {
    return String(o);
  }
};

Watch.prototype.onDrawBackground = function(ctx) {
  //show the current value
  this.inputs[0].label = Watch.toString(this.value);
};

export default Watch
