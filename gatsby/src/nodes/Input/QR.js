import React from 'react';
import ReactDOM from 'react-dom'
import QrReader from "react-qr-reader";

function QRReader() {
  this.addInput("toggle", -1);
  this.addOutput("output", "string")
  this.addOutput("update", -1)
  this.properties = {enabled: false}
  this.size = [320, 240];
}

QRReader.title = "QR";
QRReader.desc = "Read QR code from image";

QRReader.prototype.onAction = function(){
  this.properties.enabled = !this.properties.enabled
}

QRReader.prototype.onExecute = function() {
  this.setOutputData(0,this.value)
}

QRReader.prototype.onDrawBackground = function(ctx) {
  if (!this.properties.enabled || this.flags.collapsed) {
    this.destory()
  }else{
    this.render(
      <div>
        <QrReader
          delay={500}
          onError={(e)=>{
            console.log("ERROR",e)
          }}
          onScan={(result)=>{
            console.log("SCAN",result)
            if(result && this.value!=result){
              this.value = result
              this.trigger(null, "update");
            }
          }}
          style={{ width: this.size[0]-40, height: this.size[1]-40 }}
          resolution={1200}
        />
      </div>
    )
  }
};

export default QRReader;
