import React from 'react';
import ReactDOM from 'react-dom'
const hexRgb = require('hex-rgb');

function addHelpers(obj){

  if(!obj.prototype.title_font) obj.prototype.title_font = "bold 18px 'Rubik Mono One', sans-serif"

  obj.prototype.sayHello = function() {
    console.log("HELLO")
  }



  obj.prototype.render = function(reactElement) {
    //console.log("REACT RENDER!")
    if(!document.getElementById(this.id+"_react_element")){
      var node = document.createElement("div");
      node.id = this.id+"_react_element"
      try{
        document.getElementById("reactElements").appendChild(node);
      }catch(e){console.log(e)}
    }
    //console.log("RENDER",this.graph)
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
    }else if(this.graph && this.graph._subgraph_node){
      //console.log("SUBGRAPH IS STILL SENT?")
      let graph = this.graph._subgraph_node.graph
      let canvas = this.graph._subgraph_node.graph.canvas
      if(!canvas){
        canvas = graph._subgraph_node.graph.canvas
      }
      if(canvas){
        ReactDOM.render((
          <div key={this.id+"_react_key"} style={{
            position:'absolute',
            left:(20+this.pos[0]+canvas.ds.offset[0])*canvas.ds.scale,
            top:(this.pos[1]+canvas.ds.offset[1])*canvas.ds.scale,
            width:((this.size[0]-40)*canvas.ds.scale),
            height:((this.size[1])*canvas.ds.scale),
            borderRadius: "0px 0px 7px 7px",
          }}>
          <div stlye={{transform:"scale("+canvas.ds.scale+")"}}>
          {reactElement}
          </div>
          </div>
        ), document.getElementById(this.id+"_react_element"));
      }else{
        console.log("no graph.canvas I bet it is sub sub module",canvas,graph._subgraph_node.graph.canvas)
      }

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

    console.log("DOUBLECKICK OUTTY")

    if(this.outputs[index].type == -1){
      var node_watch = globalLiteGraphJS.LiteGraph.createNode("Display/Action");
      node_watch.pos = [e.canvasX+90,e.canvasY-25];
      this.graph.add(node_watch);
      this.connect(index, node_watch, 0 );
    }else if(this.outputs[index].type == "contractCall"){
      var node_watch = globalLiteGraphJS.LiteGraph.createNode("Web3/Call");
      node_watch.pos = [e.canvasX+90,e.canvasY-25];
      this.graph.add(node_watch);
      this.connect(index, node_watch, 0 );
    }else if(this.outputs[index].type == "contractFunction"){
      var node_watch = globalLiteGraphJS.LiteGraph.createNode("Web3/Function");
      node_watch.pos = [e.canvasX+90,e.canvasY-25];
      this.graph.add(node_watch);
      this.connect(index, node_watch, 0 );
    }else if(this.outputs[index].type == "function"){
      var node_watch = globalLiteGraphJS.LiteGraph.createNode("Utils/Function");
      node_watch.pos = [e.canvasX+90,e.canvasY-25];
      this.graph.add(node_watch);
      this.connect(index, node_watch, 0 );
    }else{


      if(this.outputs[index] && this.outputs[index]._data && typeof this.outputs[index]._data.substr == "function" && this.outputs[index]._data.length == 42 && this.outputs[index]._data.substr(0,2)=="0x"){
        var node_watch = globalLiteGraphJS.LiteGraph.createNode("Display/Address");
        node_watch.pos = [e.canvasX+90,e.canvasY-25];
        this.graph.add(node_watch);
        this.connect(index, node_watch, 0 );
      }else if(this.outputs[index] && this.outputs[index]._data && typeof this.outputs[index]._data.substr == "function" && this.outputs[index]._data.length > 96){
        var node_watch = globalLiteGraphJS.LiteGraph.createNode("Display/TextArea");
        node_watch.pos = [e.canvasX+90,e.canvasY-25];
        this.graph.add(node_watch);
        this.connect(index, node_watch, 0 );
      }else{
        var node_watch = globalLiteGraphJS.LiteGraph.createNode("Display/Watch");
        node_watch.pos = [e.canvasX+90,e.canvasY-25];
        this.graph.add(node_watch);
        this.connect(index, node_watch, 0 );
      }


    }

  }


  obj.prototype.originalOnInputDblClick = obj.prototype.onInputDblClick
  obj.prototype.onInputDblClick = function(index,e){
    if(typeof obj.prototype.originalOnInputDblClick == "function")   obj.prototype.originalOnInputDblClick()
    if(this.inputs[index].type == -1){
      if(this.type == "Input/Button"){
        //this is an action, let's attach a button to it automatically
        var node_button = globalLiteGraphJS.LiteGraph.createNode("Control/Timer");
        node_button.pos = [e.canvasX-280,e.canvasY];
        this.graph.add(node_button);
        //i have no idea why, but I have to do this to make it work:
        let that = this
        setTimeout(()=>{
          node_button.connect(0, that, index);
        },1)
      }else{
        //this is an action, let's attach a button to it automatically
        var node_button = globalLiteGraphJS.LiteGraph.createNode("Input/Button");
        node_button.pos = [e.canvasX-280,e.canvasY];
        this.graph.add(node_button);
        //i have no idea why, but I have to do this to make it work:
        let that = this
        setTimeout(()=>{
          node_button.connect(0, that, index);
        },1)
      }

    }else if(this.inputs[index].type&& this.inputs[index].type.indexOf("string")==0){
      var node_text = globalLiteGraphJS.LiteGraph.createNode("Input/Text");
      node_text.pos = [e.canvasX-380,e.canvasY];
      this.graph.add(node_text);
      //i have no idea why, but I have to do this to make it work:
      let that = this
      setTimeout(()=>{
        node_text.connect(0, that, index);
      },1)
    }else if(this.inputs[index].type&& this.inputs[index].type.indexOf("object")==0){
      var node_text = globalLiteGraphJS.LiteGraph.createNode("Object/Object");
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



  obj.prototype.originalOnDblClick = obj.prototype.onDblClick
  obj.prototype.onDblClick = function(e,location,canvas){
    console.log("DBLCLICK",e,location,canvas)
    if(this.graph && this.graph.canvas && this.graph.canvas.moreInfo){

      console.log("THIS",this)
      this.graph.canvas.processContextMenu(this, e);
    }

    if(typeof this.originalOnDblClick == "function") this.originalOnDblClick(e,location,canvas)
  }

  obj.prototype.destory = function() {
    let possibleReactElement = document.getElementById(this.id+"_react_element")
    if(possibleReactElement){
      possibleReactElement.remove()
    }
  }

  obj.prototype.originalonHide = obj.prototype.onHideNode
  obj.prototype.onHideNode = function() {
    if(typeof obj.prototype.originalonHide == "function") obj.prototype.originalonHide()
    this.destory()
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
  if(!global.customNodeItems){
    global.customNodeItems = {}
  }
  if(!global.customNodeItems[name]){
    global.customNodeItems[name] = []
  }
  for(let n in nodeSet){

    if(nodeSet[n].default){

      //console.log("Importing "+nodeSet[n].default.title+" as "+name)
      let nodeObject = nodeSet[n].default
      if(color && !nodeObject.title_color) nodeObject.title_color = color
      if(shadow && !nodeObject.shadow_color) nodeObject.prototype.shadow_color = shadow
      LiteGraphJS.LiteGraph.registerNodeType(name+"/"+nodeSet[n].default.title, addHelpers(nodeObject));
      global.customNodeItems[name].push({title:nodeSet[n].default.title,color:nodeObject.title_color})
    }
  }
}

let globalLiteGraphJS = null

const hexColor = (hex)=>{
  let rgbVale = hexRgb(hex)
  return ["rgba("+rgbVale.red+","+rgbVale.green+","+rgbVale.blue+")","rgba("+rgbVale.red+","+rgbVale.green+","+rgbVale.blue+",0.25)"]
}

//
//
//


global.customNodes = [
  {name:"Input",color:"3f51b5",icon:"✏️"},
  {name:"Display",color:"357a38",icon:"🖥"},
  {name:"Storage",color:"c1790e",icon:"💾"},
  {name:"Network",color:"b9a814",icon:"📡"},
  {name:"Crypto",color:"f44336",icon:"🔐"},
  {name:"Web3",color:"03A9F4",icon:"🦄"},
  {name:"Control",color:"a4a4a4",icon:"⚙️"},
  {name:"Math",color:"7fa9cb",icon:"🧮"},
  {name:"Utils",color:"97784f",icon:"🔧"},
  {name:"String",color:"6b6b6b",icon:"💬"},
  {name:"Object",color:"454545",icon:"📦"},
  {name:"Components",color:"009688",icon:""},
  {name:"Special",color:"009688",icon:""},
  {name:"System",color:"989898",icon:"🎛"},
  {name:"Modules",color:"7e57c2",icon:""},
]




export default function(LiteGraphJS){

  globalLiteGraphJS = LiteGraphJS

  for(let n in global.customNodes){
    addNodes(LiteGraphJS,global.customNodes[n].name,...hexColor(global.customNodes[n].color))
  }


  console.log("HOOK INTO CLOSE AND OPEN OF SUBGRAPH TO DESTROY NODES?",LiteGraphJS)
  LiteGraphJS.LiteGraph.onClear = ()=>{
    alert("CLEAR")
  }


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
