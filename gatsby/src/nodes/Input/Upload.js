import React from 'react';
import ReactDOM from 'react-dom'

function Upload() {
  this.addOutput("", "string");
  this.size = [220,86]

  this.onChangeHandler=event=>{
     console.log("CHANGE OF INPUT!")
      console.log(event.target.files[0])
      var data = event.target.result;
      //console.log(this.graph.getNodeById(this.id))
      this.onDropFile(event.target.files[0]);
  }


}

Upload.title = "Upload";

Upload.prototype.onDrawBackground = function(ctx) {

  if (this.flags.collapsed) {
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR
  }else{
    this.render(
      <div onDrop={(e)=>{
        console.log("Drop")
        this.graph.canvas.processDrop(e)
      }}>
        <div style={{textAlign:"left",padding:20}}>
          Drag and Drop or
        </div>
        <input type="file" name="file" onChange={this.onChangeHandler}/>
      </div>
    )
  }

};

Upload.prototype.onExecute = function() {
  if(this.contents){
    this.setOutputData(0, this.contents);
  }
};


Upload.prototype.onDropFile = function(file) {
  console.log("dropped file",file)
  this.file = file
  var that = this;

  var reader = new FileReader();
  reader.onload = (event) => {
    this.contents = event.target.result
    this.length = event.target.result.length
    this.setOutputData(0, this.contents);
  }
  this.properties.file = JSON.stringify(file)
  //console.log("file:",file)
  this.name = file.name
  reader.readAsText(file)
};

export default Upload
