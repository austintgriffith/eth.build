import React from 'react';
import ReactDOM from 'react-dom'
const hexRgb = require('hex-rgb');
const BigNumber = require('bignumber.js');

function addHelpers(obj){

  if(!obj.prototype.title_font) obj.prototype.title_font = "bold 18px 'Rubik Mono One', sans-serif"

  obj.prototype.sayHello = function() {
    console.log("HELLO")
  }


  //check if this is a smart contract block with a hardcoded abi to parse automatically
  console.log("CHECKING IF OBJECT HAS prototype abi",obj.prototype.abi)
  if(obj.prototype.abi){
    console.log("parseContract needs to be a function....")
    obj.prototype.parseContract = function() {
      this.functions = {}
      this.types = {}
      for(let i in this.abi){
        if(this.abi[i].type == "function"){
          console.log(this.abi[i].name,this.abi[i].inputs)
          this.functions[this.abi[i].name] = this.abi[i].inputs
          this.types[this.abi[i].name] = this.abi[i].stateMutability
          if(!this.types[this.abi[i].name] && this.abi[i].constant) this.types[this.abi[i].name] = "view"
        }
      }

      try{
        let index = this.staticOutputs
        let outputs = []
        let links = []
        let correct = true
        for(let name in this.functions){
          console.log("ADDING OUTPUT FOR ",name,this.functions[name])
          let currentLinks = null
          if(!this.outputs[index] || this.outputs[index].name || this.outputs[index].name != name){
            if(this.outputs[index] && this.outputs[index].links){
              currentLinks = this.outputs[index].links
            }
            correct = false
          }
          outputs.push([name+"()",this.types[name]=="view"?"contractCall":"contractFunction",null])
          let linksArray = []
          for(let l in currentLinks){
            let link_info = this.graph.links[currentLinks[l]];
            linksArray.push(link_info)
          }
          links.push(linksArray)
          index++
        }

        console.log("correct:",correct)
        console.log("links",links)
        console.log("outputs",outputs)

        if(!correct){
          let max = this.outputs.length
          for(let l=this.staticOutputs;l < max;l++) {
            console.log("REMOVING OUTPUT",l,"at",this.staticOutputs)
            this.removeOutput(this.staticOutputs)
          }
          this.addOutputs(outputs)
          let linkIndex = this.staticOutputs
          for(let i in links){
            let thisIndex = linkIndex++
            if(links[i]){
              for(let l in links[i]){
                let link_info = links[i][l]
                let target_node = this.graph.getNodeById(link_info.target_id)
                console.log("CONNECT",link_info)
                this.connect(thisIndex,target_node,link_info.target_slot)
              }
            }
          }
          //this.size = resetSize;
        }
        this.properties.value = JSON.stringify(this.value,null,2)
        //this.onDrawBackground()
      }catch(e){
        console.log(e)
      }
    }

    //AND YOU NEED A FUNCTION TO BUILD THE OUTPUTS CORRECTLY ON EXECUTE:
    obj.prototype.buildABIOutputs = function() {
      let index = this.staticOutputs

      for(let name in this.functions){
        let argArray = []
        for(let a in this.functions[name]){
          //console.log("Adding argument ",this.functions[name][a])
          argArray.push({name:this.functions[name][a].name,type:""})
        }

        //console.log("setting output data of ",index)
        if(this.types[name]=="view"){
          //console.log(name,"view")
          this.setOutputData(index++,{
            name:name,
            args:argArray,
            function:async (args)=>{
              let callArgs = []
              for(let a in args){
                callArgs.push(args[a]?""+args[a]:"")
              }
              if(!this.web3){
                this.connectWeb3()
              }
              //you create the contract and spread the args in it and the abiEncode and return that
              let thisContract = new this.web3.eth.Contract(this.abi,this.address)
              //console.log("RUN FUNCTION "+name+" BUT IN THIS CONTEXT!",args)
              try{
                return (thisContract.methods[name](...callArgs)).call()
              }catch(e){
                return false
              }
            }
          })
        }else{
          //console.log("SEND MFUNCTION ",name,"send")
          this.setOutputData(index++,{
            name:name,
            args:argArray,
            function:(args)=>{
              console.log("send called",args)
              let callArgs = []
              for(let a in args){
                callArgs.push(args[a]?""+args[a]:"")
              }
              if(!this.web3){
                this.connectWeb3()
              }
              //you create the contract and spread the args in it and the abiEncode and return that
              let thisContract = new this.web3.eth.Contract(this.abi,this.address)
              //console.log("ENCODE FUNCTION "+name+" BUT IN THIS CONTEXT!",args)
              try{
                return (thisContract.methods[name](...callArgs)).encodeABI()
              }catch(e){console.log(e)}
            }
          })
        }

      }
    }

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

    console.log("DOUBLECKICK OUTTY",this.outputs[index])

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
      }else if(this.outputs[index] && this.outputs[index]._data && typeof this.outputs[index]._data == "object") {
        var node_object = globalLiteGraphJS.LiteGraph.createNode("Object/Object");
        node_object.pos = [e.canvasX+90,e.canvasY-25];
        this.graph.add(node_object);
        this.connect(index, node_object, 0 );

        let ySize = Object.keys(this.outputs[index]._data).length * 20 + 60
        node_object.size[1] = ySize
        node_object.size[0] = ySize*3

      }else{

        console.log("DATA TYPE",typeof this.outputs[index]._data)


        var node_watch = globalLiteGraphJS.LiteGraph.createNode("Display/Watch");
        node_watch.pos = [e.canvasX+90,e.canvasY-25];
        this.graph.add(node_watch);
        this.connect(index, node_watch, 0 );

        try{
          let value = new BigNumber(this.outputs[index]._data)
          value = value.div(10**18)
          console.log("VALUE IN ETH",value.toNumber())
          if(value>0.0001&&value<1000000000){
            //do a conversion to wei
            var node_from_wei = globalLiteGraphJS.LiteGraph.createNode("Utils/From Wei");
            node_from_wei.pos = [e.canvasX+40,e.canvasY];
            this.graph.add(node_from_wei);
            this.connect(index, node_from_wei, 0 );
            node_from_wei.connect(0,node_watch,0)
            node_watch.pos = [e.canvasX+230,e.canvasY-10];
          }else{
            value = new BigNumber(this.outputs[index]._data)
            value = value.div(10**9)
            console.log("GUESSING GWEI VALUYE IS",value)
            if(value>0.01&&value<9999){
              //do a conversion to wei
              var node_from_wei = globalLiteGraphJS.LiteGraph.createNode("Utils/From Gwei");
              node_from_wei.pos = [e.canvasX+40,e.canvasY];
              this.graph.add(node_from_wei);
              this.connect(index, node_from_wei, 0 );
              node_from_wei.connect(0,node_watch,0)
              node_watch.pos = [e.canvasX+245,e.canvasY-10];
            }
          }
        }catch(e){

        }



      }


    }

  }


  obj.prototype.originalOnInputDblClick = obj.prototype.onInputDblClick
  obj.prototype.onInputDblClick = function(index,e){
    if(typeof obj.prototype.originalOnInputDblClick == "function")   obj.prototype.originalOnInputDblClick()
    if(this.inputs[index].type == -1){
      if(this.type == "Input/Button"){
        console.log("DOUBLECLICK INPUT ACTION")
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
        node_button.pos = [e.canvasX-60,e.canvasY+20];
        this.graph.add(node_button);

        node_button.collapse()

        var node_timer = globalLiteGraphJS.LiteGraph.createNode("Control/Timer");
        node_timer.pos = [e.canvasX-40,e.canvasY+20];
        this.graph.add(node_timer);

        node_timer.collapse()



        //i have no idea why, but I have to do this to make it work:
        let that = this
        setTimeout(()=>{
          node_timer.connect(0, node_button, 0);
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
