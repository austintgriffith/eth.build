import React from 'react';
import ReactDOM from 'react-dom'

import axios from "axios";

function Upload() {
  this.addInput("data", "string");
  this.addInput("publish", -1);
  this.addOutput("key", "string");
  this.size[0] = 240
}

Upload.title = "Upload";

Upload.prototype.onExecute = function() {
  this.setOutputData(0,this.key)
}

Upload.prototype.onAction = async function() {
  let input = this.getInputData(0)
  console.log("input",input)
  if(input){
    let payload = input
    if(typeof payload == "string"){
      payload = {"string":input}
    }
    axios.post('https://network.eth.build:44386/',payload).then((response) => {
      console.log("RESPONSE FROM POST:",response);
      if(response && response.data && response.data.response){
        this.key = response.data.response
      }
    })
  }
}

export default Upload
