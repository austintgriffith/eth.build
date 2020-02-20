import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import "litegraph.js/css/litegraph.css";

import {
  Icon,
  Button,
  CardActions,
  Divider,
  TextField
} from "@material-ui/core";

var codec = require("json-url")("lzw");
var QRCode = require("qrcode.react");
const axios = require('axios');

function SaveDialog(props) {
  const { liteGraph, setOpenSaveDialog, openSaveDialog, dynamicWidth } = props;

  const [shared, setShared] = React.useState();

  const [compressed, setCompressed] = React.useState();

  const [documentTitle, setDocumentTitle] = React.useState(global.title);

  const [threeBoxStatus, setThreeBoxStatus] = React.useState(null);

  const handleTitle = e => {
    setDocumentTitle(e.target.value);
  };

  React.useEffect(() => {
    if (liteGraph)
      codec.compress(liteGraph.serialize()).then(data => {
        setCompressed(data);
      });
  });

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

  const saveTo3Box = async () => {
    if (typeof window.web3 !== "undefined") {
      let web3 = window.web3;
      setThreeBoxStatus("Please enable the access to your metamask");
      console.log("MetaMask is installed", web3);

      let accounts = await window.ethereum.enable();
      console.log(accounts);
      setThreeBoxStatus("Account retrieved");
    } else {
      console.log("MetaMask is not installed");
    }
  };
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
      <div style={{ margin: 16 }}>
        <TextField
          fullWidth
          name="title"
          label="Title"
          variant="outlined"
          value={documentTitle}
          onChange={handleTitle}
          required
        />

        {/* <input name="title" defaultValue="test" /> */}
      </div>

      <CardActions
        style={{
          justifyContent: "center",
          paddingTop: 10,
          display: "flex",
          paddingBottom: 10
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {

            console.log("SAVING COMPRESSED",compressed)

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
            element.setAttribute("download", (documentTitle?documentTitle:"eth.build") + ".webloc");
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
        {/* <Button variant="contained" color="primary" onClick={saveTo3Box}>
          Save to 3Box
        </Button>
        {threeBoxStatus !== null && <p>{threeBoxStatus}</p>} */}

        <Button
          variant="contained"
          color="primary"
          onClick={async () => {

            console.log("share",compressed)

            let result = await axios.post("https://network.eth.build:44386/build", {compressed});

            console.log("share result",result)

            if(result && result.data && result.data.key){
              console.log("SET SHARED:",result.data.key)
              setShared(result.data.key)
              console.log("SHARED AS:",shared)
            }
              //setTimeout(function() {
              //  URL.revokeObjectURL(url);
              //}, 1000 * 60);
              //setOpenSaveDialog(false);
          }}
        >
          Share
        </Button>



      </CardActions>

      <div>
        {shared?
          <div style={{margin:"0 auto",width:"100%",textAlign:"center",fontSize:12,color:"#000000"}}>

             <a href={"https://eth.build/build#"+shared}>{"https://eth.build/build#"+shared}</a>

               <div>
                 <QRCode
                   size={dynamicWidth}
                   value={"https://eth.build/build#"+shared}
                   style={{ border: "1px solid #dddddd", padding: 20, margin: 5 }}
                 />
               </div>

          </div>:""
        }

      </div>

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
