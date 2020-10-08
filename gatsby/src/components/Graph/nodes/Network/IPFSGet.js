import React from 'react';
import ReactDOM from 'react-dom'

const IPFS = require('ipfs')

function IPFSGet() {
  this.addInput("path","string");
  this.addInput("get",-1);
  this.addOutput("data","string");
  this.properties = { };
  this.size[0] = 230
  this.size[1] = 70

}

IPFSGet.title = "IPFSDownload";

IPFSGet.prototype.onAdded = async function() {
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
  console.log('IPFS (get) node is ready')
  const { id, agentVersion, protocolVersion } = await this.ipfs.id()
  console.log("IPFS FOR GET!",id, agentVersion, protocolVersion)
  this.title_color = "#eeee44";
};

IPFSGet.prototype.onAction = async function() {
  try{
    this.result = await this.ipfs.get(this.path)
    if(this.result && this.result[0]){
      this.data = this.result[0].content
      if(typeof this.data.toString == "function"){
        this.data = this.data.toString()
      }
    }
  }catch(e){console.log(e)}
}

IPFSGet.prototype.onExecute = async function() {
  let path = this.getInputData(0)
  if(path && (!this.path || path!=this.path )){
    this.path = path
    console.log("PATH!",this.path)
    try{
      this.result = await this.ipfs.get(this.path)
      if(this.result && this.result[0]){
        this.data = this.result[0].content
        if(typeof this.data.toString == "function"){
          this.data = this.data.toString()
        }
      }
    }catch(e){console.log(e)}

  }
  this.setOutputData(0,this.data)
}

export default IPFSGet
