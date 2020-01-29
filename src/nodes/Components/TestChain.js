import React from 'react';
import ReactDOM from 'react-dom'
import Blockies from 'react-blockies';

import { Input, FilledInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function Text() {
  this.addOutput("", "string");
  this.properties =  {blockieSize: 50,placeholder:"enter text here",title:"Test Chain",value:"https://rpc.eth.build:46234"}
  this.size = [300, 50];
}

Text.title = "Test Chain";

Text.prototype.onConnectionsChange = function(args){
  console.log("onConnectionsChange",args)
}

Text.prototype.onExecute = function() {
  this.setOutputData(0,this.properties.value);
};

Text.prototype.getTitle = function() {
  if (this.flags.collapsed && this.properties.value) {
    return this.properties.value
  }
  return this.properties.title;
};

Text.prototype.handle = function(e) {
    this.properties.value = e.target.value
    this.setOutputData(0,this.properties.value);
    this.onDrawBackground()
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
            id={"react-input-"+this.id}
            label="Name"
            placeholder={this.properties.placeholder}
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
