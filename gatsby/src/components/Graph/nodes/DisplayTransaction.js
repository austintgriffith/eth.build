import React from 'react';
import ReactDOM from 'react-dom'
import { Metamask, Gas, ContractLoader, Transactions, Events, Scaler, Blockie, Address, Button } from "dapparatus"

var Web3 = require('web3');

const defaultProvider = "https://mainnet.infura.io/v3/e59c464c322f47e2963f5f00638be2f8"

function DisplayTransaction() {
  this.addInput("[hash]", "string");
  this.addInput("[blockchain]","string")
  this.value = "";
  this.size = [380, 60];
  this.properties =  { hash: null, provider: defaultProvider, interval: 1777 }
}

DisplayTransaction.title = "Display Transaction";
DisplayTransaction.menu = "display/transaction";

DisplayTransaction.prototype.onAdded = async function() {
  this.connectWeb3()
  this.getTransaction()
  setInterval(this.getTransaction.bind(this),this.properties.interval)
  this.count = 1

  var node = document.createElement("div");
  node.id = this.id+"_react_element"
  document.getElementById("root").appendChild(node);
}

DisplayTransaction.prototype.onRemoved = async function() {
  document.getElementById(this.id+"_react_element").remove();
}



DisplayTransaction.prototype.getTransaction = async function() {
  this.count++
  if(!this.web3) this.connectWeb3()
  if(this.properties.hash){
    console.log("GET TRANSACTION",this.properties.hash,this.web3.currentProvider.host)
    this.tx = await this.web3.eth.getTransaction(this.properties.hash)
    console.log("TRANSACTION",this.tx)
  }
}

DisplayTransaction.prototype.connectWeb3 = function() {
  if(this.properties.provider){
    console.log("CONNECTING TO",this.properties.provider)
    this.web3 = new Web3(this.properties.provider)
  }
}

DisplayTransaction.prototype.onPropertyChanged = async function(name, value){
  this.properties[name] = value;

  if(name=="hash"){
    this.getTransaction()
  }
  if(name=="provider"){
    this.connectWeb3()
    this.getTransaction()
  }

  return true;
};

DisplayTransaction.prototype.onDrawForeground = function() {
  if(this.graph.canvas&&this.graph.canvas.ds){
    ReactDOM.render((
        <div key={this.id+"_react_key"} style={{
            position:'absolute',
            left:(this.pos[0]+this.graph.canvas.ds.offset[0])*this.graph.canvas.ds.scale,
            top:(this.pos[1]+this.graph.canvas.ds.offset[1])*this.graph.canvas.ds.scale,
            background:"#00FFFF",
            opacity:0.5,
            width:this.size[0]*this.graph.canvas.ds.scale,
            height:this.size[1]*this.graph.canvas.ds.scale,
            borderRadius: "0px 0px 7px 7px",
          }}>
          PFARTS {this.count}
        </div>
      ), document.getElementById(this.id+"_react_element"));
    }

    let optionalProvider = this.getInputData(1)
    if(typeof optionalProvider != "undefined" && optionalProvider!=this.properties.provider){
      this.onPropertyChanged("provider",optionalProvider)
    }else if(typeof optionalProvider == "undefined"){
      if(this.properties.provider!=defaultProvider){
        //console.log("SET BACK TO DEFAULT!!!")
        this.onPropertyChanged("provider",defaultProvider)
      }
    }
}


DisplayTransaction.prototype.onExecute = function() {

  let hash = this.getInputData(0)
  if(hash!=this.properties.hash){
    this.onPropertyChanged("hash",hash)
  }


};

/*

DisplayTransaction.prototype.getTitle = function() {
if (this.flags.collapsed) {
return this.inputs[0].label;
}
return this.title;
};

DisplayTransaction.prototype.onDrawBackground = function(ctx) {
//show the current value
this.inputs[0].label = this.value;
if(this.blockie){
ctx.drawImage(this.blockie, this.size[0]-this.properties.blockieSize-5, this.size[1]-this.properties.blockieSize-5,this.properties.blockieSize,this.properties.blockieSize);
}


};
*/


export default DisplayTransaction
