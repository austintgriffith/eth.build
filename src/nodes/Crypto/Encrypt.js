const EthCrypto = require('eth-crypto');

//node constructor class
function Encrypt()
{
  this.addInput("public key","string");
  this.addInput("message","string");
  this.addOutput("object","object");
  this.addOutput("encrypted","string");
  this.properties = { };
  this.size = [180,45]
}

//name to show
Encrypt.title = "Encrypt";

//function to call when the node is executed
Encrypt.prototype.onExecute = async function()
{
  let clean = true

  let publicKey = this.getInputData(0)
  if(publicKey != this.publicKey){
    clean = false
    this.publicKey = publicKey
  }

  let message = this.getInputData(1)
  if(message != this.message){
    clean = false
    this.message = message
  }

  if(!clean && this.publicKey && this.message){
    console.log("CHANGE")
    try{
      this.object = await EthCrypto.encryptWithPublicKey(
          this.publicKey.replace("0x",""),
          this.message
      );
      const encryptedString = EthCrypto.cipher.stringify(this.object)
      console.log("encryptedString",encryptedString)
      this.encrypted = "0x"+encryptedString
    }catch(e){
      console.log(e)
    }
  }
  this.setOutputData( 0, this.object )
  this.setOutputData( 1, this.encrypted )

}

export default Encrypt
