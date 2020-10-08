const keccak256 = require('keccak256')

//node constructor class
function Hash()
{
  this.addInput("input","string,number");
  this.addOutput("hash","string");
  this.properties = { };
  this.size = [120,30]
}

//name to show
Hash.title = "Hash";

//function to call when the node is executed
Hash.prototype.onExecute = function()
{
  let input = this.getInputData(0);
  if(typeof input != "undefined"){
    try{
      this.setOutputData( 0, "0x"+keccak256(input).toString('hex') );
    }catch(e){

    }
  }else{
    this.setOutputData( 0, input );
  }
}

export default Hash
