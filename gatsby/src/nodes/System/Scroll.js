import React from 'react';
import ReactDOM from 'react-dom'
import Blockies from 'react-blockies';

import { Input, FilledInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function Text() {
  this.addInput("x", "number");
  this.addInput("y",  "number");
  this.addInput("", -1);
}

Text.title = "Scroll";
/*
Text.prototype.onConnectionsChange = function(args){
  console.log("onConnectionsChange",args)
}

Text.prototype.onExecute = function() {
  let input = this.getInputData(0)
  if (this.inputs[0] && typeof input != "undefined" && this.properties.value != input ) {
    this.properties.value = input;
  }
  this.setOutputData(0,this.properties.value);
};

Text.prototype.getTitle = function() {
  if (this.flags.collapsed && this.properties.value) {
    return this.properties.value
  }
  return this.properties.title;
};
*/
Text.prototype.onAction = function(e,f,g) {

  //this.graph.canvas.ds.offset[0] = this.getInputData[0]
  //this.graph.canvas.ds.offset[1] = this.getInputData[1]
}

Text.prototype.onDrawBackground = function(ctx) {

  if (this.flags.collapsed) {
    /*this.render(
      <div>

      </div>
    )*/
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR
  }else{
    this.render(
      <div>
        Scroller
      </div>
    )
  }


};




export default Text
