function Random() {
        this.addInput("", -1);
        this.addOutput("value", "number");
        this.addProperty("automatic", true);
        this.addProperty("min", 0);
        this.addProperty("max", 1000000000000000000);
        this.size = [200, 30];
    }

    Random.title = "Random";
    Random.desc = "Random";

    Random.prototype.onAction = function() {
        this.properties.automatic = false
        var min = this.properties.min;
        var max = this.properties.max;
        this._last_v = Math.random() * (max - min) + min;
    }

    Random.prototype.onExecute = function() {
        if(this.properties.automatic){
            var min = this.properties.min;
            var max = this.properties.max;
            this._last_v = Math.random() * (max - min) + min;
        }
        this.setOutputData(0, this._last_v);
    };

    Random.prototype.onDrawBackground = function(ctx) {
        //show the current value
        this.outputs[0].label =  Math.floor(this._last_v || 0);
    };

    Random.prototype.onGetInputs = function() {
        return [["min", "number"], ["max", "number"]];
    };

export default Random
