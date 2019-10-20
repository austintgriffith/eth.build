function Input() {
  this.addOutput("", "number");

  this.name_in_graph = "";
  this.properties = {
    name: "",
    type: "number",
    value: 0
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
  this.type_widget = this.addWidget(
    "text",
    "Type",
    this.properties.type,
    function(v) {
      that.setProperty("type",v);
    }
  );

  this.value_widget = this.addWidget(
    "number",
    "Value",
    this.properties.value,
    function(v) {
      that.setProperty("value",v);
    }
  );

  this.widgets_up = true;
  this.size = [180, 90];
}

Input.title = "Input";

Input.prototype.onConfigure = function()
{
  this.updateType();
}

Input.prototype.updateType = function()
{
  var type = this.properties.type;
  this.type_widget.value = type;
  if(type == "number")
  {
    this.value_widget.type = "number";
    this.value_widget.value = 0;
  }
  else if(type == "bool")
  {
    this.value_widget.type = "toggle";
    this.value_widget.value = true;
  }
  else if(type == "string")
  {
    this.value_widget.type = "text";
    this.value_widget.value = "";
  }
  else
  {
    this.value_widget.type = null;
    this.value_widget.value = null;
  }
  this.properties.value = this.value_widget.value;
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
        //already added
        this.graph.renameInput( this.name_in_graph, v );
      } else {
        this.graph.addInput( v, this.properties.type );
      }
    } //what if not?!
    this.name_widget.value = v;
    this.name_in_graph = v;
  }
  else if( name == "type" )
  {
    v = v || "";
    this.updateType(v);
  }
  else if( name == "value" )
  {
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
