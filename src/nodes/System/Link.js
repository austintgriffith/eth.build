import React from 'react';
import ReactDOM from 'react-dom'
import Blockies from 'react-blockies';

import { Input, FilledInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

var codec = require('json-url')('lzw');

function Text() {
  this.addInput("generate", -1);
  this.addOutput("", "string");
  this.properties =  {blockieSize: 50,placeholder:"",title:"Link",value:null}
  this.size = [300, 50];
}

Text.title = "Link";

Text.prototype.onExecute = async function() {
  this.setOutputData(0,this.properties.value);
};

Text.prototype.getTitle = function() {
  if (this.flags.collapsed && this.properties.value) {
    return this.properties.value
  }
  return this.properties.title;
};

Text.prototype.onAction = async function(e) {
    this.encoded = await codec.compress(this.graph.serialize())
    this.properties.value = "https://eth.build/"+(this.encoded)
    this.setOutputData(0,this.properties.value);
    this.onDrawBackground()
}

Text.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR
  }else{
    this.render(
      <div>
        {this.encoded?this.encoded.substr(0,16):"..."}
      </div>
    )
  }
};


export default Text
