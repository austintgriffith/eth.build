var Web3 = require('web3');

const defaultProvider = null

function TxPool() {
  this.addInput("blockchain","string")
  this.addInput("query",-1)
  this.addOutput("pending","number")
  this.addOutput("transactions","array,object")
  this.properties = { provider: defaultProvider };
  this.size[0] = 210
}

TxPool.title = "Tx Pool";

TxPool.prototype.onAdded = async function() {
  this.connectWeb3()
}

TxPool.prototype.connectWeb3 = function() {
  if(this.properties.provider){
    try{
      this.web3 = new Web3(this.properties.provider)
      this.web3.eth.extend({
        property: 'txpool',
        methods: [{
          name: 'content',
          call: 'txpool_content'
        },{
          name: 'inspect',
          call: 'txpool_inspect'
        },{
          name: 'status',
          call: 'txpool_status'
        }]
      });
    }catch(e){
      console.log(e)
    }
  }
}

TxPool.prototype.onAction = function() {
  if(this.web3){
    this.web3.eth.txpool.status().then((status)=>{
      //console.log(status)
      this.pending = parseInt(status.pending,16)
      let loadingTx = []
      this.web3.eth.txpool.content().then((content)=>{
        for(let account in content.pending){
          //console.log(account,content.pending[account])
          for(let tx in content.pending[account]){
            let search = "0xaa91a57cd2973c5241bc47cf480da8d264ab4b79"
            let transaction = content.pending[account][tx]
            if(search && (transaction.from.toLowerCase()==search.toLowerCase() || (transaction.to && transaction.to.toLowerCase()==search.toLowerCase())) ){
              console.log("FOUND ",transaction,"for",search)
            }
            loadingTx.push(transaction)
          }
        }
        this.transactions =  loadingTx
      })
    })
  }
}

TxPool.prototype.onExecute = function() {
  let optionalProvider = this.getInputData(0)
  if(typeof optionalProvider != "undefined" && optionalProvider!=this.properties.provider){
    this.onPropertyChanged("provider",optionalProvider)
  }else if(typeof optionalProvider == "undefined"){
    if(this.properties.provider!=defaultProvider){
      this.onPropertyChanged("provider",defaultProvider)
    }
  }
  this.setOutputData(0,this.pending)
  if(this.pending){
    this.outputs[0].label = this.pending
  }
  this.setOutputData(1,this.transactions)
  /*
  this.setOutputData(0,this.properties.provider)
  this.setOutputData(1,{
    name:"balance",
    args:[{name:"address",type:"string"}],
    function:async (args)=>{
      let balance = await this.web3.eth.getBalance(args.address)
      return balance
    }
  })
  this.setOutputData(2,{
    name:"nonce",
    args:[{name:"address",type:"string"}],
    function:async (args)=>{
      console.log(this.web3.eth)
      let count = await this.web3.eth.getTransactionCount(args.address)
      return count
    }
  })
  this.setOutputData(3,{
    name:"send",
    args:[{name:"signed",type:"string"}],
    function:async (args)=>{
      console.log("sending...",args.signed)
      let transactionHash = await this.web3.eth.sendSignedTransaction(args.signed)
      console.log("sent...")
      return transactionHash
    }
  })*/
};

TxPool.prototype.onPropertyChanged = async function(name, value){
  this.properties[name] = value;
  if(name=="provider"){
    this.connectWeb3()
  }
  return true;
};

export default TxPool
