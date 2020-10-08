function MathOperation() {
  this.addInput("A", "number");
  this.addInput("B", "number");
  this.addOutput("=", "number");
  this.addProperty("A", 1);
  this.addProperty("B", 1);
  this.addProperty("OP", "max", "enum", { values: MathOperation.values });
  this.size[0] = 120
}

MathOperation.values = ["+", "-", "*", "/", "%", "^", "max", "min"];

MathOperation.title = "Max";

MathOperation["@OP"] = {
  type: "enum",
  title: "operation",
  values: MathOperation.values
};
MathOperation.size = [100, 60];

MathOperation.prototype.getTitle = function() {
  if(this.properties.OP == "max" || this.properties.OP == "min")
  return this.properties.OP 
  return "A " + this.properties.OP + " B";
};

MathOperation.prototype.setValue = function(v) {
  if (typeof v == "string") {
    v = parseFloat(v);
  }
  this.properties["value"] = v;
};

MathOperation.prototype.onExecute = function() {
  var A = this.getInputData(0);
  var B = this.getInputData(1);
  if (A != null) {
    this.properties["A"] = A;
  } else {
    A = this.properties["A"];
  }

  if (B != null) {
    this.properties["B"] = B;
  } else {
    B = this.properties["B"];
  }

  var result = 0;
  switch (this.properties.OP) {
    case "+":
    result = A + B;
    break;
    case "-":
    result = A - B;
    break;
    case "x":
    case "X":
    case "*":
    result = A * B;
    break;
    case "/":
    result = A / B;
    break;
    case "%":
    result = A % B;
    break;
    case "^":
    result = Math.pow(A, B);
    break;
    case "max":
    result = Math.max(A, B);
    break;
    case "min":
    result = Math.min(A, B);
    break;
    default:
    console.warn("Unknown operation: " + this.properties.OP);
  }
  this.setOutputData(0, result);
};

MathOperation.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    return;
  }

  ctx.font = "40px Arial";
  ctx.fillStyle = "#666";
  ctx.textAlign = "center";
  ctx.fillText(
    this.properties.OP,
    this.size[0] * 0.5,
    (this.size[1] + this.graph.NODE_TITLE_HEIGHT) * 0.5
  );
  ctx.textAlign = "left";
};

export default MathOperation
