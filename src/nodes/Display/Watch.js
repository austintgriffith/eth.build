
import React from 'react';
import ReactDOM from 'react-dom'

function Watch() {
  this.addInput("", 0, { label: "" });
  this.value = 0;
  this.size = [300, 60];
  this.properties = {autosize:true}
}

Watch.title = "Watch";

Watch.prototype.onExecute = function() {
  if (this.inputs[0]) {
    this.value = this.getInputData(0);
  }
};

Watch.prototype.getTitle = function() {
  if (this.flags.collapsed) {
    return this.inputs[0].label;
  }
  if(this.value){
    return (typeof this.value)
  }
  return this.title
};

Watch.toString = function(o) {
  return o
};

Watch.prototype.onDrawBackground = function(ctx) {
  if(this.value&&this.properties.autosize){
    if(typeof this.value.toString != "function"){
      this.size[0] = Math.max(90,25+11 * this.value.length)
    }else{
      this.size[0] = Math.max(90,25+11 * this.value.toString().length)
    }
  }

  if (this.flags.collapsed) {
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR
  }else{
    this.render(
      <div>
        <pre style={{textAlign:'left',overflow:'auto',width:this.size[0]-25,height:this.size[1]-15,fontSize:12}}>{JSON.stringify(this.value,null,2)}</pre>
      </div>
    )
};



};

export default Watch
