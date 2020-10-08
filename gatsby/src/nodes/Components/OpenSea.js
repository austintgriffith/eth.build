const axios = require('axios');

const url = "https://api.opensea.io/api/v1/assets/?asset_contract_address=##CONTRACTADDRESS##&format=json&owner=##OWNER##"

function Price() {
  this.addInput("contract (address)","string")
  this.addInput("owner (address)","string")
  this.addInput("",-1)
  this.addOutput("","object")
  this.size[0] = 210
  this.value = null
  this.debouncer = false
  setInterval(this.load.bind(this),90000)
}

Price.title = "OpenSea";

Price.prototype.onAdded = async function() {
  this.load()
}

Price.prototype.onAction = async function() {
  this.load()
}


Price.prototype.load = async function() {
  try{
    if(this.owner && this.contract){
      //get price
      let result = await axios.get(url.replace("##OWNER##",this.owner).replace("##CONTRACTADDRESS##",this.contract))
      //console.log("result",result)
      if(result && result.data){
        //for(let i in result.data){
          //console.log(result.data[i])
          //if(result.data[i].symbol.toLowerCase()==this.symbol.toLowerCase()){
            this.value = result.data.assets
        //  }
      //  }

      }
    }

  }catch(e){
    console.log(e)
  }
}

Price.prototype.onExecute = function() {
  let contract = this.getInputData(0)
  if(typeof contract != "undefined" && contract!=this.contract){
    this.contract = contract
    if(this.debouncer) clearTimeout(this.debouncer)
    this.debouncer = setTimeout(this.load.bind(this),1000)
  }

  let owner = this.getInputData(1)
  if(typeof owner != "undefined" && owner!=this.owner){
    this.owner = owner
    if(this.debouncer) clearTimeout(this.debouncer)
    this.debouncer = setTimeout(this.load.bind(this),1000)
  }
  this.setOutputData(0,this.value)
};


export default Price
