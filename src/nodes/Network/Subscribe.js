import React from 'react';
import ReactDOM from 'react-dom'

import socketIOClient from "socket.io-client";

const defaultChannel = "network.eth.build"

function Subscribe() {
  this.addInput("[channel]","string")
  this.addOutput("message", "string");
  this.addOutput("received", -1)

  this.properties = { channel: defaultChannel, network: "https://network.eth.build:44386/"};
  this.size[0] = 240
  this.socket = socketIOClient(this.properties.network);
  this.subscribed = false
  this.loadedNetwork = this.properties.network
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
  if(!this.subscribed || this.channel!=channel){
      if(this.properties.channel) this.socket.removeAllListeners(this.properties.channel)
      this.channel = channel
      if(this.channel) this.properties.channel = this.channel
      this.subscribe()
      this.subscribed=true
  }
  this.setOutputData(0,this.value)
  if(this.properties.network!=this.loadedNetwork){
    this.loadedNetwork = this.properties.network
    this.socket = socketIOClient(this.properties.network);
      this.subscribed = false
  }
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
