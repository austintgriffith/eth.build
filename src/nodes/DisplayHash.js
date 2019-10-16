  function DisplayHash() {
      this.addInput("", 0, { label: "" });
      this.value = "";
      this.size = [475, 26];
  }

  DisplayHash.title = "Display Hash";
  DisplayHash.menu = "display/hash";

  DisplayHash.prototype.onExecute = function() {
      if (this.inputs[0]) {
          this.value = this.getInputData(0);
      }
  };

  DisplayHash.prototype.getTitle = function() {
      if (this.flags.collapsed) {
          return this.inputs[0].label;
      }
      return this.title;
  };

  DisplayHash.prototype.onDrawBackground = function(ctx) {
      //show the current value
      this.inputs[0].label = this.value;
  };

  export default DisplayHash
