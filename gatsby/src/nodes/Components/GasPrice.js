const axios = require('axios');

const url = "https://ethgasstation.info/json/ethgasAPI.json"

function Price() {
  this.addInput("[speed]","string")
  this.addInput("[multiplier]","number")
  this.addOutput("","number")
  this.size[0] = 190
  this.value = null
  this.speed = "safeLow"
  this.multiplier = 1.03
  this.debouncer = false
  this.data = false
  setInterval(this.loadPrice.bind(this),45000)
}

Price.title = "Gas Price";

Price.prototype.onAdded = async function() {
  this.loadPrice()
}


Price.prototype.loadPrice = async function() {
  try{
    //get price
    let result = await axios.get(url)
    //console.log("result",result)
    if(result && result.data){
      this.data = result.data
    }
  }catch(e){
    console.log(e)
  }
}

Price.prototype.onExecute = function() {
  let speed = this.getInputData(0)
  if(typeof speed != "undefined" && speed!=this.speed){
    this.speed = speed
    if(this.debouncer) clearTimeout(this.debouncer)
    this.debouncer = setTimeout(this.loadPrice.bind(this),25000)
  }
  let multiplier = this.getInputData(1)
  if(typeof multiplier != "undefined" && multiplier!=this.multiplier){
    this.multiplier = multiplier
    if(this.debouncer) clearTimeout(this.debouncer)
    this.debouncer = setTimeout(this.loadPrice.bind(this),25000)
  }
  if(this.data){
    this.value = this.data[this.speed]
    if(this.value){
      this.value = parseFloat(this.value)
      this.value = this.value/10
      this.value *= this.multiplier
    }
  }
  this.setOutputData(0,this.value)
};


export default Price
