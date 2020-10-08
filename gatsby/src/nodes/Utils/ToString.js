function ToString() {
  this.addInput("",0)
  this.addOutput("", "string");
  this.size = [170, 30];
}

ToString.title = "ToString";

ToString.prototype.onExecute = function() {
let input = this.getInputData(0)
if(!input){
  this.value = ""
}else if(typeof input.toString == "function"){
  this.value = input.toString()
}else{
  this.value = ""+input
}
  this.setOutputData(0,this.value);
};


export default ToString
