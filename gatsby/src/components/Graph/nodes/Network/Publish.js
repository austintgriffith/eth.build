import React from 'react';
import ReactDOM from 'react-dom'

import socketIOClient from "socket.io-client";

function Publish() {
  this.addInput("[channel]","string")
  this.addInput("message", "string");
  this.addInput("publish", -1);
  this.properties = { channel: "network.eth.build", network: "https://network.eth.build:44386/"};
  this.size[0] = 240
  this.socket = socketIOClient(this.properties.network);
  this.loadedNetwork = this.properties.network
}

Publish.title = "Publish";

Publish.prototype.onExecute = async function() {
  let channel = this.getInputData(0)
  if(channel && this.properties.channel!=channel){
      this.properties.channel = channel
  }
  if(this.properties.network!=this.loadedNetwork){
    this.loadedNetwork = this.properties.network
    this.socket = socketIOClient(this.properties.network);
  }
}

Publish.prototype.onAction = async function() {
  console.log("SENDING TO ",this.properties.channel)
  let message = this.getInputData(1)
  if(typeof message != "undefined" && message!=null){
    this.socket.emit("eth.build", this.properties.channel, message)
  }
}

Publish.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory()
  }else{
    this.render(
      <div>
        <div style={{opacity:0.5}}>
          {this.properties.channel}
        </div>
      </div>
    )
  }
};

export default Publish
