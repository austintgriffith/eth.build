  function EventsAny() {
      this.addOutput("start", -1);// -1 is LiteGraph.EVENT
  }

  EventsAny.title = "onStart";


  EventsAny.prototype.onAdded = function(event, action) {
    setTimeout(()=>{
      this.trigger("start");
    },2000)
  }

  export default EventsAny
