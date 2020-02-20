
var QRCode = require('qrcode')

function DisplayQR() {
    this.addInput("", 0, { label: "" });
    this.size = [400,400]
    this.value = "";
    this.properties = {qrSize:280,light:false}
}

DisplayQR.title = "QR";

DisplayQR.prototype.onExecute = function() {
    if (this.inputs[0] && this.value != this.getInputData(0)) {
        this.value = this.getInputData(0);
        if(this.value){
            //console.log("QR VALUE ",this.value)
            QRCode.toDataURL(this.value, {color: {
              dark: this.properties.light?'#111':'#eee',
              light: this.properties.light?'#eee':'#111',
              width: this.size[0],
              height: this.size[1],
            }} , (err, url) => {
                var image = new Image();
                image.onload = ()=>{
                  this.qr = image
                  //console.log("QR SET",this.qr)
                };
                if(this.value){
                  image.src = url;
                  //console.log("SRC",image.src)
                }
            })
        }
    }
};

DisplayQR.prototype.getTitle = function() {
    if (this.flags.collapsed) {
        return this.inputs[0].label;
    }
    return this.title;
};

DisplayQR.prototype.onDrawBackground = function(ctx) {
    //show the current value
    this.inputs[0].label = this.value;
    if(this.qr){
        //ctx.drawImage(this.qr, this.size[0]-this.properties.qrSize-5, this.size[1]-this.properties.qrSize-5,this.properties.qrSize,this.properties.qrSize);
        ctx.drawImage(this.qr, 0, 0, Math.min(this.size[0], this.size[1]), Math.min(this.size[0], this.size[1]))
    }


};

export default DisplayQR
