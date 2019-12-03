  function ControlForEach() {
      this.addInput("array", "array");
      this.addInput("reset", -1); //-1 is LiteGraph.ACTION
      this.addOutput("output", "string")
      this.addOutput("index", "number")
      this.addOutput("total", "number")
      this.addOutput("change", -1);// -1 is LiteGraph.EVENT
      this.addOutput("done", -1);// -1 is LiteGraph.EVENT
      this.index = 0
      this.data = null
      this.working = true
      this.size[0] = 180
  }

  ControlForEach.title = "For Each";

  ControlForEach.prototype.onExecute = function() {
    //console.log("FOREACH EXEC",this)
    if(this.inputs[0] && this.getInputData(0) && typeof this.getInputData(0) == "object"){
      if(!this.data){
        this.data = this.getInputData(0)
      }else if(JSON.stringify(this.data)!=JSON.stringify(this.getInputData(0))){
        //console.log("RESET DATA")
        this.data = this.getInputData(0)
        this.working = true
        this.index = 0
      }
    }
    if(this.data && this.working){
      //console.log("LEN",this.data.length,"INDEX",this.index)
      if(this.data.length>this.index){
        //console.log("setting output data",this.index)
        this.setOutputData(0,this.data[this.index])
        this.setOutputData(1,this.index)
        this.setOutputData(2,this.data.length)
        this.trigger("change", this.data[this.index]);
        this.index = this.index+1
        //console.log("INDEX",this.index)
      }else{
        this.working = false
        this.setOutputData(1,this.data.length)
        this.trigger("done", true);
      }
    }
  };

  ControlForEach.prototype.onAction = function(event, action) {
    console.log("ACTION",event,action)
    if(event=="reset"){
      this.data = this.getInputData(0)
      this.working = true
      this.index = 0
    }
  }

  /*
  ControlForEach.prototype.getTitle = function() {
      if (this.flags.collapsed) {
          return this.inputs[0].label;
      }
      return this.title;
  };

  ControlForEach.prototype.onDrawBackground = function(ctx) {
      //show the current value
      if(this.value) this.outputs[0].label = this.value.length+" items";
  };*/

  export default ControlForEach
