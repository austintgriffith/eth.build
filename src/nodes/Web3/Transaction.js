const EthTx = require('ethereumjs-tx');
var EthUtil = require('ethereumjs-util');
var Web3 = require('web3');

const defaultProvider = "https://mainnet.infura.io/v3/e59c464c322f47e2963f5f00638be2f8"

function Web3Transaction() {
  this.addInput("[blockchain]","string")
  this.addInput("[privatekey]","string")
  this.addInput("[to]","string")
  this.addInput("[value]","number,string")
  this.addInput("[data]","string")
  this.addInput("[gasLimit]","number,string")
  this.addInput("[gasPrice]","number,string")
  this.addInput("[nonce]","number,string")
  this.addInput("sign",-1)
  this.addOutput("transaction", "object");
  this.addOutput("signed", "string");
  this.addOutput("signed",-1)
  this.properties = { value: 0, nonce: null, data: "0x", gas: 23000, gasPrice: 4100000000, provider: defaultProvider, privateKey: ""  };
  this.size[0]=240
  this.signed = false
}

Web3Transaction.title = "Transaction";


Web3Transaction.prototype.connectWeb3 = function() {
  if(this.properties.provider){
    //console.log("CONNECTING TO",this.properties.provider)
    this.web3 = new Web3(this.properties.provider)
  }
}

Web3Transaction.prototype.setInput = function(index,name,type) {
  let optional = this.getInputData(index)
  if(typeof optional != "undefined" && optional!=this.properties[name]){
    this.onPropertyChanged(name,optional)
  }
}

Web3Transaction.prototype.assureHex = function(str){
  if(str.indexOf("0x")<0){
    str = "0x"+str
  }
  return str
}


Web3Transaction.prototype.onExecute = function() {

  let optionalProvider = this.getInputData(0)
  if(typeof optionalProvider != "undefined" && optionalProvider!=this.properties.provider){
    this.onPropertyChanged("provider",optionalProvider)
  }else if(typeof optionalProvider == "undefined"){
    if(this.properties.provider!=defaultProvider){
      //console.log("SET BACK TO DEFAULT!!!")
      this.onPropertyChanged("provider",defaultProvider)
    }
  }

  let optionalPrivateKey = this.getInputData(1)
  if(typeof optionalPrivateKey != "undefined" && optionalPrivateKey!=this.properties.privateKey){
    if(optionalPrivateKey && optionalPrivateKey.indexOf("0x")<0){
      optionalPrivateKey = "0x"+optionalPrivateKey
    }
    this.onPropertyChanged("privateKey",optionalPrivateKey)
  }
  let optionalTo = this.getInputData(2)
  if(typeof optionalTo != "undefined" && optionalTo!=this.properties.to){
    this.onPropertyChanged("to",optionalTo)
  }
  let optionalValue = this.getInputData(3)
  if(typeof optionalValue != "undefined" && optionalValue!=this.properties.value){
    this.onPropertyChanged("value",optionalValue)
  }
  let optionalData = this.getInputData(4)
  if(typeof optionalData != "undefined" && optionalData!=this.properties.data){
    if(optionalData && typeof optionalData.indexOf == "function" && optionalData.indexOf("0x")<0){
      optionalData = "0x"+optionalData
    }
    this.onPropertyChanged("data",optionalData)
  }

  let optionalGas = this.getInputData(5)
  if(typeof optionalGas != "undefined" && optionalGas!=this.properties.data){
    this.onPropertyChanged("gas",optionalGas)
  }
  let optionalGasPrice= this.getInputData(6)
  if(typeof optionalGasPrice != "undefined" && optionalGasPrice!=this.properties.data){
    this.onPropertyChanged("gasPrice",optionalGasPrice)
  }


  let optionalNonce = this.getInputData(7)
  if(typeof optionalNonce != "undefined"){
    if(optionalNonce!=this.properties.nonce){
      this.onPropertyChanged("nonce",optionalNonce)
    }
  } else {
    if(this.properties.nonce){
      this.onPropertyChanged("nonce",null)
    }
  }

  this.setOutputData(0,this.transaction)
  this.setOutputData(1,this.signedTransaction)

  if(this.signed){
    this.signed = false
    this.trigger("signed",this.signedTransaction)
  }
};


Web3Transaction.prototype.onAction = async function(event, args) {
  try{
    await this.craftTransaction()
    const tx = new EthTx(this.transaction);
    console.log(JSON.stringify(tx))
    tx.sign(Buffer.from(this.properties.privateKey.replace("0x",""), 'hex'));
    const serializedTx = tx.serialize();
    const rawTx = '0x' + serializedTx.toString('hex');
    this.signedTransaction = rawTx
    console.log(" * * * SIGNED",JSON.stringify(tx))
    this.signed = true
  }catch(e){
    console.log(e)
    global.setSnackbar(e.message)
  }

}



Web3Transaction.prototype.craftTransaction = async function(){
  try{
    console.log("Crafting a transaction...")
    this.connectWeb3()
    let nonce = this.properties.nonce
    //console.log("CRAFTING",nonce,this.properties.privateKey,"PROVIDER:",this.web3._provider.host)
    if((nonce == null || typeof nonce == "undefined" || typeof this.getInputData(7) == "undefined") && this.properties.privateKey && this.web3){
      console.log("================ > > > > >  LOADING NONCE")
      try{
        let publicAddress = "0x"+EthUtil.privateToAddress(this.properties.privateKey).toString('hex')
        //console.log("publicAddress",publicAddress)
        if(this.debounced){
          //waiting
          nonce = this.debouncedNonce
        }else{
          nonce = await this.web3.eth.getTransactionCount(publicAddress)
          this.debouncedNonce = nonce
          //do a weird little debounce dance so you don't whale the RPC server
          this.debounced = true
          setTimeout(()=>{
            this.debounced = false
          },3000)
        }

        //console.log("{{{{{{{{{{{{{{{{{{{{{{{{{{{"+nonce+"}}}}}}}}}}}}}}}}}}}}}}}}}}}")
      }catch(e){

      }
    }
    //console.log("LOADED NONCE OF ",nonce)

    this.transaction = {
      value: parseInt(this.properties.value),
      data: ""+this.properties.data,
      gas: parseInt(this.properties.gas),
      gasPrice: parseInt(this.properties.gasPrice),
      nonce: nonce
    }

    if(this.properties.to){
      this.transaction.to = ""+this.properties.to
    }

    //console.log("CRAFTED",this.transaction.nonce,this.transaction)
  }catch(e){}

}


Web3Transaction.prototype.onPropertyChanged = async function(name, value){
  if(this.properties[name]!=value){
    this.properties[name] = value;
    this.craftTransaction()
  }

  return true;
};

export default Web3Transaction
