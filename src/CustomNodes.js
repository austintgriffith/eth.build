import React from 'react';
import ReactDOM from 'react-dom'
const hexRgb = require('hex-rgb');

function addHelpers(obj){

  if(!obj.prototype.title_font) obj.prototype.title_font = "bold 18px 'Rubik Mono One', sans-serif"

  obj.prototype.sayHello = function() {
    console.log("HELLO")
  }



  obj.prototype.render = function(reactElement) {
    if(!document.getElementById(this.id+"_react_element")){
      var node = document.createElement("div");
      node.id = this.id+"_react_element"
      document.getElementById("reactElements").appendChild(node);
    }
    if(this.graph && this.graph.canvas && this.graph.canvas.ds){
      ReactDOM.render((
        <div key={this.id+"_react_key"} style={{
          position:'absolute',
          left:(20+this.pos[0]+this.graph.canvas.ds.offset[0])*this.graph.canvas.ds.scale,
          top:(this.pos[1]+this.graph.canvas.ds.offset[1])*this.graph.canvas.ds.scale,
          width:((this.size[0]-40)*this.graph.canvas.ds.scale),
          height:((this.size[1])*this.graph.canvas.ds.scale),
          borderRadius: "0px 0px 7px 7px",
        }}>
        <div stlye={{transform:"scale("+this.graph.canvas.ds.scale+")"}}>
        {reactElement}
        </div>
        </div>
      ), document.getElementById(this.id+"_react_element"));
    }

  }

  //uppercase title of all nodes if not collapsed
  /*obj.prototype.originalGetTitle = obj.prototype.getTitle
  obj.prototype.getTitle = function(){
    let title = ""
    if(typeof   obj.prototype.originalGetTitle == "function")  title = obj.prototype.originalGetTitle()
    if(!title) title=obj.prototype.name
    if(obj.flags && !obj.flags.collapsed && title && typeof title.toUpperCase == "function") title = title.toUpperCase()
    return title
  }*/

  //auto complete on double click
  obj.prototype.originalOnOutputDblClick = obj.prototype.onOutputDblClick
  obj.prototype.onOutputDblClick = function(index,e){
    if(typeof   obj.prototype.originalOnOutputDblClick == "function")   obj.prototype.originalOnOutputDblClick()
    //look for all nodes already attached and bail if one is a Watch already
    for(let l in this.outputs[index].links){
      var link_info = this.graph.links[this.outputs[index].links[l]];
      let node = this.graph.getNodeById(link_info.target_id)
      if(node && node.title == "Watch"){
        return
      }
    }
    var node_watch = globalLiteGraphJS.LiteGraph.createNode("Display/Watch");
    node_watch.pos = [e.canvasX+90,e.canvasY-25];
    this.graph.add(node_watch);
    this.connect(index, node_watch, 0 );
  }


  obj.prototype.originalOnInputDblClick = obj.prototype.onInputDblClick
  obj.prototype.onInputDblClick = function(index,e){
    if(typeof obj.prototype.originalOnInputDblClick == "function")   obj.prototype.originalOnInputDblClick()
    if(this.inputs[index].type == -1){
      //this is an action, let's attach a button to it automatically
      var node_button = globalLiteGraphJS.LiteGraph.createNode("Input/Button");
      node_button.pos = [e.canvasX-280,e.canvasY];
      this.graph.add(node_button);
      //i have no idea why, but I have to do this to make it work:
      let that = this
      setTimeout(()=>{
        node_button.connect(0, that, index);
      },1)
    }else if(this.inputs[index].type&& this.inputs[index].type.indexOf("string")==0){
      var node_text = globalLiteGraphJS.LiteGraph.createNode("Input/Text");
      node_text.pos = [e.canvasX-380,e.canvasY];
      this.graph.add(node_text);
      //i have no idea why, but I have to do this to make it work:
      let that = this
      setTimeout(()=>{
        node_text.connect(0, that, index);
      },1)
    }else if(this.inputs[index].type&& this.inputs[index].type.indexOf("number")==0){
      var node_number = globalLiteGraphJS.LiteGraph.createNode("Input/Number");
      node_number.pos = [e.canvasX-280,e.canvasY];
      this.graph.add(node_number);
      //i have no idea why, but I have to do this to make it work:
      let that = this
      setTimeout(()=>{
        node_number.connect(0, that, index);
      },1)
    }{
      console.log("unable to find automatic pair for ",this.inputs[index].type)
    }
  }

  obj.prototype.destory = function() {
    let possibleReactElement = document.getElementById(this.id+"_react_element")
    if(possibleReactElement){
      possibleReactElement.remove()
    }
  }

  obj.prototype.originalOnRemoved = obj.prototype.onRemoved

  obj.prototype.onRemoved = function(e) {
    if(typeof obj.prototype.originalOnRemoved == "function") obj.prototype.originalOnRemoved()
    this.destory()
  }

  return obj
}

const addNodes = function(LiteGraphJS,name,color,shadow){
  let nodeSet = require('./nodes/'+name)
  for(let n in nodeSet){
    if(nodeSet[n].default){
      console.log("Importing "+nodeSet[n].default.title+" as "+name)
      let nodeObject = nodeSet[n].default
      if(color && !nodeObject.title_color) nodeObject.title_color = color
      if(shadow && !nodeObject.shadow_color) nodeObject.prototype.shadow_color = shadow
      LiteGraphJS.LiteGraph.registerNodeType(name+"/"+nodeSet[n].default.title, addHelpers(nodeObject));
    }
  }
}

let globalLiteGraphJS = null

const hexColor = (hex)=>{
  let rgbVale = hexRgb(hex)
  return ["rgba("+rgbVale.red+","+rgbVale.green+","+rgbVale.blue+")","rgba("+rgbVale.red+","+rgbVale.green+","+rgbVale.blue+",0.25)"]
}

//

export default function(LiteGraphJS){

  globalLiteGraphJS = LiteGraphJS

  addNodes(LiteGraphJS,"Input",...hexColor("3f51b5"))
  addNodes(LiteGraphJS,"Display",...hexColor("357a38"))
  addNodes(LiteGraphJS,"Storage",...hexColor("ff9800"))
  addNodes(LiteGraphJS,"Network",...hexColor("b2a429"),"📡")
  addNodes(LiteGraphJS,"Crypto",...hexColor("f44336"))
  addNodes(LiteGraphJS,"Web3",...hexColor("03A9F4"))
  addNodes(LiteGraphJS,"Math",...hexColor("2196f3"))
  addNodes(LiteGraphJS,"Control",...hexColor("a4a4a4"))
  addNodes(LiteGraphJS,"Utils",...hexColor("b26500"))
  addNodes(LiteGraphJS,"String",...hexColor("6b6b6b"))
  addNodes(LiteGraphJS,"Object",...hexColor("454545"))

  addNodes(LiteGraphJS,"System",...hexColor("989898"))
  addNodes(LiteGraphJS,"Modules",...hexColor("7e57c2"))


  /*function substr(str, start, length) {
    if(str){
      if(typeof start == "undefined"){
        start = 0
      }
      if(typeof length == "undefined"){
        length = str.length
      }
      return str.substr(start,length)
    }
    return ""
  }
  LiteGraphJS.LiteGraph.wrapFunctionAsNode(
    "String/Substring",
    substr,
    ["String", "Number", "Number"],
    "String"
  );*/


  /*
  function split(a, b) {
  if (a != null && a.constructor === String) {
  return a.split(b || "\n");
}
return [a];
}
LiteGraphJS.LiteGraph.wrapFunctionAsNode(
"string/split",
split,
["String", "String"],
"Array"
);
*/

}
