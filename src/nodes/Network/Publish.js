import React from 'react';
import ReactDOM from 'react-dom'

import socketIOClient from "socket.io-client";

function Publish() {
  this.addInput("[channel]","string")
  this.addInput("message", "string");
  this.addInput("publish", -1);
  this.properties = { channel: "network.eth.build"};
  this.size[0] = 240
  this.socket = socketIOClient("http://localhost:4001");
}

Publish.title = "Publish";

Publish.prototype.onExecute = async function() {
  let channel = this.getInputData(0)
  if(channel && this.properties.channel!=channel){
      this.properties.channel = channel
  }
}

Publish.prototype.onAction = async function() {
  this.socket.emit("eth.build", this.properties.channel, this.getInputData(1))
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
