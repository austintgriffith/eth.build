import React from 'react';
import ReactDOM from 'react-dom'
import Blockies from 'react-blockies';

import MaterialButton from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

function Button() {
  this.addInput("", -1);
  this.addOutput("", -1);
  this.addOutput("", "boolean");
  this.properties =  {value:"click me",title:"Button",count:0}
  this.size = [200, 50];
}

Button.title = "Button";

Button.prototype.onConnectionsChange = function(args){
  console.log("onConnectionsChange",args)
}

Button.prototype.onExecute = function() {
  let input = this.getInputData(0)
  if (this.inputs[0] && typeof input != "undefined" && this.properties.value != input ) {
    this.properties.value = this.getInputData(0);
  }
  this.setOutputData(0,this.properties.value);
  this.setOutputData(1,this.properties.count);
};

Button.prototype.getTitle = function() {
  if (this.flags.collapsed && this.properties.value) {
    return this.properties.value
  }
  return this.properties.title;
};

Button.prototype.handle = function(e) {
    this.properties.value = e.target.value
    this.setOutputData(0,this.properties.value);
    this.setOutputData(1,this.properties.count);
}

Button.prototype.onAction = function(e) {
  this.properties.count = this.properties.count+1
  this.trigger()
}


Button.prototype.onDrawBackground = function(ctx) {
  //console.log(this)
  if (this.flags.collapsed) {
    /*this.render(
      <div>

      </div>
    )*/
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR
  }else{
    this.render(
      <div style={{marginTop:4}}>
        <MaterialButton variant="contained" color="primary" size={"large"} onClick={()=>{
            this.properties.count = this.properties.count+1
            this.trigger()
          }}>
          {this.properties.value}
      </MaterialButton>


      </div>
    )
  }


};




export default Button
