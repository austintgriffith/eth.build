const axiosParent = require('axios').default;
const https = require('https')
const axios = axiosParent.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

function Compile() {
  this.addInput("name","string")
  this.addInput("solidity","string")
  this.addInput("compile",-1)
  this.addOutput("bytecode","string")
  this.addOutput("abi","object")
//  this.properties = { host: "https://solc.eth.build", port:"48451" };
  this.size[0] = 210
}

Compile.title = "Compile";


Compile.prototype.onExecute = function() {
  let name = this.getInputData(0)
  let solidity = this.getInputData(1)
  if(name && solidity && (solidity!=this.solidity || name!=this.name)){
    this.solidity = solidity
    this.name = name
    this.compile(name)
  }

  this.setOutputData(0,this.bytecode?"0x"+this.bytecode:this.bytecode)
  this.setOutputData(1,this.abi)
};

Compile.prototype.onAction = function() {
  let name = this.getInputData(0)
  let solidity = this.getInputData(1)
  if(name && solidity){
    this.properties.solidity = solidity
    this.compile(name)
  }
}

Compile.prototype.compile = function(name) {
  let dependencies = {}

  console.log("this.properties.solidity",this.properties.solidity)
  dependencies[name+".sol"] = {content: this.properties.solidity};

  console.log("dependencies",dependencies)
  let solcObject = {
    language: 'Solidity',
    sources: dependencies,
    settings: {
      outputSelection: {
            '*': {
                '*': [ '*' ]
            }
      },
    }
  }

  console.log(" 🛠️  Compiling...",solcObject.sources)

  axios.post('https://solc.eth.build:48451/',solcObject)
  .then((response) => {
    //console.log("response.data",response.data)
    this.properties.compiled = response.data

    //console.log("COMPILED:",this.properties.compiled)
    if(this.properties.compiled.errors && this.properties.compiled.errors[0] && this.properties.compiled.errors[0].message){
      console.log("ERRORS:",this.properties.compiled.errors)
      for(let e in this.properties.compiled.errors){
        if(this.properties.compiled.errors[e].type != "Warning"){
          global.setSnackbar({msg:this.properties.compiled.errors[e].message})
          break;
        }
      }
    }

    let compiledContractObject = this.properties.compiled.contracts[name+".sol"][name]

    //console.log("compiledContractObject",compiledContractObject)

    if(compiledContractObject && compiledContractObject.evm ) {
      this.bytecode = compiledContractObject.evm.bytecode.object
      this.abi = compiledContractObject.abi
      global.setSnackbar({msg:"✅ Compiled",color:"#64cb53"})
    }
  })
  .catch(function (error) {
    console.log(error);
  });




}

export default Compile
