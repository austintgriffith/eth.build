const axios = require('axios');

const url = "https://rpc.eth.build:46234/faucet?address="

function Price() {
  this.addInput("address","string")
  this.addInput("request",-1)
  this.addOutput("tx","string")
  this.size[0] = 210
}

Price.title = "Test Faucet";

Price.prototype.onExecute = function() {
  this.setOutputData(0,this.tx)
};


Price.prototype.onAction = function() {
  axios.get(url+this.getInputData(0))
  .then((response) => {
    // handle success
    if(response && response.data){
      this.tx = response.data
    }

  })
};

export default Price
