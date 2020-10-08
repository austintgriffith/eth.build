const defaultColor = "7e57c2"

function Module() {
  var that = this;
  this.size = [200, 80];
  this.properties = { enabled: true, title: "Module", color: defaultColor };
  this.enabled = true;

  //create inner graph
  this.subgraph = new global.LiteGraphJS.LGraph();
  this.subgraph._subgraph_node = this;
  this.subgraph._is_subgraph = true;

  this.subgraph.onTrigger = this.onSubgraphTrigger.bind(this);

  this.subgraph.onInputAdded = this.onSubgraphNewInput.bind(this);
  this.subgraph.onInputRenamed = this.onSubgraphRenamedInput.bind(this);
  this.subgraph.onInputTypeChanged = this.onSubgraphTypeChangeInput.bind(this);
  this.subgraph.onInputRemoved = this.onSubgraphRemovedInput.bind(this);

  this.subgraph.onOutputAdded = this.onSubgraphNewOutput.bind(this);
  this.subgraph.onOutputRenamed = this.onSubgraphRenamedOutput.bind(this);
  this.subgraph.onOutputTypeChanged = this.onSubgraphTypeChangeOutput.bind(this);
  this.subgraph.onOutputRemoved = this.onSubgraphRemovedOutput.bind(this);

}

Module.title = "Module";

Module.title_color = "#"+(defaultColor);

Module.prototype.onGetInputs = function() {
  return [["enabled", "boolean"]];
};

Module.prototype.getTitle = function() {
  return this.properties.title
}

Module.prototype.onDrawTitle = function(ctx) {

  if (this.flags.collapsed) {
    return;
  }

  this.title_color = "#"+(this.properties.color)
/*
  ctx.fillStyle = "#555";
  var w = global.LiteGraphJS.LiteGraph.NODE_TITLE_HEIGHT;
  var x = this.size[0] - w;
  ctx.fillRect(x, -w, w+1, w);
  ctx.fillStyle = "#333";
  ctx.beginPath();
  ctx.moveTo(x + w * 0.2, -w * 0.6);
  ctx.lineTo(x + w * 0.8, -w * 0.6);
  ctx.lineTo(x + w * 0.5, -w * 0.3);
  ctx.fill();*/
};

Module.prototype.onDblClick = function(e, pos, graphcanvas) {
  console.log("MODULE DBLCLICK")
  var that = this;
  setTimeout(function() {
    graphcanvas.openSubgraph(that.subgraph);
  }, 10);
};

Module.prototype.onMouseDown = function(e, pos, graphcanvas) {
  if (
    !this.flags.collapsed &&
    pos[0] > this.size[0] - global.LiteGraphJS.LiteGraph.NODE_TITLE_HEIGHT &&
    pos[1] < 0
  ) {
    var that = this;
    setTimeout(function() {
      graphcanvas.openSubgraph(that.subgraph);
    }, 10);
  }
};

Module.prototype.onAction = function(action, param) {
  this.subgraph.onAction(action, param);
};

