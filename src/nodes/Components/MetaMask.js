import detectEthereumProvider from '@metamask/detect-provider';
var Web3 = require('web3');
var sigUtil = require('eth-sig-util')

function MetaMask() {
  this.addInput("unlock",-1)
  this.addOutput("address","")
  this.addOutput("balance()","function")
  this.addOutput("sign()","function")
  this.addOutput("send()","function")
  this.addOutput("signedTypedData()","function")
  this.properties = {};

  this.size[0] = 210
  this.accounts = false
}

MetaMask.title = "MetaMask";
MetaMask.title_color = "#F79220";

MetaMask.prototype.onAdded = async function() {
  this.connectWeb3()
}

MetaMask.prototype.onAction = async function() {
  this.connectWeb3()
}

MetaMask.prototype.connectWeb3 = async function() {
  const provider = detectEthereumProvider
  if (provider) {
    try {
      this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      this.setOutputData(0, this.accounts[0])
    } catch (error) {
        if (error.code === 4001) {
          console.log('Please connect to MetaMask!')
        } else {
          console.error(error)
        }
    }
  } else {
    console.log('Please install MetaMask!')
  }
}

MetaMask.prototype.onExecute = async function() {
  this.connectWeb3()

  this.setOutputData(1,{
    name:"balance",
    function:async ()=>{
      try{
        this.onAction()
        console.log(this.accounts[0])
        this.Web3 = new Web3(window.ethereum)
        let balance = await this.Web3.eth.getBalance(this.accounts[0])
        let eth_balance = this.Web3.utils.fromWei(balance)
        return eth_balance
      }catch(e){
        console.log(e)
      }
    }
  })


  this.setOutputData(2,{
    name:"sign",
    args:[{name:"message",type:"string"}],
    function:async (args)=>{
        this.onAction()
        const from = this.accounts[0]
        return window.ethereum.request({
          method: 'personal_sign',
          params: [args.message, from],
          from: from,
        })
        .then((result) => {
          console.dir(result)
          console.log('PERSONAL SIGNED: ' + JSON.stringify(result))
          console.log('recovering...')

          const msgParams = { data: args.message, sig: result }
          console.log(from.length)
          const recovered = sigUtil.recoverPersonalSignature(msgParams)
          console.dir({ recovered })

          if (recovered === from ) {
            return result
          } else {
            console.dir(recovered)
            console.log('SigUtil Failed to verify signer when comparing ' + recovered.result + ' to ' + from)
            return console.log('Failed, comparing %s to %s', recovered, from)
          } 
        }).catch((error) => {
          return console.error(error)
        })
  }})


  this.setOutputData(3,{
    name:"send",
    args:[{name:"to",type:"string"},{name:"value",type:"number"},{name:"data",type:"string"},{name:"gasLimit",type:"number"},{name:"gasPrice",type:"number"}],
    function:async (args)=>{
        this.onAction()
        let currentWeb3 = new Web3(window.ethereum)

        const transactionParameters = {
          //gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
          //gas: '0x2710',  // customizable by user during MetaMask confirmation.
          //to: args.to, // Required except during contract publications.
          from: this.accounts[0], // must match user's active address.
          //value: ""+args.value, // Only required to send ether to the recipient from the initiating external account.
          //data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
          //chainId: 3 // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        }

        if(typeof args.to !== "undefined" && args.to!=null ){
          transactionParameters.to = args.to
        }

        if(typeof args.value !== "undefined" && args.value!=null ){
          let value = currentWeb3.utils.toWei(args.value.toString(), 'ether')
          transactionParameters.value = ""+currentWeb3.utils.toHex(value)
        }

        if(typeof args.data !== "undefined" && args.data!=null ){
          transactionParameters.data = args.data
        }

        if(typeof args.gasLimit !== "undefined" && args.gasLimit!=null ){
          transactionParameters.gas = ""+currentWeb3.utils.toHex(args.gasLimit)
        }

        if(typeof args.gasPrice !== "undefined" && args.gasPrice!=null ){
          transactionParameters.gasPrice = ""+currentWeb3.utils.toHex(args.gasPrice)
        }

        return window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
          from: this.accounts[0],
        })
        .then((result) => {
          return result
        })
        .catch((error) => {
          return console.error(error)
        })

    }
  })

  this.setOutputData(4,{
    name:"signedTypedData",
    args:[{name:"typedData",type:"object"}],
    function:async (args)=>{
        this.onAction()
        return window.ethereum.request({
          id: 1,
          method: "eth_signTypedData_v3",
          params: [this.accounts[0], JSON.stringify(args.typedData)],
          from: this.accounts[0] 
        })
        .then((result) => {
          return result
        })
        .catch((error) => {
          return console.error(error)
        })
      
    }
  })

};

MetaMask.prototype.onPropertyChanged = async function(name, value){
    this.properties[name] = value;
    if(name === "provider"){
      this.connectWeb3()
    }
  return true;
};

export default MetaMask
