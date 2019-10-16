function WidgetCustomProgress() {
    this.size = [160, 26];
    this.addInput("value", "number");
    this.addInput("min", "number");
    this.addInput("max", "number");
    this.properties = { min: 0, max: 1, value: 0, color: "#AAF" };
}

WidgetCustomProgress.title = "Custom Progress";
WidgetCustomProgress.menu = "widget/customprogress";

WidgetCustomProgress.prototype.onExecute = function() {
    var v = this.getInputData(0);
    if (v != undefined) {
        this.properties["value"] = v;
    }
    var min = this.getInputData(1);
    if (min != undefined) {
        this.properties["min"] = min;
    }
    var max = this.getInputData(2);
    if (max != undefined) {
        this.properties["max"] = max;
    }
};

WidgetCustomProgress.prototype.onDrawForeground = function(ctx) {
    //border
    ctx.lineWidth = 1;
    ctx.fillStyle = this.properties.color;
    var v =
        (this.properties.value - this.properties.min) /
        (this.properties.max - this.properties.min);
    v = Math.min(1, v);
    v = Math.max(0, v);
    ctx.fillRect(2, 2, (this.size[0] - 4) * v, this.size[1] - 4);
};

export default WidgetCustomProgress;
