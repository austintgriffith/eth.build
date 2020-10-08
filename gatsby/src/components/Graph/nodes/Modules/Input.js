function Input() {
  this.addOutput("",0);

  this.name_in_graph = "";
  this.properties = {
    name: "",
  };

  var that = this;

  this.name_widget = this.addWidget(
    "text",
    "Name",
    this.properties.name,
    function(v) {
      if (!v) {
        return;
      }
      that.setProperty("name",v);
    }
  );

  this.widgets_up = true;
  this.size = [180, 60];
}

Input.title = "Input";

Input.prototype.onConfigure = function()
{
  this.updateType();
}

Input.prototype.updateType = function()
{
  this.updateOutputs(0,this.properties.name, this.properties.type)
}

Input.prototype.updateOutputs = function(index,name,type){
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
}



Input.prototype.onPropertyChanged = function(name,v)
{
  if( name == "name" )
  {
    if (v == "" || v == this.name_in_graph || v == "enabled") {
      return false;
    }
    if(this.graph)
    {
      if (this.name_in_graph) {
        console.log("~~~~INPUT ALREDY", v )
        //already added
        this.graph.renameInput( this.name_in_graph, v );
      } else {
        console.log("~~~~ADD INPUT",this.properties.type )
        this.graph.addInput( v, this.properties.type );
      }
    } //what if not?!
    this.name_widget.value = v;
    this.name_in_graph = v;
    this.updateType();
  }
  else if( name == "type" )
  {
    v = v || "";
    this.properties.type = v
    this.updateType();
  }
  else if( name == "value" )
  {
    this.properties.value = v
  }
}

Input.prototype.getTitle = function() {
  if (this.flags.collapsed) {
    return this.properties.name;
  }
  return this.title;
};

Input.prototype.onAction = function(action, param) {
  if (this.properties.type == global.LiteGraphJS.EVENT) {
    this.triggerSlot(0, param);
  }
};

Input.prototype.onExecute = function() {
  //console.log(this)
  var name = this.properties.name;
  //read from global input
  var data = this.graph.inputs[name];
  if (!data) {
    this.setOutputData(0, this.properties.value );
  }else{
    this.setOutputData(0, data.value === undefined ? this.properties.value : data.value);
  }
};

Input.prototype.onRemoved = function() {
  if (this.name_in_graph) {
    this.graph.removeInput(this.name_in_graph);
  }
};

global.LiteGraphJS.GraphInput = Input;

export default Input
