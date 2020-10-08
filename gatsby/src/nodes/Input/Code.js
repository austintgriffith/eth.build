import React from 'react';
import ReactDOM from 'react-dom'
import Blockies from 'react-blockies';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";


function Text() {
  this.addInput("", 0);
  this.addOutput("", "string");
  this.properties =  {blockieSize: 50,placeholder:"//code",title:"Code",value:""}
  this.size = [500, 420];
}

Text.title = "Code";


Text.prototype.onExecute = function() {
  let input = this.getInputData(0)
  if (this.inputs[0] && typeof input != "undefined" && this.properties.value != input ) {
    this.properties.value = input;
  }
  this.setOutputData(0,this.properties.value);
};

Text.prototype.getTitle = function() {
  if (this.flags.collapsed && this.properties.value) {
    return this.properties.value
  }
  return this.properties.title;
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

      </div>
    )*/
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR
  }else{
    //console.log("this value:",this.value)
    this.render(
      <div>
          <AceEditor
            mode="javascript"
            theme="monokai"
            width={this.size[0]-40}
            height={this.size[1]-2}
            onChange={(newValue)=>{

               //console.log("ACE change", newValue);
              this.properties.value = newValue
               this.onDrawBackground()


            }}
            name={"ace"+this.id}
            editorProps={{}}
            value={this.properties.value?this.properties.value:""}
          />
      </div>
    )
  }


};

/*
<TextArea
  autoFocus
  style={{width:"100%",height:40,color:"#FFFFFF",fontSize:this.properties.fontSize}}
  id={"react-input-"+this.id}
  label="Name"
  placeholder={this.properties.placeholder}
  value={this.properties.value}
  onChange={Text.prototype.handle.bind(this)}
  margin="normal"
  variant="outlined"
/>
 */



export default Text
