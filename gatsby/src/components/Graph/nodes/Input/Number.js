import React from 'react';
import ReactDOM from 'react-dom'
import Blockies from 'react-blockies';

import { Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function Number() {
  this.addInput("", 0);
  this.addOutput("", "number");
  this.properties =  {placeholder:"#",title:"Number",value:null}
  this.size = [190, 50];
}

Number.title = "Number";

Number.prototype.onExecute = function() {
  let input = this.getInputData(0)
  if (this.inputs[0] && typeof input != "undefined" && this.properties.value != input ) {
    this.properties.value = parseFloat(this.getInputData(0));
  }
  this.setOutputData(0,parseFloat(this.properties.value));
};

Number.prototype.getTitle = function() {
  if (this.flags.collapsed && this.properties.value) {
    return this.properties.value
  }
  return this.properties.title;
};

Number.prototype.handle = function(e) {
    //console.log("CHANGE",e)
    this.properties.value = e.target.value
    this.setOutputData(0,this.properties.value);
    //console.log(this.properties.value)
    //console.log("this.properties.value:",this.properties.value,this.id)
    this.onDrawBackground()
}

Number.prototype.onDrawBackground = function(ctx) {
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
            type="number"
            value={this.properties.value}
            onChange={Number.prototype.handle.bind(this)}
            margin="normal"
            variant="outlined"
          />
        </form>
      </div>
    )
  }


};




export default Number
