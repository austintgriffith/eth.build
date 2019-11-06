import React from 'react';
import ReactDOM from 'react-dom'
import { TextareaAutosize } from '@material-ui/core';

let debounce

function Object() {
  this.addOutput("","object")

  this.properties =  {
    title:"Object"
  }
  this.size = [320,100];
  this.value = {}
}

Object.title = "Object";
Object.prototype.getTitle = function() {
  return this.properties.title;
};

Object.prototype.onStart = function() {
    this.parseInput()
}

Object.prototype.onExecute = function() {
  try{
    this.setOutputData(0,this.value)
  }catch(e){}

}

Object.prototype.parseInput = function(){
  try{
    this.value = JSON.parse(this.properties.value)
    this.properties.value = JSON.stringify(this.value,null,2)
    this.onDrawBackground()
  }catch(e){
    console.log(e)
  }
}

Object.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR
  }else{
    this.render(
      <TextareaAutosize style={{background:"#333333",color:"#bbbbbb",border:"none",fontSize:12,width:this.size[0]-50,height:this.size[1]-10}} rows={3} placeholder="{'key':'value'}" value={this.properties.value} onChange={(e)=>{
        this.properties.value = e.target.value
        clearTimeout(debounce)
        debounce = setTimeout(()=>{
          this.parseInput()
        },1500)
        this.onDrawBackground()
      }}/>
    )
  }
};

export default Object
