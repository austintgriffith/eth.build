var Web3 = require('web3');

const defaultProvider = "https://mainnet.infura.io/v3/e59c464c322f47e2963f5f00638be2f8"


const abi = [
   {
      "inputs":[
         {
            "internalType":"uint256",
            "name":"chainId_",
            "type":"uint256"
         }
      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"constructor"
   },
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":true,
            "internalType":"address",
            "name":"src",
            "type":"address"
         },
         {
            "indexed":true,
            "internalType":"address",
            "name":"guy",
            "type":"address"
         },
         {
            "indexed":false,
            "internalType":"uint256",
            "name":"wad",
            "type":"uint256"
         }
      ],
      "name":"Approval",
      "type":"event"
   },
   {
      "anonymous":true,
      "inputs":[
         {
            "indexed":true,
            "internalType":"bytes4",
            "name":"sig",
            "type":"bytes4"
         },
         {
            "indexed":true,
            "internalType":"address",
            "name":"usr",
            "type":"address"
         },
         {
            "indexed":true,
            "internalType":"bytes32",
            "name":"arg1",
            "type":"bytes32"
         },
         {
            "indexed":true,
            "internalType":"bytes32",
            "name":"arg2",
            "type":"bytes32"
         },
         {
            "indexed":false,
            "internalType":"bytes",
            "name":"data",
            "type":"bytes"
         }
      ],
      "name":"LogNote",
      "type":"event"
   },
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":true,
            "internalType":"address",
            "name":"src",
            "type":"address"
         },
         {
            "indexed":true,
            "internalType":"address",
            "name":"dst",
            "type":"address"
         },
         {
            "indexed":false,
            "internalType":"uint256",
            "name":"wad",
            "type":"uint256"
         }
      ],
      "name":"Transfer",
      "type":"event"
   },
   {
      "constant":true,
      "inputs":[

      ],
      "name":"DOMAIN_SEPARATOR",
      "outputs":[
         {
            "internalType":"bytes32",
            "name":"",
            "type":"bytes32"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[

      ],
      "name":"PERMIT_TYPEHASH",
      "outputs":[
         {
            "internalType":"bytes32",
            "name":"",
            "type":"bytes32"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
       "constant": true,
       "inputs": [
           {
               "name": "owner",
               "type": "address"
           },
           {
               "name": "spender",
               "type": "address"
           }
       ],
       "name": "allowance",
       "outputs": [
           {
               "name": "",
               "type": "uint256"
           }
       ],
       "payable": false,
       "stateMutability": "view",
       "type": "function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "internalType":"address",
            "name":"usr",
            "type":"address"
         },
         {
            "internalType":"uint256",
            "name":"wad",
            "type":"uint256"
         }
      ],
      "name":"approve",
      "outputs":[
         {
            "internalType":"bool",
            "name":"",
            "type":"bool"
         }
      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         {
            "internalType":"address",
            "name":"",
            "type":"address"
         }
      ],
      "name":"balanceOf",
      "outputs":[
         {
            "internalType":"uint256",
            "name":"",
            "type":"uint256"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "internalType":"address",
            "name":"usr",
            "type":"address"
         },
         {
            "internalType":"uint256",
            "name":"wad",
            "type":"uint256"
         }
      ],
      "name":"burn",
      "outputs":[

      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[

      ],
      "name":"decimals",
      "outputs":[
         {
            "internalType":"uint8",
            "name":"",
            "type":"uint8"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "internalType":"address",
            "name":"guy",
            "type":"address"
         }
      ],
      "name":"deny",
      "outputs":[

      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "internalType":"address",
            "name":"usr",
            "type":"address"
         },
         {
            "internalType":"uint256",
            "name":"wad",
            "type":"uint256"
         }
      ],
      "name":"mint",
      "outputs":[

      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "internalType":"address",
            "name":"src",
            "type":"address"
         },
         {
            "internalType":"address",
            "name":"dst",
            "type":"address"
         },
         {
            "internalType":"uint256",
            "name":"wad",
            "type":"uint256"
         }
      ],
      "name":"move",
      "outputs":[

      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[

      ],
      "name":"name",
      "outputs":[
         {
            "internalType":"string",
            "name":"",
            "type":"string"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         {
            "internalType":"address",
            "name":"",
            "type":"address"
         }
      ],
      "name":"nonces",
      "outputs":[
         {
            "internalType":"uint256",
            "name":"",
            "type":"uint256"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "internalType":"address",
            "name":"holder",
            "type":"address"
         },
         {
            "internalType":"address",
            "name":"spender",
            "type":"address"
         },
         {
            "internalType":"uint256",
            "name":"nonce",
            "type":"uint256"
         },
         {
            "internalType":"uint256",
            "name":"expiry",
            "type":"uint256"
         },
         {
            "internalType":"bool",
            "name":"allowed",
            "type":"bool"
         },
         {
            "internalType":"uint8",
            "name":"v",
            "type":"uint8"
         },
         {
            "internalType":"bytes32",
            "name":"r",
            "type":"bytes32"
         },
         {
            "internalType":"bytes32",
            "name":"s",
            "type":"bytes32"
         }
      ],
      "name":"permit",
      "outputs":[

      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "internalType":"address",
            "name":"usr",
            "type":"address"
         },
         {
            "internalType":"uint256",
            "name":"wad",
            "type":"uint256"
         }
      ],
      "name":"pull",
      "outputs":[

      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "internalType":"address",
            "name":"usr",
            "type":"address"
         },
         {
            "internalType":"uint256",
            "name":"wad",
            "type":"uint256"
         }
      ],
      "name":"push",
      "outputs":[

      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "internalType":"address",
            "name":"guy",
            "type":"address"
         }
      ],
      "name":"rely",
      "outputs":[

      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[

      ],
      "name":"symbol",
      "outputs":[
         {
            "internalType":"string",
            "name":"",
            "type":"string"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[

      ],
      "name":"totalSupply",
      "outputs":[
         {
            "internalType":"uint256",
            "name":"",
            "type":"uint256"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "internalType":"address",
            "name":"dst",
            "type":"address"
         },
         {
            "internalType":"uint256",
            "name":"wad",
            "type":"uint256"
         }
      ],
      "name":"transfer",
      "outputs":[
         {
            "internalType":"bool",
            "name":"",
            "type":"bool"
         }
      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":false,
      "inputs":[
         {
            "internalType":"address",
            "name":"src",
            "type":"address"
         },
         {
            "internalType":"address",
            "name":"dst",
            "type":"address"
         },
         {
            "internalType":"uint256",
            "name":"wad",
            "type":"uint256"
         }
      ],
      "name":"transferFrom",
      "outputs":[
         {
            "internalType":"bool",
            "name":"",
            "type":"bool"
         }
      ],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[

      ],
      "name":"version",
      "outputs":[
         {
            "internalType":"string",
            "name":"",
            "type":"string"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   },
   {
      "constant":true,
      "inputs":[
         {
            "internalType":"address",
            "name":"",
            "type":"address"
         }
      ],
      "name":"wards",
      "outputs":[
         {
            "internalType":"uint256",
            "name":"",
            "type":"uint256"
         }
      ],
      "payable":false,
      "stateMutability":"view",
      "type":"function"
   }
]

const staticOutputs = 1


function ERC20Token() {
  this.addInput("[blockchain]","string")
  this.addInput("[symbol]","string")
  this.addInput("[address]","string")
  this.addOutput("address","string")

  this.properties =  {
    provider: defaultProvider
  }

  this.size[0] = 210
  this.abi = abi
}

ERC20Token.title = "DAI";
ERC20Token.title_color = "#F4B731";

ERC20Token.prototype.onAdded = async function() {
  this.connectWeb3()
}

ERC20Token.prototype.connectWeb3 = function() {
  if(this.properties.provider){
    try{
      this.web3 = new Web3(this.properties.provider)
    }catch(e){
      console.log(e)
    }
  }
}

ERC20Token.prototype.onExecute = async function() {

    let changed = false

  let symbol = this.getInputData(1)
  if(!this.symbol || (symbol && symbol!= this.symbol)){
    if(symbol){
      this.symbol = symbol
    }else{
      this.symbol = "DAI"
    }
    console.log("SET SYMOBLE",this.symbol)


    this.title = this.symbol

    //I bet we can find a list to parse here ?
    if(this.symbol=="DAI"){
      this.address = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
    }else if(this.symbol=="SAI"){
      this.address = "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359"
    }

    changed = true
  }


  let address = this.getInputData(2)
  if(address && address!=this.address){
    this.address=address
    changed = true
  }

  if(changed){
      this.parseContract()
  }

  //console.log("setting output",this.address)
  this.setOutputData(0,this.address)


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
            callArgs.push(args[a]?""+args[a]:"")
          }
          if(!this.web3){
            this.connectWeb3()
          }
          //you create the contract and spread the args in it and the abiEncode and return that
          let thisContract = new this.web3.eth.Contract(this.abi,this.address)
          //console.log("RUN FUNCTION "+name+" BUT IN THIS CONTEXT!",args)
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



};

ERC20Token.prototype.parseContract = function() {

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


export default ERC20Token
