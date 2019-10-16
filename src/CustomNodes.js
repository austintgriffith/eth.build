import React from 'react';
import ReactDOM from 'react-dom'

function addHelpers(obj){

  obj.prototype.sayHello = function() {
    console.log("HELLO")
  }

  obj.prototype.render = function(reactElement) {
    if(!document.getElementById(this.id+"_react_element")){
      var node = document.createElement("div");
      node.id = this.id+"_react_element"
      document.getElementById("root").appendChild(node);
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

  let onOutputDblClick = obj.prototype.onOutputDblClick

  obj.prototype.onOutputDblClick = function(args,e){
    console.log("onOutputDblClick",args,e,this.id)
    if(typeof onOutputDblClick == "function") onOutputDblClick()

    var node_watch = globalLiteGraphJS.LiteGraph.createNode("Interface/Watch");
    node_watch.pos = [e.canvasX+100,e.canvasY+10];
    this.graph.add(node_watch);

    this.connect(args, node_watch, 0 );
  }

  obj.prototype.destory = function() {
    let possibleReactElement = document.getElementById(this.id+"_react_element")
    if(possibleReactElement){
      possibleReactElement.remove()
    }
  }

  let onRemoved = obj.prototype.onRemoved

  obj.prototype.onRemoved = function(e) {
    if(typeof onRemoved == "function") onRemoved()
    this.destory()
  }

  return obj
}

const addNodes = function(LiteGraphJS,name){
  let nodeSet = require('./nodes/'+name)
  for(let n in nodeSet){
    if(nodeSet[n].default){
      console.log("Importing "+nodeSet[n].default.title+" as "+name)
      LiteGraphJS.LiteGraph.registerNodeType(name+"/"+nodeSet[n].default.title, addHelpers(nodeSet[n].default));
    }
  }
}

let globalLiteGraphJS = null

export default function(LiteGraphJS){

  globalLiteGraphJS = LiteGraphJS

  addNodes(LiteGraphJS,"Interface")
  addNodes(LiteGraphJS,"Storage","💾")
  addNodes(LiteGraphJS,"Crypto")
  addNodes(LiteGraphJS,"String")


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
