
function DisplayDollars() {
    this.addInput("input", "number");
    this.properties =  {precision: 2}
}

DisplayDollars.title = "Dollars";
DisplayDollars.menu = "display/dollars";

DisplayDollars.prototype.onExecute = function() {
    if (this.inputs[0] && this.value != this.getInputData(0) && typeof this.getInputData(0) != "undefined" && this.getInputData(0) ) {
        this.value = "$"+parseInt(this.getInputData(0)).toFixed(this.properties.precision);
    }else{
        this.value = "$0.00"
    }
};

DisplayDollars.prototype.getTitle = function() {
    if (this.flags.collapsed) {
        return this.value;
    }
    return this.title;
};

DisplayDollars.prototype.onDrawBackground = function(ctx) {
    //show the current value
    this.inputs[0].label = this.value;
};

export default DisplayDollars
