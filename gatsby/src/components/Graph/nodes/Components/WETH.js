var Web3 = require('web3');

//choose your default RPC if they don't define a blockchain
const defaultProvider = "https://mainnet.infura.io/v3/e59c464c322f47e2963f5f00638be2f8"

function CustomContractBlock() {
  //if you want to customize your inputs and outputs you can here:
  this.addInput("[blockchain]","string")
  this.addInput("[address]","string")
  this.addOutput("address","string")

  // mark how many static outputs you define above so the auto contract parse starts after those
  this.staticOutputs = 1

  this.properties =  {
    provider: defaultProvider
  }
  this.size[0] = 210
}

//choose your default contract address
CustomContractBlock.prototype.address = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"

//hard code your abi and signal to the custom node loader to also include "this.parseContract()" function that adds outputs automatically from the abi
//(you can control outputs by cleaning up the ABI)
CustomContractBlock.prototype.abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]

//name your block and give it a color:
CustomContractBlock.title = "WETH";
CustomContractBlock.title_color = "#444444";

//when it is added it will connect web3 and parse your abi
CustomContractBlock.prototype.onAdded = async function() {
  this.connectWeb3()
  this.parseContract() //this function is added when it detects the ABI hardcoded above
}

CustomContractBlock.prototype.connectWeb3 = function() {
  if(this.properties.provider){
    try{
      this.web3 = new Web3(this.properties.provider)
    }catch(e){
      console.log(e)
    }
  }
}

//every exectuion loop (running constantly) we look for new inputs and parse the abi if needed
CustomContractBlock.prototype.onExecute = async function() {
  let changed = false

  let address = this.getInputData(1)
  if(address && address!=this.address){
    this.address=address
    changed = true
  }

  if(changed){
      this.parseContract()
  }

  this.setOutputData(0,this.address)

  //this function comes in when it detects you have an ABI
  this.buildABIOutputs()
};

export default CustomContractBlock
