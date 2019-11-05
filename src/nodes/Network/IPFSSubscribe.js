import React from 'react';
import ReactDOM from 'react-dom'
const IPFS = require('ipfs')

function IPFSSub() {
  this.addInput("[channel]","string")
  this.addOutput("message", "string")
  this.addOutput("received", -1)
  this.properties = { channel: "ipfs.eth.build"};
  this.size[0] = 280
  this.history = null
  this.message = null
}

IPFSSub.title = "Subscribe";

IPFSSub.prototype.onReceiveMsg = async function(msg) {
  console.log(msg)
  this.message = msg.data.toString()
  console.log("this.message is now",this.message)
  this.trigger("received",this.message)
}

IPFSSub.prototype.onAdded = async function() {
  this.ipfs = new IPFS({
    EXPERIMENTAL: {
     pubsub: true
   },
   repo: 'ipfs-' + Math.random(),
   config: {
     Addresses: {
       Swarm: ['/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star']
     }
   }
  })
  await this.ipfs.ready
  console.log('IPFS (subscribe) node is ready')
  const { id, agentVersion, protocolVersion } = await this.ipfs.id()
  console.log("IPFS!")
  const res = await this.ipfs.bootstrap.list()
  console.log("IPFS",res)
  console.log("IPFS SUBSCRIBING TO ",this.properties.channel)
  await this.ipfs.pubsub.subscribe(this.properties.channel, this.onReceiveMsg.bind(this))
  console.log("IPFS SUBSCRIBED")
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
      </div>
    )
  }
};

IPFSSub.prototype.onPropertyChanged = function(name, value) {
  console.log("PROP CHANGE",name,value)
  this.properties[name] = value;
  if (name == "channel" && this.ipfs) {
    console.log("RE INIT CHANNEL")
    //await this.ipfs.pubsub.subscribe(this.properties.channel, this.onReceiveMsg.bind(this))
  }
  return true;
};

export default IPFSSub
