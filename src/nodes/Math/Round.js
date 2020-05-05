function Round() {
        this.addInput("A", "number");
        this.addOutput("value", "number");
        this.size = [150, 30];
    }

    Round.title = "Round";
    Round.desc = "Round to next int";

    Round.prototype.onExecute = function() {
	var A = this.getInputData(0)
        if (A != null) {
          this.properties["A"] = A;
        } else {
          A = this.properties["A"];
        }
        this._result = Math.round(A);
	this.setOutputData(0, this._result);
    }

    Round.prototype.onDrawBackground = function(ctx) {
        //show the current value
        this.outputs[0].label =  Math.floor(this._result || 0);
    };

    Round.prototype.onGetInputs = function() {
        return ["A", "number"];
    };

export default Round
