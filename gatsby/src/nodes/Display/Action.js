
import React from 'react';
import ReactDOM from 'react-dom'

function Action() {
  this.addInput("",-1);
  this.properties = {
    title:"Action",
    value:""
  }
  this.size = [310,220]
}

Action.title = "Action";

Action.prototype.onExecute = function() {
};

Action.prototype.getTitle = function() {
  return this.properties.title
};

Action.prototype.onAction = function(name,value) {
  console.log("ACTION",name,value)
  this.value = JSON.stringify(value,null,2)
  this.properties.title = name
}

Action.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR JUST NOT SHOW IT?! THIS SEEMS WEIRD
  }else{
    this.render(
      <div>
        <pre style={{margin:10,border:"1px solid #111111",background:"#222222",color:"#cccccc",textAlign:"left",width:this.size[0]-40,height:this.size[1]-20}}>
          {this.value}
        </pre>
      </div>
    )
};



};

export default Action
