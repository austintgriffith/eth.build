import React from 'react';
import ReactDOM from 'react-dom'

function Timestamp() {
  this.addOutput("", "number");
  this.properties =  {title:"Timestamp"}
  this.size = [200, 60];
}

Timestamp.title = "Timestamp";

Timestamp.prototype.onExecute = async function() {
  this.setOutputData(0,Date.now())
};


export default Timestamp
