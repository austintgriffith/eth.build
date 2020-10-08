function Selector() {
    this.addInput("sel", "number,boolean");
    this.addInput("A");
    this.addInput("B");
    this.addOutput("out");

    this.size[0] = 180

    this.selected = 0;
}

const NODE_SLOT_HEIGHT = 20

Selector.title = "Selector";
Selector.desc = "selects an output";

Selector.prototype.onDrawBackground = function(ctx) {
    if (this.flags.collapsed) {
        return;
    }
    ctx.fillStyle = "#AFB";
    var y = (this.selected + 1) * NODE_SLOT_HEIGHT + 6;
    ctx.beginPath();
    ctx.moveTo(50, y);
    ctx.lineTo(50, y + NODE_SLOT_HEIGHT);
    ctx.lineTo(34, y + NODE_SLOT_HEIGHT * 0.5);
    ctx.fill();

};

Selector.prototype.onAction = function() {
  this.selected=this.selected+1
  console.log("SETTING this.selected",this.selected)
  if(this.selected>this.inputs.length){
    this.selected = 0
  }
}

Selector.prototype.onExecute = function() {
    var sel = this.getInputData(0);
    //console.log(sel)
    if(sel && typeof sel != "number"){
        sel = 1
        //console.log("SET TO 1")
    }else if (sel == null || sel.constructor !== Number) {
        sel = 0;
    }
    this.selected = Math.round(sel) % (this.inputs.length - 1);
    try{
      var v = this.getInputData(this.selected+1);
      if (v !== undefined) {
          this.setOutputData(0, v);
      }
    }catch(e){
      console.log(e)
    }

};

Selector.prototype.onGetInputs = function() {
    return [["C", 0],["D", 0],["E", 0], ["F", 0], ["G", 0], ["H", 0]];
};

export default Selector
