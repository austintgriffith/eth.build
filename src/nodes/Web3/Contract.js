var Web3 = require('web3');

const defaultProvider = "https://mainnet.infura.io/v3/e59c464c322f47e2963f5f00638be2f8"
const staticOutputs = 0

function Contract() {
  this.addInput("[blockchain]","string")
  this.addInput("address","string")
  this.addInput("abi","object")
  this.addInput("debug",-1)
  //this.addOutput("[network]",0)
  this.addOutput("someFunction()","function")

  this.properties =  {
    title:"Contract",
    provider: defaultProvider
  }
  this.size = [320, 240];
}

Contract.title = "Contract";
Contract.prototype.getTitle = function() {
  return this.properties.title;
};

Contract.prototype.onAdded = async function() {
  this.connectWeb3()
}

Contract.prototype.onPropertyChanged = async function(name, value){
  this.properties[name] = value;
  if(name=="provider"){
    this.connectWeb3()
  }
  return true;
};

Contract.prototype.onAction = function() {
  const abiString = '[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"_name","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"_id","type":"uint256"}],"name":"AddDrink","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"drinkId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"},{"indexed":false,"internalType":"bytes32","name":"drinkName","type":"bytes32"}],"name":"BuyDrink","type":"event"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_name","type":"bytes32"},{"internalType":"uint256","name":"_minCost","type":"uint256"},{"internalType":"uint256","name":"_multiplier","type":"uint256"},{"internalType":"uint256","name":"_cooler","type":"uint256"}],"name":"addDrink","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"bartender","outputs":[{"internalType":"address payable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_drinkId","type":"uint256"}],"name":"buyDrink","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"drinkMenu","outputs":[{"internalType":"bytes32","name":"name","type":"bytes32"},{"internalType":"uint256","name":"minCost","type":"uint256"},{"internalType":"uint256","name":"multiplier","type":"uint256"},{"internalType":"uint256","name":"cooler","type":"uint256"},{"internalType":"uint256","name":"lastPrice","type":"uint256"},{"internalType":"uint256","name":"lastPurchase","type":"uint256"},{"internalType":"bytes1","name":"visible","type":"bytes1"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_drinkId","type":"uint256"},{"internalType":"uint256","name":"_multiplier","type":"uint256"},{"internalType":"uint256","name":"_cooler","type":"uint256"},{"internalType":"bytes1","name":"_visible","type":"bytes1"}],"name":"editDrink","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_drinkId","type":"uint256"}],"name":"getAge","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_drinkId","type":"uint256"}],"name":"getCool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_drinkId","type":"uint256"}],"name":"getCooler","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_drinkId","type":"uint256"}],"name":"getLastPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_drinkId","type":"uint256"}],"name":"getLastPurchase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_drinkId","type":"uint256"}],"name":"getMinCost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_drinkId","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_drinkId","type":"uint256"}],"name":"getName","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_drinkId","type":"uint256"}],"name":"getPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_drinkId","type":"uint256"}],"name":"getVisible","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxCost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address payable","name":"_bartender","type":"address"}],"name":"setBartender","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]'
  let abi = JSON.parse(abiString)

  this.abi = abi

  this.functions = {}
  this.types = {}
  for(let i in abi){
    if(abi[i].type == "function"){
      console.log(abi[i].name,abi[i].inputs)
      this.functions[abi[i].name] = abi[i].inputs
      this.types[abi[i].name] = abi[i].stateMutability
    }
  }


  try{
    let index = staticOutputs
    let outputs = []
    let links = []
    let correct = true
    for(let name in this.functions){
      console.log("ADDING OUTPUT FOR ",name,this.functions[name])
      let currentLinks = null
      if(!this.outputs[index] || this.outputs[index].name || this.outputs[index].name != name){
        if(this.outputs[index] && this.outputs[index].links){
          currentLinks = this.outputs[index].links
        }
        correct = false
      }
      outputs.push([name+"()",this.types[name]=="view"?"contractCall":"contractFunction",null])
      let linksArray = []
      for(let l in currentLinks){
        let link_info = this.graph.links[currentLinks[l]];
        linksArray.push(link_info)
      }
      links.push(linksArray)
      index++
    }

    console.log("correct:",correct)
    console.log("links",links)
    console.log("outputs",outputs)

    if(!correct){
      let max = this.outputs.length
      for(let l=staticOutputs;l < max;l++) {
        console.log("REMOVING OUTPUT",l,"at",staticOutputs)
        this.removeOutput(staticOutputs)
      }
      this.addOutputs(outputs)
      let linkIndex = staticOutputs
      for(let i in links){
        let thisIndex = linkIndex++
        if(links[i]){
          for(let l in links[i]){
            let link_info = links[i][l]
            let target_node = this.graph.getNodeById(link_info.target_id)
            console.log("CONNECT",link_info)
            this.connect(thisIndex,target_node,link_info.target_slot)
          }
        }
      }
      //this.size = resetSize;
    }
    this.properties.value = JSON.stringify(this.value,null,2)
    //this.onDrawBackground()
  }catch(e){
    console.log(e)
  }
}

Contract.prototype.onExecute = function() {
  let optionalProvider = this.getInputData(0)
  if(typeof optionalProvider != "undefined" && optionalProvider!=this.properties.provider){
    this.onPropertyChanged("provider",optionalProvider)
  }else if(typeof optionalProvider == "undefined"){
    if(this.properties.provider!=defaultProvider){
      this.onPropertyChanged("provider",defaultProvider)
    }
  }
  let index = staticOutputs
  for(let name in this.functions){

    let argArray = []
    for(let a in this.functions[name]){
      //console.log("Adding argument ",this.functions[name][a])
      argArray.push({name:this.functions[name][a].name,type:"string"})
    }
    //console.log("FUNCTION",this.functions)
    //console.log("setting output data of ",index)
    if(this.types[name]=="view"){
      this.setOutputData(index++,{
        name:name,
        args:argArray,
        function:async (args)=>{
          let callArgs = []
          for(let a in args){
            callArgs.push(args[a])
          }
          //you create the contract and spread the args in it and the abiEncode and return that
          let thisContract = new this.web3.eth.Contract(this.abi,this.address)
          console.log("RUN FUNCTION "+name+" BUT IN THIS CONTEXT!",args)
          return (thisContract.methods[name](...callArgs)).call()
        }
      })
    }else{
      this.setOutputData(index++,{
        name:name,
        args:argArray,
        function:(args)=>{
          let callArgs = []
          for(let a in args){
            callArgs.push(args[a])
          }
          //you create the contract and spread the args in it and the abiEncode and return that
          let thisContract = new this.web3.eth.Contract(this.abi,this.address)
          console.log("ENCODE FUNCTION "+name+" BUT IN THIS CONTEXT!",args)
          try{
            return (thisContract.methods[name](...callArgs)).encodeABI()
          }catch(e){console.log(e)}
        }
      })
    }

  }

  this.address = this.getInputData(1)
  //this.abi = this.getInputData(2)
  if(this.abi){
    //console.log("ABI",this.abi)
  }
}


Contract.prototype.connectWeb3 = function() {
  if(this.properties.provider){
    try{
      this.web3 = new Web3(this.properties.provider)
    }catch(e){
      console.log(e)
    }
  }
}

export default Contract
