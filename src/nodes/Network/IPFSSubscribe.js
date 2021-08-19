import React from 'react';
const IPFS = require('ipfs-core')

function IPFSSub() {
  this.addInput("[channel]","string")
  this.addOutput("message", "string")
  this.addOutput("received", -1)
  this.properties = { channel: "ipfs.eth.build"};
  this.size[0] = 280
  this.history = null
  this.message = null
  this.status = "connecting..."
}

IPFSSub.title = "IPFSSubscribe";

IPFSSub.prototype.onReceiveMsg = async function(msg) {
  console.log(msg)
  this.message = Buffer.from(msg.data).toString('utf-8')
  console.log("this.message is now",this.message)
  this.trigger("received",this.message)
}

IPFSSub.prototype.onAdded = async function() {
  this.title_color = "#dddddd";
  this.ipfs = await IPFS.create({
   EXPERIMENTAL: {
     pubsub: true,
   },
   repo: 'ipfs-' + Math.random(),
   config: {
      Addresses: {
        Swarm: ['/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
        '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star']
     },
     Bootstrap: []
   }
  })
  const { id, agentVersion, protocolVersion } = await this.ipfs.id()
  console.log("IPFS FOR SUBSCRIBE!", id, agentVersion, protocolVersion)
  console.log("IPFS SUBSCRIBING TO ",this.properties.channel)
  this.ipfs.pubsub.subscribe(this.properties.channel, this.onReceiveMsg.bind(this))
  console.log("IPFS SUBSCRIBED")
  this.title_color = "#eeee44";
  this.status = "connected"
};

IPFSSub.prototype.onExecute = function() {
  let channel = this.getInputData(0)
  if(channel && this.properties.channel!==channel){
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
        <div style={{padding:6}}>
          {this.status}
        </div>
      </div>
    )
  }
};

IPFSSub.prototype.onPropertyChanged = function(name, value) {
  console.log("PROP CHANGE",name,value)
  this.properties[name] = value;
  return true;
};

export default IPFSSub
