import React from 'react';
import ReactDOM from 'react-dom'

const IPFS = require('ipfs')

function IPFSAdd() {
  this.addInput("data","string");
  this.addInput("add", -1);
  this.addOutput("path","string");
  this.properties = { };
  this.size[0] = 200
  this.size[1] = 70
}

IPFSAdd.title = "IPFSUpload";

IPFSAdd.prototype.onAdded = async function() {
  this.title_color = "#dddddd";
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
  console.log('IPFS (add) node is ready')
  const { id, agentVersion, protocolVersion } = await this.ipfs.id()
  console.log("IPFS FOR ADD!",id, agentVersion, protocolVersion)
  this.title_color = "#eeee44";
};

IPFSAdd.prototype.onExecute = async function() {
  this.setOutputData(0,this.path)
}

IPFSAdd.prototype.onAction = async function() {
  let data = this.getInputData(0)
  if(typeof data != "undefined" && data != null){
    try{
      console.log("adding data...")
      let result = await this.ipfs.add(data)
      console.log("ADD RESULT:",result[0])
      this.path = result[0].path
      this.hash = result[0].hash
      this.dataSize = result[0].size
      console.log("GETFROM:",result[0].hash)
    }catch(e){
      console.log(e)
    }
  }
}

export default IPFSAdd
