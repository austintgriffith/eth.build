const ethUtils = require('ethereumjs-util')

function Create2() {
  this.addInput("address","string")
  this.addInput("salt","string,number")
  this.addInput("bytecode","string")
  this.addOutput("address","string")
  this.size[0] = 190
}

Create2.title = "Create2";

Create2.prototype.onExecute = async function () {

  let address = this.getInputData(0)
  let salt = this.getInputData(1)
  let bytecode = this.getInputData(2)
  if(bytecode&&typeof salt!= "undefined"&&address&&address.replace){
    address = "0xff"+address.replace("0x","")
    let bytecodeHash = ethUtils.bufferToHex(ethUtils.keccak256(bytecode))
    let saltToBytes = salt.toString(16).padStart(64, '0')
    let concatString = address.concat(saltToBytes).concat(bytecodeHash.replace("0x",""))
    let hashed = ethUtils.bufferToHex(ethUtils.keccak256(concatString))
    this.hashed = "0x"+hashed.substr(26)
    this.setOutputData(0,this.hashed)
  }

}

export default Create2
