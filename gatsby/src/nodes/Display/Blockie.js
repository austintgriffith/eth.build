import React from 'react';
import ReactDOM from 'react-dom'
import Blockies from 'react-blockies';

import {CopyToClipboard} from 'react-copy-to-clipboard';

import { Input, FilledInput, Icon, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { FileCopy } from '@material-ui/icons';

function Blockie() {
  this.addInput("", 0);
  this.properties =  {blockieSize: 50,placeholder:"",title:"",value:null}
  this.size = [70, 60];
}

Blockie.title = "Blockie";

Blockie.prototype.getTitle = function() {
  return "";
};

Blockie.prototype.onExecute = function() {
  let input = this.getInputData(0)
  if (this.inputs[0] && typeof input != "undefined" && this.properties.value != input ) {
    this.properties.value = input;
  }
  //console.log("this.properties.value",this.properties.value)
};

Blockie.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR
  }else if(this.properties.value) {
    this.render(
      <div style={{marginTop:10,textAlign:'left',marginLeft:3,fontSize:32}}>
          <Tooltip title="Copy" style={{cursor:"pointer"}}>
            <CopyToClipboard text={this.properties.value}
              onCopy={() => {

              }}>
              <Blockies
                seed={this.properties.value&this.properties.value.toLowerCase?this.properties.value.toLowerCase():this.properties.value}
                size={8}
                scale={5}
              />
            </CopyToClipboard>
          </Tooltip>
      </div>
    )
  }


};




export default Blockie
