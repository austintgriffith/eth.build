import React from 'react';
import ReactDOM from 'react-dom'

import { List, ListItem, ListItemText } from '@material-ui/core';

function DisplayList() {
  this.addInput("",0)
  this.addInput("add",-1)
  this.addInput("reset",-1)
  this.addOutput("",0)
  this.addOutput("latest",0)
  this.properties =  {title:"List",fontSize:18,autoAddNewItem:true}
  this.size = [250,250]
  this.list = []
  this.lastItem = null
}

DisplayList.title = "List";

DisplayList.prototype.onExecute = function() {
  let input = this.getInputData(0)
  if(input && this.lastItem!=input && this.properties.autoAddNewItem){
    this.lastItem = input
    this.list.push(input)
  }
  this.setOutputData(1,this.lastItem)
  this.setOutputData(0,this.list)
}

DisplayList.prototype.onAction = function(action) {
  if(action == "reset"){
    this.list = []
  }else{
    let input = this.getInputData(0)
    if(input){
      this.lastItem = input
      this.list.push(input)
    }
  }
}


DisplayList.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR
  }else{
    this.render(
      <div>
        <List dense={true}>
          {
            this.list.map( item =>{
              return (
                <ListItem>
                  <ListItemText
                    primary={item}
                  />
                </ListItem>
              )
            })
          }
        </List>
      </div>
    )
  }
};

export default DisplayList
