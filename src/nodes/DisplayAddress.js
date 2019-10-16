import React from 'react';
import ReactDOM from 'react-dom'
import Blockies from 'react-blockies';

function DisplayAddress() {
    this.addInput("", 0, { label: "" });
    this.value = "";
    this.size = [380, 60];
    this.properties =  {blockieSize: 50}
}

DisplayAddress.title = "Address";
DisplayAddress.menu = "display/address";

DisplayAddress.prototype.onAdded = function(){
    //////this.elementName = "graph"+this.starttime+"-"+this.id
    /////////console.log("ADDING", this.elementName)
    //////////var element = document.createElement(this.elementName);
    ////////////////////////////////////ReactDOM.createPortal(element, "body")
}

DisplayAddress.prototype.onMouseDown = function(a,b,c){
    console.log("clicked",a,b,c)
}


DisplayAddress.prototype.onExecute = function() {
    if (this.inputs[0] && this.value != this.getInputData(0)) {
        this.value = this.getInputData(0);
        /*var image = new Image();
        image.onload = ()=>{
            this.blockie = image
        };
        if(this.value && typeof this.value.toLowerCase == "function"){
            image.src = blockies.createDataURL({ seed: this.value.toLowerCase() })
        }
        */
    }
};

DisplayAddress.prototype.getTitle = function() {
    if (this.flags.collapsed) {
        return this.inputs[0].label;
    }
    return this.title;
};

DisplayAddress.prototype.onDrawBackground = function(ctx) {
  
};



export default DisplayAddress
