const keccak256 = require('keccak256')

function Miner() {
  this.addInput("address","string")
  this.addInput("block","array,object")
  this.addInput("pool","array,object")
  this.addOutput("transactions","array,object")
  this.addOutput("nonce","number")
  this.properties = {difficulty:1}
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

  if(this.blockObject && this.pool){
    this.nonce = parseInt(Math.random()*100000000)

    let thisBlock = JSON.parse(JSON.stringify(this.blockObject))

    delete thisBlock.hash

    thisBlock.transactions = this.pool

    thisBlock.parent = thisBlock.parent.hash

    this.outputs[1].label = this.nonce


    //console.log("loaded this block",thisBlock)
    thisBlock.nonce = this.nonce
    this.hash = "0x"+keccak256(JSON.stringify(thisBlock)).toString('hex')




    let valid = false
    let sub = this.hash.substr(2,this.properties.difficulty)
    //console.log("sub",sub)
    //console.log("length",sub.length)
    if(sub.length > 0){
      let i = parseInt(sub,16)
      //console.log("i",i)
      valid = (0==parseInt(sub,16))
    }


    if(valid){
      console.log("VALID ",this.nonce,this.hash)
      thisBlock.hash = this.hash
      this.validNonce = this.nonce
      //console.log(JSON.stringify(thisBlock))
    }

  }

  this.setOutputData(1,this.validNonce)
};

export default Miner
