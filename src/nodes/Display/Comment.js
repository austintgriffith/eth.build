import React from 'react';
import ReactDOM from 'react-dom'
import Blockies from 'react-blockies';

import { Input, FilledInput, TextareaAutosize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function Text() {
  this.properties =  {blockieSize: 50,placeholder:"",title:"Comment",value:null,fontSize:18}
  this.size = [300, 0];
}

Text.title = "Comment";
Text.title_color = "#333"

Text.prototype.onConnectionsChange = function(args){
  console.log("onConnectionsChange",args)
}

Text.prototype.getTitle = function() {
  if (this.flags.collapsed && this.properties.value) {
    return this.properties.value
  }
  return "";
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
      <TextareaAutosize
        autoFocus
        multiline={true}
        style={{opacity:0.777,width:"100%",height:40,color:"#FFFFFF",background:"none",fontSize:this.properties.fontSize,border:"none"}}
        id="outlined-name"
        label="Name"
        placeholder={this.properties.placeholder}
        value={this.properties.value}
        onChange={Text.prototype.handle.bind(this)}
        margin="normal"
        variant="outlined"
      />
      </div>
    )*/
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR
  }else{
    this.render(
      <div>
        <form className={"SOMECONTAINERCLASS"} noValidate autoComplete="off">
          <TextareaAutosize aria-label="minimum height" rows={2} placeholder="comments..." style={{opacity:0.777,width:"100%",color:"#FFFFFF",background:"none",fontSize:this.properties.fontSize,border:"none"}}/>

        </form>
      </div>
    )
  }


};




export default Text
