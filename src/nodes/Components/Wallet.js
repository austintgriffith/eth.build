function Wallet() {
  this.addInput("[blockchain]", "string");
  this.addInput("private key", "string");
  this.addOutput("blockchain", "string");
  this.addOutput("address", "string");
  this.addOutput("balance", "string");
  this.addOutput("tx", "string");
  this.addOutput("send()", "function");
  this.addOutput("sign()", "function");

  this.properties = { enabled: true, title: "Wallet", color: "e91e63" };

  this.subgraph = new global.LiteGraphJS.LGraph();
  this.subgraph._subgraph_node = this;
  this.subgraph._is_subgraph = true;
}

Wallet.title = "Wallet";
Wallet.title_color = "#e91e63";

Wallet.prototype.onGetInputs = async function () {};

Wallet.prototype.getTitle = function () {
  return this.properties.title;
};

Wallet.prototype.onDrawTitle = function (ctx) {
  if (this.flags.collapsed) {
    return;
  }

  this.title_color = "#" + this.properties.color;
};

Wallet.prototype.onDblClick = function (e, pos, graphcanvas) {
  setTimeout(function () {
    graphcanvas.openSubgraph(this.subgraph);
  }, 10);
};

Wallet.prototype.onMouseDown = function (e, pos, graphcanvas) {
  if (
    !this.flags.collapsed &&
    pos[0] > this.size[0] - global.LiteGraphJS.LiteGraph.NODE_TITLE_HEIGHT &&
    pos[1] < 0
  ) {
    var that = this;
    setTimeout(function () {
      graphcanvas.openSubgraph(that.subgraph);
    }, 10);
  }
};

Wallet.prototype.onAction = function (action, param) {
  this.subgraph.onAction(action, param);
};

Wallet.prototype.onExecute = function () {
  this.enabled = this.getInputOrProperty("enabled");
  if (!this.enabled) {
    return;
  }

  //send inputs to subgraph global inputs
  if (this.inputs) {
    for (var i = 0; i < this.inputs.length; i++) {
      var input = this.inputs[i];
      var value = this.getInputData(i);
      this.subgraph.setInputData(input.name, value);
    }
  }

  //execute
  this.subgraph.runStep();

  //send subgraph global outputs to outputs
  if (this.outputs) {
    for (var i = 0; i < this.outputs.length; i++) {
      var output = this.outputs[i];
      var value = this.subgraph.getOutputData(output.name);
      this.setOutputData(i, value);
    }
  }
};

Wallet.prototype.sendEventToAllNodes = function (eventname, param, mode) {
  if (this.enabled) {
    this.subgraph.sendEventToAllNodes(eventname, param, mode);
  }
};

//**** INPUTS ***********************************
Wallet.prototype.onSubgraphTrigger = function (event, param) {
  var slot = this.findOutputSlot(event);
  if (slot != -1) {
    this.triggerSlot(slot);
  }
};

Wallet.prototype.onSubgraphNewInput = function (name, type) {
  var slot = this.findInputSlot(name);
  if (slot == -1) {
    this.addInput(name, 0);
  }
};

Wallet.prototype.onSubgraphRenamedInput = function (oldname, name) {
  var slot = this.findInputSlot(oldname);
  if (slot == -1) {
    return;
  }
  var info = this.getInputInfo(slot);
  info.name = name;
};

Wallet.prototype.onSubgraphTypeChangeInput = function (name, type) {
  var slot = this.findInputSlot(name);
  if (slot == -1) {
    return;
  }
  var info = this.getInputInfo(slot);
  info.type = type;
};

Wallet.prototype.onSubgraphRemovedInput = function (name) {
  var slot = this.findInputSlot(name);
  if (slot == -1) {
    return;
  }
  this.removeInput(slot);
};

//**** OUTPUTS ***********************************
Wallet.prototype.onSubgraphNewOutput = function (name, type) {
  var slot = this.findOutputSlot(name);
  if (slot == -1) {
    this.addOutput(name, type);
  }
};

Wallet.prototype.onSubgraphRenamedOutput = function (oldname, name) {
  var slot = this.findOutputSlot(oldname);
  if (slot == -1) {
    return;
  }
  var info = this.getOutputInfo(slot);
  info.name = name;
};

Wallet.prototype.onSubgraphTypeChangeOutput = function (name, type) {
  var slot = this.findOutputSlot(name);
  if (slot == -1) {
    return;
  }
  var info = this.getOutputInfo(slot);
  info.type = type;
};

Wallet.prototype.onSubgraphRemovedOutput = function (name) {
  var slot = this.findInputSlot(name);
  if (slot == -1) {
    return;
  }
  this.removeOutput(slot);
};
// *****************************************************

Wallet.prototype.getExtraMenuOptions = function (graphcanvas) {
  var that = this;
  return [
    {
      content: "Open",
      callback: function () {
        graphcanvas.openSubgraph(that.subgraph);
      },
    },
  ];
};

Wallet.prototype.onResize = function (size) {
  size[1] += 20;
};

Wallet.prototype.serialize = function () {
  var data = global.LiteGraphJS.LGraphNode.prototype.serialize.call(this);
  data.subgraph = this.subgraph.serialize();
  return data;
};

Wallet.prototype.clone = function () {
  var node = global.LiteGraphJS.LiteGraph.createNode(this.type);
  var data = this.serialize();
  delete data["id"];
  delete data["inputs"];
  delete data["outputs"];
  node.configure(data);
  return node;
};

export default Wallet;
