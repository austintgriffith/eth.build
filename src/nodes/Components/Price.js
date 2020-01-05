const axios = require('axios');

const url = "https://api.coinmarketcap.com/v1/ticker/"

function Price() {
  this.addInput("[symbol]","string")
  this.addOutput("","number")
  this.size[0] = 190
  this.symbol = "ETH"
  this.value = null
  this.debouncer = false
  setInterval(this.loadPrice.bind(this),45000)
}

Price.title = "Price";

Price.prototype.onAdded = async function() {
  this.loadPrice()
}


Price.prototype.loadPrice = async function() {
  try{
    //get price
    let result = await axios.get(url)
    //console.log("result",result)
    if(result && result.data){
      for(let i in result.data){
        //console.log(result.data[i])
        if(result.data[i].symbol.toLowerCase()==this.symbol.toLowerCase()){
          this.value = result.data[i].price_usd
        }
      }

    }
  }catch(e){
    console.log(e)
  }
}

Price.prototype.onExecute = function() {
  let symbol = this.getInputData(0)
  if(typeof symbol != "undefined" && symbol!=this.symbol){
    this.symbol = symbol
    if(this.debouncer) clearTimeout(this.debouncer)
    this.debouncer = setTimeout(this.loadPrice.bind(this),1000)
  }
  this.setOutputData(0,parseFloat(this.value))
};


export default Price
