function Output() {
  this.addInput("", "");

  this.name_in_graph = "";
  this.properties = {};
  var that = this;

  Object.defineProperty(this.properties, "name", {
    get: function() {
      return that.name_in_graph;
    },
    set: function(v) {
      if (v == "" || v == that.name_in_graph) {
        return;
      }
      if (that.name_in_graph) {
        //already added
        that.graph.renameOutput(that.name_in_graph, v);
      } else {
        if(that.graph) that.graph.addOutput(v, 0);//
      }
      that.name_widget.value = v;
      that.name_in_graph = v;
    },
    enumerable: true
  });

  this.name_widget = this.addWidget(
    "text",
    "Name",
    this.properties.name,
    function(v) {
      if (!v) {
        return;
      }
      that.properties.name = v;
    }
  );


  this.widgets_up = true;
  this.size = [180, 40];
}

Output.title = "Output";
Output.desc = "Output of the graph";

Output.prototype.onExecute = function() {
  this._value = this.getInputData(0);
  this.graph.setOutputData(this.properties.name, this._value);
};

Output.prototype.onAction = function(action, param) {
  if (this.properties.type == global.LiteGraphJS.ACTION) {
    this.graph.trigger(this.properties.name, param);
  }
};

Output.prototype.onRemoved = function() {
  if (this.name_in_graph) {
    this.graph.removeOutput(this.name_in_graph);
  }
};

Output.prototype.getTitle = function() {
  if (this.flags.collapsed) {
    return this.properties.name;
  }
  return this.title;
};

global.LiteGraphJS.GraphOutput = Output;

export default Output
