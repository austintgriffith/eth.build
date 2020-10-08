import React from 'react';
import ReactDOM from 'react-dom'
import Blockies from 'react-blockies';
import ReactPlayer from 'react-player'

function Text() {
  this.properties =  {url:"",title:"Video"}
  this.size = [640, 360];
}

Text.title = "Video";

Text.prototype.getTitle = function() {
  if (this.flags.collapsed && this.properties.value) {
    return this.properties.value
  }
  return this.properties.title;
};



Text.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR
  }else if(this.properties.url){
    this.render(
      <div>
        <ReactPlayer url={this.properties.url} playing controls={true} width={this.size[0]-40} height={this.size[1]-20}/>
      </div>
    )
  } else {
    this.render(
      <div style={{fontSize:11,color:"#FFF",margin:30}}>
        (edit url to show video)
      </div>
    )
  }
};




export default Text
