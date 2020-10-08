const axios = require('axios');

const url = "https://api.radarrelay.com/v3/markets/WETH-DAI/ticker"

function RadarRelayPriceAPI() {
  this.addOutput("WETH/DAI low","number")
  this.addOutput("WETH/DAI price","number")
  this.addOutput("WETH/DAI high","number")
  this.size[0] = 210
  this.value = null

  this.debouncer = false
  this.data = {}
  setInterval(this.loadPrice.bind(this),45000)
}

RadarRelayPriceAPI.title = "RR WETH-DAI";

RadarRelayPriceAPI.prototype.onAdded = async function() {
  this.loadPrice()
}


RadarRelayPriceAPI.prototype.loadPrice = async function() {
  try{
    //get price
    let result = await axios.get(url)
    //console.log("result",result)
    if(result && result.data){
      this.data = {
        low:parseFloat(result.data.bestBid),
        price:parseFloat(result.data.price),
        high:parseFloat(result.data.bestAsk)
      }
    }
  }catch(e){
    console.log(e)
  }
}

RadarRelayPriceAPI.prototype.onExecute = function() {
  this.setOutputData(0,this.data.low)
  this.setOutputData(1,this.data.price)
  this.setOutputData(2,this.data.high)
};


export default RadarRelayPriceAPI
