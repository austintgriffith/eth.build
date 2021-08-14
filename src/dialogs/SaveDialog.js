import React from "react";
import Dialog from "@material-ui/core/Dialog";
// import DialogTitle from "@material-ui/core/DialogTitle";
import "litegraph.js/css/litegraph.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import {
  Button,
  CardActions,
  TextField,
  SvgIcon,
  Typography,
  Tooltip,
  // Switch,
  // FormControlLabel,
  Link
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import ShareIcon from "@material-ui/icons/Share";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import useWeb3Connect from "../utils/useWeb3Connect";
import {
  connectIDX,
  logoutIDX,
  getCeramic,
  getIDX,
  isFetching
} from "../utils/IdxManager";

import moment from "moment";

import ProfileHover from "profile-hover";
import { getDocumentInfo, saveDocument } from "../utils/IdxDocuments";

const STORAGE_IDX_DOCUMENT = "eth.build.documentTitleIdx";

var codec = require("json-url")("lzw");
var QRCode = require("qrcode.react");
const axios = require("axios");

const useStyles = makeStyles({
  button: {
    width: 200
  }
});

const IdxIcon = props => {
  return (
    <SvgIcon {...props} viewBox="0 0 60.000000 32.000000">
      <g transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
        fill="#ffffff" stroke="none">
        <path d="M30 155 l0 -125 30 0 30 0 0 125 0 125 -30 0 -30 0 0 -125z" />
        <path d="M130 155 l0 -125 65 0 c108 0 155 40 155 132 0 81 -49 118 -155 118
l-65 0 0 -125z m153 44 c39 -48 9 -109 -54 -109 l-39 0 0 71 0 72 38 -6 c20
-4 45 -16 55 -28z"/>
        <path d="M355 253 c43 -67 40 -65 59 -32 23 38 8 59 -41 59 l-35 0 17 -27z" />
        <path d="M418 171 c-89 -142 -88 -141 -46 -141 32 0 37 5 91 92 31 51 66 108
78 126 l21 32 -39 0 c-38 0 -39 -1 -105 -109z"/>
        <path d="M484 105 c-26 -39 -6 -75 41 -75 19 0 35 3 35 6 0 8 -51 94 -56 94
-2 0 -11 -11 -20 -25z"/>
      </g>
    </SvgIcon>
  );
};