Module.prototype.onExecute = function() {
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

Module.prototype.sendEventToAllNodes = function(eventname, param, mode) {
  if (this.enabled) {
    this.subgraph.sendEventToAllNodes(eventname, param, mode);
  }
};

//**** INPUTS ***********************************
Module.prototype.onSubgraphTrigger = function(event, param) {
  var slot = this.findOutputSlot(event);
  if (slot != -1) {
    this.triggerSlot(slot);
  }
};

Module.prototype.onSubgraphNewInput = function(name, type) {
  var slot = this.findInputSlot(name);
  if (slot == -1) {
    //add input to the node
    console.log("onSubgraphNewInput",name,type)
    this.addInput(name, 0);
  }
};
/*
Module.prototype.updateInputs = function(index,name,type){
  console.log("UPDATE ",index,name,type)
  if(this.outputs[index]){
    console.log("updating an existing output...",this.outputs[index])
    let newOutputs = []
    let oldLinks = []
    for(let o = 0; o < this.outputs.length; o++){
      //newOutputs[o] = this.outputs[o]
      if(o==index){
        //newOutputs[o].name=name
        //newOutputs[o].type=type
        newOutputs.push([name,type,null])
      }else{
        newOutputs.push([this.outputs[o].name,this.outputs[o].type,null])
      }
      let currentLinks = this.outputs[o].links
      let linksArray = []
      for(let l in currentLinks){
        let link_info = this.graph.links[currentLinks[l]];
        linksArray.push(link_info)
      }
      oldLinks[o] = linksArray
    }

    console.log("NEW OUTPUTS",newOutputs)
    console.log("OLD LINKS", oldLinks)

    for(let o = 0; o < this.outputs.length; o++){
      this.removeOutput(0)
    }


    this.addOutputs(newOutputs)

    for(let o = 0; o < newOutputs.length; o++){
      console.log("REWIRE ",oldLinks[o])

      if(oldLinks[o]){
        for(let l in oldLinks[o]){
          let link_info = oldLinks[o][l]
          let target_node = this.graph.getNodeById(link_info.target_id)
          //console.log("CONNECT",link_info)
          this.connect(o,target_node,link_info.target_slot)
        }
      }

    }

    console.log("FINAL",this.outputs)
    //this.onDrawBackground()
  }
}*/

Module.prototype.onSubgraphRenamedInput = function(oldname, name) {
  var slot = this.findInputSlot(oldname);
  if (slot == -1) {
    return;
  }
  var info = this.getInputInfo(slot);
  info.name = name;
};

Module.prototype.onSubgraphTypeChangeInput = function(name, type) {
  console.log("onSubgraphTypeChangeInput",name, type)
  var slot = this.findInputSlot(name);
  if (slot == -1) {
    return;
  }
  var info = this.getInputInfo(slot);
  info.type = type;
};

Module.prototype.onSubgraphRemovedInput = function(name) {
  var slot = this.findInputSlot(name);
  if (slot == -1) {
    return;
  }
  this.removeInput(slot);
};

//**** OUTPUTS ***********************************
Module.prototype.onSubgraphNewOutput = function(name, type) {
  var slot = this.findOutputSlot(name);
  if (slot == -1) {
    this.addOutput(name, type);
  }
};

Module.prototype.onSubgraphRenamedOutput = function(oldname, name) {
  var slot = this.findOutputSlot(oldname);
  if (slot == -1) {
    return;
  }
  var info = this.getOutputInfo(slot);
  info.name = name;
};

Module.prototype.onSubgraphTypeChangeOutput = function(name, type) {
  var slot = this.findOutputSlot(name);
  if (slot == -1) {
    return;
  }
  var info = this.getOutputInfo(slot);
  info.type = type;
};

Module.prototype.onSubgraphRemovedOutput = function(name) {
  var slot = this.findInputSlot(name);
  if (slot == -1) {
    return;
  }
  this.removeOutput(slot);
};
// *****************************************************

Module.prototype.getExtraMenuOptions = function(graphcanvas) {
  var that = this;
  return [
    {
      content: "Open",
      callback: function() {
        graphcanvas.openSubgraph(that.subgraph);
      }
    }
  ];
};

Module.prototype.onResize = function(size) {
  size[1] += 20;
};

Module.prototype.serialize = function() {
  var data = global.LiteGraphJS.LGraphNode.prototype.serialize.call(this);
  //console.log("SERIALIZED",data)
  data.subgraph = this.subgraph.serialize();
  return data;
};
//no need to define node.configure, the default method detects node.subgraph and passes the object to node.subgraph.configure()

Module.prototype.clone = function() {
  var node = global.LiteGraphJS.LiteGraph.createNode(this.type);
  var data = this.serialize();
  delete data["id"];
  delete data["inputs"];
  delete data["outputs"];
  node.configure(data);
  return node;
};

export default Module
