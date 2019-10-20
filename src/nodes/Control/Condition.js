function MathCondition() {
      this.addInput("A", "");
      this.addInput("B", "");
      this.addOutput("true", "boolean");
      this.addOutput("false", "boolean");
      this.addProperty("A", 1);
      this.addProperty("B", 1);
      this.addProperty("OP", ">", "enum", { values: MathCondition.values });

      this.size = [80, 60];
  }

  MathCondition.values = [">", "<", "==", "!=", "<=", ">=", "||", "&&" ];
  MathCondition["@OP"] = {
      type: "enum",
      title: "operation",
      values: MathCondition.values
  };

  MathCondition.title = "Condition";

  MathCondition.prototype.getTitle = function() {
      return "A " + this.properties.OP + " B";
  };

  MathCondition.prototype.onExecute = function() {
      var A = this.getInputData(0);
      if (A === undefined) {
          A = this.properties.A;
      } else {
          this.properties.A = A;
      }

      var B = this.getInputData(1);
      if (B === undefined) {
          B = this.properties.B;
      } else {
          this.properties.B = B;
      }

      var result = true;
      switch (this.properties.OP) {
          case ">":
              result = A > B;
              break;
          case "<":
              result = A < B;
              break;
          case "==":
              result = A == B;
              break;
          case "!=":
              result = A != B;
              break;
          case "<=":
              result = A <= B;
              break;
          case ">=":
              result = A >= B;
              break;
          case "||":
              result = A || B;
              break;
          case "&&":
              result = A && B;
              break;
      }

      this.setOutputData(0, result);
      this.setOutputData(1, !result);
  };

export default MathCondition
