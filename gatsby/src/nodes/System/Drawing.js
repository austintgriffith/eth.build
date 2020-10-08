
import React from 'react';
import ReactDOM from 'react-dom'
import {SketchField, Tools} from 'react-sketch';




function Action() {
  this.addInput("",-1);
  this.properties = {
    title:"Drawing",
    value:""
  }
  this.size = [420,320]
  this.key = "WHITEBOARD"+this.id+Math.random()
  this.color = "#EEEEEE"
}

Action.title = "Drawing";

Action.prototype.onExecute = function() {
};

Action.prototype.getTitle = function() {
  return this.properties.title
};

Action.prototype.onAction = function(name,value) {
  this.key = "WHITEBOARD"+this.id+Math.random()
  this.onDrawBackground()
}

Action.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR JUST NOT SHOW IT?! THIS SEEMS WEIRD
  }else{
    let size = 18





    let colors = ["#EEEEEE","#3f51b5","#357a38","#ff9800","#b2a429","#f44336","#03A9F4","#2196f3","#a4a4a4","#b26500","#6b6b6b","#454545","#278e79","#989898","#7e57c2","#000000"].map((color, index) => {
        return (
          <div style={ {
            position:"absolute",
            left:0+index*25,
            margin:size/5,
            width:size,
            height:size,
            backgroundColor:color,
            borderRadius:"0px 0px 5px 5px",
            opacity:this.color==color?1.0:0.5,
            borderTop:this.color==color?"6px solid #ffffff":"none"
          }} onClick={()=>{
            this.color = color
          }}></div>
        )
      }
    )

    this.render(
      <div style={{marginLeft:-20,marginTop:20}} onTouchMove={touchHandler} onTouchStart={touchHandler} onTouchEnd={touchHandler}>

        <div style={{position:"absolute",left:0,top:0}}>
          {colors}
        </div>

        <SketchField id={"somethinguniqdijfdsfr"} key={this.key} width={this.size[0]-5} height={this.size[1]-30}
                         tool={Tools.Pencil}
                         lineColor={this.color}
                         lineWidth={5}/>

      </div>
    )
};



};

export default Action



const touchHandler = (event)=>{

  console.log("touchHandler",event.type)

    var touches = event.changedTouches,
        first = touches[0],
        type = "";
    switch(event.type)
    {
        case "touchstart": type = "mousedown"; event.preventDefault();break;
        case "touchmove":  type = "mousemove"; event.preventDefault();break;
      //  case "touchend":   type = "mouseup";   event.preventDefault();break;
        default:           return;
    }

    // initMouseEvent(type, canBubble, cancelable, view, clickCount,
    //                screenX, screenY, clientX, clientY, ctrlKey,
    //                altKey, shiftKey, metaKey, button, relatedTarget);

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
                                  first.screenX, first.screenY,
                                  first.clientX, first.clientY, false,
                                  false, false, false, 0/*left*/, null);

    event.target.dispatchEvent(simulatedEvent);


    //let sketcher = event.target
    console.log(event,simulatedEvent)
    //if(sketcher){
    //  console.log("dispatchEvent!!!!")
    //  sketcher.dispatchEvent(simulatedEvent)
    //}

}
