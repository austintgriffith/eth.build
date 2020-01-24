var Web3 = require('web3');

function MetaMask() {
  this.addInput("unlock",-1)
  this.addOutput("address","")
  this.addOutput("balance()","function")
  this.addOutput("sign()","function")
  this.addOutput("send()","function")
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
  this.accounts = await window.ethereum.enable()

}

MetaMask.prototype.connectWeb3 = function() {
   if (typeof window.web3 !== 'undefined'){
     this.web3 = window.web3
      console.log('MetaMask is installed',this.web3)
   }
   else{
      console.log('MetaMask is not installed')
   }
}

MetaMask.prototype.onExecute = async function() {

  if(window.web3 && window.web3.eth && typeof window.web3.eth.getAccounts == "function"){
    window.web3.eth.getAccounts((error,accounts)=>{
      this.accounts = accounts
    })
  }
  if(this.accounts){
    this.setOutputData(0,this.accounts[0])
  }


  this.setOutputData(1,{
    name:"balance",
    args:[{name:"address",type:"string"}],
    function:async (args)=>{
      this.onAction()
      let currentWeb3 = new Web3(window.web3)
      let balance = await currentWeb3.eth.getBalance(args.address)
      return balance
    }
  })
  this.setOutputData(2,{
    name:"sign",
    args:[{name:"message",type:"string"}],
    function:async (args)=>{
      return new Promise(function(resolve, reject) {
        this.onAction()
        let currentWeb3 = new Web3(window.web3)
        window.ethereum.sendAsync({
          method: 'personal_sign',
          params: [args.message, window.ethereum.selectedAddress],
          from: window.ethereum.selectedAddress,
        }, (error,result)=>{

          console.log("SEND MM CALLBACK",error,result)
          if(error&&error.message){
            global.setSnackbar({msg:error.message})
            console.log("REJECT",result)
            reject(error)
          }else{
            console.log("RESOLVE",result)
            resolve(result.result)
          }

        })
      });
    }
  })
  this.setOutputData(3,{
    name:"send",
    args:[{name:"to",type:"string"},{name:"value",type:"number"},{name:"data",type:"string"},{name:"gasLimit",type:"number"},{name:"gasPrice",type:"number"}],
    function:async (args)=>{
      this.onAction()
      let currentWeb3 = new Web3(window.web3)

      const transactionParameters = {
        //gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
        //gas: '0x2710',  // customizable by user during MetaMask confirmation.
        //to: args.to, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        //value: ""+args.value, // Only required to send ether to the recipient from the initiating external account.
        //data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
        //chainId: 3 // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      }

      if(typeof args.to != "undefined" && args.to!=null ){
        transactionParameters.to = args.to
      }

      if(typeof args.value != "undefined" && args.value!=null ){
        transactionParameters.value = ""+currentWeb3.utils.toHex(args.value)
      }

      if(typeof args.data != "undefined" && args.data!=null ){
        transactionParameters.data = args.data
      }

      if(typeof args.gasLimit != "undefined" && args.gasLimit!=null ){
        transactionParameters.gas = ""+currentWeb3.utils.toHex(args.gasLimit)
      }

      if(typeof args.gasPrice != "undefined" && args.gasPrice!=null ){
        transactionParameters.gasPrice = ""+currentWeb3.utils.toHex(args.gasPrice)
      }

      console.log("transactionParameters",transactionParameters)

      window.ethereum.sendAsync({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
        from: window.ethereum.selectedAddress,
      }, (error,result)=>{

        console.log("SEND MM CALLBACK",error,result)
        if(error&&error.message){
          global.setSnackbar({msg:error.message})
        }

      })

      console.log("THIS IS GETTING CALLED?!?!?")

      return 0
    }
  })

};

MetaMask.prototype.onPropertyChanged = async function(name, value){
    this.properties[name] = value;
    if(name=="provider"){
      this.connectWeb3()
    }
  return true;
};

export default MetaMask
