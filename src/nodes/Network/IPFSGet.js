const IPFS = require('ipfs-core')

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
  console.log('IPFS (get) node is ready')
  const { id, agentVersion, protocolVersion } = await this.ipfs.id()
  console.log("IPFS FOR GET!",id, agentVersion, protocolVersion)
  this.title_color = "#eeee44";
};

IPFSGet.prototype.onAction = async function() {
  let path = this.getInputData(0)
  if(typeof path !== "undefined" && path != null) {
    try{
        const results = []
        for await (const result of this.ipfs.cat(path)) {
          results.push(Buffer.from(result).toString('utf-8'))
        }
        this.data = results[0] 
      }catch(e){console.log(e)}
  }
}

IPFSGet.prototype.onExecute = async function() {
  this.setOutputData(0,this.data)
}

export default IPFSGet
