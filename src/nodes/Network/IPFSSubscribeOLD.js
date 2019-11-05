import React from 'react';
import ReactDOM from 'react-dom'

const Room = require('ipfs-pubsub-room')
const IPFS = require('ipfs')



function IPFSSub() {
  this.addInput("[channel]","string")
  this.addOutput("message", "string");
  this.addOutput("received", -1);
  this.properties = { channel: "ipfs.eth.build"};
  this.size[0] = 280
  this.history = null
  this.message = null

  this.ipfs = new IPFS({
    EXPERIMENTAL: {
      pubsub: true
    },
    config: {
      Addresses: {
        Swarm: [
          '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
        ]
      }
    }
  })

  this.ipfs.on('ready', () => {
    console.log("IPFS READY")

  })

}


IPFSSub.title = "SubscribeOLD";


IPFSSub.prototype.onAdded = async function() {

};

IPFSSub.prototype.onExecute = function() {
  let channel = this.getInputData(0)
  if(channel && this.properties.channel!=channel){
      this.onPropertyChanged("channel",channel)
  }
  this.setOutputData(0,this.message)
}

IPFSSub.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory()
  }else{
    this.render(
      <div>
        <div style={{opacity:0.5}}>
          {this.properties.channel}
        </div>
        <pre>
          {this.content}
        </pre>
      </div>
    )
  }
};

IPFSSub.prototype.onPropertyChanged = function(name, value) {
  this.properties[name] = value;
  if (name == "channel" && this.ipfs) {
    console.log("INIT CHANNEL")
  }
  return true;
};

export default IPFSSub
