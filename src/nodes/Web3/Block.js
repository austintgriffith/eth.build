var Web3 = require('web3');
var RLP = require('rlp')
const keccak256 = require('keccak256')

const defaultProvider = "https://mainnet.infura.io/v3/e59c464c322f47e2963f5f00638be2f8"

function Web3Balance() {
  this.addInput("number","string,number")
  this.addInput("[blockchain]","string")
  this.addInput("check",-1)
  this.addOutput("number","number")
  this.addOutput("hash","string")
  this.addOutput("transactions","array,object")
  this.addOutput("update",-1)
  this.properties = { provider: defaultProvider };
  this.size[0] = 210
  this.triggered = false
  this.loading = false
}

Web3Balance.title = "Block";

Web3Balance.prototype.onAdded = async function() {
  this.connectWeb3()
}

Web3Balance.prototype.onAction = async function() {
  this.connectWeb3()
  let blockNumber = this.getInputData(0)
  //console.log("blockNumber",blockNumber)
  if(blockNumber){
    //if(this.loadedBlockNumber!=blockNumber){
    //  this.loadedBlockNumber=blockNumber

      this.value = await this.web3.eth.getBlock(blockNumber)
      if(this.value){
        if(this.loadedBlock != this.value.hash){

          this.loadedBlock = this.value.hash

          let thisLoadedBlock = this.loadedBlock

          this.loading = true
          //console.log(this.value)
          let block = []
          block.push(this.value.parentHash)
          block.push(this.value.sha3Uncles)
          block.push(this.value.miner)
          block.push(this.value.stateRoot)
          block.push(this.value.transactionsRoot)
          block.push(this.value.receiptsRoot)
          block.push(this.value.logsBloom)
          block.push(this.cleanValue(this.value.difficulty))
          block.push(this.cleanValue(this.value.number))
          block.push(this.cleanValue(this.value.gasLimit))
          block.push(this.cleanValue(this.value.gasUsed))
          block.push(this.cleanValue(this.value.timestamp))
          block.push(this.value.extraData)
          block.push(this.value.mixHash)
          block.push(this.value.nonce)


          //let encoded = RLP.encode(block)
          //let validblockRlp = keccak256(encoded).toString('hex')
          //let hash = "0x"+validblockRlp
          //if(this.value.hash == hash){

          //console.log("VALID")
          this.outputs[0].label = "#"+this.value.number

          this.transactions = this.value.transactions

          let loadingTransactions = []
          //console.log("fully loading #"+this.value.number+" "+this.value.hash+" transactions.................#############")
          let promiseBuffer = []
          for(let t in this.value.transactions){
            if(thisLoadedBlock == this.loadedBlock){ //(still interested in loading this block )
              //console.log("["+thisLoadedBlock+"] getting ",this.value.transactions[t])
              //this.transactions[t] = await this.web3.eth.getTransaction(this.value.transactions[t])
              let thisProm = this.web3.eth.getTransaction(this.value.transactions[t])
              let thisIndex = t
              promiseBuffer.push(thisProm)
              thisProm.then((data)=>{
                if(thisLoadedBlock == this.loadedBlock){
                  this.transactions[thisIndex] = data
                }
              })
            }else{
              //console.log("skipping the rest of ",thisLoadedBlock)
              break
            }
            if(promiseBuffer.length>8){
              await Promise.all(promiseBuffer)
              promiseBuffer=[]
            }
          }
          //if(!this.lastBlock || this.lastBlock.number!=this.value.number){
          //  this.lastBlock = this.value

            this.triggered = true

          //}

          this.loading = false

          //}else{
          //  console.log("INVALID")
          //}
        }

      }


  /*
    console.log("loading transactions")

    let fullTransactions = []
    for(let t in this.value.transactions){
      console.log("loading",this.value.transactions[t])
      fullTransactions.push(await this.web3.eth.getTransaction(this.value.transactions[t]))
    }
    this.transactions = fullTransactions*/


  }


}

Web3Balance.prototype.cleanValue = function(number) {
  let str = ""+this.web3.utils.toHex(number)
  if(str=="0x0") {
    str = "0x"
  }
  return str
}

Web3Balance.prototype.connectWeb3 = function() {
  if(this.properties.provider){
    try{
      this.web3 = new Web3(this.properties.provider)
      //this.checkBalance()
    }catch(e){
      console.log(e)
    }

  }
}

Web3Balance.prototype.onExecute = function() {

  let optionalProvider = this.getInputData(1)
  if(typeof optionalProvider != "undefined" && optionalProvider!=this.properties.provider){
    this.onPropertyChanged("provider",optionalProvider)
  }else if(typeof optionalProvider == "undefined"){
    if(this.properties.provider!=defaultProvider){
//      console.log("SET BACK TO DEFAULT!!!")
      this.onPropertyChanged("provider",defaultProvider)
    }
  }/*
  let optionalAddress = this.getInputData(0)
  if(typeof optionalAddress != "undefined" && optionalAddress!=this.properties.address){
    if(optionalAddress.indexOf("0x")<0){
      optionalAddress = "0x"+optionalAddress
    }
    this.onPropertyChanged("address",optionalAddress)
    this.checkBalance()
  }
  this.setOutputData(0,this.balance)
  if(typeof this.balance !="undefined" && this.balance!=null){
    this.outputs[0].label = this.balance
  }*/
  if(this.value){
    this.setOutputData(0,this.value.number)
    this.setOutputData(1,this.value.hash)
    this.setOutputData(2,this.transactions)
    /*this.setOutputData(3,{
      name:"transaction",
      args:[{name:"hash",type:"string"}],
      function:async (args)=>{
        //console.log("RUN A FUNCTION BUT IN THIS CONTEXT!",args)
        return await this.web3.eth.getTransaction(args.hash)
      }
    })*/
  }


  if(this.triggered){
    this.triggered = false
    this.trigger("update")
  }

};

Web3Balance.prototype.onPropertyChanged = async function(name, value){
//  console.log("check "+name,this.properties[name],value)
  //if(this.properties[name]!=value){
    this.properties[name] = value;
//    console.log("property change",name,value)
    if(name=="provider"){
      this.connectWeb3()
    }
  //}
  return true;
};

export default Web3Balance
