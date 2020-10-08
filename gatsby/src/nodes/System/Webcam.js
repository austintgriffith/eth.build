// Texture Webcam *****************************************
function Webcam() {
  this.addOutput("Webcam", "image");
  this.properties = { facingMode: "user" };
  this.boxcolor = "black";
  this.frame = 0;
}

Webcam.title = "Webcam";
Webcam.desc = "Webcam image";
Webcam.is_webcam_open = false;

Webcam.prototype.openStream = function() {
  if (!navigator.getUserMedia) {
    //console.log('getUserMedia() is not supported in your browser, use chrome and enable WebRTC from about://flags');
    return;
  }

  this._waiting_confirmation = true;

  // Not showing vendor prefixes.
  var constraints = {
    audio: false,
    video: { facingMode: this.properties.facingMode }
  };
  navigator.mediaDevices
  .getUserMedia(constraints)
  .then(this.streamReady.bind(this))
  .catch(onFailSoHard);

  var that = this;
  function onFailSoHard(e) {
    console.log("Webcam rejected", e);
    that._webcam_stream = false;
    Webcam.is_webcam_open = false;
    that.boxcolor = "red";
    that.trigger("stream_error");
  }
};

Webcam.prototype.closeStream = function() {
  if (this._webcam_stream) {
    var tracks = this._webcam_stream.getTracks();
    if (tracks.length) {
      for (var i = 0; i < tracks.length; ++i) {
        tracks[i].stop();
      }
    }
    Webcam.is_webcam_open = false;
    this._webcam_stream = null;
    this._video = null;
    this.boxcolor = "black";
    this.trigger("stream_closed");
  }
};

Webcam.prototype.onPropertyChanged = function(name, value) {
  if (name == "facingMode") {
    this.properties.facingMode = value;
    this.closeStream();
    this.openStream();
  }
};

Webcam.prototype.onRemoved = function() {
  this.closeStream();
};

Webcam.prototype.streamReady = function(localMediaStream) {
  this._webcam_stream = localMediaStream;
  //this._waiting_confirmation = false;
  this.boxcolor = "green";

  var video = this._video;
  if (!video) {
    video = document.createElement("video");
    video.autoplay = true;
    video.srcObject = localMediaStream;
    this._video = video;
    //document.body.appendChild( video ); //debug
    //when video info is loaded (size and so)
    video.onloadedmetadata = function(e) {
      // Ready to go. Do some stuff.
      console.log(e);
      Webcam.is_webcam_open = true;
    };
  }

  this.trigger("stream_ready", video);
};

Webcam.prototype.onExecute = function() {
  if (this._webcam_stream == null && !this._waiting_confirmation) {
    this.openStream();
  }

  if (!this._video || !this._video.videoWidth) {
    return;
  }

  this._video.frame = ++this.frame;
  this._video.width = this._video.videoWidth;
  this._video.height = this._video.videoHeight;
  this.setOutputData(0, this._video);
  for (var i = 1; i < this.outputs.length; ++i) {
    if (!this.outputs[i]) {
      continue;
    }
    switch (this.outputs[i].name) {
      case "width":
      this.setOutputData(i, this._video.videoWidth);
      break;
      case "height":
      this.setOutputData(i, this._video.videoHeight);
      break;
    }
  }
};

Webcam.prototype.getExtraMenuOptions = function(graphcanvas) {
  var that = this;
  var txt = !that.properties.show ? "Show Frame" : "Hide Frame";
  return [
    {
      content: txt,
      callback: function() {
        that.properties.show = !that.properties.show;
      }
    }
  ];
};

Webcam.prototype.onDrawBackground = function(ctx) {
  if (
    this.flags.collapsed ||
    this.size[1] <= 20 ||
    !this.properties.show
  ) {
    return;
  }

  if (!this._video) {
    return;
  }

  //render to graph canvas
  ctx.save();
  ctx.drawImage(this._video, 0, 0, this.size[0], this.size[1]);
  ctx.restore();
};

Webcam.prototype.onGetOutputs = function() {
  return [
    ["width", "number"],
    ["height", "number"],
    ["stream_ready", -1],
    ["stream_closed", -1],
    ["stream_error", -1]
  ];
};

export default Webcam
