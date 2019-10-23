import React from 'react';
import ReactDOM from 'react-dom'
import Blockies from 'react-blockies';

import 'react-vis/dist/style.css';
import {XYPlot, LineSeries} from 'react-vis';

function Chart() {
  this.addInput("", 0);
  this.properties =  {blockieSize: 50,placeholder:"",title:"Chart",value:null}
  this.size = [300, 80];
}


const data = [
     {x: 0, y: 8},
     {x: 1, y: 5},
     {x: 2, y: 4},
     {x: 3, y: 9},
     {x: 4, y: 1},
     {x: 5, y: 7},
     {x: 6, y: 6},
     {x: 7, y: 3},
     {x: 8, y: 2},
     {x: 9, y: 0}
   ];

Chart.title = "Chart";

Chart.prototype.getTitle = function() {
  if (this.flags.collapsed && this.properties.value) {
    return this.properties.value
  }
  return "Chart";
};

Chart.prototype.onExecute = function() {
  let input = this.getInputData(0)
  if (this.inputs[0] && typeof input != "undefined" && this.properties.value != input ) {
    this.properties.value = input;
  }
  //console.log("this.properties.value",this.properties.value)
};

Chart.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR
  } else {
    this.render(
      <div style={{marginTop:10,textAlign:'left',marginLeft:45,fontSize:32}}>
        <XYPlot height={300} width={300}>
          <LineSeries data={data} />
        </XYPlot>
      </div>
    )
  }


};




export default Chart
