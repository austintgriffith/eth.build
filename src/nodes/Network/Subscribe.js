import React from 'react';
import ReactDOM from 'react-dom'

import socketIOClient from "socket.io-client";

const defaultChannel = "network.eth.build"

function Subscribe() {
  this.addInput("[channel]","string")
  this.addOutput("message", "string");
  this.addOutput("received", -1)

  this.properties = { channel: defaultChannel};
  this.size[0] = 240
  this.socket = socketIOClient("http://localhost:4001");
  this.subscribed = false
}

Subscribe.title = "Subscribe";

Subscribe.prototype.subscribe = function() {
  console.log("SUB IS SUBSCRIBING TO ",this.properties.channel)
  this.socket.on(this.properties.channel, (value) => {
    this.value = value
    this.trigger("received",value)
  });
}

Subscribe.prototype.onExecute = async function() {
  let channel = this.getInputData(0)
  if(!channel) channel = defaultChannel
  if((!this.subscribed || this.properties.channel!=channel)){
      if(this.properties.channel) this.socket.removeAllListeners(this.properties.channel)
      this.properties.channel = channel
      this.subscribe()
      this.subscribed=true
  }
  this.setOutputData(0,this.value)
}

Subscribe.prototype.onDrawBackground = function(ctx) {
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

export default Subscribe
