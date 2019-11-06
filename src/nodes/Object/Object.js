import React from 'react';
import ReactDOM from 'react-dom'
import { TextareaAutosize } from '@material-ui/core';

let debounce

const staticInputs = 1
const resetSize = [320,100]

function Object() {
  this.addInput("","object")
  this.addOutput("","object")

  this.properties =  {
    title:"Object"
  }
  this.size = resetSize;
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
  let input = this.getInputData(0)
  if(input){
    this.value = input
    this.parseInput()
  }

  let index = staticInputs
  for(let key in this.value){
    let thisInput = this.getInputData(index)
    if(typeof thisInput != "undefined" && thisInput != null && (typeof thisInput != "number" || !isNaN(thisInput)) && thisInput!=this.value[key]){
      console.log("UPDATE VALUE!!!")
      this.value[key] = thisInput
      console.log("NOW:",this.value)
      this.properties.value = JSON.stringify(this.value,null,2)
    }
    index++
  }
}

Object.prototype.parseInput = function(){
  try{
    this.value = JSON.parse(this.properties.value)
    let index = staticInputs
    let inputs = []
    let links = []
    let correct = true
    for(let key in this.value){
      let currentLink = null
      if(!this.inputs[index] || this.inputs[index].name || this.inputs[index].name != this.value[key]){
        if(this.inputs[index] && this.inputs[index].link){
          currentLink = this.inputs[index].link
        }
        correct = false
      }
      inputs.push([key,"string,number,object",null])
      let link_info = this.graph.links[currentLink];
      let currentLinkNode = this.graph.getNodeById(currentLink)
      links.push(link_info)
      index++
    }

    if(!correct){
      let max = this.inputs.length
      for(let l=staticInputs;l < max;l++) {
        console.log("REMOVING NPUT",l,"at",staticInputs)
        this.removeInput(staticInputs)
      }
      this.addInputs(inputs)
      let linkIndex = staticInputs
      for(let i in links){
        let thisIndex = linkIndex++
        if(links[i]){
          let link_info = links[i]
          let target_node = this.graph.getNodeById(link_info.origin_id)
          target_node.connect(link_info.origin_slot,this,thisIndex)
        }
      }
      this.size = resetSize;
    }
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
      <div style={{marginLeft:30}}>
        <TextareaAutosize style={{background:"#333333",color:"#bbbbbb",border:"none",fontSize:12,width:this.size[0]-80,height:this.size[1]-10}} rows={3} placeholder="{'key':'value'}" value={this.properties.value} onChange={(e)=>{
          this.properties.value = e.target.value
          clearTimeout(debounce)
          debounce = setTimeout(()=>{
            this.parseInput()
          },1500)
          this.onDrawBackground()
        }}/>
      </div>
    )
  }
};

export default Object
