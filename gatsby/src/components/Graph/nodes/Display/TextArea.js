import React from 'react';
import ReactDOM from 'react-dom'
import { TextareaAutosize } from '@material-ui/core';

const resetSize = [320,100]

function TextArea() {
  this.addInput("","string")
  this.addOutput("","string")

  this.properties =  {
    title:"TextArea"
  }
  this.size = resetSize;
  this.value = {}
}

TextArea.title = "TextArea";
TextArea.prototype.getTitle = function() {
  return this.properties.title;
};

TextArea.prototype.onExecute = function() {
  let input = this.getInputData(0)
  if(input){
    this.value = input
  }
  try{
    this.setOutputData(0,this.value)
  }catch(e){}
}

TextArea.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR
  }else{
    this.render(
      <div style={{marginLeft:30}}>
        <TextareaAutosize style={{overflow:'auto',background:"#333333",color:"#bbbbbb",border:"none",fontSize:12,width:this.size[0]-80,height:this.size[1]-10}} rows={3} placeholder="enter text here..." value={this.value} onChange={(e)=>{
          this.value = e.target.value
          this.onDrawBackground()
        }}/>
      </div>
    )
  }
};

export default TextArea
