  function EventsAny() {
      this.addInput("A", -1); //-1 is LiteGraph.ACTION
      this.addInput("B", -1); //-1 is LiteGraph.ACTION
      this.addInput("C", -1); //-1 is LiteGraph.ACTION
      this.addOutput("output", -1);// -1 is LiteGraph.EVENT
  }

  EventsAny.title = "Any";

  EventsAny.prototype.onAction = function(event, action) {
    this.trigger("output");
  }

  export default EventsAny
