
import React from 'react';
import ReactDOM from 'react-dom'

function Watch() {
  this.addInput("", 0, { label: "" });
  this.value = 0;
  this.size = [300, 60];
  this.autosized = false
  this.properties = {title:"Watch"}
}

Watch.title = "Watch";

Watch.prototype.onExecute = function() {
  if (this.inputs[0]) {
    this.value = this.getInputData(0);
  }
};

Watch.prototype.getTitle = function() {
  if (this.flags.collapsed) {
    return this.value;
  }
  if(this.properties.title&&this.properties.title!="Watch"){
    return this.properties.title;
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
  if(this.value&&!this.autosized){
    this.autosized=true;
    if(typeof this.value == "object"){
      this.size = [600,100]
    }else if(typeof this.value.toString != "function"){
      this.size[0] = Math.max(200,25+12 * Math.max(this.value.length,1))
    }else{
      this.size[0] = Math.max(200,25+12 * Math.max(this.value.toString().length,1))
    }
  }

  if (this.flags.collapsed) {
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR JUST NOT SHOW IT?! THIS SEEMS WEIRD
  }else{
    this.render(
      <div>
        <pre style={{textAlign:'left',overflow:'auto',width:this.size[0]-25,height:this.size[1]-15,fontSize:18}}>{JSON.stringify(this.value,null,2)}</pre>
      </div>
    )
};



};

export default Watch
