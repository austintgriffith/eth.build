var Web3 = require('web3');

function ToBytes32() {
  this.addInput("",0)
  this.addOutput("", "string");
  this.size = [170, 30];
}

ToBytes32.title = "To Bytes32";

ToBytes32.prototype.onExecute = function() {
  let input = this.getInputData(0)
  if(!input){
    this.value = "0x0000000000000000000000000000000000000000000000000000000000000000"
  }else{

    if(input.substr && input.substr(0,2)!="0x"){
      if(!this.web3){
        this.web3 = new Web3()
      }
      input = this.web3.utils.utf8ToHex(input)
      let pad = 66 - input.length
      while(pad>0){
        pad--
        input = input+"0"
      }
      this.value = input
    }


  }


  this.setOutputData(0, this.value);
};


export default ToBytes32
