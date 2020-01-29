  function EventsAny() {
    this.addInput("",0)
    this.addOutput("", -1)
    this.size[0] = 190
  }

  EventsAny.title = "onChange";


  EventsAny.prototype.onExecute = function() {
    let currentValue = this.getInputData(0)
    if(currentValue != this.cachedValued){
      this.cachedValued = currentValue
      this.trigger("")
    }
  }

  export default EventsAny
