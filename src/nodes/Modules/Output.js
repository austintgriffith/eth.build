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
        that.graph.addOutput(v, that.properties.type);
      }
      that.name_widget.value = v;
      that.name_in_graph = v;
    },
    enumerable: true
  });

  Object.defineProperty(this.properties, "type", {
    get: function() {
      return that.inputs[0].type;
    },
    set: function(v) {
      if (v == "action" || v == "event") {
        v = global.LiteGraphJS.ACTION;
      }
      that.inputs[0].type = v;
      if (that.name_in_graph) {
        //already added
        that.graph.changeOutputType(
          that.name_in_graph,
          that.inputs[0].type
        );
      }
      that.type_widget.value = v || "";
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
  this.type_widget = this.addWidget(
    "text",
    "Type",
    this.properties.type,
    function(v) {
      v = v || "";
      that.properties.type = v;
    }
  );

  this.widgets_up = true;
  this.size = [180, 60];
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
