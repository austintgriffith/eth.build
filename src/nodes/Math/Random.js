function Random() {
        this.addOutput("value", "number");
        this.addProperty("min", 0);
        this.addProperty("max", 100000000000000000);
        this.size = [145, 30];
    }

    Random.title = "Random";
    Random.desc = "Random";

    Random.prototype.onExecute = function() {
        if (this.inputs) {
            for (var i = 0; i < this.inputs.length; i++) {
                var input = this.inputs[i];
                var v = this.getInputData(i);
                if (v === undefined) {
                    continue;
                }
                this.properties[input.name] = v;
            }
        }

        var min = this.properties.min;
        var max = this.properties.max;
        this._last_v = Math.random() * (max - min) + min;
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
