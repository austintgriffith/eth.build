import React from 'react';
import ReactDOM from 'react-dom'

function Color() {
  this.addInput("", 0, { label: "" });
  this.addOutput("", 0, { label: "" });
  this.properties =  {title:"Color", value:null}
  this.size = [140, 50];
}

Color.title = "Color";

Color.prototype.onExecute = function() {
  let input = this.getInputData(0)
  if (this.inputs[0] && typeof input != "undefined" && this.properties.value != input ) {
    this.properties.value = this.getInputData(0);
  }
};

Color.prototype.getTitle = function() {
  if (this.flags.collapsed && this.properties.value) {
    return "#"+this.properties.value
  }
  return this.title;
};


Color.prototype.onDrawBackground = function(ctx) {
  if(this.properties.value){
    ctx.beginPath();
    ctx.arc(55, 25, 36, 0, 2 * Math.PI);
    ctx.fillStyle = "#"+this.properties.value.replace("#","");
    ctx.fill();
  }
};




export default Color
