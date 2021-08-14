import React from "react";
import Dialog from "@material-ui/core/Dialog";
// import DialogTitle from "@material-ui/core/DialogTitle";
import "litegraph.js/css/litegraph.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { Button, SvgIcon, Typography, Tooltip, Link } from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import useWeb3Connect from "../utils/useWeb3Connect";
import {
  connectIDX,
  logoutIDX,
  getIDX,
  getCeramic,
  isFetching
} from "../utils/IdxManager";


import ProfileHover from "profile-hover";
import { loadDocuments } from "../utils/IdxDocuments";
import FilesList from "./FilesList";

const STORAGE_IDX_DOCUMENT = "eth.build.documentTitleIdx";

var codec = require("json-url")("lzw");

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

function LoadDialog(props) {
  const { liteGraph, setOpenLoadDialog, openLoadDialog, live } = props;

  const classes = useStyles();

  const [loadType, setLoadType] = React.useState(null);

  const web3Connect = useWeb3Connect();

  const connected = web3Connect.connected;

  const [idxStatus, setIdxStatus] = React.useState(null);
  const [idxConnectionStep, setIdxConnectionStep] = React.useState(0);
  const [documents, setDocuments] = React.useState([]);

  const handleClose = () => {
    setOpenLoadDialog(false);
    setLoadType(null);
    setIdxStatus(null);
    setIdxConnectionStep(0);
    // clearTimeout(updateTimer);
    // setUpdateTimer(null);
    // setSaving(false);
  };

  React.useEffect(() => {
    console.log({
      isLoggedIn: web3Connect.address
        ? getIDX()
        : "n/a"
    });

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
      loadType === "IDX_SCREEN" &&
      idx !== null &&
      !fetching
    ) {
      changeToIdxLoadPage();
    }
  }, [loadType]);

  const changeToIdxLoadPage = async () => {
    let idx = getIDX();
    let ceramic = getCeramic();

    setDocuments(await loadDocuments({ idx, ceramic }));
    setLoadType("IDX_LOAD");
  };

  const connectToIDX = async () => {
    try {
      let { idx, ceramic } = await connectIDX(
        web3Connect.address,
        web3Connect.provider,
        setIdxStatus
      );
      setDocuments(await loadDocuments({ idx, ceramic }));
      setLoadType("IDX_LOAD");
    } catch (error) {
      setIdxStatus(error);
    }
  };

  const logout = async () => {
    await logoutIDX();
    await web3Connect.resetApp();
    setIdxStatus(null);
    setIdxConnectionStep(0);
    setLoadType("IDX_SCREEN");
  };

  const loadFromFile = async () => {
    document.getElementById("loadjsonfile").click();
    handleClose();
  };

  const getJsonFromCompressed = compressedString =>
    new Promise((resolve, reject) => {
      let loc = compressedString.indexOf("<string>");
      if (loc > 0) {
        loc += 8;
        let endloc = compressedString.indexOf("</string>", loc);
        //console.log("loc",loc,"endloc",endloc)
        compressedString = compressedString.substr(loc, endloc - loc);
        compressedString = compressedString.substr(
          compressedString.lastIndexOf("/") + 1
        );
      }
      console.log("decompress:", compressedString);
      codec.decompress(compressedString).then(json => {
        console.log("configure graph with:", json);
        if (json) {
          resolve(json);
        }
      });
    });

  const openFile = async file => {
    console.log("Opening FILE: ", file);
    let compressedString = file.data;
    let json = await getJsonFromCompressed(compressedString);

    localStorage.setItem("litegraph", JSON.stringify(json));
    liteGraph.configure(json);

    localStorage.setItem(STORAGE_IDX_DOCUMENT, file.fileName);
    handleClose();
  };

  return (
    <>
      <div style={{ position: "absolute", bottom: -100000, left: -100000 }}>
        <span
          style={{
            border: "1px solid #777777",
            color: live ? "#00ff00" : "#0000ff",
            padding: 5,
            cursor: "pointer"
          }}
        >
          <input
            id="loadjsonfile"
            type="file"
            name="file"
            onChange={e => {
              console.log("FILE", e.target.files[0]);
              var reader = new FileReader();
              reader.onload = event => {
                let compressedString = event.target.result;
                //console.log("compressedString",compressedString)
                let loc = compressedString.indexOf("<string>");
                if (loc > 0) {
                  loc += 8;
                  let endloc = compressedString.indexOf("</string>", loc);
                  //console.log("loc",loc,"endloc",endloc)
                  compressedString = compressedString.substr(loc, endloc - loc);
                  compressedString = compressedString.substr(
                    compressedString.lastIndexOf("/") + 1
                  );
                }
                console.log("decompress:", compressedString);
                codec.decompress(compressedString).then(json => {
                  console.log("configure graph with:", json);
                  if (json) {
                    localStorage.setItem("litegraph", JSON.stringify(json));
                    liteGraph.configure(json);
                  }
                });
              };
              try {
                reader.readAsText(e.target.files[0]);
              } catch (e) {
                console.log(e);
              }
            }}
          ></input>
        </span>
      </div>
      <Dialog
        onClose={() => {
          handleClose();
        }}
        open={openLoadDialog}
        maxWidth="md"
        style={{ zIndex: 200 }}
      >
        {/* <DialogTitle id="save-dialog" style={{ textAlign: "center" }}>
        <Icon style={{ verticalAlign: "middle" }}>save</Icon>
        <span style={{ fontsize: 38, fontWeight: "bold" }}>Save</span>
      </DialogTitle>
      <Divider /> */}

        {loadType === null && (
          <>
            <Grid
              container
              spacing={3}
              justify="center"
              style={{ margin: 0, width: "100%", padding: 32 }}
            >
              <Grid item style={{ width: 220 }}>
                <Tooltip title="Load from file">
                  <Button
                    variant="contained"
                    className={classes.button}
                    color="primary"
                    onClick={loadFromFile}
                    startIcon={<FileCopyIcon />}
                  >
                    Load from file
                  </Button>
                </Tooltip>
              </Grid>

              <Grid item style={{ width: 220 }}>
                <Tooltip title="Load from IDX">
                  <Button
                    variant="contained"
                    className={classes.button}
                    color="primary"
                    onClick={() => {
                      setLoadType("IDX_SCREEN");
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
                            changeToIdxLoadPage();
                          } else {
                            setTimeout(checkCompletion, 1000);
                          }
                        };
                        setTimeout(checkCompletion, 1000);
                      }
                      let idx = getIDX();

                      if (idx) {
                        console.log("IDX is already connected and available");
                        changeToIdxLoadPage();
                      }
                    }}
                    startIcon={<IdxIcon />}
                  >
                    Load from IDX
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </>
        )}

        {loadType === "IDX_SCREEN" && (
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
                    setOpenLoadDialog(false);
                    await web3Connect.triggerConnect();
                    setOpenLoadDialog(true);
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
        {loadType === "IDX_LOAD" && (
          <>
            <div style={{ padding: 32, textAlign: "center" }}>
              <Typography variant="button">Load from IDX</Typography>
              <div style={{ marginTop: 16, marginBottom: 16 }}>
                <FilesList files={documents} onClick={openFile} />
              </div>
              {/* <TextField
              fullWidth
              name="title"
              label="File Name"
              variant="outlined"
              value={documentTitle}
              onChange={handleTitle}
              required
              style={{ marginTop: 16 }}
            /> */}

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

              {/* <Typography variant="caption" display="block">
              {currentDocumentInfo !== null
                ? `Last saved ${moment
                    .unix(currentDocumentInfo.metadata.timestamp)
                    .fromNow()}`
                : ""}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={async () => {
                setSaving(true);
                await saveDocument(
                  threeBoxSpace,
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
            </Button> */}
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
    </>
  );
}

export default LoadDialog;
