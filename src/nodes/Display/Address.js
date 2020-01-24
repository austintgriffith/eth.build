import React from 'react';
import ReactDOM from 'react-dom'
import Blockies from 'react-blockies';

import {CopyToClipboard} from 'react-copy-to-clipboard';

import { Input, FilledInput, Icon, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { FileCopy } from '@material-ui/icons';

function Address() {
  this.addInput("", 0);
  this.properties =  {blockieSize: 50,placeholder:"",title:"Address",value:null}
  this.size = [340, 80];
}

Address.title = "Address";

Address.prototype.getTitle = function() {
  if (this.flags.collapsed && this.properties.value) {
    return this.properties.value
  }
  return "Address";
};

Address.prototype.onExecute = function() {
  let input = this.getInputData(0)
  if (this.inputs[0] && typeof input != "undefined" && this.properties.value != input ) {
    this.properties.value = input;
  }
  //console.log("this.properties.value",this.properties.value)
};

Address.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR
  }else if(this.properties.value && typeof this.properties.value.substr == "function") {
    this.render(
      <div style={{marginTop:10,textAlign:'left',marginLeft:55,fontSize:32}}>
        <div style={{position:'absolute',left:10,top:10}}>
          <Blockies
            seed={this.properties.value&&this.properties.value.toLowerCase?this.properties.value.toLowerCase():this.properties.value}
            size={8}
            scale={5}
          />
        </div>
        {"0x"+this.properties.value.substr(2,4)+"..."+this.properties.value.substr(-4)}
        <div style={{float:"right"}}>
          <Tooltip title="Copy" style={{cursor:"pointer"}}>
            <CopyToClipboard text={this.properties.value}
              onCopy={() => {

              }}>
              <Icon>
                file_copy
              </Icon>
            </CopyToClipboard>
          </Tooltip>
        </div>
      </div>
    )
  }


};




export default Address
