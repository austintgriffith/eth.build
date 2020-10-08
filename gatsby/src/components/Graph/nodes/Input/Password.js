import React from 'react';
import ReactDOM from 'react-dom'
import Blockies from 'react-blockies';

import { Input, FilledInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function Password() {
  this.addInput("", 0);
  this.addOutput("", "string");
  this.properties =  {blockieSize: 50,placeholder:"password",title:"Password"}
  this.size = [300, 50];
}

Password.title = "Password";

Password.prototype.onConnectionsChange = function(args){
  console.log("onConnectionsChange",args)
}

Password.prototype.onExecute = function() {
  let input = this.getInputData(0)
  if (this.inputs[0] && typeof input != "undefined" && this.value != input ) {
    this.value = this.getInputData(0);
  }
  this.setOutputData(0,this.value);
};

Password.prototype.getTitle = function() {
  return this.title;
};

Password.prototype.handle = function(e) {
    this.value = e.target.value
    this.setOutputData(0,this.value);
    this.onDrawBackground()
}

Password.prototype.onDrawBackground = function(ctx) {

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
            autoFocus
            style={{width:"100%",height:40,color:"#FFFFFF",fontSize:this.properties.fontSize}}
            id="outlined-name"
            label="Name"
            placeholder={this.properties.placeholder}
            value={this.value}
            type="password"
            onChange={Password.prototype.handle.bind(this)}
            margin="normal"
            variant="outlined"
          />
        </form>
      </div>
    )
  }


};




export default Password
