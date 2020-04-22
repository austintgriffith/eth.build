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
  this.addOutput("balance", "string");
  this.addOutput("tx", "string");
  this.addOutput("send()", "function");
  this.addOutput("sign()", -1);

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
    // this.transactions();
  } else {
    this.privatekey = "";
  }
  this.setOutputData(4, {
    name: "transaction",
    args: [{ name: "hash", type: "string" }],
    function: async (args) => {
      if (args.hash) {
        let count = await this.web3.eth.getTransaction(args.hash);
        return count;
      }
    },
  });
  this.setOutputData(5, {
    name: "send",
    args: [{ name: "signed", type: "string" }],
    function: async (args) => {
      if (args.signed) {
        let transactionHash = await new Promise((resolve, reject) => {
          this.web3.eth
            .sendSignedTransaction(args.signed)
            .on("transactionHash", function (hash) {
              resolve(hash);
            })
            .on("error", (e, f) => {
              global.setSnackbar({ msg: e.toString() });
            });
        });
        return transactionHash;
      }
    },
  });
};

Wallet.prototype.connectWeb3 = async function () {
  if (this.provider) {
    try {
      this.web3 = new Web3(this.provider);
      this.checkBalance();
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

Wallet.prototype.checkBalance = async function () {
  if (this.address) {
    const balance = await this.web3.eth.getBalance(this.address);
    this.setOutputData(3, balance);
  }
};

// Wallet.prototype.transactions = async function () {
//   if (this.address && this.privatekey) {
//     this.transaction = {
//       value: parseInt(this.properties.value),
//       data: "" + this.properties.data,
//       gas: parseInt(this.properties.gas),
//       gasPrice: parseInt(this.properties.gasPrice),
//       nonce: this.properties.nonce,
//     };
//     console.log("WalletAction: ", this.transaction);
//     this.setOutputData(4, this.transaction);
//   }
// };

export default Wallet;
