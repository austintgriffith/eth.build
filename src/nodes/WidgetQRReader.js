const jsQR = require("jsqr");

function WidgetQRReader() {
  this.addInput("", "image,canvas");
  this.addOutput("output", "string")
  this.size = [640, 480];
}

WidgetQRReader.title = "QR Reader";
WidgetQRReader.desc = "Read QR code from image";
WidgetQRReader.menu = "widget/qrreader";

WidgetQRReader.widgets = [
  { name: "resize", text: "Resize box", type: "button" },
  { name: "view", text: "View Image", type: "button" }
];

WidgetQRReader.prototype.onDrawBackground = function(ctx) {
  if (this.frame && !this.flags.collapsed) {
    //console.log("videoHeight",this.frame.videoHeight)
    //console.log("videoWidth",this.frame.videoWidth)

    let widthRatio = this.frame.videoWidth / this.size[0]
    let heightRatio = this.frame.videoHeight / this.size[1]
    let ratio = this.frame.videoWidth / this.frame.videoHeight
    
    ctx.drawImage(this.frame, 10, 10, this.size[0]-20, (this.size[0]/ratio)-20);

    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    if(this.code){
      this.drawLine(ctx,this.code.location.topLeftCorner, this.code.location.topRightCorner, "#7dff77");
      this.drawLine(ctx,this.code.location.topRightCorner, this.code.location.bottomRightCorner, "#7dff77");
      this.drawLine(ctx,this.code.location.bottomRightCorner, this.code.location.bottomLeftCorner, "#7dff77");
      this.drawLine(ctx,this.code.location.bottomLeftCorner, this.code.location.topLeftCorner, "#7dff77");
    }

    this.imageData = ctx.getImageData(0+this.pos[0], 0+this.pos[1],  this.frame.videoWidth, this.frame.videoHeight);
    this.frameWidth = this.frame.videoWidth
    this.frameHeight = this.frame.videoHeight

    ctx.restore();

  }
};


WidgetQRReader.prototype.drawLine = function(canvas, begin, end, color) {
  canvas.beginPath();
  canvas.moveTo(begin.x-this.pos[0], begin.y-this.pos[1]);
  canvas.lineTo(end.x-this.pos[0], end.y-this.pos[1]);
  canvas.lineWidth = 6;
  canvas.strokeStyle = color;
  canvas.stroke();
}

WidgetQRReader.prototype.onExecute = function() {
  this.frame = this.getInputData(0);
  if(this.imageData){
    //console.log("IMAGE DATA?",this.imageData.data, this.frame.videoWidth, this.frame.videoHeight)
    this.code =  jsQR(this.imageData.data, this.frameWidth, this.frameHeight);
    if(this.code) {
      console.log("CODE",this.code)
      this.setOutputData(0,this.code.data)
    }
    this.imageData = false
  }
  this.setDirtyCanvas(true);
};

WidgetQRReader.prototype.onWidget = function(e, widget) {
  if (widget.name == "resize" && this.frame) {
    var width = this.frame.width;
    var height = this.frame.height;

    if (!width && this.frame.videoWidth != null) {
      width = this.frame.videoWidth;
      height = this.frame.videoHeight;
    }

    if (width && height) {
      this.size = [width, height];
    }
    this.setDirtyCanvas(true, true);
  } else if (widget.name == "view") {
    this.show();
  }
};



export default WidgetQRReader;