function SaveDialog(props) {
  const {
    liteGraph,
    setOpenSaveDialog,
    openSaveDialog,
    dynamicWidth,
    screenshot
  } = props;

  const classes = useStyles();

  const [saveType, setSaveType] = React.useState(null);
  const [shared, setShared] = React.useState();

  const [compressed, setCompressed] = React.useState();

  const [documentTitle, setDocumentTitle] = React.useState("");
  // const [publicDocument, setPublicDocument] = React.useState(false);
  const [currentDocumentInfo, setCurrentDocumentInfo] = React.useState(null);
  // const [lastCheckedTitle, setLastCheckedTitle] = React.useState(null);
  const [updateTimer, setUpdateTimer] = React.useState(null);

  const web3Connect = useWeb3Connect();
  const connected = web3Connect.connected;

  const [idxStatus, setIdxStatus] = React.useState(null);
  const [idxConnectionStep, setIdxConnectionStep] = React.useState(0);
  const [saving, setSaving] = React.useState(false);

  const handleClose = () => {
    setOpenSaveDialog(false);
    setSaveType(null);
    setIdxStatus(null);
    setIdxConnectionStep(0);
    clearTimeout(updateTimer);
    setUpdateTimer(null);
    setSaving(false);
  };

  React.useEffect(() => {
    if (liteGraph) {
      codec.compress(liteGraph.serialize()).then(data => {
        setCompressed(data);
      });
    }

    // console.log({
    //   isLoggedIn: web3Connect.address
    //     ? Box.isLoggedIn(web3Connect.address)
    //     : "n/a"
    // });

    // let idx = getIDX();
    // let fetching = isFetching();

    // if (
    //   web3Connect.address &&
    //   !idx &&
    //   !fetching
    // ) {
    //   console.log("OPENING IDX from useEffect");
    //   connectIDX(web3Connect.address, web3Connect.provider, console.log);
    // }
  });

  React.useEffect(() => {
    let idx = getIDX();
    let fetching = isFetching();

    if (
      saveType === "IDX_SCREEN" &&
      idx !== null &&
      !fetching
    ) {
      changeToIdxSavePage();
    }
  }, [saveType]);
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
  const changeToIdxSavePage = () => {
    let savedTitle = localStorage.getItem(STORAGE_IDX_DOCUMENT);
    setDocumentTitle(savedTitle ? savedTitle : "");
    if (savedTitle) {
      updateDocumentInfo(savedTitle);
    }
    setSaveType("IDX_SAVE");
  };
  const download = async () => {
    console.log("SAVING COMPRESSED", compressed);

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
    element.setAttribute(
      "download",
      (documentTitle ? documentTitle : "eth.build") + ".webloc"
    );
    element.style.display = "none";
    if (document.body) {
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setTimeout(function() {
        URL.revokeObjectURL(url);
      }, 1000 * 60);
      handleClose();
    }
  };

  const share = async () => {
    console.log("share", compressed);
    setSaveType("SHARE");
    let result = await axios.post("https://network.eth.build:44386/build", {
      compressed
    });

    console.log("share result", result);

    if (result && result.data && result.data.key) {
      console.log("SET SHARED:", result.data.key);
      setShared(result.data.key);
      console.log("SHARED AS:", shared);
    }
    //setTimeout(function() {
    //  URL.revokeObjectURL(url);
    //}, 1000 * 60);
    //setOpenSaveDialog(false);
  };

  const connectToIDX = async () => {
    try {
      let { idx, ceramic } = await connectIDX(
        web3Connect.address,
        web3Connect.provider,
        setIdxStatus
      );

      let savedTitle = localStorage.getItem(STORAGE_IDX_DOCUMENT);
      setDocumentTitle(savedTitle ? savedTitle : "");

      let documentInfo = await getDocumentInfo({ idx, ceramic }, savedTitle);
      setCurrentDocumentInfo(documentInfo.document ? documentInfo : null);

      setSaveType("IDX_SAVE");
    } catch (error) {
      setIdxStatus(error.message);
    }
  };

  const updateDocumentInfo = async fileName => {
    let idx = getIDX();
    let ceramic = getCeramic();
    if (idx && ceramic) {
      let documentInfo = await getDocumentInfo({ idx, ceramic }, fileName);
      console.log("Updated DocumentInfo: ", documentInfo);
      setCurrentDocumentInfo(documentInfo.document ? documentInfo : null);
    } else {
      console.log("NO IDX INSTANCE");
    }
  };

  const logout = async () => {
    await logoutIDX();
    await web3Connect.resetApp();
    setIdxStatus(null);
    setIdxConnectionStep(0);
    setSaveType("IDX_SCREEN");
  };

  const handleTitle = e => {
    let title = e.target.value;
    setDocumentTitle(title);
    if (updateTimer) {
      clearTimeout(updateTimer);
    }
    setUpdateTimer(
      setTimeout(() => {
        console.log("Running timer for ", title);
        updateDocumentInfo(title);
      }, 500)
    );
  };

  return (
    <Dialog
      onClose={() => {
        handleClose();
      }}
      open={openSaveDialog}
      maxWidth="md"
      style={{ zIndex: 200 }}
    >
      {/* <DialogTitle id="save-dialog" style={{ textAlign: "center" }}>
        <Icon style={{ verticalAlign: "middle" }}>save</Icon>
        <span style={{ fontsize: 38, fontWeight: "bold" }}>Save</span>
      </DialogTitle>
      <Divider /> */}

      {saveType === null && (
        <>
          <Grid
            container
            spacing={3}
            justify="center"
            style={{ margin: 0, width: "100%", padding: "32px 32px 0 32px" }}
          >
            {/* <Grid item style={{ width: 220 }}>
              <Tooltip title="QR code for this eth.build">
                <Button
                  variant="contained"
                  className={classes.button}
                  color="primary"
                  onClick={() => {
                    setSaveType("QR_CODE");
                  }}
                  startIcon={<CropFreeIcon />}
                >
                  QR Code
                </Button>
              </Tooltip>
            </Grid> */}

            <Grid item style={{ width: 220 }}>
              <Tooltip title="Download a local file">
                <Button
                  variant="contained"
                  className={classes.button}
                  color="primary"
                  onClick={download}
                  startIcon={<GetAppIcon />}
                >
                  Download
                </Button>
              </Tooltip>
            </Grid>

            <Grid item style={{ width: 220 }}>
              <Tooltip title="Copy via a unique URL">
                <Button
                  variant="contained"
                  className={classes.button}
                  color="primary"
                  onClick={() => {
                    setSaveType("COPY");
                  }}
                  startIcon={<FileCopyIcon />}
                >
                  Copy
                </Button>
              </Tooltip>
            </Grid>

            <Grid item style={{ width: 220 }}>
              <Tooltip title="Save to the network and share URL">
                <Button
                  variant="contained"
                  className={classes.button}
                  color="primary"
                  onClick={share}
                  startIcon={<ShareIcon />}
                >
                  Share
                </Button>
              </Tooltip>
            </Grid>

            <Grid item style={{ width: 220 }}>
              <Tooltip title="Save to IDX">
                <Button
                  variant="contained"
                  className={classes.button}
                  color="primary"
                  onClick={() => {
                    setSaveType("IDX_SCREEN");
                    if (connected && idxConnectionStep === 0) {
                      setIdxConnectionStep(1);
                    }
                    let fetching = isFetching();
                    if (fetching) {
                      setIdxStatus(
                        "Connection to IDX already in progress"
                      );
                      let checkCompletion = () => {
                        let fetchingIDX = isFetching();
                        if (!fetchingIDX) {
                          changeToIdxSavePage();
                        } else {
                          setTimeout(checkCompletion, 1000);
                        }
                      };
                      setTimeout(checkCompletion, 1000);
                    }
                    let idx = getIDX();
                    if (idx) {
                      console.log("IDX is already connected and available");
                      changeToIdxSavePage();
                    }
                  }}
                  startIcon={<IdxIcon />}
                >
                  Save to IDX
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          <CardActions style={{ justifyContent: "center" }}>
            {qrcode}
          </CardActions>
        </>
      )}

      {saveType === "QR_CODE" && (
        <>
          <CardActions style={{ justifyContent: "center" }}>
            {qrcode}
          </CardActions>
        </>
      )}

      {saveType === "SHARE" && (
        <>
          <div style={{ padding: 32 }}>
            {shared ? (
              <div
                style={{
                  margin: "0 auto",
                  width: "100%",
                  textAlign: "center",
                  fontSize: 12,
                  color: "#000000"
                }}
              >
                <a href={"https://eth.build/build#" + shared}>
                  {"https://eth.build/build#" + shared}
                </a>

                <div>
                  <QRCode
                    size={dynamicWidth}
                    value={"https://eth.build/build#" + shared}
                    style={{
                      border: "1px solid #dddddd",
                      padding: 20,
                      margin: 5
                    }}
                  />
                </div>
              </div>
            ) : (
              <div style={{ padding: 32 }}>
                <CircularProgress
                  style={{
                    width: 40,
                    height: 40,
                    display: "block",
                    textAlign: "center",
                    margin: "auto",
                    marginBottom: 16
                  }}
                />
                <Typography variant="overline" display="block" gutterBottom>
                  saving to network
                </Typography>
              </div>
            )}
          </div>
        </>
      )}

      {saveType === "COPY" && (
        <>
          <CardActions style={{ justifyContent: "center", padding: 32 }}>
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

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                var copyText = document.getElementById("savelink");
                copyText.select();
                copyText.setSelectionRange(0, 99999);
                document.execCommand("copy");
                handleClose();
              }}
            >
              Copy
            </Button>
          </CardActions>
        </>
      )}

      {saveType === "IDX_SCREEN" && (
        <>
          <div
            style={{
              justifyContent: "center",
              padding: 32,
              textAlign: "center"
            }}
          >
            <Stepper alternativeLabel activeStep={idxConnectionStep}>
              <Step>
                <StepLabel>Sign in with your wallet</StepLabel>
              </Step>
              <Step>
                <StepLabel>Connect to IDX</StepLabel>
              </Step>
            </Stepper>

            {idxConnectionStep === 0 && (
              <Button
                variant="contained"
                color="primary"
                onClick={async () => {
                  setOpenSaveDialog(false);
                  await web3Connect.triggerConnect();
                  setOpenSaveDialog(true);
                  setIdxConnectionStep(1);
                }}
                style={{ margin: 16 }}
              >
                Choose Wallet
              </Button>
            )}
            {idxConnectionStep === 1 && (
              <div>
                {web3Connect.address !== null && (
                  <ProfileHover
                    address={web3Connect.address}
                    showName={true}
                    orientation="bottom"
                    displayFull={true}
                  />
                )}
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={connectToIDX}
                    style={{ margin: 8 }}
                    disabled={isFetching()}
                  >
                    Connect
                  </Button>
                  <Typography
                    style={{ marginTop: 8, height: 24 }}
                    display="block"
                    variant="caption"
                  >
                    {idxStatus ? idxStatus : ""}
                  </Typography>
                </div>
              </div>
            )}
            <Link
              component="button"
              variant="body2"
              onClick={logout}
              style={{
                display: "block",
                margin: "auto"
              }}
            >
              Logout
            </Link>
          </div>
        </>
      )}
      {saveType === "IDX_SAVE" && (
        <>
          <div style={{ padding: 32, textAlign: "center" }}>
            <Typography variant="button">Save to IDX</Typography>
            <Typography
              variant="caption"
              style={{
                marginTop: 16,
                marginBottom: 16,
                maxWidth: 300,
                textAlign: "justify"
              }}
              display="block"
            >
              You can save your eth.build file directly to IDX as private data. This means that it is saved encrypted on IPFS and only you
              can access to it.
            </Typography>
            <TextField
              fullWidth
              name="title"
              label="File Name"
              variant="outlined"
              value={documentTitle}
              onChange={handleTitle}
              required
              style={{ marginTop: 16 }}
            />

            {/* <FormControlLabel
              control={
                <Switch
                  checked={publicDocument}
                  onChange={event => setPublicDocument(event.target.checked)}
                  value="publicDocument"
                  color="primary"
                />
              }
              label="Public"
            /> */}

            <Typography variant="caption" display="block">
              {currentDocumentInfo !== null && currentDocumentInfo.document !== null
                ? `Last saved ${moment
                    .unix(currentDocumentInfo.document.timestamp)
                    .fromNow()}`
                : ""}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={async () => {
                setSaving(true);
                let idx = getIDX();
                let ceramic = getCeramic();
                await saveDocument(
                  { idx, ceramic },
                  documentTitle,
                  compressed,
                  screenshot
                );
                updateDocumentInfo(documentTitle);
                localStorage.setItem(STORAGE_IDX_DOCUMENT, documentTitle);
                setSaving(false);
              }}
              style={{ margin: 16 }}
              disabled={
                (currentDocumentInfo &&
                  currentDocumentInfo.document.data === compressed) ||
                saving
              }
            >
              Save
            </Button>
            <Link
              component="button"
              variant="body2"
              onClick={logout}
              style={{
                display: "block",
                margin: "auto"
              }}
            >
              Logout
            </Link>
          </div>
        </>
      )}
    </Dialog>
  );
}

export default SaveDialog;
