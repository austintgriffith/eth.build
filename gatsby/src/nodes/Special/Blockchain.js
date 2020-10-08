const keccak256 = require('keccak256')

function Blockchain() {
  this.addInput("parent","object")
  this.addOutput("height","number")
  this.addOutput("balance()","function")
  this.addOutput("nonce()","function")

  this.properties =  {
    title:"Blockchain",
    requireNonce: false,
    difficulty: 0,
    requireTo: true,
    valueType: "int"
  }

  this.size[0] = 210

  this.balances = {}
  this.nonces = {}
  this.txns = []
  this.height = -1
}

Blockchain.title = "Blockchain";
Blockchain.title_color = "#4444aa";


Blockchain.prototype.onExecute = function() {
  let parent = this.getInputData(0)


  let height = 0
  if(parent){
    this.parent = parent
    let current = this.parent
    while(current){
      current = current.parent
      height++
    }
  }else{
    this.parent = 0
  }

  if(height>0 && this.height!=height){
    console.log("UPDATE")
    console.log("PARENT",parent)

    let index = height
    let blocks  = []
    let current = this.parent
    while(current){
      blocks[index--] = current
      current = current.parent
    }
    console.log("blocks",blocks)

    let block = 1
    for(let block = 1; block <= height; block++){
      console.log("PROCESSING BLOCK "+block+" WHICH HAS "+blocks[block].transactions.length+" txns")
      for(let t in blocks[block].transactions){
        this.processTx(blocks[block].transactions[t])
      }
    }
  }
  this.height = height
  this.setOutputData(0,this.height)



  this.setOutputData(1,{
    name:"balance",
    args:[{name:"address",type:"string"}],
    function:(args)=>{
      console.log("RUN A FUNCTION BUT IN THIS CONTEXT!",args,this)
      return this.balances[args.address]
    }
  })
  this.setOutputData(2,{
    name:"nonce",
    args:[{name:"address",type:"string"}],
    function:(args)=>{
      console.log("RUN A FUNCTION BUT IN THIS CONTEXT!",args,this)
      if(!this.nonces[args.address]){
        return 0
      }
      return parseInt(this.nonces[args.address])
    }
  })
};

Blockchain.prototype.processTx = function(tx) {
  console.log("process",tx)
  let txHash = ""
  if(tx && tx.hash){
    txHash = tx.hash
    delete tx.hash
    console.log("txHash",txHash)
  }


  try{
    if((!this.properties.requireTo || tx.to)&&tx.from&&tx.value){
      if(this.properties.valueType=="int"){
        tx.value = parseInt(tx.value)
        this.balances[tx.from] = this.balances[tx.from]?this.balances[tx.from]-tx.value:-tx.value
      }
      let thisNonce = this.nonces[tx.from]
      if(!thisNonce) thisNonce=0
      if(this.properties.requireNonce && parseInt(tx.nonce) != thisNonce){
        console.log("ILLEGAL NONCE ")
      }else{
        //let work = tx.work
        //delete tx.work
        //
        let stringified = JSON.stringify(tx)


        let valid = false

        if(this.properties.difficulty>0 ){
          //this.prev

          //console.log("difficulty",this.properties)
          //console.log("stringified",stringified)
          let hash = keccak256(stringified).toString('hex')
          //console.log("hash",hash)

          //console.log("work",work)
          let sub = hash.substr(0,this.properties.difficulty)
          console.log("sub",sub)
          let int = parseInt(sub,16)
          console.log("int",int)


          if(int===0){
            valid = true
            this.prev[tx.from] = hash
            let oTx = JSON.parse(stringified)
            oTx.hash = "0x"+hash
            stringified = JSON.stringify(oTx)
          }
        }else{
            valid = true
        }

        //console.log("stringify",tx)


        if(valid){
          if(this.nonces[tx.from]){
            this.nonces[tx.from]++
          }else{
            this.nonces[tx.from]=1
          }
          if(this.properties.valueType=="int"){
            this.balances[tx.to] = this.balances[tx.to]?this.balances[tx.to]+tx.value:tx.value
          }

          //this.showingTo
          if(tx.to&&!this.showingTo){
            this.showingTo = true
          }

          if(tx.input && !this.showingData){
            this.showingData = true
          }

          console.log("PUSGHIN",tx)
          this.txns.push(JSON.parse(stringified))
        }else{
          console.log("INVALID WORK or TX?")
        }

      }
    }
  }catch(e){console.log(e)}
}

export default Blockchain
