import React from 'react';
import ReactDOM from 'react-dom'
import Blockies from 'react-blockies';

import { Input, FilledInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function Text() {
  this.addInput("", 0, { label: "" });
  this.addOutput("", 0, { label: "" });
  this.properties =  {blockieSize: 50,placeholder:"enter text here",title:"Text",value:null}
  this.size = [300, 50];
}

Text.title = "Text";

Text.prototype.onConnectionsChange = function(args){
  console.log("onConnectionsChange",args)
}

Text.prototype.onExecute = function() {
  let input = this.getInputData(0)
  if (this.inputs[0] && typeof input != "undefined" && this.properties.value != input ) {
    this.properties.value = this.getInputData(0);
  }
  this.setOutputData(0,this.properties.value);
};

Text.prototype.getTitle = function() {
  if (this.flags.collapsed && this.properties.value) {
    return this.properties.value
  }
  return this.title;
};

Text.prototype.handle = function(e) {
    console.log("CHANGE",e)
    this.properties.value = e.target.value
    this.setOutputData(0,this.properties.value);
    console.log(this.properties.value)
    console.log("this.properties.value:",this.properties.value,this.id)
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
        <form className={"SOMECONTAINERCLASS"} noValidate autoComplete="off">
          <Input
            style={{width:"100%",height:40,color:"#FFFFFF",fontSize:this.properties.fontSize}}
            id="outlined-name"
            label="Name"
            placeholder={this.properties.placeholder}
            variant="filled"
            value={this.properties.value}
            onChange={Text.prototype.handle.bind(this)}
            margin="normal"
            variant="outlined"
          />
        </form>
      </div>
    )
  }


};




export default Text
