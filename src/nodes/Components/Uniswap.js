var Web3 = require('web3');

const defaultProvider = "https://mainnet.infura.io/v3/e59c464c322f47e2963f5f00638be2f8"

const abi = [
  {
    "name": "TokenPurchase",
    "inputs": [
      {
        "type": "address",
        "name": "buyer",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "eth_sold",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "tokens_bought",
        "indexed": true
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "EthPurchase",
    "inputs": [
      {
        "type": "address",
        "name": "buyer",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "tokens_sold",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "eth_bought",
        "indexed": true
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "AddLiquidity",
    "inputs": [
      {
        "type": "address",
        "name": "provider",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "eth_amount",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "token_amount",
        "indexed": true
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "RemoveLiquidity",
    "inputs": [
      {
        "type": "address",
        "name": "provider",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "eth_amount",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "token_amount",
        "indexed": true
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "Transfer",
    "inputs": [
      {
        "type": "address",
        "name": "_from",
        "indexed": true
      },
      {
        "type": "address",
        "name": "_to",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "_value",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "Approval",
    "inputs": [
      {
        "type": "address",
        "name": "_owner",
        "indexed": true
      },
      {
        "type": "address",
        "name": "_spender",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "_value",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "setup",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "token_addr"
      }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 175875
  },
  {
    "name": "addLiquidity",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "min_liquidity"
      },
      {
        "type": "uint256",
        "name": "max_tokens"
      },
      {
        "type": "uint256",
        "name": "deadline"
      }
    ],
    "constant": false,
    "payable": true,
    "type": "function",
    "gas": 82616
  },
  {
    "name": "removeLiquidity",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      },
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "amount"
      },
      {
        "type": "uint256",
        "name": "min_eth"
      },
      {
        "type": "uint256",
        "name": "min_tokens"
      },
      {
        "type": "uint256",
        "name": "deadline"
      }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 116814
  },
  {
    "name": "__default__",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": true,
    "type": "function"
  },
  {
    "name": "ethToTokenSwapInput",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "min_tokens"
      },
      {
        "type": "uint256",
        "name": "deadline"
      }
    ],
    "constant": false,
    "payable": true,
    "type": "function",
    "gas": 12757
  },
  {
    "name": "ethToTokenTransferInput",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "min_tokens"
      },
      {
        "type": "uint256",
        "name": "deadline"
      },
      {
        "type": "address",
        "name": "recipient"
      }
    ],
    "constant": false,
    "payable": true,
    "type": "function",
    "gas": 12965
  },
  {
    "name": "ethToTokenSwapOutput",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "tokens_bought"
      },
      {
        "type": "uint256",
        "name": "deadline"
      }
    ],
    "constant": false,
    "payable": true,
    "type": "function",
    "gas": 50463
  },
  {
    "name": "ethToTokenTransferOutput",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "tokens_bought"
      },
      {
        "type": "uint256",
        "name": "deadline"
      },
      {
        "type": "address",
        "name": "recipient"
      }
    ],
    "constant": false,
    "payable": true,
    "type": "function",
    "gas": 50671
  },
  {
    "name": "tokenToEthSwapInput",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "tokens_sold"
      },
      {
        "type": "uint256",
        "name": "min_eth"
      },
      {
        "type": "uint256",
        "name": "deadline"
      }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 47503
  },
  {
    "name": "tokenToEthTransferInput",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "tokens_sold"
      },
      {
        "type": "uint256",
        "name": "min_eth"
      },
      {
        "type": "uint256",
        "name": "deadline"
      },
      {
        "type": "address",
        "name": "recipient"
      }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 47712
  },
  {
    "name": "tokenToEthSwapOutput",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "eth_bought"
      },
      {
        "type": "uint256",
        "name": "max_tokens"
      },
      {
        "type": "uint256",
        "name": "deadline"
      }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 50175
  },
  {
    "name": "tokenToEthTransferOutput",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "eth_bought"
      },
      {
        "type": "uint256",
        "name": "max_tokens"
      },
      {
        "type": "uint256",
        "name": "deadline"
      },
      {
        "type": "address",
        "name": "recipient"
      }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 50384
  },
  {
    "name": "tokenToTokenSwapInput",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "tokens_sold"
      },
      {
        "type": "uint256",
        "name": "min_tokens_bought"
      },
      {
        "type": "uint256",
        "name": "min_eth_bought"
      },
      {
        "type": "uint256",
        "name": "deadline"
      },
      {
        "type": "address",
        "name": "token_addr"
      }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 51007
  },
  {
    "name": "tokenToTokenTransferInput",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "tokens_sold"
      },
      {
        "type": "uint256",
        "name": "min_tokens_bought"
      },
      {
        "type": "uint256",
        "name": "min_eth_bought"
      },
      {
        "type": "uint256",
        "name": "deadline"
      },
      {
        "type": "address",
        "name": "recipient"
      },
      {
        "type": "address",
        "name": "token_addr"
      }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 51098
  },
  {
    "name": "tokenToTokenSwapOutput",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "tokens_bought"
      },
      {
        "type": "uint256",
        "name": "max_tokens_sold"
      },
      {
        "type": "uint256",
        "name": "max_eth_sold"
      },
      {
        "type": "uint256",
        "name": "deadline"
      },
      {
        "type": "address",
        "name": "token_addr"
      }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 54928
  },
  {
    "name": "tokenToTokenTransferOutput",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "tokens_bought"
      },
      {
        "type": "uint256",
        "name": "max_tokens_sold"
      },
      {
        "type": "uint256",
        "name": "max_eth_sold"
      },
      {
        "type": "uint256",
        "name": "deadline"
      },
      {
        "type": "address",
        "name": "recipient"
      },
      {
        "type": "address",
        "name": "token_addr"
      }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 55019
  },
  {
    "name": "tokenToExchangeSwapInput",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "tokens_sold"
      },
      {
        "type": "uint256",
        "name": "min_tokens_bought"
      },
      {
        "type": "uint256",
        "name": "min_eth_bought"
      },
      {
        "type": "uint256",
        "name": "deadline"
      },
      {
        "type": "address",
        "name": "exchange_addr"
      }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 49342
  },
  {
    "name": "tokenToExchangeTransferInput",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "tokens_sold"
      },
      {
        "type": "uint256",
        "name": "min_tokens_bought"
      },
      {
        "type": "uint256",
        "name": "min_eth_bought"
      },
      {
        "type": "uint256",
        "name": "deadline"
      },
      {
        "type": "address",
        "name": "recipient"
      },
      {
        "type": "address",
        "name": "exchange_addr"
      }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 49532
  },
  {
    "name": "tokenToExchangeSwapOutput",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "tokens_bought"
      },
      {
        "type": "uint256",
        "name": "max_tokens_sold"
      },
      {
        "type": "uint256",
        "name": "max_eth_sold"
      },
      {
        "type": "uint256",
        "name": "deadline"
      },
      {
        "type": "address",
        "name": "exchange_addr"
      }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 53233
  },
  {
    "name": "tokenToExchangeTransferOutput",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "tokens_bought"
      },
      {
        "type": "uint256",
        "name": "max_tokens_sold"
      },
      {
        "type": "uint256",
        "name": "max_eth_sold"
      },
      {
        "type": "uint256",
        "name": "deadline"
      },
      {
        "type": "address",
        "name": "recipient"
      },
      {
        "type": "address",
        "name": "exchange_addr"
      }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 53423
  },
  {
    "name": "getEthToTokenInputPrice",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "eth_sold"
      }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 5542
  },
  {
    "name": "getEthToTokenOutputPrice",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "tokens_bought"
      }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 6872
  },
  {
    "name": "getTokenToEthInputPrice",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "tokens_sold"
      }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 5637
  },
  {
    "name": "getTokenToEthOutputPrice",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "eth_bought"
      }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 6897
  },
  {
    "name": "tokenAddress",
    "outputs": [
      {
        "type": "address",
        "name": "out"
      }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1413
  },
  {
    "name": "factoryAddress",
    "outputs": [
      {
        "type": "address",
        "name": "out"
      }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1443
  },
  {
    "name": "balanceOf",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "_owner"
      }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1645
  },
  {
    "name": "transfer",
    "outputs": [
      {
        "type": "bool",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "_to"
      },
      {
        "type": "uint256",
        "name": "_value"
      }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 75034
  },
  {
    "name": "transferFrom",
    "outputs": [
      {
        "type": "bool",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "_from"
      },
      {
        "type": "address",
        "name": "_to"
      },
      {
        "type": "uint256",
        "name": "_value"
      }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 110907
  },
  {
    "name": "approve",
    "outputs": [
      {
        "type": "bool",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "_spender"
      },
      {
        "type": "uint256",
        "name": "_value"
      }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 38769
  },
  {
    "name": "allowance",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "_owner"
      },
      {
        "type": "address",
        "name": "_spender"
      }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1925
  },
  {
    "name": "name",
    "outputs": [
      {
        "type": "bytes32",
        "name": "out"
      }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1623
  },
  {
    "name": "symbol",
    "outputs": [
      {
        "type": "bytes32",
        "name": "out"
      }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1653
  },
  {
    "name": "decimals",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1683
  },
  {
    "name": "totalSupply",
    "outputs": [
      {
        "type": "uint256",
        "name": "out"
      }
    ],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1713
  }
]






const erc20abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "spender",
                "type": "address"
            },
            {
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "from",
                "type": "address"
            },
            {
                "name": "to",
                "type": "address"
            },
            {
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "to",
                "type": "address"
            },
            {
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
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
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
]

const staticOutputs = 1


function
Uniswap() {
  this.addInput("[address]","string")
  this.addOutput("address","string")
  this.addOutput("tokenAddress()","function")
  this.addOutput("price()","function")
  this.addOutput("tokenToEth()","function")
  this.addOutput("ethToToken()","function")


  this.properties =  {
    provider: defaultProvider
  }

  this.size[0] = 210
  this.abi = abi
  this.address = "0x2a1530C4C41db0B0b2bB646CB5Eb1A67b7158667" // ETH <--> DAI
}

Uniswap.title = "Uniswap";
Uniswap.title_color = "#cc4499";

Uniswap.prototype.onAdded = async function() {
  this.connectWeb3()
}

Uniswap.prototype.connectWeb3 = function() {
  if(this.properties.provider){
    try{
      this.web3 = new Web3(this.properties.provider)
    }catch(e){
      console.log(e)
    }
  }
}

Uniswap.prototype.onExecute = async function() {

  let address = this.getInputData(0)
  if(address && address!=this.address){
    this.address=address
    this.connectWeb3()
  }

  this.setOutputData(0,this.address)

  this.setOutputData(1,{
    name:"tokenAddress",
    args:[],
    function:async (args)=>{
      let callArgs = []
      if(!this.web3){
        this.connectWeb3()
      }
      let thisContract = new this.web3.eth.Contract(this.abi,this.address)
      try{
        return (thisContract.methods.tokenAddress()).call()
      }catch(e){
        return false
      }
    }
  })

  this.setOutputData(2,{
    name:"price",
    args:[],
    function:async (args)=>{
      let callArgs = []
      if(!this.web3){
        this.connectWeb3()
      }
      let thisContract = new this.web3.eth.Contract(this.abi,this.address)
      let tokenAddress = await (thisContract.methods.tokenAddress()).call()
      let tokenContract = new this.web3.eth.Contract(erc20abi,tokenAddress)
      let tokenBalance = await (tokenContract.methods.balanceOf(this.address)).call()
      let ethBalance = await this.web3.eth.getBalance(this.address)
      let outputPrice = await (thisContract.methods.getTokenToEthOutputPrice(10000000)).call()
      try{
        return ((outputPrice/10000000)+(tokenBalance/ethBalance))/2
      }catch(e){
        return false
      }
    }
  })


  //DAI TO ETH -- tokenToEthSwapOutput

  //eth_bought ( 1 ETH ) 0000000000000000000000000000000000000000000000000de0b6b3a7640000
  //max_tokens ( 219.2180 ) 00000000000000000000000000000000000000000000000be24306d75c5a26db
  //deadline ( 1583690871 ) 000000000000000000000000000000000000000000000000000000005e653477

  this.setOutputData(3,{
    name:"tokenToEth",
    args:[{name:"tokenAmountInWei",type:"number,string"}],
    function:async (args)=>{
      console.log("send called",args)
      console.log("Converting tokens to eth ")

      if(!this.web3){
        this.connectWeb3()
      }

      let tokensIn = this.web3.utils.fromWei(""+args['tokenAmountInWei'])

      console.log("tokensIn",tokensIn)

      //you create the contract and spread the args in it and the abiEncode and return that
      let thisContract = new this.web3.eth.Contract(this.abi,this.address)

      let outputPrice = await (thisContract.methods.getTokenToEthOutputPrice(10000000)).call()

      let eth_bought = ( ( tokensIn / (outputPrice/10000000) ) * .997 ) * 10**18

      console.log("eth_bought",eth_bought)

      let deadline = Math.round(Date.now()/1000)+1300

      console.log("deadline",deadline)

      let tokensInWei = this.web3.utils.toWei(""+tokensIn)

      console.log("tokensInWei",tokensInWei)

      try{
        return (thisContract.methods.tokenToEthSwapOutput(""+eth_bought,""+tokensInWei,""+deadline)).encodeABI()
      }catch(e){console.log(e)}
    }
  })

  //ETH TO DAI ---- ethToTokenSwapInput
  //min tokens  b8fbb5ae7fdaaa26f  (lower than low price )
  // deadline


  this.setOutputData(4,{
    name:"ethToToken",
    args:[{name:"valueInWei",type:"number,string"}],
    function:async (args)=>{
      console.log("send called",args)
      console.log("Converting eth to dai ")

      if(!this.web3){
        this.connectWeb3()
      }

      let value = this.web3.utils.fromWei(""+args['valueInWei'])

      //you create the contract and spread the args in it and the abiEncode and return that
      let thisContract = new this.web3.eth.Contract(this.abi,this.address)
      let tokenAddress = await (thisContract.methods.tokenAddress()).call()
      let tokenContract = new this.web3.eth.Contract(erc20abi,tokenAddress)
      let tokenBalance = await (tokenContract.methods.balanceOf(this.address)).call()
      let ethBalance = await this.web3.eth.getBalance(this.address)

      let price = (tokenBalance/ethBalance)

      console.log("starting price",price)

      price = price*0.994

      console.log("price with fee ",price)

      let deadline = Math.round(Date.now()/1000)+1300

      console.log("deadline",deadline)

      let priceTimesValue = (price*value)

      console.log("priceTimesValue",priceTimesValue)

      let minTokens = this.web3.utils.toWei(""+priceTimesValue)

      console.log("minTokens",minTokens)

      try{
        return (thisContract.methods.ethToTokenSwapInput(""+minTokens,""+deadline)).encodeABI()
      }catch(e){console.log(e)}
    }
  })



};


export default Uniswap
