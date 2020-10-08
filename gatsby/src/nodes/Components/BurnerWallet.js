import React from "react";
import ReactDOM from "react-dom";
import Blockies from "react-blockies";

function BurnerWallet() {
  this.addInput("privatekey", "string");
  //this.addOutput("address", "string");
  this.size = [480, 640];
}

BurnerWallet.title = "Burner Wallet";

BurnerWallet.prototype.onAdded = function() {

};


BurnerWallet.prototype.onExecute = function() {
  this.setOutputData(0,"ADDRESS!");


};

BurnerWallet.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory(); ///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR
  } else {
    //console.log(this.properties);
    this.render(
      <div>
        <iframe allow={"camera; microphone"} name={"burnerframe"+this.id} id={"burnerframe"+this.id} width={this.size[0]-40} height={this.size[1]} src={this.getInputData(0)?"https://xdai.io/pk#"+this.getInputData(0):"https://xdai.io"}/>
      </div>
    );
  }
};

export default BurnerWallet;
