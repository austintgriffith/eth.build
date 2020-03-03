var Web3 = require('web3');

const defaultProvider = "https://mainnet.infura.io/v3/e59c464c322f47e2963f5f00638be2f8"
const staticOutputs = 1 // events()

function Contract() {
  this.addInput("[blockchain]","string")
  this.addInput("address","string")
  this.addInput("abi","object")
  //this.addInput("debug",-1)//if you need to parse action manually
  //this.addOutput("[network]",0)
  this.addOutput("events()","function")

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

Contract.prototype.onStart = async function() {
  this.connectWeb3()
  this.parseContract()
}

Contract.prototype.onPropertyChanged = async function(name, value){
  this.properties[name] = value;
  if(name=="provider"){
    this.connectWeb3()
  }
  this.parseContract()
  return true;
};

Contract.prototype.onAction = function() {
  this.parseContract()
}

Contract.prototype.parseContract = function() {

  this.functions = {}
  this.types = {}
  for(let i in this.abi){
    if(this.abi[i].type == "function"){
      console.log(this.abi[i].name,this.abi[i].inputs)
      this.functions[this.abi[i].name] = this.abi[i].inputs
      this.types[this.abi[i].name] = this.abi[i].stateMutability
      if(!this.types[this.abi[i].name] && this.abi[i].constant) this.types[this.abi[i].name] = "view"
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

  this.setOutputData(0,{
    name:"events",
    args:[
      {name:"eventName",type:"string"},
      {name:"startBlock",type:"string,number"},
      {name:"endBlock", type:"string,number"},
      {name:"filter", type:"object"}
    ],
    function:async (args)=>{
      //you create the contract and spread the args in it and the abiEncode and return that
      if(!this.web3){
        this.connectWeb3()
      }
      let thisContract = new this.web3.eth.Contract(this.abi,this.address)
      console.log("RGET EVENTS!!",args)

      let thisStartBlock = 0
      if(args['startBlock']){
        thisStartBlock = args['startBlock']
      }

      let thisEndBlock = 'latest'
      if(args['endBlock']){
        thisEndBlock = args['endBlock']
      }

      let thisFilter = {}
      if(args['filter']){
        thisFilter = args['filter']
      }

      return thisContract.getPastEvents(args['eventName'], {
        //{myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}
          filter: thisFilter, // Using an array means OR: e.g. 20 or 23
          fromBlock: thisStartBlock,
          toBlock: thisEndBlock
      })

    }
  })


  let index = staticOutputs

  for(let name in this.functions){
    let argArray = []
    for(let a in this.functions[name]){
      //console.log("Adding argument ",this.functions[name][a])
      argArray.push({name:this.functions[name][a].name,type:""})
    }


    //console.log("setting output data of ",index)
    if(this.types[name]=="view"){
      //console.log(name,"view")
      this.setOutputData(index++,{
        name:name,
        args:argArray,
        function:async (args)=>{
          let callArgs = []
          for(let a in args){
            callArgs.push((typeof args[a] != "undefined" )?""+args[a]:"")
          }
          if(!this.web3){
            this.connectWeb3()
          }
          //you create the contract and spread the args in it and the abiEncode and return that
          let thisContract = new this.web3.eth.Contract(this.abi,this.address)
          console.log("RUN FUNCTION "+name+" BUT IN THIS CONTEXT!",this.address,args,callArgs)
          try{
            return (thisContract.methods[name](...callArgs)).call()
          }catch(e){
            return false
          }
        }
      })
    }else{
      //console.log("SEND MFUNCTION ",name,"send")
      this.setOutputData(index++,{
        name:name,
        args:argArray,
        function:(args)=>{
          console.log("send called",args)
          let callArgs = []
          for(let a in args){
            callArgs.push(args[a]?""+args[a]:"")
          }
          if(!this.web3){
            this.connectWeb3()
          }
          //you create the contract and spread the args in it and the abiEncode and return that
          let thisContract = new this.web3.eth.Contract(this.abi,this.address)
          //console.log("ENCODE FUNCTION "+name+" BUT IN THIS CONTEXT!",args)
          try{
            return (thisContract.methods[name](...callArgs)).encodeABI()
          }catch(e){console.log(e)}
        }
      })
    }

  }

  let changed = false
  let address = this.getInputData(1)
  if(address!=this.address){
    this.address=address
    changed = true
  }
  let abi = this.getInputData(2)
  if(abi!=this.abi){
    this.abi=abi
    changed = true
  }

  if(changed){
      this.parseContract()
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
