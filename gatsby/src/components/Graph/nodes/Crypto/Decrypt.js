const EthCrypto = require('eth-crypto');

//node constructor class
function Decrypt()
{
  this.addInput("private key","string");
  this.addInput("encrypted","string");
  this.addOutput("decrypted","object");
  this.properties = { };
  this.size = [180,45]
}

//name to show
Decrypt.title = "Decrypt";

//function to call when the node is executed
Decrypt.prototype.onExecute = async function()
{
  let clean = true

  let privateKey = this.getInputData(0)
  if(privateKey != this.privateKey){
    clean = false
    this.privateKey = privateKey
  }

  let encrypted = this.getInputData(1)
  if(encrypted != this.encrypted){
    clean = false
    this.encrypted = encrypted
  }

  if(!clean && this.privateKey && this.encrypted){
    try{
      let parsedData = EthCrypto.cipher.parse(this.encrypted.replace("0x",""))
      this.decrypted = await EthCrypto.decryptWithPrivateKey(
       this.privateKey,
       parsedData // encrypted-data
      );
    }catch(e){console.log(e)}
  }
  this.setOutputData(0,this.decrypted )

}

export default Decrypt
