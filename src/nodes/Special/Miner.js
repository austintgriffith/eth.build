const keccak256 = require('keccak256')

function Miner() {
  this.addInput("address","string")
  this.addInput("block","array,object")
  this.addInput("pool","array,object")
  this.addOutput("transactions","array,object")
  this.addOutput("nonce","number")
  this.addOutput("valid",-1)
  this.properties = {difficulty:2, addMinerToBlocks: false}
  this.size[0] = 180
}

Miner.title = "Miner";
Miner.title_color = "#aa4444";


Miner.prototype.onExecute = function() {
  this.address = this.getInputData(0)
  this.blockObject = this.getInputData(1)
  this.pool = this.getInputData(2)

  //eventually you only want to look at valid transactions but load them blind for now
  this.setOutputData(0,this.pool)



  //console.log("this.blockObject",this.blockObject)
  //console.log("this.hash",this.hash)

  if(this.blockObject && this.pool && !(this.validHash(this.blockObject.hash)/*||this.validHash(this.hash)*/)){
    this.nonce = parseInt(Math.random()*100000000)

    let thisBlock = JSON.parse(JSON.stringify(this.blockObject))

    delete thisBlock.hash

    thisBlock.transactions = this.pool

    if(thisBlock.parent && thisBlock.parent.hash){
      thisBlock.parent = thisBlock.parent.hash
    }


    this.outputs[1].label = this.nonce


    //console.log("loaded this block",thisBlock)
    thisBlock.nonce = this.nonce
    if(!thisBlock.parent){
      thisBlock.parent = 0
    }

    if(this.properties.addMinerToBlocks){
      thisBlock.miner = this.address
    }

    let stringified = JSON.stringify(thisBlock)

    this.hash = "0x"+keccak256(stringified).toString('hex')







    if(this.validHash(this.hash)){
      console.log("VALID ",this.nonce,this.hash)
      console.log("HASHED FROM",stringified)

      //console.log("SETTING MINER FROM MINER TO",this.address)
      if(this.properties.addMinerToBlocks){
       this.blockObject.miner = this.address
      }

      thisBlock.hash = this.hash
      this.validNonce = this.nonce
      //console.log(JSON.stringify(thisBlock))
      this.trigger('valid',this.nonce)
    }

  }

  this.setOutputData(1,this.validNonce)
};


Miner.prototype.validHash = function(hash) {
  //console.log("testing if ",hash,"is valid...")
  let valid = false
  if(!hash) return false
  let sub = hash.substr(2,this.properties.difficulty)
  //console.log("sub",sub)
  //console.log("length",sub.length)
  if(sub.length > 0){
    let i = parseInt(sub,16)
    //console.log("i",i)
    valid = (0==parseInt(sub,16))
  }
  return valid
}

export default Miner
