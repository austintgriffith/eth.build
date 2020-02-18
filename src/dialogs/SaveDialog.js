import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import "litegraph.js/css/litegraph.css";

import { Icon, Button, CardActions, Divider } from "@material-ui/core";

var codec = require("json-url")("lzw");
var QRCode = require("qrcode.react");

function SaveDialog(props) {
  const { liteGraph, setOpenSaveDialog, openSaveDialog, dynamicWidth } = props;

  const [compressed, setCompressed] = React.useState();

  React.useEffect(() => {
    if (liteGraph)
      codec.compress(liteGraph.serialize()).then(data => {
        setCompressed(data);
      });
  }, [liteGraph]);

  let link =
    window.location.protocol + "//" + window.location.host + "/" + compressed;

  let qrcode = "";
  if (link && link.length < 2580) {
    qrcode = (
      <div>
        <QRCode
          size={dynamicWidth}
          value={link}
          style={{ border: "1px solid #dddddd", padding: 5, margin: 5 }}
        />
      </div>
    );
  }

  return (
    <Dialog
      onClose={() => {
        setOpenSaveDialog(false);
      }}
      open={openSaveDialog}
      maxWidth={Math.round(dynamicWidth * 1.1)}
    >
      <DialogTitle id="save-dialog" style={{ textAlign: "center" }}>
        <Icon style={{ verticalAlign: "middle" }}>save</Icon>
        <span style={{ fontsize: 38, fontWeight: "bold" }}>Save</span>
      </DialogTitle>
      <Divider />
      <CardActions
        style={{ justifyContent: "center", paddingTop: 30, paddingBottom: 10 }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            let webfile =
              `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
<key>URL</key>
<string>https://eth.build/` +
              compressed +
              `</string>
</dict>
</plist>
`;

            var file = new Blob([webfile]);
            var url = URL.createObjectURL(file);
            var element = document.createElement("a");
            element.setAttribute("href", url);
            element.setAttribute("download", global.title + ".webloc");
            element.style.display = "none";
            if (document.body) {
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
              setTimeout(function() {
                URL.revokeObjectURL(url);
              }, 1000 * 60);
              setOpenSaveDialog(false);
            }
          }}
        >
          Download
        </Button>
      </CardActions>

      <CardActions style={{ justifyContent: "center" }}>{qrcode}</CardActions>
      <CardActions style={{ justifyContent: "center" }}>
        <input
          id="savelink"
          style={{
            border: "1px solid #dddddd",
            padding: 5,
            margin: 5,
            width: dynamicWidth
          }}
          value={link}
        ></input>
      </CardActions>
      <CardActions style={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            var copyText = document.getElementById("savelink");
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            document.execCommand("copy");
            setOpenSaveDialog(false);
          }}
        >
          Copy
        </Button>
      </CardActions>
    </Dialog>
  );
}

export default SaveDialog;
