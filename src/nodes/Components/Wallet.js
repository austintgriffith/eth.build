const Web3 = require("web3");
const EthWallet = require("ethereumjs-wallet");
const EthUtil = require("ethereumjs-util");

const defaultProvider =
  "https://mainnet.infura.io/v3/e59c464c322f47e2963f5f00638be2f8";

function Wallet() {
  this.addInput("[blockchain]", "string");
  this.addInput("privatekey", "string");
  this.addOutput("blockchain", "string");
  this.addOutput("privatekey", "string");
  this.addOutput("address", "string");
  this.addOutput("tx", "string");
  this.addOutput("balance()", "function");
  this.addOutput("sign()", "function");
  this.addOutput("send()", "function");

  this.properties = {
    title: "Wallet",
    value: 0,
    nonce: null,
    data: "0x",
    gas: 23000,
    gasPrice: 4100000000,
  };

  this.privatekey = "";
  this.provider = defaultProvider;
  this.address = "";
}

Wallet.title = "Wallet";
Wallet.title_color = "#e91e63";

Wallet.prototype.getTitle = function () {
  return this.properties.title;
};

Wallet.prototype.onExecute = async function () {
  if (this.inputs[0] && this.getInputData(0)) {
    try {
      this.provider = this.getInputData(0);
      this.setOutputData(0, this.provider);
      this.connectWeb3();
    } catch (error) {
      console.log("error ", error);
    }
  }
  if (
    this.inputs[1] &&
    this.getInputData(1) &&
    typeof this.getInputData(1) == "string"
  ) {
    try {
      this.privatekey = this.getInputData(1);
      this.setOutputData(1, this.privatekey);
      this.onAction();
    } catch (error) {
      console.log("error ", error);
    }
  } else {
    this.privatekey = "";
  }
  this.setOutputData(3, {
    name: "transaction",
    args: [{ name: "hash", type: "string" }],
    function: async (args) => {
      if (args.hash) {
        let count = await this.web3.eth.getTransaction(args.hash);
        return count;
      }
    },
  });
  this.setOutputData(4, {
    name: "balance",
    args: [{ name: "address", type: "string" }],
    function: async (args) => {
      try {
        this.onAction();
        let currentWeb3 = new Web3(window.web3);
        let balance = await currentWeb3.eth.getBalance(args.address);
        return balance
      } catch (e) {
        console.log(e);
      }
    },
  });
  this.setOutputData(5, {
    name: "sign",
    args: [{ name: "message", type: "string" }],
    function: async (args) => {
      return new Promise((resolve, reject) => {
        this.onAction();
        let currentWeb3 = new Web3(window.web3);
        window.ethereum.sendAsync(
          {
            method: "personal_sign",
            params: [args.message, window.ethereum.selectedAddress],
            from: window.ethereum.selectedAddress,
          },
          (error, result) => {
            console.log("SEND MM CALLBACK", error, result);
            if (error && error.message) {
              global.setSnackbar({ msg: error.message });
              console.log("REJECT", result);
              reject(error);
            } else {
              console.log("RESOLVE", result);
              resolve(result.result);
            }
          }
        );
      });
    },
  });
  this.setOutputData(6, {
    name: "send",
    args: [
      { name: "to", type: "string" },
      { name: "value", type: "number" },
      { name: "data", type: "string" },
      { name: "gasLimit", type: "number" },
      { name: "gasPrice", type: "number" },
    ],
    function: async (args) => {
      return new Promise((resolve, reject) => {
        this.onAction();
        let currentWeb3 = new Web3(window.web3);

        const transactionParameters = {
          //gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
          //gas: '0x2710',  // customizable by user during MetaMask confirmation.
          //to: args.to, // Required except during contract publications.
          from: window.ethereum.selectedAddress, // must match user's active address.
          //value: ""+args.value, // Only required to send ether to the recipient from the initiating external account.
          //data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
          //chainId: 3 // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };

        if (typeof args.to != "undefined" && args.to != null) {
          transactionParameters.to = args.to;
        }

        if (typeof args.value != "undefined" && args.value != null) {
          transactionParameters.value =
            "" + currentWeb3.utils.toHex(args.value);
        }

        if (typeof args.data != "undefined" && args.data != null) {
          transactionParameters.data = args.data;
        }

        if (typeof args.gasLimit != "undefined" && args.gasLimit != null) {
          transactionParameters.gas =
            "" + currentWeb3.utils.toHex(args.gasLimit);
        }

        if (typeof args.gasPrice != "undefined" && args.gasPrice != null) {
          transactionParameters.gasPrice =
            "" + currentWeb3.utils.toHex(args.gasPrice);
        }

        console.log("transactionParameters", transactionParameters);

        window.ethereum.sendAsync(
          {
            method: "eth_sendTransaction",
            params: [transactionParameters],
            from: window.ethereum.selectedAddress,
          },
          (error, result) => {
            console.log("SEND MM CALLBACK", error, result);
            if (error && error.message) {
              global.setSnackbar({ msg: error.message });
            }
            if (result && result.result) {
              resolve(result.result);
            } else {
              resolve(result);
            }
          }
        );
      });
    },
  });
};

Wallet.prototype.connectWeb3 = async function () {
  if (this.provider) {
    try {
      this.web3 = new Web3(this.provider);
    } catch (e) {
      console.log(e);
    }
  }
};

Wallet.prototype.onAction = function () {
  const privateKeyBuffer = EthUtil.toBuffer(this.privatekey);
  const wallet = EthWallet.fromPrivateKey(privateKeyBuffer);
  this.address = wallet.getAddressString();
  this.setOutputData(2, this.address);
};


export default Wallet;
