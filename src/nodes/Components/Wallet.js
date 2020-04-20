const Web3 = require("web3");
const EthWallet = require("ethereumjs-wallet");
const hdkey = require("ethereumjs-wallet/hdkey");
const bip39 = require("bip39");
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
  this.addOutput("sign()", "function");

  this.properties = {
    title: "Wallet",
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
  const balance = await this.web3.eth.getBalance(this.address);
  this.setOutputData(3, balance);
};

export default Wallet;
