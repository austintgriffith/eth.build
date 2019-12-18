const startingName = "Function"
const staticInputs = 2
const initialWidth = 230

function Function() {
  this.addInput("","function");
  this.addInput("call",-1)
  this.addOutput("value",0)
  this.addOutput("",-1)

  this.properties = {name: startingName, arguments: []}
  this.size[0] = initialWidth
  this.value = null
}

Function.title = "Function";
Function.prototype.getTitle = function() {
  return this.properties.name+"()";
};

Function.prototype.onAction = async function() {
  if(this.function && this.function.function){
    let args = {}
    for(let a in this.function.args){
      let arg = this.function.args[a]
      let index = parseInt(a)+parseInt(staticInputs)
      //console.log("packaging args",a,staticInputs,index)
      args[arg.name] = this.getInputData(index)
    }
    //console.log("args are",args)
    //console.log("calling function")
    this.value = await this.function.function(args)
    //console.log("called, trigger...")
    this.trigger("",this.value)
  }
}



Function.prototype.onExecute = function() {
  let input = this.getInputData(0)
  if (this.inputs[0] && input && input.name) {
    if(!this.function || input.name!=this.function.name){
      this.function = input
      if(input.name != this.properties.name){
        this.properties.name = input.name
        this.cleanInputs()
        console.log("UPDATE FUNCTIONS",input.args,this.inputs)
        for(let a in input.args){
          let arg = input.args[a]
          console.log("ADD ARG",a,arg)
          this.addInput(arg.name,arg.type)
        }
        this.size[0] = initialWidth
      }
    }
  }else{
    if(this.function!=null){
      this.function = null
      this.properties.name = startingName
      this.cleanInputs()
      this.size[0] = initialWidth
    }
  }
  this.setOutputData(0,this.value)
};

Function.prototype.cleanInputs = function() {
  let overflow = this.inputs.length-staticInputs
  while(overflow>0){
    let index = this.inputs.length-1
    console.log("removing input ",index)
    this.removeInput(index)
    overflow--
  }
}
export default Function
