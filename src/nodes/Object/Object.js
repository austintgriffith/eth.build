import React from 'react';
import ReactDOM from 'react-dom'
import { TextareaAutosize } from '@material-ui/core';

let debounce

const staticInputs = 1
const resetSizeX = 440
const resetSizeY = 180

const defaultColor = "#5a5a5a"

function ObjectObject() {
  this.addInput("","object")
  this.addOutput("","object")

  this.properties =  {
    title:"Object",
    color:defaultColor,
    fontSize:16
  }
  this.size = [resetSizeX,resetSizeY];
  this.value = {
    "to":"alice","from":"bob","value":10
  }
  this.currentTitleColor = defaultColor
  this.hasProcessedOnce = false
}

ObjectObject.title = "Object";
ObjectObject.prototype.getTitle = function() {
  return this.properties.title;
};


ObjectObject.title_color = defaultColor;

ObjectObject.prototype.onStart = function() {
  this.parseInput()
}

ObjectObject.prototype.onAdded = function() {
  this.parseInput()
}

ObjectObject.prototype.onExecute = function() {
  try{
    this.setOutputData(0,this.value)
  }catch(e){}
  let input = this.getInputData(0)
  if(input && input!=this.value){
    this.value = input
    this.parseInput(true)
  }

  //console.log("OBJECT VALE",this.value)
  let index = staticInputs
  for(let key in this.value){
    let thisInput = this.getInputData(index)
    //console.log("INPUT AT ",index,"is",thisInput)
    if(typeof thisInput != "undefined" && thisInput != null && (typeof thisInput != "number" || !isNaN(thisInput)) && thisInput!=this.value[key]){
      //console.log("UPDATE VALUE!!!")
      try{
        this.value[key] = thisInput
      }catch(e){
        console.log(e)
      }
      //console.log("NOW:",this.value)
      this.properties.value = JSON.stringify(this.value,null,2)
    }
    index++
  }

  index = staticInputs
  for(let key in this.value){
    try{
      this.setOutputData(index,this.value[key])
    }catch(e){
      console.log(e)
    }
    index++
  }

  if(!this.hasProcessedOnce){
    this.parseInput()
    this.hasProcessedOnce = true
  }
}

/*
ObjectObject.prototype.onConnectionsChange = function(type,slot,connected,link,obj){
  //watching for new, empty object, and populating it by referece hehe
  //if( type==2 && slot==0 && connected==true ){
    //setTimeout(()=>{
      let current = this.getInputData(0)
      console.log("CURRENT:",current)
      console.log("keys",JSON.stringify(current))
      current = {
        "to":"test"
      }
    //},1000)

//  }
}*/


ObjectObject.prototype.parseInput = function(force){
  try{
    if(force){
      this.properties.value = this.value
    }
    if(typeof this.properties.value == "string"){
      this.title_color = "#461510";
      this.value = JSON.parse(this.properties.value)
      this.title_color = "#2e492c";
      debounce = setTimeout(()=>{
       this.title_color = defaultColor
      },1500)
    }else if(this.properties.value){
      this.value = this.properties.value
    }
    let startSize = this.size

    let index = staticInputs
    let inputs = []
    let links = []
    let correct = true
    for(let key in this.value){
      let currentLink = null
      if(!this.inputs[index] || this.inputs[index].name || this.inputs[index].name != key){
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
      this.size = startSize;
    }

    index = staticInputs
    let outputs = []
    links = []
    correct = true
    for(let key in this.value){
      //console.log("CHEKCING OUTPUT ",index,key,this.outputs[index])
      let currentLinks = null
      if(!this.outputs[index] || this.outputs[index].name || this.outputs[index].name != key){
        if(this.outputs[index] && this.outputs[index].links){
          currentLinks = this.outputs[index].links
          //console.log("get currentLinks",this.outputs[index])
        }
        correct = false
      }

      outputs.push([key,""+(typeof this.value[key]),null])
      let linksArray = []
      for(let l in currentLinks){
        let link_info = this.graph.links[currentLinks[l]];
        //console.log("SAVING",link_info)
        linksArray.push(link_info)
      }
      links.push(linksArray)
      index++
    }
    if(!correct){
      let max = this.outputs.length
      for(let l=staticInputs;l < max;l++) {
        this.removeOutput(staticInputs)
      }
      this.addOutputs(outputs)

      let linkIndex = staticInputs
      for(let i in links){
        let thisIndex = linkIndex++
        if(links[i]){
          for(let l in links[i]){
            let link_info = links[i][l]
            let target_node = this.graph.getNodeById(link_info.target_id)
            //console.log("CONNECT",link_info)
            this.connect(thisIndex,target_node,link_info.target_slot)
          }
        }
      }
      this.size = startSize
    }

    this.properties.value = JSON.stringify(this.value,null,2)
    this.onDrawBackground()

  }catch(e){
    console.log(e)
  }
}

ObjectObject.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR
  }else{
    this.render(
      <div key={"object_"+this.id} style={{marginLeft:0}}>
        <TextareaAutosize style={{background:"#333333",color:"#bbbbbb",border:"none",fontSize:this.properties.fontSize,letterSpacing:1,width:this.size[0]-160,height:this.size[1]-10}} rows={3} placeholder="{'key':'value'}" value={this.properties.value} onChange={(e)=>{
          this.properties.value = e.target.value
          clearTimeout(debounce)
          this.title_color = "#5e5f2d";
          debounce = setTimeout(()=>{
            this.parseInput()
          },500)
          this.onDrawBackground()
        }}/>
      </div>
    )
  }
};

export default ObjectObject
