function DownloadData() {
  this.size = [60, 30];
  this.addInput("data", 0 );
  this.addInput("download", -1 );
  this.properties = { filename: "data.json" };
  this.value = null;
  var that = this;
  this.addWidget("button","Download","", function(v){
    if(!that.value)
    return;
    that.downloadAsFile();
  });
}

DownloadData.title = "Download";
DownloadData.desc = "Download some data";

DownloadData.prototype.downloadAsFile = function()
{
  if(this.value == null)
  return;

  var str = null;
  if(this.value.constructor === String)
  str = this.value;
  else
  str = JSON.stringify(this.value);

  var file = new Blob([str]);
  var url = URL.createObjectURL( file );
  var element = document.createElement("a");
  element.setAttribute('href', url);
  element.setAttribute('download', this.properties.filename );
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  setTimeout( function(){ URL.revokeObjectURL( url ); }, 1000*60 ); //wait one minute to revoke url
}

DownloadData.prototype.onAction = function(action, param) {
  var that = this;
  setTimeout( function(){ that.downloadAsFile(); }, 100); //deferred to avoid blocking the renderer with the popup
}

DownloadData.prototype.onExecute = function() {
  if (this.inputs[0]) {
    this.value = this.getInputData(0);
  }
};

DownloadData.prototype.getTitle = function() {
  if (this.flags.collapsed) {
    return this.properties.filename;
  }
  return this.title;
};

export default DownloadData
