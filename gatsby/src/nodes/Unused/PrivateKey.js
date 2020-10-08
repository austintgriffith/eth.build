
import React from 'react';
import ReactDOM from 'react-dom'
import {c_c} from 'color-mixer'

function PrivateKey() {
  this.addInput("", 0, { label: "" });
  this.value = 0;
  this.size = [460, 110];
}

PrivateKey.title = "PrivateKey";
PrivateKey.title_color = "#7bc969";


PrivateKey.prototype.onExecute = function() {
  if (this.inputs[0]) {
    this.value = this.getInputData(0);
  }
};

PrivateKey.prototype.getTitle = function() {
  if (this.flags.collapsed) {
    return this.value;
  }
  return this.title
};

PrivateKey.toString = function(o) {
  return o
};

PrivateKey.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR JUST NOT SHOW IT?! THIS SEEMS WEIRD
  }else{
    //console.log("this.value",this.value,this.value.substr)
    if(this.value && typeof this.value.substr == "function"){

      let leftPad = 22
      for(let i=2;i < 62;i=i+6){
        ctx.fillStyle = "#"+this.value.substr(i,6);
        ctx.fillRect(leftPad + 20*i/2.9, 20, 30, this.size[1]-40);
    /*
          //let lastMixed
          if(i < 56){
            var thisone = new c_c.Color({hex:'#'+this.value.substr(i,6)})
            var nextone = new c_c.Color({hex:'#'+this.value.substr(i+6,6)})
            var mixed = new c_c.Color({mix:[thisone,nextone]}) // same as mix($color1, $color2) in Sass
            console.log("MIXED:",mixed.hex())  // "#7f007f"
            ctx.fillStyle = mixed.hex()
            ctx.fillRect(leftPad+20 + 20*i/2.9, 40, 28, this.size[1]-40);
        console.log("lastMixed",lastMixed)
            if(!lastMixed){
              console.log("setting lastMixed ",mixed)
              lastMixed = mixed.hex()
            } else {
              thisone = new c_c.Color({hex:'#'+mixed.hex()})
              nextone = new c_c.Color({hex:'#'+lastMixed})
              mixed = new c_c.Color({mix:[thisone,nextone]}) // same as mix($color1, $color2) in Sass
              console.log("MIXEDDEEPR:",mixed.hex())  // "#7f007f"
              ctx.fillStyle = mixed.hex()
              ctx.fillRect(leftPad+40 + 0*i/2.9, 60, 28, this.size[1]-40);
              lastMixed = false
            }

          }

*/


      }

    }
    this.render(
      <div style={{fontSize:11,marginTop:6}}>
        {this.value}
      </div>
    )
};



};

export default PrivateKey
