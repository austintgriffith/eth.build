const startingName = "Function"
const staticInputs = 1
const initialWidth = 200

function Function() {
  this.addInput("","contractFunction");
  this.addOutput("",0)
  this.addOutput("",-1)

  this.properties = {name: startingName, arguments: []}
  this.size[0] = initialWidth

  this.inputValues = []
}

Function.title = "Function";
Function.prototype.getTitle = function() {
  return this.properties.name+"()";
};

Function.title_color = "#178dcd";

Function.prototype.encode = async function() {
  if(this.function && this.function.function){
    let args = {}
    for(let a in this.function.args){
      let arg = this.function.args[a]
      let index = parseInt(a)+parseInt(staticInputs)
    //  console.log("packaging args",a,staticInputs,index)
      args[arg.name] = this.getInputData(index)
    }
    //console.log("args are",args)
    this.value = await this.function.function(args)
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

        this.encode()
      }else{
        this.encode()
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

  //you will need to watch for any input to change and also trigger an encode
  const staticInputOffset = 1
  let changed = false
  for(let l=staticInputOffset;l<this.inputs.length;l++){
    //console.log("checking to see if input "+l+" has changed")
    let thisInput = this.getInputData(l)
    if(thisInput!=this.inputValues[l-staticInputOffset]){
      this.inputValues[l-staticInputOffset] = thisInput
      changed=true
    }
  }
  if(changed){
    this.encode()
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
