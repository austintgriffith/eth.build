var Web3 = require('web3');
const defaultProvider = "https://mainnet.infura.io/v3/e59c464c322f47e2963f5f00638be2f8"


function EncodeParameters() {
  this.addInput("", "");
  this.addInput("", "");
  this.addInput("", "");
  this.addInput("", "");
  this.addInput("", "");
  this.addInput("", "");
  this.addOutput("output", "string")
  this.size[0] = 190
}

EncodeParameters.title = "Encode Test";

EncodeParameters.prototype.onStart = async function() {
  this.connectWeb3()
}

EncodeParameters.prototype.connectWeb3 = function() {

    try{
      this.web3 = new Web3(defaultProvider)
    }catch(e){
      console.log(e)
    }

}

EncodeParameters.prototype.onExecute = function() {

  let typeArray = []
  let dataArray = []

  if (typeof this.getInputData(0) != "undefined" && this.getInputData(0) != null) {
    let input = this.getInputData(0)
    dataArray.push(input)
    typeArray.push("string")
  }
/*
  if (typeof this.getInputData(1) != "undefined" && this.getInputData(1) != null) {
    dataArray.push(this.getInputData(1))
  }

  if (typeof this.getInputData(2) != "undefined" && this.getInputData(2) != null) {
    dataArray.push(this.getInputData(2))
  }

  if (typeof this.getInputData(3) != "undefined" && this.getInputData(3) != null) {
    dataArray.push(this.getInputData(3))
  }

  if (typeof this.getInputData(4) != "undefined" && this.getInputData(4) != null) {
    dataArray.push(this.getInputData(4))
  }

  if (typeof this.getInputData(5) != "undefined" && this.getInputData(5) != null) {
    dataArray.push(this.getInputData(5))
  }
*/
  try{
    //this.setOutputData(0,RLP.encode(dataArray))//.toString('hex')
    if(!this.web3){
      this.connectWeb3()
    }
    let result = this.web3.eth.abi.encodeParameters(typeArray, dataArray);
    this.setOutputData(0,result)
  }catch(e){
    console.log(e)
  }

  //var address = ("0x"+keccak256().toString('hex')).slice(12).substring(14)
};

export default EncodeParameters
