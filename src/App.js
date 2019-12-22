import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import './App.css';
import LiteGraphJS from 'litegraph.js/build/litegraph.js'
import 'litegraph.js/css/litegraph.css'
import CustomNodes from './CustomNodes'
import ICON from './icon.png'
import StackGrid from "react-stack-grid";

import Dragger from './Dragger.js';
import { useDrop } from 'react-dnd'

import { Icon, Tooltip, Button, CardActions, Divider, Drawer, Card, CardMedia, CardContent, CardActionArea, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
var codec = require('json-url')('lzw');
var QRCode = require('qrcode.react')

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin:"5%"
  },
  media: {
    height: 140,
  },
  root: {
    flexGrow: 1,
  },
});

function touchHandler(event)
{

    var touches = event.changedTouches,
        first = touches[0],
        type = "";
    switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type = "mousemove"; event.preventDefault();break;
        case "touchend":   type = "mouseup";   break;
        default:           return;
    }

    // initMouseEvent(type, canBubble, cancelable, view, clickCount,
    //                screenX, screenY, clientX, clientY, ctrlKey,
    //                altKey, shiftKey, metaKey, button, relatedTarget);

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
                                  first.screenX, first.screenY,
                                  first.clientX, first.clientY, false,
                                  false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);




}

function App() {
  //console.log("APP")

  /*
  window.addEventListener("wheel", event => {
    console.info(event.deltaY)
    event.preventDefault();
  });*/


  const [menu, setMenu] = React.useState("");

  const [selectToolActive, setSelectToolActive] = React.useState(false);

  document.addEventListener("keydown", (keydown)=>{
    if(keydown.key=="Escape"){
      setMenu("")
    }
  }, false);


//  var defaultPrevent=function(e){e.preventDefault();}
//document.addEventListener("touchstart", defaultPrevent);
//document.addEventListener("touchmove" , defaultPrevent);

  document.addEventListener("touchstart", touchHandler, {passive: false});
  document.addEventListener("touchmove", touchHandler, {passive: false});
  document.addEventListener("touchend", touchHandler, {passive: false});
  document.addEventListener("touchcancel", touchHandler, {passive: false});

  const classes = useStyles();

  const [snackbar, setSnackbar] = React.useState("");
  global.setSnackbar = setSnackbar

  const [live, setLive] = React.useState();
  const [liteGraph, setLiteGraph] = React.useState();
  const [liteGraphCanvas, setLiteGraphCanvas] = React.useState();
  const [playing, setPlaying] = React.useState(true);

  const [openSaveDialog, setOpenSaveDialog] = React.useState(false);

  let showLibrary = localStorage.getItem("eth.build.showLibrary");
  //console.log("showLibrary",showLibrary)
  const [showVideoLibrary, setShowVideoLibrary] = React.useState(showLibrary=='true'||showLibrary==null);



  const dynamicWidth = window.innerWidth/3

  function SaveDialog(props) {
    const { liteGraph } = props;


    const [compressed, setCompressed] = React.useState();

    React.useEffect(()=>{
      if(liteGraph) codec.compress(liteGraph.serialize()).then((data)=>{
        setCompressed(data)
      })
    },[liteGraph])

    let link = window.location.protocol+"//"+window.location.host+"/"+compressed


    let qrcode = "(too big for QR code)"
    if(link && link.length<2580){
      qrcode = (
        <QRCode size={dynamicWidth} value={link} style={{ border: '1px solid #dddddd',padding:5,margin:5}}/>
      )
    }

    return (
      <Dialog onClose={()=>{setOpenSaveDialog(false)}} open={openSaveDialog} maxWidth={Math.round(dynamicWidth*1.1)}>
        <DialogTitle id="save-dialog" style={{textAlign:"center"}}>
          <Icon style={{verticalAlign:'middle'}}>
            save
          </Icon>
          <span style={{fontsize:38,fontWeight:"bold"}}>
            Save
          </span>
        </DialogTitle>
        <Divider/>
        <CardActions style={{justifyContent: 'center',paddingTop:30,paddingBottom:10}}>
          <Button variant="contained" color="primary" onClick={()=>{


              let webfile = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>URL</key>
	<string>https://eth.build/`+compressed+`</string>
</dict>
</plist>
	`

              var file = new Blob([webfile]);
              var url = URL.createObjectURL( file );
              var element = document.createElement("a");
              element.setAttribute('href', url);
              element.setAttribute('download', global.title+".webloc" );
              element.style.display = 'none';
              if(document.body){
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
                setTimeout( function(){ URL.revokeObjectURL( url ); }, 1000*60 );
                setOpenSaveDialog(false)
              }
            }}>
            Download
          </Button>
        </CardActions>

        <CardActions style={{justifyContent: 'center'}}>
          {qrcode}
        </CardActions>
        <CardActions style={{justifyContent: 'center'}}>
          <input id="savelink" style={{border: '1px solid #dddddd',padding:5,margin:5,width:dynamicWidth}} value={link}></input>
        </CardActions>
        <CardActions style={{justifyContent: 'center'}}>
          <Button  variant="contained" color="primary" onClick={()=>{
              var copyText = document.getElementById("savelink");
              copyText.select();
              copyText.setSelectionRange(0, 99999);
              document.execCommand("copy");
              setOpenSaveDialog(false)
            }}>
            Copy
          </Button>
        </CardActions>

      </Dialog>
    )
  }

  const [openAboutDialog, setOpenAboutDialog] = React.useState(false);

  function AboutDialog(props) {
    const { open, liteGraph } = props;

    return (
      <Dialog onClose={()=>{setOpenAboutDialog(false)}} open={openAboutDialog} maxWidth="md" fullWidth={true}>
        <DialogTitle id="save-dialog" style={{textAlign:"center"}}>
          <Icon style={{verticalAlign:'middle'}}>
            info
          </Icon>
          <span style={{fontsize:38,fontWeight:"bold"}}>
            About
          </span>
        </DialogTitle>
        <Divider/>
        <CardActions style={{justifyContent: 'center'}}>
          <div style={{padding:"2%"}}>
            <a target="_blank" href="https://eth.build">Eth.Build</a> (<a target="_blank" href="https://github.com/austintgriffith/eth.build">source</a>) created by <a target="_blank" href="https://twitter.com/austingriffith">Austin Griffith</a>
          </div>
        </CardActions>
        <CardActions style={{justifyContent: 'center'}}>
          <div style={{padding:"2%"}}>
            With support from <a target="_blank" href="https://ethereum.org">the Ethereum Foundation</a>, <a target="_blank" href="https://consensys.net/">Consensys</a>, and <a target="_blank" href="https://gitcoin.co/grants/122/austin-griffith-ethereum-rampd">Gitcoin Grants</a>
        </div>
      </CardActions>
      <CardActions style={{justifyContent: 'center'}}>
        <div style={{padding:"2%"}}>
          Special thanks to <a target="_blank" href="https://github.com/jagenjo">Javi Agenjo</a> for <a target="_blank" href="https://github.com/jagenjo/litegraph.js">litegraph</a>
      </div>
    </CardActions>
  </Dialog>
)
}


const [{ isOver, isOverCurrent }, drop] = useDrop({
  accept: "node",
  drop(item, monitor) {
    //console.log("DROP!",item.monitor)
    const didDrop = monitor.didDrop()
    if (didDrop) {
      return
    }
  },
  collect: monitor => ({
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
  }),
})

const [{ isOver2, isOverCurrent2 }, drop2] = useDrop({
  accept: "node",
  drop(item, monitor) {
    //console.log("DROP!",item.monitor)
    const didDrop = monitor.didDrop()
    if (didDrop) {
      return
    }
  },
  collect: monitor => ({
    isOver2: monitor.isOver(),
    isOverCurrent2: monitor.isOver({ shallow: true }),
  }),
})

React.useEffect(()=>{
  console.log("MOUNT",LiteGraphJS)

  global.title = "eth.build"

  global.LiteGraphJS = LiteGraphJS
  var graph = new LiteGraphJS.LGraph();

  global.graph = graph

  //config
  LiteGraphJS.LiteGraph.debug = true

  console.log("can we set grid here?",LiteGraphJS.LiteGraph)

  var canvas = new LiteGraphJS.LGraphCanvas("#main", graph);

  window.addEventListener("resize", function() { canvas.resize(); } );

  graph.onAfterExecute = function() {
    canvas.draw(true);
  };

  window.onbeforeunload = function(){
    var data = JSON.stringify( graph.serialize() );
    localStorage.setItem("litegraph", data );
  }

  CustomNodes(LiteGraphJS)

  let url = window.location.pathname
  if(url&&url.length>1){
    url = url.substring(1)
    console.log("decompressing",url)
    codec.decompress(url).then(json => {
      console.log("configure graph with:",json)
      graph.configure( json );
      //graph.start()
      graph.canvas = canvas

      setLiteGraph(graph)
      setLiteGraphCanvas(canvas)

      window.history.pushState("", "", '/');

      setShowVideoLibrary(false)
    })
  }else{
    var data = localStorage.getItem("litegraph");
    if(data) {
      graph.configure( JSON.parse( data ) );
      //graph.start()
      graph.canvas = canvas
      setLiteGraph(graph)
      setLiteGraphCanvas(canvas)
    } else {
      let defaultData = "wofCrGxhc3Rfbm9kZV9pZC7EgcSDxIVsaW5rxItkIsKlxIfEiXPCmMKJwqLEjCTCpHR5cGXCrURpc3DEgnkvV2F0Y2jCo3Bvc8KSFDLCpHNpemXCksONA8OlOMKlZsSCZ3PCgMKlb3LEiXIDwqRtxIhlAMKmxJNwdXRzwpHChMKkbmFtZcKgxKLEpMWUwqTEksSUGMKlxIJiZWzCoMKqcHJvxKVydGllxYnCisSfxJfFpMSlwq9DcsSkdG8vTW5lxZJuaWPEtMS2xYABBMOMwpbEu8S9ZcKCwqEww4pDOmZmwqExQsWFxYfFicWLxY1lcgHFkcWTxZXFl8WZc8KTwoPFnsWgZcKqW23GiMaKxoxdxb5lwqbEhHLEk2fFp8STa8OAxrLFn8WhwqdbxJPEiXjGvMSjxKXCpm51bcWtcseExJTHh8azxaHCqGdlxohyxLBlxr3Dv8eZaxfCp2_FmcWYxZrCkseIxrTCq8WyaXbHoyBrZXnGvca_dMeBbmfFq8eFxZsax7DHnca4xolvxotjx7vHgMeCyIHElMWbGMWxxbPFtcW3xbnCgsKlx41leADCqMiHxrpjw5lSZmlyxIQgxKvEkMaMIG3EqXRhx7jIrMSpcyDEvMSExqjIqMWzamVjdCDEiWLHgci0xLxsx6DIvsitc8aoeSDGhMaIIMibY8W5yLTEh8ivYsmFxbvEjCPGvcKsSW7HrS9CxZnJjcaOxLcUw4zFo8S8xL7CksOMw4gyxqNhxYjFisWMxY4AxqvEicatyZ7Gr8KRyIXFoselx6fDgMeqx6zGr8evx5zJvceRZcO_yI9rxZsXybzFo8qHwqdib2_JhWFuyopzw4DIk8W0xqjIlnPCg8Klx7VsdWXCqEfHoMaox6PCpcW3dMmFwqbJoXTJjcKlY8erbnQPyZhkJsa9xoDGgnDGhC9Lx7kgUGHIpcmkxpDDlsaTxpXEvsaYxppDU8KZwprGoMaixYbJsMalybPGqALJtsWUxZbJuceuybzCrVvHs8e1dGXHt8e5x5DFpce8x77Hg8Woa8iEyoXHnsqox6LLpsm-y6_KgMerdMetxrDJvMeyx4HLpcunx7jHusqHy6zIjsuvypnJvMWxdcmWyKvMg8iMx73Mh8iCx5vHiWXCp2FkZHLJksyQy63KmMKSGxzKm8iVxbhzwoHIk8e0x6PLgnnDmUIweGE0ZGLMmDhlZmPMuDhkMjgwZGE4MjJiNWNiMzdjMjFhzYg5MWI5M2QzNGU4MTYwZsy3NDTNgci8zZ1hzYkzZjHKuS3GvcKuVcW3bHMvRsWzbSBXZWnLiMWBwpjDjMOmy4zGl8aZesagIcmvxYjCgcKpyrRsxIJwyYlkw4PGpsWOBsucybjLvMm7yoXImcufx7vHlMeWxqjHpyHKgcu7ybrJvMKmy7rHrc6Zx5XHl8qYwpEizKPKncylwoHCqMSJY2ltYc2vEsq5KMmbzbbNiMmgzrXKlsmRzbkCw4bJrM2-y47DjMOSy5TOhMuYxqdyBc6Sy57LvMaxyoXMl8yZzJtzc8ydx4LHpxzJvMKsW8mWb2NrxLLLhm7LqseSyI3Hv8m_ybzKs2jIvGvLt8eFy7nKgsWaxZzPk8y0xIJuyZHOps6bcs6pzoPFrMWuxpnOrMW2zKXCgs-UzJrJksOZKsyvNWQ3zY7MtzPMtsy_zLJiMjc2zZ81N8yzzZhmNTM5ZmFjzZMyzZ85yqXFsm92xIzGqMOZPWjKsc6LOi8vzrTEk8aIdC7Ek2Z1x6LQvcaFdjMvZTU5YzTQmmMzzYNmNDdlMjk2zaY1ZjAw0ZY4xa0yZjjEnsSMJ8q8xKjEqsSsL0HPlcmSy4gew43Gkc2-xpBZVc-KybLPjATPj8auz7XKjsa9ybXLrxvQhMqewoTCq8-gz6LFuFPGljLHssSCyZFoypTFjsKgyqtpyq3MltGq0InPl8qhzrXKpNCL0I3Qj9CRZtCTZdCVzLPQmNCaNNCc0J440KDQotCk0KbRjtCpZcq5LtGlxKnIqcStRMqUxILIps25AcOC0a8O0bHDjMK-N9G1zo_GqAfRucufxZvRvMqH0b7HhSLOn86U04zLq86azqjMiMqa0KzMpMW50oPShWvSh9KJ0ovQpWXSjmzFjsKvyYbIuMumeMi-z67Mm9KS0pTCp9K4zolhyKbSmcqjxZTKmMKXwpYXIwAiAsO_wpYYIgEkAADClhoiACbFlc-pZ8KWGyYCJ9SHwpYc1JMo1I7Mkce_wpYh1JotxZXTlcaowpYi1KEu1IfCpmfFs3XOi8KQwqbKtG7IpGfCgMKndsaoxLzIicOLP8OZwpnUvtS-wpo"
      codec.decompress(defaultData).then(json => {
        global.graph.configure( json )
        //graph.start()
        graph.canvas = canvas
        setLiteGraph(graph)
        setLiteGraphCanvas(canvas)
      })
    }
  }
  setInterval(()=>{
    //console.log(graph)
    graph.runStep()
  },250)
},[])


const barHeight = 38

//let compressed = await codec.compress(liteGraph.serialize())
//liteGraph?JSON.stringify( liteGraph.serialize(), null, 2 ):""
//

let allCards = []

let lessons = [{
  header: "Episode 1",
  color: "#2196f3",
  name: "Hash Function",
  image: "thumbs/hashfunction.png",
  desc: "A hash function is like a deterministic fingerprint of a piece of arbitrary data. It is very easy to compute but very hard to reverse.",
  video: "https://youtu.be/QJ010l-pBpE",
  save: "wofCrGxhc3Rfbm9kZV9pZCLEgcSDxIVsaW5rxItkFsKlxIfEiXPClMKKwqLEjCDCpHR5cGXCqklucHV0L1RleHTCo3Bvc8KSWsOMwqDCpHNpemXCksONASwywqVmxIJnc8KAwqVvcsSJcgDCpG3EiGUAwqbEk8SqdHPCkcKDwqRuYW1lxLnEo8SlxY_EksSUw4DCp2_Eq8WXxZnFm8WdxZ_FocSkZcKmxIRyxJNnwqXFpWvFmRXCqnByb8SlcnRpZXPChMKrYmxvY2vGhFPEvGUywqtwxIJjZWhvbMWNwq9lbnRlciDGn8SwIGjGoGXCpcaDdGxlwqTErsSwwqV2YWx1xq3Gn8SExJ7EjB_EosWxwqtDcsSkdG8vSMSDaMSyxLTEvwHDjMS4xLrGkMKSeB7FhMWGxYjFisWMxqACxZDFksWUxZbEq8WsxZzFnsaox510xrzEpcKtxbTFtixudW1ixqDCpMW5FcWoxarHnsWax6DFn8KkaMeGx6XFsseobsW3xbnFmRbFvcW_xoHGg8aFwoDCicSfZCHHvMKtRGlzxpRheS9XYXRjx4fEs8S1w40CwqjDjMKWx47EvcS_AzE8x5NhxYfFicWLxY0Dx5rEicecxKnHtcKEx7fFoMe8xaTEk2vEmMSCx65swqDIhMaAxqDIh8WIwojIiyLIjsiQyJLEgsiVVGnGq2XHiMS1FCjIo8S-xYDDtADIqcirx5bFjQHIsMWTyYHIhsaEc8KFwqhmb8aexo_EvSzGiMaKxozGjsaQxpLIk8aWxpjGmsagwqDGqcmPxqzCpcmOyZDGscazxrXCrceFc2ggRnVuY8aDyanFuMi6xLXClhUgAB8Ax6d0xbXHv8eqx6zHrnLClhbKlSEAxZRnxb91cHPCkMKmY8mpZmlnwoDCp3bGoMS7yanDij7HjMON",
},{
  header: "Episode 2",
  color: "#2196f3",
  name: "Key Pair",
  image: "thumbs/keypair.png",
  desc: "A private key is used to derive a public key which acts as your public address. Then, you can sign messages with your private key and anyone else can cryptographically prove that your key pair signed the message.",
  video: "https://youtu.be/9LtBDy67Tho",
  save: "wofCrGxhc3Rfbm9kZV9pZMONAQzEgcSDxIVsaW5rxItkw4zDqcKlxIfEiXPCm8KKwqLEjMOMw73CpHR5cGXCrElucHV0L0LEr3RvbsKjcG9zwpJ1xI4NwqRzaXplwpLDjMOIMsKlZsSCZ3PCgMKlb3LEiXIAwqRtxIhlAMKmxJXErnRzwpHCg8KkbmFtZcKgxKbEqGXDv8KkxJTElsOAwqdvxK_Fm8WdxZ_FocWjxaXEp8Spw7_CpcWra8Wdw4zDmsKqcHJvxKlydGllc8KCwqV2YWx1ZcKoY8SUY2sgxaPCpcaGdGxlwqbEsnTEtG7EocSjw7zFpsSpwq9DcsSoxLQvS2V5IFBhaXLEt8S5wpLEjsKDw4zDm8S_xYFlwoLCoTDDikNTwpnCmsKhMULFiMWKxYzFjsWQZXIDxZTFlsWYxZrEr8S6xbPFomXCrVvGgWnGjHRlIGvGrl3GpcacxIRyxJVnxarElWvDgMeYxaPCqGdlbsePYcegx6bFqcW7xb7FrsWwx5bCk8ewZcKrx53Hn8ehx6N5x6bCpseox6rFusetxb3DoMiBxoB1YsaTx6LGrsiJyItuZ8iNxJZzwpDIgcKnYWRkcsaIc8iYdMepyJrInMW8xYTDnsOMw5_GgMaCxoTGhsaIwoHIsseex7dlxq15w5lCMHg4Nzg0ZTgwZjJhODVmZGIzYjA0Y2NiZDI5NTEyMGUwYzcyZTJjOTQ3NTgyYmXJkjPJhsmpyZQxNTlkN2XJtWM4wonEosSNAQHHpsKtRGlzcMSCeS9Xx7djaMa1xLrDjQLCnsOMwrTGvMWCxrcCETzHimHFi8WNxY_FkQXHksSJx5TErceWwpHChMWgx5nFtsWnxZPHu8Oexbphya1swqDIssaDx4_ItcWMyb3EjMSOAsemwq_KhMqGyogvQcijyKVzc8qPxrcFCsOMwqrKlsWDxI5WT8qcyp7HjcWRBsqjxZfFmcqmxZzFnsqqxbXHpsqux63IsMq2yLTGh3PChMKryJRvxpTGh1PGvTLIg8SCY2Vob2zFkcKgxphpxpplwqfLhcikyKbGi8aNxo_DmSrJgDPJijllOTE5Y2bJq2TMkThkNTAyyYUxZTEwYTXJkTAzNTXMjWU0ZmLKu8m_y5nFt8eay4HKh2HKicqLdMqNy4rKkcKUxI7DoMuQxrcGScqbxYnKnceMyqDHjwfLmsqlxbHKqMugxaTLosesxJbDjMOjyrHKs8q1xoHKt8aFy6jCgMaiyb_Nh8yvwq7GqMaqby9SZWNvdsePzLgCCMqRw7jLkMa_x4FDITMzx4cuy5XNhMeOcgjNiMucxbHCksiBwqlbxaPLiMqdZcelzK_Iisipx6rNj2vEmsiBwqtbxYBnxaF0dcilzojFp86KyKrHq8e7w6jHvXTNisigyKLMgsuIyKjOnMisxLrDjMOmw4zDp8umyrjLqMKCwqfOhHPOhsK9ya1hciB0aMehyoUgxIRpxpTGr3fLvWggy7fHtXnCqc6TzpXOl2XDmcKEyYAxYjTMpDA1MsyhNWQ5MsmcMMyONWPMpmHJhTXJuMmlN8yRMMmPNmI2MDhlNjc2ZmHJojNmyaQ2NcygNjZhzKDJp2NhyZbPmMyOzJ7JqtCGxIkzyYLMjtCP0JLJkTlmz78xz7syODlhZs-10J84YTLPqdCjzKQ0zKUwNzA2zJ1izZvEjseRzK_Cq82gcMary7DOlMy4AcKuzLvNr8eAx4I6ZmbHh1bNuMqfzboEzb3HlcWcwpTIgcKsx5zHqciFyIfOmcSpzpvOjMe7yJDNjMKq0Y_Np8SMx4_Rk8enzovIms6Nx6_NjM6CzrTOhtGf0ZXRose7w6HIgca8zpTHudGjzqDFsdGMzYzIocuGyKbOp8iMxbtz0aTFtMu_0afHs9G6yKvRvNG-x5nPjGnOlMe3z4_Sg8ib0bzFhMOjw4zDqMiByIrSice1ZMe5zqnDgM6vzZjGiMKFzrPIps62zrjOus68zr5zz4DGhs-DIM-FzrzPiMS1xq7IuMiFyLzIvsmAyYLJhMmGyYjJismMyY7JkMmSyZTJlsmYyZrPoMmfyaHJo8mlyafJqcmrya3Jr8mxNcmzybXJt8m5zJA4wqjNlnbRnXLCumjGn3BzOi8vYXXPgciax6nRgc-GLs2mbdKI0orOlsilw4DCqNOixLTQt27Dg9CvAdGIzK_CqsSsxZsvVGV4dMuKUMSOw6rMvcSOLMWHzYLLls2FcsqBxZXKpM2-yqfIgcqsxKnLo8Ws0bPUk82M1JXRoM6o0o_DjMOhxJrSnMq5y6rLrMuuZcuwxYLLssyyy7XLt8u5x4_Cr8e0x6DSpNSAdM-Ix49ly7zLvsKk07_UgcyExo5lzrdlzrnOu869IM6_z4HSqtKsz4fPicauzKzEjgrKgsyxy4PMtcy3xLjKkAMgypHCntSHypnNgceL0YbFkQnRicudxZ3KqdG_1JzUl86Ow6bNk2XKtNSjzZnVjwELyr_Vk8yzy4TRuMuIzLgDKsONAzTUhwFAUNGFy5fHj9WR1JDLm9GKxbLUm82Ox7vOrs2Wy6fGiNSlbMuta8uvy7HLs9CHy7bLuMu61LrGm8yA1blz1L_MhsyIeMyKYcyMzI7MkMySMsyUzJLMl8yZzJvMncyfzKHJr8ylzKfMqWLCiMm-xI4M1ZLKhcyyyolUy73Gm9SDWtaBw7QA1oXUjcq-1okA1bDSnsKoZsS1dNSpZSzLq9aV1KfXl9Sry7TWnNSvcsu7xpnGm8Kl14TLvtakxpDIvMawxrJyzqnCmsKWxb7EpADDjMO8AcO_17HIr8O8AsSOAQAA17HDn9e117wBAte_17HDoNe1ANCwxZjImWfXscOhxI4E2IsBAwLRqtiPzZHQsNiEBtiHzqvEjgfYlArYnsOn2KDYlAvYnsOo2JvYoAHYmNexw6nYktiU2KHYmMKmZ8aCddOdwpDCps2mbmbSicKAwqfNqHLFgMS1w4o-w4zDjMON",
},{
  header: "Look Ahead",
  color: "#565656",
  name: "Transactions",
  image: "thumbs/transactions.png",
  desc: "Using our hash function and key pair, we send and receive funds on a blockchain. Decentralized programmable money FTW!",
  video: "https://youtu.be/mhwSGYRmkEU",
  save: "wofCrGxhc3Rfbm9kZV9pZMONASrEgcSDxIVsaW5rxIvEjQEJwqXEh8SJc8OcABXCisKixIzEjhLCpHR5cGXCq0NyxKp0by9IxINowqNwb3PCksSOw6rDjMK-wqRzaXplwpJ4HsKlZsSCZ3PCgMKlb3LEiXIIwqRtxIhlAMKmxJVwdXRzwpHCg8KkbmFtZcKlxZrFnMSoxKplwq3EhHLElWcsbnVtYmVywqTElMSWw4zDscKnb8WcxZvFncWfxaHFo2XCpGjEtcWpxKvCpsWtxa_CpcW5a8S6w4zDsMOMw7LCqnByb8SrcnRpZcWMwonEpMSZFsaJxatEaXNwxIJ5L1dhdGPEtsS4xLrDjQLCgFDFgMWCxYTDjQMxPMWIxYrFjMWOxZDFtgrFlMWWxZjFp8aBwoTGg8WkwqDGpADFuMSVa8aUxo5hxbVswqDGlsaYxprGnMaewoDGoMSlARnGpMKvxqbGqMaqL0FkZHLGnnPEt8S5xLsEEMOMw4jGuMWDxLsBQFDGv2HFi8WNxY_FkQzHhsSJx4huxoDFnsWgxaLHjcePx5HFusO1x5rGmcW2x51zwoTCq2Jsb2Nrxp1TxrkywqvGqWFjZWhvbMWRwqDCpcacdGxlwqfHqsesx67CpXZhbHVlw5kqMHgzOGI0OGE2YThlN2I2YzFmOTA2NDU1M2M0ZWEyY2PJkzJkM2QyOWZjxKPHoR3GpMKsSciHxZwvQsWcxLFux7DGswNwxrROx7fFhMe1Mse9x7_HgsWRx5DFlciFxZnJq8aByIrGhMeOxKnEq8O_yI5rw4DFvcW_xZzIiceMZcqIxarDv8aOx5LFnsOMw7rIkcecxp1zwoLItMi2yLjCqGPElMibIMWkyKtpyK1lwqbJrnTJsMegxJkexqTCqsemyKLGq1FSybLEuwbCmlrJuMe5wpDEjsKQybzHgciBxbYOyITFl8qDyIjCkceLyIvKlMiNxo_DjMO7x5XHl8i6yLzIvsmAyYLJhMmGyYjJismMyY7JkMmSyZTJlsmYyZrJnMmeyaDJomPKnciTyp_CgcKmcXLInsWDxI4YyaXEmRrJqFdlYjPJrci2YW7IpMq9w40EYMSOwqTJuMKCwqEww4zDksKhMULLh8iAx4NyDcuMyIbIiMKTyobFpMKnYcerx61zc8akxot0xa5uZ8qMw4zDtsygZcKsW8iYyJprxrBhxJVdzKjGjMyszK7DucyxwqXGsGXIm8akyovLlcO6yo90y4_LkcaEwqdizITMhsaFyonKrsWyxbTFtsqYxJbKmsO8y5hlbMKyMTQ5OTEzyY4wzajNqc2qy7DGm8qfwoLMosykx67Lmsi9yL_JgcmDyYXJh8mJyYvJjcmPyZHJk8mVyZfJmcmbM8mdyZ_JocmjwqjGl292xIzFtsK3aMqxcHM6Ly9kzLkuxLhhLm5ldHfFj2vLu8SOH8akwq5Vxpxscy9GxphtIMu_acyIBVrJtsyOzJDDjMKgzJQazJfJvsW2xKfKgcuNx4nKksuSxabKhMyozZbFtcW3y5XDvM2Ky4_MscKmxb7Ni8WozZTCps-JzZjGj8qaw73NrMiUwoHCqMSJY2ltyLZzEs6jASDHpMq4x6hEyKfEgnLHr8ayyr5AxrQwy4LEvjfOvcuJchTMnMuOypHGgsuSypXEq8eQy5XDvc-O0IDMsdCDzZXFs8-KzZnGkMOAz5zKn8iWzLXIm8idyJ_IocSCyKTIpsioxbbCr2VudMW2INCieHQgaMW2xaXIrMiuwqfPrWzPr3PKosi3ZcOKPhnCgwjPpxPHpMSuxLDEsktleSBQzLlyzIgCw67Mks63MMOKQ1PCmcKazJTMlsWJx77LiMyZCc--z4PCksyxwq1bxpdpyLXQoiBr0YLMu8-VzL3MrcuVw7DMscKoZ9CgxbbGrs2TypbKjMqOz5LMnsyxyKHFrtGiZdGk0YLMvMyqxo3PmcKRw4zDvsyxxpZ1yJhpY9G-edKAzKtn0I9zw4DMsc2wyLLMptKP0oLKmcKTw4zDtcyvy5bQksaewoHHmtGh0bLRgXnDmULIvDhmODczN8ikMDhjNjdhyZIxNzdmyYdlNmIyZtKxNDDJosi_MDXJoDTOhDk20q1mMTIw04LJgWNk04_OhDjSrmbPpyPJqMmqxoAvTtCNxbbMiAPCtsa7wpjPt8K-ybvRlcm9z7sB0ZrKhM-EyofLlMeS0bbKkMqFypPQi8-W06Vy0pLCkcSOAdKhyJXIl8iZ0JZly7dlyKDIotCbyKfFkcKhI8qryq3CptOkzZfUgMi10LTCozAuMc-nJMmozqhpzqovVG_OsGXOss-yzInCsNOq0YzDjMKqzrvPusyZB9Ozz4_Kk8-GxoDPiNO_yozUg9CI07vLks-R07rUvNSY1IHEjgLUhc-ez6DPos-kz6bGocSOIsq206HJrFRl0KbTp8KOxrvGo8WBx7jEjsOUNdS0xZEC1LfQidO807fEltO5z5PVgdO20ajSgcys1IHDjMO_1IXQlNSIyJzUitCY1I7IpdSQ0J7QoNCictCk1ZfQp9Cpx63UlMiuwqTVltCm0LPIuM2zMzRhQTNGMzU5QTlENs2hMs2mMDE105I2NtaUQ0XSu86EyYvSrETWk8-nJdOgyoTJrcmvb8mx1KwEw5jMiRDPt8OI067HgMyYxZED1aXVrMiMzZTNh9O41YDTtdeDypbVhwED1IXKodSayqTKptKLa8qp0KvKrMiuyq_Wsm7Ks8SOJ8akwq3Pq2HGq8atxq_Gscexw40HRMSOw6DLgsa7JMOMw5XVosW2D9eBxZ7NjdeJ0ITUvgEFzZ3HmNSFx5_VkAEm15_Xodejxq7GsMyIB2zGtMO4160Kaca-06_Rl8WR1rnPgcyd0IDXt8uTzZTQhceSxI4E173Hmc6Kyp7Hns-nz73NlMKq1ZR01KbWgsq9ZMOMwrTXrQEs1rzRlta-xbYE17XQgdWtxarYnNWp14fYute4yq7RqdWxw7HVtNSHzLbQl8WD1I3QmtW70J1y0J_QodCj0KXWg9Cq1obGhdaJdNaLzLJib3fHnWbFrs6Xec-nHNWT1rDZmNGIwrzEjsOC2LHYs9eycgXYudCK1ajKjdi_2bPVrtKQ0pLCksOMw7nEjgbZhtCV1bfUi9mLyKPZjcWR2ZDVv9aB0KbQqNmV0KzZl9aC2ZrOj86RzpPOlc6Xac6Zb86bzp3On86hz6chxqTCsMu_zIHUpnLMhXPIo8ac1rPMiAYExrTDmtSww7DMlMOMwrrZrwvXtcKZzLHMs9qBzLjMutKZzL7Gj9KUypPMs9Gg0bzRpXnRp8WqzKnSkMyu0obKk8KkW8Sx24jGitGpzK7Dv9KVW9eQZduSxavPl3Is25TGj9WIz5Bbzpd0Ydub24rFr9G1zYFbZ8SD25vCrdud25_Vr9Gq07jSh9utxINQxa7IpNuw27LboNu2ypPCp1vEh82S273Tv9uz24vbgMyxxrhnbs2G17oD14fMn8qTwqvMqtqm2qhp1rPMqG9ias2E2ZnSg8SOBc-QxYHcjWVk2r7Skc-Zx7narQEH3KRp3KbcqNeE0pLQkdiiy7HGnsKI2ZrDi0N2NFfChcOYwqAAxJzWs8ikw4DCpNulYcKiyLzCo9uuc8ONWcOY0a7budu7ZcOOw7RhCQDOicaYzozFkcOZPc6QzYvalC_Po8SV2psuxJVmddql3arEsnbMgmXWlcmVyZBjzoTTlTfUjNOOM2Y1Zs2o1qPIv9SM0q3SpNG80qfSqdKr0q3Sr9KxZdKz0rXSt9K50rvSvd2604DTgtOE04bSrWLTidOL043Tj9Ks05LTlGbTltOYZtOa05zCosSx1o3Wj9aR1pPWldaX1pnWm9ad1p_WodajNdal1qfJmTHWqtas2IEoy77MgMyCU9CgZCBUeNqrwrjGu8Oy0YzRjinRkdGT2a8R17Xck9WC3KXOndyz24nbv8SWxI7cr9uCzLTVttq8btuo35tr2b7ci3PfhNyP26HEmteH0ZzbjsaHc2jcqdeLCNKVx63IpGlwdNyb3J3cn9y1147Slsylc8Kg3Z3Oi86NctqS3aTOlM6WzpjOms6czp7OoHLOotiBKtav06LKsMmwzrPDpsyJwojWuti007DMmQbZstWn14TRtdm24KCl14rcocSa147ZmsqlyqfXlMqq2o7Xmcqx1rPXnAEp2ITGp8q5xqzYh9emxrMHdsa7wo7Xrca82JHWvc6-ctC82JbPv8eK4KCp17nfrAjYoNe_0pLEoBXClsaSxKYAxI4TxZjRqeChmMOxxI4U4KGbARIAxazbtMWx07_goZjDsuChmsSOFgAA4KGYw7XgoZwCxI4Z4KGx4KGYw7bgobXEjhrgoZ7btOChmNm9ARzgoaQaAdupzKzgoZjDusSOHeCihQLDv-ChmMO74KG8AR7gobnDjMO84KG94KGkH8WY253goZjDvc6k4KGkIOCilsO-4KGc4KGkIeCih-Chn9Wy1ZHgoqYC4KKIZ8KW1IPEjiPgoaQk4KKc4KGr1YjEjuCitcSOIQPbsdyH4KGfxI4DxI4l4KKmCOCikNie4KK7AcSOJuChudyi4KK74KGkJ-CjjQEGxI7gooTEjijgoqjgooDfneCjieCjl-Chv9KQ4KKwAQjgo53Ejingo5IJxI4q4KGkKOCij8KmZ8aYdc6SwpDCpmPWs2bcscKAwqd2xbbFgdaz0LbDjMOMw40",
},{
  header: "Side Quest",
  color: "#7e57c2",
  name: "Encryption",
  image: "thumbs/encryption.png",
  desc: "Encrypt data with a public key, send the data to a public network, and decrypt it with a private key.",
  video: "https://youtu.be/LGEBqz1uG1U",
  save: "wofCrGxhc3Rfbm9kZV9pZFfEgcSDxIVsaW5rxItkSMKlxIfEiXPDnAAQworCosSMP8KkdHlwZcKqSW5wdXQvVGV4dMKjcG9zwpI8eMKkc2l6ZcKSw40BLDLCpWbEgmdzwoDCpW9yxIlyAMKkbcSIZQDCpsSTxKx0c8KRwoPCpG5hbWXCoMSkxKbFlMKkxJLElMOAwqdvxK3FmMWaxZzFnsWgxaLEpcSnwqbEhHLEk2fCpcWna8WaMcKqcHJvxKdydGllc8KEwqtibG9ja8aGU8S9ZTLCq3DEgmNlaG9sxY7Cr2VudGVyIMahxLIgaMaiZcKlxoV0bGXCpMSwxLLCpXZhbHXGqsa1acaYxKDEjD7Fo8SnwqtDcsSmdG8vSMSDaMS0xLbFgAHCmsOMwoLEu8aSwpJ4HsWFxYfFicWLxY3GogfFkcWTxZXFl8Stxa7FncWfxqrHoXTGv2XCrcW2xbgsbnVtYsaixabEk2sxxarFrMeixZvHpMWgwqRox4nHqcW1dMW3bsW5xbvFmjPFv8aBxoPGhcaHwoDCicShZETHqcKvRGlzxpZheS9BZGRyxodzx4vEt8ONA1xQx5LEvseNVFDHl2HFiMWKxYzFjg7HnsSJx6DEq8e6xa_HpcWyxaTFkMW7NciKxoLGosiNxojGisaMxo7GkMaSxpTImcaYxprGnMaiwqDGq2nGrWXCp8idyJ_IocazxrXGt8OZKjB4MzI4ODA5YmM4OTRmOcmiMDc0MTdkMmRhZDZiN2M5OThjMWFmybZjNsiQxIxNx6nCrciWyJjEgsibV2F0Y8eKxLXIpARWw4zDnMipxL_FgcK9PMiuyLDHmsWOD8i1xZTFlsi4xZnCkcKEx7zFocepyL7HtT7FumHHsmzCoMmByIzGhsWJxrxkRsepwq7HgseEx4ZEZWPHg3DEs8qVxYDIpsOMw6bKm8KSw4zCtC3KoMeZyLLGog3Kpci3xa3Cksi6xaDGlcW3xrTGoSBrZXnIgcesyIXHtMSUP8ucZcKpxp_LhceEZWTLpsiDxbjLqWtIx7h0xa3Hu8Wwy63Eicuwy4fLssiBb2Jqy4R0xbrHtcWaPsq3yYPKucKAyrtPx6nEqcqoxK_EscuIx4wow40CHMuOxYHFg8uTyLHHm3IBy5jKp8u8y6zIvMSnyq_FqMu6zKnKrMyrZciCyITIhsyLwpFAzI7GhMq5xonGi8aNxo9lxpHEvsmLxpfGmcabxp3Gn8ahxqPGpXTGp8apyZLJlMawzJjJmsa2ZcKudGjIlyDNmsSsxovGusq7yKjFs2XCrMSqxZgvQsStx4VuyKPHlMycwoDLjsOMw4jFhMWGyK_LlMykAsynx6fHo8u-zLLDv8u3xanFq8u7yLnMscepw7_MisSUxZpBzLrJhMKCzZTGt8KoY8SSxo4gxaDNkMauwqbNqHTNqsq7UcepwrFOZXR3xYxrL1N1YnPLhWnHss2sUMOMw7rKm8KCwqEwxYEYwqExLsyiyqLGogPNucqozbvHpcKpW8qTYW5uZWxdy7TMtc2_zK_HosubyqzCp8Wgc3PIr8avzaLMtMW4zofFvMKRQ8uswqjIoMaYaXbMg82izobIh8OAzovKucKBwqfPhc-Hz4nCrmlwZnMuzqFoLmJ1acacyodkTsiUzqDOos6kL1DOqMSSc8qUx4zFgcKQzJzIk8S8xL7OszDDjMOwzrhCzrvLlXIIzr_FrcKTy6zPg8-vz4jPis-My7bFu8OAy6zPk8ihz5fQpcuoxbtA0KnNndCJaM6Fy7fOisaAyYLMu8aHz63Qos-xz7PPtc-3zZjPus-8xpzKu1bHqc2kzJbOmc2qzazMnMOQzJxYzbDNstCZzKQE0J3Og8280LXQp8-PyqnMqs6Fz5zFmkXPq8aHzo3GtM2VzpDOkmvOlMaqxqzOl9GLb27Pv1TQgs6hzqNyzqXQh82e0IrRjQPDssyc0IHQkWXQk9CV0JfRlMWODNGXxZnQn8qs0KHHv8-w0KTPmcunZ82_0KnPlM-WZ8-YxaTPmtCux7VG0LHQiMiX0LTPp8u30aLQuMq40LvPrtKO0KPPss-0z7bPuNGDz71kyrtLzJTNpcStzJfEstGNxYLIpRbMn8WCzbPHmMyjxY4F0onPgcWxyq7Pjs6BzLDRmdKRy7XIhdGgwpE70aPJhcy-yYjNgcmKxpXNhcmOzYjGoMaixqTMmM2OyKDOlsavxrHMidGmxrfCvc2YzZrNnMaBYsqzbHkgc8uEyKB0PyDDsMKfwpTCpcq7U9K1zJbTpdK6wrjFgdGW0oHHjWND0obGognThcu9yLvTiMW7Q9Gc04bKrdONzLXTkEjTk8y9yYfNgM2CxpPTmWHJjc2HxqLGntOdzYvToMao06LRrdOkzZPTp2XDmcOkyZ84NMmnNzNhYTY1MGLJpmRjYsmkZjgxNWU1ODJmYmQwMTAzOWY3y7LJpjFk1L3JsjTGk9WJybdiMzdmNGM1MTHJvjcyOdWnyoAzYzMwMGVlOWEzZjA4ZDMxY9S4MDU2YTU0MDJiyazVvtWJY9WU1a84yazTrsm0NjRhybJl1pPJpsmj1bBmxpjVtTTInjnGmGU3MTg2yoPVsNWRNmPWhmHJosmk1abWrsuyZThhOdaC1KExyaLJttS8OWXVjDYzNNWIMjYyNdWN1avJsDQ3yoJh1LZm1r_VtGTWj9aX1YjKs9eDyrtCyJTLgMuHx4ZLy6QgUGFpctGNAkRuzrLOtMOKQ1PCmcKa0oXNtMqh0JoL04XPkcu-wq1bxoDPpMqRZcuiy6TPi9SW0KbHtTPPoNKYz4hy177Rmse1zoDHudKKy6zLnte9y6HLo8ul2IPTj8iHwpHLq8qsxb_SoGPYgNiW0prSktGgwpDQqcm3yZjPldCtzLbOiMKRyYDSpsyP0LvIitiTZdegecOZQsmf1qHWhjXWpDHVm9S91ZHVtdWqODXVg9aj14jJtzc21bHVpNeU1ZJlM9WJyatm1rbWvsqA1a_WvzjWiDNi1oDVjsq7Rcq-153HhS9FbsyBzJnIpALCqMycw5rNsMuR1IpyCte3y6zYnc2e2J_Yldiq0pTPktKW0KzYl9KTxbs71JPXuMelwqbMhcyHY8eoz5nah8yI0aDQqNKMy6_Lhsahy7PZv9OQRtOTwoDCiMiRV8qKyozImcibVMmTxq7NrG7DkMKm0r7DtADZsQbLmNOTwoXCqGbRsHTUnizJhsy_yYnNg9Sg1KLJj3LJkdSrwqXaocmUzo7Nlsa5xpjZptmoy7LRoMKcwpYxPwA-AMer045nx67HsMeycsKWM9uQQsWV0pLCljVC16gAAMKWO0sARQHSm2fClj5GAE3bo8KWP9uc26_bq8KWQE8ATtuq255BUNu7AsO_wpZDUQBT27JFVgBU3ILClkbbqVTbvduTwpZI3IhG3JPMtcKmZ8aBdXBzwpDCpmPRsGZpZ8KAwqfPpXLEvNGww4o-w4zDjMON",
},{
  header: "Episode 3",
  color: "#2196f3",
  name: "Distributed Ledger",
  image: "thumbs/ledger.png",
  desc: "We explore the properties of a distributed ledger. We can easily solve replay attacks, but double spend attacks are another story...",
  video: "https://youtu.be/z11wj9OcA4U",
  save: "wofCrGxhc3Rfbm9kZV9pZMOMwp3EgcSDxIVsaW5rxItkw40BB8KlxIfEiXPDnAAcworCosSMdsKkdHlwZcKrT2JqZWN0L0pTT07Co3Bvc8KSw40Fw4nDjQPDpMKkc2l6ZcKSw4zCjB7CpWbEgmdzwoHCqWNvbMSCcHNlZMODwqVvcsSJchPCpG3EiGUAwqbElHB1dHPCkcKDwqRuYW1lwqNvxK7Ep8SpxaXCpMSTxJXDjMKGwqdvxarFqcWrxa3Fr8WxZcKkanNvbsW3xKrCpsSEcsSUZ8KlxbtrxazDjMKHwqpwcm_EqnJ0aWXFkMKldmFsdWXColtdxKPEjG3GjcSrxK3Er8SxxLPEtcS3xLnEu8S9xK3Fg8WFxYfFicWLxY1hxY_FkcWTxZVhxZfFmcWbxZ3FnxrFosWkxabFqMWqxazFrsWwxbLFtMW2xKjEqgDFusSUa3TFv8aBx5LGhMeVxofGicaLxrDGj3TGkW7Gk8aVxax1xprGnMaexqDGosKBxqTGpsaow5kveyJ0byI6ImLFtSIsImbGnG3IgCLGpmljZciFIsalxqfIkDo1yIbEh27Ij8iAMH3GrWR0xrDCsU5ldHfFnWsvU3Vic2PGkWLFs8a4xLwFXcONAsK7xrzFhsKCwqEww4zDsMKhMS7FjMWOc8KAxZzFnmVyx5vFo8SJx5BuxoLHk8aFxbLCqVtjaGFubmVsXceoxpDGksecxJXDgMegdMmRwpLHlMaGwqfFsnNzx4LGh8eZZcepx6vHrcedxpfCicmpxbLCqHLEsGVpdsWZxrDDv8aUybbCkcOMworHscadyYrHtMWQwqfJl8mZyZtswrBsxZlnyYouyKVoLmJ1aWxkyJ98xrDCrcayxLDEssqUx6x0aMS4xLrItHHIt2vIusa-wr7HgMmFyYfHi8mKEceOyY7Fp8mQx6LJucmyxbXGs8ihybHHm8aVw4zCksmlyZHCkcKEyZPJssqoZ8qqxrDCoMqExJVzw4DGlGHIsWwAyonHs8ahxqPIk8aowqDIn3HGsMKsyqXGtFBhcsWYyqzGuQbItgHCnsqyxYjFismEx4LFkMWSxZTFlsWYxZrJiMWfDMq7xaXKvcuLy4DGiMaKxozJscmzyaHLh8KNy4rKv8uOx5dqy5PLlcaWwpF5y57Ki8ugx7bLomXChMKix77CpcmXdWPKsciIb23CpciNyI_Ht8iUZMScxovIjwHIn2fGsMKuVcagbHMvRnXImsagxovLr8S8AcOqw5DCsMqyyLzIvsOIyYFCy7jHg8u7x4bHiMu_yrhyFcyDyY_JkcKTy4DCoMawwqhmzL_EsWnHp8aVacyHY8ambMqCyaJrdsuAwqdhZGTJvMmtyZ_HqsyNx51tzJDFq8moy47MrsaoxrAAzJbFrGvNnMqCzoPDgMyaxp_LoMKCy47Cp2LGpsmZyI_CqcusZ3XFsm7Fq8KQyJ95yqNDxovHqsWUL0TJnGF5zYPDjQZgyLfDqc2JyL3FicmBGs2Py7rHhcu9xZnDgsyAyYoLzZjMhcyRx6TCpWXKgM6ZzavLh8KKzbvJksekxb9uX8agxbLOh8euyobDjM6KyozCgcKqz43EisSUX21zw4zDiMKJxKRkzarJscKvyKTIpsioL1DIrMSTc8qryLPEvcOSMs6uyL7JgDHNjseBxY_Kt8mJchvOvMeRxavNm8uOyZXKj8mayZzJnsyLyaDHrM2sw4DNr8msya7Kls22ybTNrHXNr8WpYs-raM-Ex513z5PMnMqOyZjQhGzCscmbz6Zya8qYyqrKm8qdyp_In3LOns6gxpxszqPOpc6nz64Gw6TEmcKqz7LOsDHOss-3zrTLvMeHy77His-6Dc-9yr7Gg8uAz4DPgsuExbjDv82sw4zCjs-Hx6PJqsaLz4xpz47JscqDz5B70JzHtc-W0ZfPmM-Lz5vPncifesiiz6XIp9ClyKrIrMiuyLDIssqtxL3EmAHChtC6z7TJg9C-z7nFnwHRhsyG0IHJltCfypHQhsW4zIzQicaVyaTGgMmmx5LNvc-J0I3Jr9CQxpLOg8qGwo3LgMm7yb3Jv8qB0ZnSkdGQ0Z3KjdCDypHQosil0anQpsqZ0KnKnsqgz6B4y6fLqcSyy6vLrdGvy7BoyLfCqMu1xr_Os8eE0YDNk864zZUK0bzOvsaGzIjHp9CHzbfShcedw4zCidGSy4DMk8yVx67FiMWIw43SnMydx7jFh8ygx77Co8iDYsKkzKjMqsysZc2_xZnMsciaxaXTlG_Mo2jMpcynyInMq8STzK3MnsywyJnMs8ife8qj0qsvy5DKqs6oBcKMxYDCmNK0yrTOs9G5yYoU0r3RiMuOwqbLgsqmzoHRj8KR0ZLLjcekwqbTttCYybHLlMeuy5jEgsuby53Gm8qKzovHtdOey6TPoMmwxbjKpMSuyqYv0qvNgzzDjMOcy7XEmUXDjMKR07_OuXIZ1INzwpXOhsyL1IfEsdCKy4DMoW_GsMK00IhnLG7Ol8ixcizUucih0obMh9Oa1L_VgdWD1YXJitWI1KPUusaVxJkG0YnMntWO04PVgtWEbdWG1ZPLg9S7zb7Tr9SgxKrVgNWc1ZDVn9WS1YnNrMSZB8-H1LbLjs2d1LjVlHTSkXTUvMe-0o_ThMmj1YzIidW8zLbVi82-1ZrMi9We1YbVo86_1aXHqNaHyYrQitKcwoTCpcagdMqUwqbSq8yjxZTFncKnIzVh1p3Wnc2fzqBTxr0Q057DmUB7CiAgx73HvzrWrNOXyIXWqtas05rIgNas05zWstaryJLTkta2yJfWsyLVpda2MAp9z5_EjMOMwpDGsMKvRGlzcMSCeS9CbG_MpsahzYMKWsu1Sz3UsM2VDtS00ZPFstW0xbjLhtOFw6jWkMKr0JbXlWvGodajxYYywqvXj2HIj2jFlMWfy5TWk8qUy5TMntOqyI5l14Zk1JHUodeM147XkC9XYXTJl86oAcOM15rFhMWGxYjDiDzXns-6GNeh1I3Ghtekx5rNrGvLmcubwqDSnMKAyJ93y6dJ0YfXksWqx75uzYPPksi3w4bStMOIMtiWxZ8C16HUt9GN0IrPh9KL2JvPj8qFw4zCiNi5xKrOj2_FlGXJmc6I0pzCg9OewqfQldCX1pJp1pTJskLYq8aL1pjMv3QSyJ9kzLdTxKpjacamL0zKlcmK2I3DgtSpy7XDi0DCgsK-McOHHAAAyLfDodi1yYoS1LTClNW60qnVtdWixpV504nNsdmd0ZnNrHvNr8qWyZvFhHPHqNWty4fDjdGJzbTIpdCZxbzDjM-H0IDHpNicZcKsy6xyzqbVocqmzoPFiMKG1K7LgMKpzpDEgtOhKCnNns2gzYDNo27Skc2mzo7Vpdqr2q3Noc2B2rHPkMOMw6zSnMKC2ZHZk8Km2aVkypZywqzJvHHKncm8TsyyZcODyJ_MlMmxwqrYqMaCL1RleHTNg27YkMa9zYQIPtm3cgPYuNWz1InShtOI26bTgsm0zoPClG3DjMOow4zDrtWX16nXq9eWZdevZdex17PXtde3yYrCr2XOmcmKIHTbmHQgaMmK053XusaH25fbmdOe177Ij8ifzIrUoc6fzpnQsNuW0aBy2I1yw5DDhNC6wozOsdK2zZHOts2Uz7oEzZjUjM6O0ZXGoMym2L_LlsKSdsOMw63YoMmcwqUzMDDPm9q-wqjElNyFcsiTxJks0YrcgcuEyI5rwqjIg3jHhcWdwqQjQd2QyJ_Ursy3zLnKnsy8zL7ar82Cz67NhcOQw5jQus2Mz7Xco8610YHHidSxFtS02pjYvsmxzZ_auNqw0Y_DrM2nzanalGvcs82v2oPNtNqM26vNuMW8w67YvNWZ05LOgdKR1a_Zg2XRmsm2zonUmcufxqLOjdaK243OlHLOls6YzprIn9S-ybHCrNuUxarYqnTYrNiuwrTEmcKk2LLYtNG41LEF26Xamd2z0ofHoc283oTehsuWwpF33oTZhdmH2YnUlNmL057Fg9yBzLDcjMKm2ZXem9mXxZPZmTLYgXXXitGoz6fPqdCW143PrdGwBW7DjQQQ0bXNjduiF92o2qbRv8qQ0IXWgdaJyarSjdCP3brVvd20wofQlM-q34rds9mB05DQnt-ZypLKlNuEypfSpMqc0qbdksKa2KfYqd693pzIs1bfj8OM3qHbogbept2q2LrbqNKIyaferNKaw7_esciD3rPaut6H3rbMnsKoY9OrayDFstuA1pXft96_xoDOmQDdksKd37XbleCgmNitz64Cwrnfj8OS373eo82VB-CggNej3qjdvtuq0Y3eggEB4KCJ2YbKlN604KCN3onMm8ai2YzgoI_goJHdh-CglNyL2ZLgoJfZltqx34DgoJvYgcOMwpvfhdKh34ffpc-szqgDwrvfj8Kj35LdoeCgqc-635HJjcyEz75z3anJlN-Y0KDSgsaO1YHfnMWyyavGotCO1abJsuChpdWWAQDfpN-Jz6zds8SZAd-p0p7JnMqT2aZy0KfKmt-xyp_goYnTvM-j34bRqt-I0JfYjVrfj9-02JFlzYrIv9-T4KGYxZ8P35bRvuChuMmd35vWg9KM4KGp0o7foNaC04XDvuChsdCX36fDv-Cht9KAyZzCsd-t24Vh4KG90qXgooDPoMOMwpnIolPHvtqeypbMvcqeZSBEx7LNg-CiiQRW0rTDgiTbogjcqeCghNK-xbLUht6q1oHSmsO-05DTmeCiuMKie9eF4KKvwpzgorLgorTJr-Cit8qU4KK64KK84KCjwrLfj-CjgOCijMWI4KOC26IJ4KOG3qrPiMaG4KOK0onRjOChpNWc4KCy1JjHsuCgu8WQ4KOQypTgo5J9zoPEoB7ClsSMAWcA3azdmW7Clmvgo79o2bPClm1qAGcC0oRnwpbchQBt4KSIzpcAbAHgpI_ClnZu4KSMAcO_wpbIp-CklwLgpKB5cQBkxabVicKWe8mLZOCkn8KWxb3gpKl24KSIxpjgpLR14KSZ1YHgpLHCiHcAdeCkpOCkscKJdAB4xabgpLrKh3QBeQDgpKDDjMKNegDgpKfgpJrRkHoByYvgpY3CkeCkqXvgpLXCkuClhXzgpLXDjOCli2QD4KWNw43gpYVk4KSO4KSr27DgpIvXiOCktcOs4KWo1K7gpIDars2ixovgpLHDreCkndSu4KSw27LgpazCkeCkjuClh8O-4KKwAMOMwpjgpLnVnOCkscO_w4zCmuCmgsKY4KWAxJngpoLCnOCmgsKb4KaFybTCluChtcSO4KaR4KaNAQbgpItlAtWoybTVqtWg4KSr1a_gpbFlBOCmn8aS4Kah1azVtsKmZ8acdcWXwpDCpsWTbmZpZ8KAwqfKgMut2rDDiz_DmcKZ4KeB4KeBwpo",
},{
  header: "Side Quest",
  color: "#7e57c2",
  name: "Byzantine Generals",
  image: "thumbs/generals.png",
  desc: "A distributed system will have a hard time reaching consensus. This classic computer science problem explores possible solutions.",
  video: "https://youtu.be/c7yvOlwBPoQ",
  save: "wofCrGxhc3Rfbm9kZV9pZMONAWXEgcSDxIVsaW5rxIvEjQIGwqXEh8SJc8OcAEHCisKixIzEjiHCpHR5cMSQT2JqZWN0L1BhcnNlwqNwb3PCksONBsKGw40CwrzCpHNpemXCksOMwowewqVmxIJnc8KAwqVvcsSJciPCpG3EiGUAwqbElXB1dHPCkcKDwqRuYW1lwqRqc29uxKjEqmXCpsSEcsSVZ8KkxJTElsSOwpHCp2_FocWgxaLFpMWmxajEuG_ErsWwxKvCoMKlxblrxaPEjsKSwqpwcm_Eq3J0aWVzwoHCpXZhbHVlwoTCpGbGk23CqmdlbmVyxp5CxobGnMaexqDCtWF0dGFjayDFmm5kYXkgxrQgxr13bsScxa5jZQLCpHfFlGvDi0PCnjTDgyMoRMOUxKPEpQEgxohlwrFOZXTHjHJrL1N1YnNjxbVixLjEusS8w40FeMWBwrLFhMWGZcKCwqEww4zDsMKhMS7FjcWPxZHFk8WVxqsAxZnFm8WdxZ_FocWjxaXFp8WpwqlbY2hhbsaqbF3HnMWzdMW1bsW3xozDgMW9xb_Ii8KSyI3GhMKnxalzc2HGqMiZxbTFtsaLxJXGjcKRxbvIpcWpwqhyxLBlaXZlZMecw7_IsMSWxo4BwpPGkcaTxpXGl8aZwoLCp8iSyJTIlsKxxqrHoceNLsegaC5idWlsZMKnyZHHomvCtWjGtXA6Ly9sb2PGnmjEu3Q6NDAwMceYxI0BIsecwq1Dxa7Im29sL0RlxIJ5xLnEu8S9BzDFgcWDxYXFh8e4x7rCjMe9GsiAyKvIgsWUxZYkyIfEiciJbsaAyIzGg8WpwqDIv8W4yLHEjsKTyKF0ypzGgsiOZcqgxKnEq8mAxozJg8KUyYbGlMaryYnGmsKqxpfFqcSLbl9tc8SOXsKJxKTJtR3HnMKvx5_JksejxLPHp8SUc2jKhMevBVrEjsOWx7XKjMe5x7vHvULKksWQxZLKlcarOMqYxZzFnsqbyIvCk8i1ZciQyY3IlcqByJjKrcWyyK7IncqixJbDgMuoyKfGmciqyKzLr8iayJzInsqjAcKWy7bFoGLLjWjKocaMxI7Cl8qzyYjGmHPJi8uryY_JnsmTyZXJl8mZyZvJncegyZ_JocmjyaXJp8mpyavJrcmvybHJs8uDxI7Kl8uvwqpJy6XEslRleHTLkMS9BWTFr8qLxYjEjiwyy5zKlMiEcgHLosqayqjLqMqsxbHIhsifyqbNgsqeyqvIrcibyK_KsMizAgLMi8q1zI3ChMKrzITJqWvGmFPHtjLCq3DEgseIyazJm8arwq_GqXTGqyDNqMyvIGjGq2XCpcaXdGzFqsytzK_GsMafZcanxqnGq8atxobJtMSOJceczKnMqy_Ntsywx67EvQbCuMi-zLbEvQHMucy7y57MvceKxZrKmcukzYnKqs2ExKvNhsixyKDFvsqnyIvKqcaEzpvLsM2NyJ3JgciyxYEDzZPGls2VzZfJqMa4zZvNnc2fzaFlzaPFls2mbs2ocs2qzK50za3Nr82xac2zzbXOv824xrLGtMa2xrjGusWuxr3Gv8eBx4NuzoABHMecwqvErcSvxLEvSlNPTsyxw40HwrLDjMOcy5bFiMWKxYzFjsqTzpPFljfNgM6YzqLLqMKjxoZqx5zOncW6AcKVzYjPss2KxavFrcWvy7vLsWfOqcevzIDEjsKdzq3Ktsabxp3NucOZWXsixqRvbSI6IsaoxqrGrGzGrmIiLCLQjcag0JYiz4rGt8a5xrvPj8eAz4DPktCfIsSHbseI0JYw0KDJn9CWNjk4NjYxNTI3NcmwMjEzybEwfcuCx5knybhEaXPNoMa-L1fGtMiSz6EJBsSOSs-nxL0DMTzOksiDxZY6z7DIisaBxqLOms-3y7NrxI7CmsaLYcesbMKg0IrMjcKAz5Qux5zCrMyqxoAvTnVtx6xy0ZbCnMWBw5rRm8OMwr7Mus-ry53RocarA9GkzKvKndGoy6_PuGvOn8iixoHNg8iZbtG-0oDQhcizAdGyxpLKtM6uxpnCg861xrfOt8m9xZbCoSPPg8-FwqbRvdG_xqvPiGXHuc-UKcecwrBTzqdnx6XHp9K7y73RlhDEjsOMz6fKjdKHy5rRoMufcjvSj8qcy6fNisu8xbbRqcyIAcKcy6jCpcSExLV00prSnMar0arEjsKey6jCps20yJ10zIbLu9Kb0rJy06ABwp_PvNKY05HOoMaAzYzLvdKexI7CodGzyYrTmca2xpYC06TGqWfTpwPPlCzHnMKxVcaXbHMvSMyuVG_SsdKAz6EKFMSOw6DShsOSz6rIgc-txqs8047PvdKSzYXTrcKh07DSkc6k053Tq9O3AcKi07rFkc-ULdSHybrOu8aTyb7Us2TPhGnFrtSUy5MCYtOGy5jHuMe-04rMvT3UoMWiyKTNisKhQcm40IMs06rSgNOtwqLLqMKhQtWN0rzVj9Oe06zTlcKg1KbVicqqxKhyxqDHnMKnYm_JvWXIlNSrwqPTmGXIvM67yL_QhcOA1K7Cg9WLw40Mw6bVlQDCok9QwqI9Pc-UKtG40brFodG81ZrPoQjCrMWBEtKG0ojMu8KBwqljyb3EgnDEt2TDg9KMcgTVh9Snyp_TlM6e1KbOo9af06nVmtSrwp7VtNKnzaLSqsar0qzSrs200rDWptCi0rUy0YnJtS_RjNGO0ZB50ZLRlMuPzonPosK8xI7CkNKGw4g61YTFlj7WncKR0afUqNKT063Co9Gu0bDSocmHzZTGmdG1zKUBK9aEzoXUksar1okqxYHUv86O0ofSidSc1po014vSmdeP05XDgtai16vFscKm1ZDSs82PxI7Cn9ap0ZDWq82kctauzbLWsNeectK01ITXmSbPl0NyxKp0b9SNxIPWv8qFw40IZsSONtGbeNSbz6zWmjnXqs2KwqXRpdWXy73VmdOr063Cndevz77Ik8uO07XNjsix0IbCmsSOwpzUrteYx5k10rnSu8WUyKtlL1bEtWnRr8201ol6WtWAyo7KkNeIxqs_2JvKqsSk0IHUo9OV0pbOocaBwoLNis-0xaHVstSuyYvGnXLKqsKj2ZjCpmfJqGLGnsODz5TYlMuv0rrYisasxqjYudi72L3HrdiPCHDDjQNm2YLFitmE0orMvMWWMtmIxoTZitagz7nDgdai2ZHZms6g1KvDgtmWwqfZmNWg1LhmZtmd2Z_Zoc-UG8m4z5nEsMSy2pTEsc-hy5LHu9GbxYE4w4zCqNmFctiUzpbLo9Glc8KV17DEq8Kmz7XaldGqy7XPvtCTbcecwrTVjtezcizarMSx06DNkdOY1rPas9q11ZrauMSu2q3MiAID05jQsMeI2r_VmNq224LPmtOc24UEy6jHi8eN24vYoNuN2rnbkMqjAgXUptqozYrOpdqr24PEsdCFzo_ClcSOw4DXjcWpxqPGpdipy7LIn9O3xJravcaxxarQgtK82q7biMeH27XXsdq227jPvsmf1KnVkcif1K7ChNavxbLal3TCpdaTyahywqcjNWHckNyQwqhmybvNnMWHENK0w5lqewogINCSxqXQltyg0JnNvdCcxobQn9ye3KDWs9yj0KXGtdCnz43GvMa-0KvHgmHHhNyp3J_Qr9u63KPQtNyqItC2OiDQuNC60LzQvtGA0YLRhNGGCn3PlMuhy6_Jucm71LXOhmnFqdKB14AGE8OMw6XZtMqPMcqR2bfWkdyL1pXWl9aZ04sFzYDWotuqZcW9yrzGl8a41bHXtQHDhteSyoHCpdGFMMq-2ZbCqMSVzrzQjcy4wqXVrs2nxKhpxrjCqNWmeNyLxZTCpCMy3o3PlM-vy6_CrtSJyZrUjEZ10LHGl9S73ZfCrsOMw6bZtMOI04ndoNaS1pRh1pbIvd2lzL1A1p3TkNSixKvclN6XxLHUusWv05XDhNuTyapsbMyHy7_Dhsu2YWRkyLjIqduuy77FusSa1Z7bs825z7fbsduS26DdsNir1bPSosyMyYrYnNuJy6nEtWfRvs2nc8KQz5Qex5zCrlPEq2PYvMm-TMi9xqjdltiPy5LZsRbanALCgMSOaNqh0bfapM2ByIvClMuowqJ0eMiZ25nTrdWfxoTCo96-yL7Lr8O_063fuM2KwqfcpcWFc9-926Pbmsu005jfgceg3rrPucOI1KbgoIjercSQxLXGrHnbjtqV1bLLqMKp2aDEgtCxZSjSuMuv3q_emN6y4KCh4KCJ35XgoKjHnOCgq96xxa7Uq961zYrCqtqLZt6EdWzEqdyB17TYq9Kfw4HUrsKF3IbCrEHcr8-MUOCgpXPCrMi4ccmZyLhO27rDg-CguWnajOCgvOCgvnkDwqngoZDgoZJl1JDDgsKp1rNU17HQg8-U2JrLr9G5zoVCxaHYim7PoQcIw40EwpzXhdem2JjTiwbZu9akxbHgoIbNh9OzyKPaqWXKr-ChgsSOw4jgooTVpdWnzbTVqsqw35DXldKkc8KD0rTCqGPElM-MxanchsKm4KGuxrXgoLXWk96XdAbPlMWY4KGr1oXEsuCineChsM-hBsKQ1JfgobjaoQfgob3Ni-Cghdqu34ffjeCghdSrwpfgoorVptWo4KKO34_VtOCileCil96E0KjNsNe-xbLgoqngop_Fvs67D8-U043ekU3EiOCgvcaZL-CjkGTgo5LMsW7DjNmR16TCjMe_2bfUnXII3ajgooLTsdWg3IDSk9Srw4nVtMKnxqnZrNaY3IbCp1PSqsaY2IHeiXLCpmNjNOCjuzTCqHPHp2fGrHBoxIDEgsSExIbFm8SYE8SR4KSHxozEmDvHhsSexKASybTMv8uvwqvYh9iJ2ItI2I3WidmwAd6qzo7YltqhCuCistidzKvYn8W22KHcgsixEdil1aDYp9Oo4KGn0rzbpQHNkt-R15bFkda2x4rdj9GN0Y_Kgta9dNGV14AJ04MBVNqc0Z3Rn-Cjn9aaC9eL3arOpdKUAd200bHYsMm00o7ZpdOAxbbSvmLgpZrIndGWGsuU2bTCvt6h16fTiwzeq9Oj0IPZvmsC05jTmsaW4KGA1ZvIsduH05HTpdSC4KSy2qrbvcaMBOCkr8aE2qvSl9-D0p4F2ZbTvNOb07_gpbfUg8m01pzgoqbXndaI14AIwrbFgc-W16TWj96i3aLepd2k1prIht-1z7Hgo6XXjtmM1qHgo6TWnuCis9u81qbNj86s4KS44KKS0qbXudKp17vXvc-E17_Wstu0wqEyybTdp-CmjdG72IDWiTTFgd654KaV4KG50ovgobvgorLgpZHRqgrgpb7gob7gpbrgpqfgoYIE17jOts641q3SreCjhtax1KrWs9iDxIzgobzLr9SI1IrUjNSOeNSQ4Ka714AKHsSOw6rUmdiX4KeCzL0N4KeE4KWs253gpqPWo-CmpeCnitSqzY8G4KWWy4Pgo6LgprnWhuCnodiPCcKmxYHDpNaO4KeB2bjGq8y_4Kad2qbgp7Dgp4XgooHSl-CmpNuh2rbSngfgp47SqOCnkNe84KeS4KaxxbLYgNK0x7nWtgnWueCkv9GR0ZPgpYLYjsevB8OG0azXhdeH4KWM04sP4KWP4KK34KahxJYI4KWU15TSo8q22LFk4KSl4KSXTca0aC9SyJRk0JTgoqss2JPXheCnqOCog3LOlciI4Kae4KiM4KCV0pXdqdic2r7WpeCns-ChggngpZTHj8KTc8OmLcKwO8Oe1bTCqWHFodCUxrTehMODwqNtxJUA4KmmYXjHj8Krw4FtZ07DiADJtOCnq-Clmdmn2LfZqsW12azgobJYxYHDht2c2bbgpabMvdKO4KiG0pDgp7DZvdes4Kai4KiLwpHaguCggdqEzY8K2ofaicaEwqTgoLrajsaG2pDLgw7YtOCpuNmp2LrgqbvMhNmtx68EwrrXg-Cqgd2e2qHWnOCqhs6Z2bzEleClrNmOyqjgqo7FqdmT3InNjwvgqpPEtdma2ZzZnuCqmWzZosuDEc-X3IjPnM-ez6DXgAfDpNmxxqLgo5zgqYXgo6DgqJzgqqzUoeCqj8aH4KqKxJYQ4KeIxarFrMWu4KaCzY8R1K7QjNu00I_Qkdqx0KTcpdCb0J3Qrtys0JfQpuCimc-O3LPPkdy2btCu35XQs9C1x43QljgwNTc2ybEyNNGB4Ku5OTHJsNGHybTgorHgp5rUs8m81LbPjtS53prYjwrEmeCmv8e204fVguCjnuCqg8WW4Kqc4KuR1YjVlNWM3Y_bgNiixowG1ZTVluCsn9uM1ZrRqgfgorbVoMib1aPLr-Cii-CivceFzY8I1a3Vr9Oc4KK4zY8S1bTVtg0h1brVvNW-1oDJtOClqN6R3pPUi86G1JHgpo_YjwdOxI7Jt9ekwqrgq47Wmt2n4Kyb4KmL4KuVawngq5jgqI3gp4vJgsKSEzjgp7bEjNaN4KGr4KS-1rsvTNGOzojYjwvDoMWBworShsO6w4zDutqhEOClqeCorc6c0aoTz7PgoIPgqYwS4KCSxpngoJTgorTgqIrZj8S84KKEAOCgrsqq06TGtMaZ4Ky3zYXSnhTgo4Dgo4bCpOCtqMSE3JTclse2EsKu4Kmg2IpB3r_Hn3dJzahtw4LWthPfn-CjleCjktSMT9KXz6ENUtei0obCtCjaoeCrguCtleCoiOClrOCukOCmqtCL27_Hjcm04Kir3Y_gq4TciNqZy5MBwrjfrhXDjMK11pDeo9644KaZ3qfWmuCiseCtlduf4KCa26Lbj9GqC9uT2rHbluCkqtuY4KCP277KqtK04K-byJ3gpKvGq-Cgn9q6yJ_bueCgpuCvomfgr6Tat9--4K-o4K68x6Pgr6vgr63gr6bgoJDgqY3gpqPgr5PgpqDaqtuZ1bLdqtus0JTfg9qu0p453argr6Hbtsu94LCCzY864LCF35XgpbLgsIngoYI725Pgo6fgpqbgrKHOntyE4KKb3Ijcism9xZTcjtyS3JFh4K6Wzrvcl2Xcmdaz3Jvcndy54Kuk3YHQmM284Kun3Kgs3L7gq6rcoOCrrNCo4Kuuz5DQrOCrsdy43KDgq7Tdgdy93LndgN2C0LnQu9C90L_RgTDRg923MN2LybTgrbXgr4DgoI8v4K-C3ZfgqYLgr4Xgr4fgr4ngr4vgppjepuCjr9OL4KOi4K-S4KKE4K-V24TOnuCvmduty6_atOCsp9Or4K-10ao534jgrK7FseCxpduX24Hgr6_IsTrgr6nbiuCxpOCsoNKA4LGoxozgsJHgr7Fr4K-z4K-d4K-Wxow4257gsZ7gr7zNjxDgsaLgsIDgsIfTk-CvsOCvoOCpkOCks-CwiOCyjMaEx4bgr6rgqZHgpKzgoJHgsbzgsI7cg-Cuus2V4LCY4KCP4LCa3IzgsJ3gsJ_ck9yV4LCix7bgsKXgq6HcnNy-4LCq3KTgsK3NvtCe4LCw3LngsLLcrs-L4LC13LLgsLfctdy34LKw4LC73LvgsL3gsrrcv-Crt92B4Ku54Ku74Ku94LGH4KyANOCsguCshMmx3YvQhcSgFMKWAQEAAgAAwpYC4LORA-CzlMKWAwQAAwHXstWawpYEBeCzntO_2rbClgXgs5kG4LOaBuCzrAcAwq3gsbfGq8KW4KGzAAcB4LOy4LGm0oDClgjgs7AJ4LOaCQoADOCzmgoNAOCzpeCzlQsOAA_FnduZwpYQEAAR4LOaEeC0luCzkeCzuuCxr9OrwpYS4LO4EgHDv8KWE-C0hRLgs5oU4LShE-CzmjjgtIUQBOCxruCvnOCxsOCgj8KWOQ8BEAHgtLHgr6Pgsb_alcKWOg8CEALgtLvgr6zgtL3EscKWOw8DEAPgtYXgr7TbmdmdxpN11pbCkOCjuMWu4KC7Z8KA2ojGq8WFxa7Diz_DmcKZ4LWj4LWjwprPlNSf4KOP4KORzbTUjOCuqNi-zol1z6XShuCjndqh4KuQyIjgq5jblOCvsuCjqN2xw4rgo6vgo63gqqLgo6_go4bgo7Hgo7PSs-CjtuCjuOCjuuCjvOCjvuCkgOCkguCkhOCkjMSFxJ3EisSM4KSL4KSGxJPIseCkj-CkkcaZ4KST4KSV2IbYiHDYitiMy47gpJ7EjuCkoce2wpLgpKPgqKnMveCkpeCuttOY2J7grKbgtJzgspZr4KSu4Kev25PgpLHgq5zYq8KS4KS22LDgpLvgqJ3grabgqKDgpYPgp7zgpYbgpYjOjtmx0Z7aoeCljuCutuClkOClrOClk8SC15PgraFk4KWYxbHZpsu94KWc4KWeZ-CloOClosy204fgpaQxy5vgtqfFluClqOCtld6s4KW_4KWr4K2X4KWu2JzgpbDgro3gp7Lgtq_gpbXgrongpongpbnFsuClu8ix4KW94Lay07LgpoHgsorOqM2P4KaE4LKb07vgt6fgpojUgeCmisuD4KaMxbHgoazgprrgrYrHr-CmkeCmk-CogeCxl96k4LGZ3qjFluCmnOCpieCoh-CuhuCiteC3s-CvlOCojuCmqOCokde60qvgqJXSr-ComNaz4Ka14Ka315zguITTq-CmvOCmvuC4ieC3ncar4KG84Laq4K23xZzgp4bgrZrgpbLSnuCnjeC3uuCik9aq4Kau4Lia4KKb4Lid27Tgp5dk4KeZxbHgp5velNSN1I_grYnguKPgp6Lgp6QB4Kem16TUmtqh4Ker4Liq4KCa0pTgp67gqozgsZ7guJbgoYLgp7XguLLgqLXgp7jguILgoqfWh-C5g-CnvOCnvgLgqIDgp4DaoeCoheC4kOCqh-C4kuCug-CqreCnieC3r-CtnMiy4KiQ4Liy4Kas4KeP1qzgqJTguLfgprPNueComsuD4Kic4KS91rrgpYDgtr3gqKLKhuCopQHCmuCop9qh4Kir4LeH4Lir0pTgqLDgt4vKgeCost-S1K_Lg-Cot8WxwqvgqLnTp-CovOCovuCpgOCxkuCpg9ekw4jgrZLTi-CpiM6X4LiR4Lir4KKA4KqL4K6E14zgqY_btOC4r82P4KmU4LqIbMePwppEFMKrw5XCj8Of4Kme4K6b4Kmi3a7gqaXgqadu4KmpbeCpq-CpreCpr-CpseCps-CpteCqndi24Kqf2avgqqLgqb3gqb_gqqjdn-CsmNKN4KKy4KqJ4Kiu4K-34KqM4KqzxoXZlOCqkeCqudmZ4KqV4KqX4Kq94KCk4KuAxIzgqpzgqbfgu4PYuOCqoNi84LuG14DgqqXgqqfgt5jLmN2d4LuK4KG6zL3gqqvguaPguadl4LuO4K244LmmzqLgu5LgqrXSnuCquOC4stmX4Kq64KCB4Kq82o_gqr_JtOCrguCkl-CrhM-dz5_gobLgq4oD4KuM4Lakz6ngtbTgorLPtOCrlOC7j-Crl-C4lOCqleCrmtmL2qrQg9Ke4Kue4Liy4Kug0I7QkNyh0JTgq6Xgsq3cp-Cyr9Ch27TQpOCwtNyx0Krgq7DgsrncuuCgpuCrteCyv8ej0JYyMDfRhTY0OeCxhcmyMeC8tOC8s92My4PgrIjguL3grIrdktS34KyO4KGx4Kei4KyS2bTgrJbaoeCsmuC7r-Cig9WK4KyexbHgtJvgtLLgsJXEluCso9WK4Kyl4L2S4LOz4KWzxJbgrKrgpqPgoIDbq-Csrdu7xKvgrLDgoo3grLLgoYLgrLTYnN6B1bDgrLjgoYLgrLrgua3VtgU54Ky_1b3Vv9aBy4PgrYTFsd6S4Kec4K2I4Ke74Kij4K2NybbShuCtkdqh4K2U4L2O4Kaf4Lmo0pTgrZngvJPguajgs6HgqZLgrZ3grZ_gt43graPguILgraXgpYDgrpTgrarHr-CtrOCtruCtsOCtsuCttOCttuC5jeCtueCtu96_4K294K2_xLfgt6jgooXguJPgqIvgvaDgp7HFnOCuiOClv8SCzajEhN-KzY_grrngopHKtuCilOCukuC-luCwoXTgsKPgrpngurTgrp1k4K6f4K6hZeCuo-CupeCup-C1quCjk-Cuq9mP4K6t4K6v1L7grrHgrrPguKdy4K614L6G4K2W4LuP4L604KizzI3CgeCxvOCuvtqT4LGP4LGR36rgr4Tgr4bgt4IC4K-I4K-K4KaX4LiL4Kaa04vgr5Hgv5Pgr7ngvozgsbHEluCvmNqw4LGj4LGt4L2b4LG54LGh4Lqk34ngsbbgs7vgr6Xgv67SleCxtOC9o2XgtY_gtYfgr7bar-CjptuV4L-54Lau4L-74K-e4Lu0xaLgv6zgvqvgsZ_bpOCij-CvvuCvmuC3tt-E0pXgsIPgsIXgso7gvJfbt9uw4LCK4LCM27rgspnOntKe4LG74YCF4LW54LCU4Lav4KKQ4L-XxpncheCnk-CwmeCjtuCyoeCwnuC-uuCwo-Cyp9CO4LKp4LCp3KLgsKvgq6bgsq7gsLrgvKXNudyt4Lyo0Kngq6_gsLjgsrncvuCwvCDgsL7coOCxgN2D4LGD3YbgsYbgsYjdiuC8v8SM4LGN4L2S4K-B4KCP4KmBxI7gv6HgtqTFgeC_pOC4iuCvjeC4jNaa4LGc4L-r4LKE4YCK4L-21aDhgJPgv7Pgv7rgr67hgaPEluCxquC_t-CxrMSr4YCB4LSz4LKA4LGy4L--4LG-4YGx4LGgxJbhgKPgqpXgsJPhga_gv7Tgv7zgsoLgr7jhgaLbj9Ke4LKH4L-x4LKJ4LKP4LKL4YGk4LKS4YCZzqbgspDhgongoprgsI3gspXTn-Cykdur4YG74Lmp4L2V0pXgsJfhgKzgsp7hgK7cj-CyouCwoOCypOC-u-Cyptya4YC13KDgsqvgsKzQmuGAuuCyvuCysuGAv-Cwtty00K3gsr7hgYXhgYfgvLBr3KPgvLPgvLUw4Ly34Ly50YDgvLvgvL3gsYp94LOMAOCzjuCzkOCzkuCzmuCzl-CznuCzmuCznOCznuCzoOCzqOCzpOCzpuC-jeCzvOCzqgDgs6zgs5Xgs67gs7fgs7HgvZvgs7UI4LO34LO54YOY4LO-AOC0gOCzleC0guC0hOC0huC0iOC0isKW4LSM4LSO4LSQ4LS04LST4LSV4LSX4LSZ4YOX4YGo4LSe4LSg4LSi4LSk4LSm4LSo4LSq4LSs4LSu4LSw4YG94LS04LS24LS44LS64YO824_gtL_gtYHgtYPhgbDgsafgtJHgtYrgtYzgtY7hhIHaleC1ksW-4LWV4LWXbuC1meC1m8i8xLbesuC1oOC1ouC1pMKZ4LWm15nVhuC1qeCjluC1q-CjlOC_h-CjmOC6l-C8i-C1s-C_kOC2qeC1tuC-i8Wq4YKV4K6H3bHDi-C1vcWn4LW_1pngtoHgo7LJm-CjtOCyn8WU4LaG4KO84KO94KO_YuCkgd6l4LaM4LaT4KSIxIngpIrgto1f4KSOxIzgpJDgto_EnwDgpJTLg-CkluC6j-CkmeC2neCkm-CkneCmkOCkn-C2o8WH4Lal4Lqa4Lao4KSm4Las4L2a4YGo0argtrHguZDYptiN4La14K2d4La44LmV4La64Lm44Kie1rzgubvTgsSO4LeB4YGZ4KWK4LeF4Kis4L6fxozgt4rRr-C6ieC3jeC3j8Sr4LeR4KWbx6bgpZ3SvOC3lgHLleC7qMe64Lea4Lec4LuLcuC3n-C_k-C3ocWp05LLsuC3pOClr9O94L6m4YOP4YKS4KW006Pgt63hgKDEluC3suGFpOCuieCjpOGFp8iy4Le54L61zI3CguCmhtO-1IDTpmjguLrguIHEq-C4g-CnuuC4hcS94LiHAuCmlOC8i-CmlsiB3aHgv6fgr4_Ti-C4j-C6neC5pOC6heC-qOC6ouC5keC5qsWj4Kap4Yal0qXguLTgqJPgprDguJzgubPGoOC4n8uD4Ka44LmY4KaO4Lmb4LiG4Ka9AuCsk-GFmtel2qHguKngv5PgrrfgrZfgp4fhhKvgrZvgvo7IsuC4seGHiOC4s-CmreGHi-C4m-CmsuCnleC4ucm04Li8xKvguL7grYfgp57gp6DhhrLDjeCno-CnpeCnp-C5iuCnrOCtl-C5j-GHg-C4q-GGl9iB4Ke04LeN4LmX4Yav4LmZ4L2-xL3gp73gp7_guKbhhovguaLhhr_gu7DgqInguqHhiJDguqbgoYLguazhh6fgua7gqJLgubDhh4zhh6zSneC4njDgqJvgtrvgubrWvuChsuC5vuC6gOC6mOCoqOGGi-C6g-GHnuC3iOCtl-C6h-GFuuClleC5lcm04LqOxKvgupDgqLrgupPGvOC6ldiPBuCxk9iU4LqY4YWcxZbgupzapeGHgOCgmuC6oMu04KmO4LKN4Lql4YKR4YiC4KmT4KmVQ-Cpl-CpmeCpm-CpneC5reCpn-CpoeC6u-C6tuCppuCpqOCpquCprEPgqa7gqbDgqbLgqbTLg-CptuC3kNi12ajgu6Hgu4Xgta7grYvgqb4C4KqA4YaH2bXgqqngv5DgqoXhh57fueCqr-Ctl-CqseC7tdmS4KqQ4KGC4KqS4Lu62ojgu7zbq-C7meC7v-C7nGTgu57hiaPgqp7hiabgqqHhiajgqqTgqqYB14Thia3gu6rgqqrgu43hibTgu4_hibbZkOGJuOC7lOChguC7ueGHp-C7u-C7l-CqtOC7vuCqvuGKguC8guC6j-C8hOCrhuC8h-Cri-C1suGIv8ar4LW14YiP4KuS4Kq0z7XgpazgvJLhhp_gvJTQgOGGosWj4Lya4Yen4LycxqDDmVjgq6PhgLfhgqfcpuCrqNCg4Kuq4LKz3LDhgYDgsrfhgq_gvK3QsjrQtOGCs9CWMzM43o3gq7zgvLk50YU10LzgvLfhgZBk4L2B4Yex4L2Dyb0v4L2F3pngvYfgrJDgvYnhia3gvYvgv5DgvY3hiqvgrJzgvZDgpKngtLzgrKjgrKLgrKThi6zgtYbhi67IseC9nuC-qduT4L2i1aTgorzgvabSnuC9qeCvoOC9q-C-puCihsmCwpHgva_hiJfVtglq4L204K2B4L23xIzgvbnEq-C9u-C4v-GHteGHlcqG4L6A4K2P4LyL4L6D4L-Q4L6F4Yup4L-U4LuzyLHgvorhirHgvozguZLgvo_graDhiLHLg-C-kuGGr-C-lNGR4L6Wz6HgvpkC4K2v16TgrbHgrbPgv5DgrbXgt6DguaXIseCtutmS4K284K6CyLHgrb7YnOCgk-GMgOGHgsqc4L6q4KWR4L6t4YaQ4L6v4K6M4L6y4KGC4L-W4LqL4L634KiW4K6T4K2p4YCx4K6Y4K6a4Kmh4L6_4L-B4K6i4K6ky4PgrqbhhJ_grqngsZDgrqzXgOCuruCusNek4K6y4K604Ye84L-V4Kuf4L-ay4Pgrr_hgZPgv53hgZXXgN-r4LGU4L-i4YGb4L-m4YGd4L-ozL3gv6rhjJrhgI3boeC_vOC_sOGBpeC_suGBvOGBqOC_teCyl-GJiOC_uOGBp-GAiOGBqeGBsuGOgeCykuGCkOGOhOC9lOCxuOC_vOGAhOGBuuGAhuGOi-GLreGEh-GBquC7kOCuhOGNuOCgjuGCguGAkeGChdqy4YCU4LCP4YyC4LCE4YGt4L-_4YaR4YCVw4DSnuCwi9-U4YCf4YmK4Y6fyLLhgbnhgpThjpHgt6nhhpjLtOGCmeColsKm4YCt4LCb3I3hgp3hgLDhgqDhgLLhgqPgsKjhgqXhgLfgsqzhgqjgvKPhgLvhgqvgoYrgsrXgvKrhgYLgq7LhgrDgsrzhgYbgsr7hgYngsYLdheCxhd2I4LGJ4LGLy4PhgZLEq8Kt4YGU24_hgZbhja_hgZngv6PgsZbhjbLdo-GGvMy94YGg4Y234YKB4YG34L-94Y6c4YG14Y6U4Y6Ha-GBrOGOguGBruGAgOGEjOCvp-GBs-GOqeCylOGOkuGLsuGPreGPqeGOruGErOGOsOGPs-GNv-GBvuCyg-GIgOCyheChguGChOGNvOGChuGAmuGCjeGOiOCimuGCi-GOpOCvn-GOieGOquGApuGOsuGPquGApOCxveGOq-CymuGHp-GAq-GOteGOt-CyoOGOuuCwn-GNkNyY3Jpp4Y6_4Lyf0JXhgLjgvKLhi4DgsLHgvKbgsKvhgqzgsrbhgq7gsLnhj4zgvK7gsr3cvuCxgOGLjuGLkNC_0Lgy4YuU4Ku64YuXNOCzi8qw4LON4LOP4LOR4LOT4LOV4YOG4LOZ4LOV4YOJ4LOf4YiB4LOj4LOlA-Czp-CzouGDkeGDk8KW4YOV4LOw4L2T4Y6T4LO84LO24LO44ZGX4Y-64LO84YOe4YOgwpbhg6LgtIXgs5XgtIfgtIngs5rhg6jgtI_hgI904LSS4LSU4LSW4LOV4LSYAOC0muGDmOC0nwHgtKHgtKPgtKXhhY7hg7cB4LSr4LOV4LStAOC0r-GEhuGOjeGDveC0t-C0ueGSgeGAieGEguC1gOC1guC1hOGPtOGRq-GEieC1jeGShuGOhuGEjeCkgeGEj9-b4YSR4YST4LWc4YSW4LWf4LWh4YSa4YSbz5TequGNmuGEoeC1reCqo8KSesWBx4rgo5zgrJfgu6zFluC3huGEquGMn-GPvuGApc6c1KvDjeGEseCjruGEtOColuC2guGEt-C2hOGOuOGEu-C2iOGEvuGFgOCkg-CkhcSS4YWE4LaQZOC2kuGTguGFiWRI4LaX4YWN4YWPxIzhhZHhiLThhZPgtp7gpJzgtqDhhZfgtqLYleGKqHLhhKnhjJrgp7DgpKfTtOC2reGOjOGQlOGFo-GHv-CksOGFpuGAlOCkteCkt-GHp8KA4YWr4L2S4Yyo4YWu4Yij4KWE4LeA4KWJ4LeE4L-Q4ZKs4ZOb4Yis4LuP4YW54LeM4YykxIzhhb1l4YW_yJ3gt5PhhoPgpYTgpaHhhoXgpaPgpaXhkqrGq-GGjeGMmuGGj-GCjNOT4YaT4Lem4YaV4Yaca-C3q-C-ruC3vuC3ruGIgdGq4Yae4ZOj4KW_4Yah4ZOm4Le44KaF4Le84Yaq4KW44Yat4Lih4Yax4YyS2JDgppLhhrXhiIzKk-GGuuGNs-GPpOC4juGNpOGMnOGJhuGHouGIlOGMguGHh-GAqeGHqOC5r-Cmr-GHq-Col-GHjta04Lig4Ke5xLLhiIjYkOGHl-GHmc-o4Ya44ZSIcuGHneGTm-GMtcSW4Yeh4ZKu4Yej0p3Nj-GHpuGUuOGImOC4meCnkeC5suGHrc254Li64Yewx53grYbgp53guYHhlYPhh7jguYbhh7rgv5DguYvhibLhh4HGjOGHvuGIk-GJitKe4LmU4ZOpybThiIXEkOGIh-GHtuGIiuC5nuGUq-CnqcWW4YiO4YmC4ZWs4YqT4Liu4ZWtzY_hiJbhlZXhh4rhiJrhlLzgp5ThiJ3gprThiJ_gubbhiKHgqJ_hk6_grYvhiKXguoHgv5DhiKrhk7bhlanIseGIruGTuuGVsOC6jc-X4LqR4Ki74Ki94Yi4beGPneGIveC8i-C6mdqh4YmB37bgvofgvqvhiYXhjpbKqOGAmOGJieGQk-GJi-GMguC6qOGIr-C6q-C6reC6r-C6seC6s-GJleCpo2PgurfhiZngurvhiZvhiZ3gur_hiaDEjOGJouGFvuGJpOCpueC7ouCpvOCriOGJquGJrOCslOC7qeCqguGVieGJseGVjM2K4Luy4Lis4YCLxaPgu7bhibnhjILhibvhiprhib3hipzFquGKgOGKn8m04YqE4ZeF4YqG4Km64Luj4YqJxL3gu6bhiozgu4nhipDguYzgqq7gvJbhl5XhiJLhibfag-GKl-GMguGKmeGUuOGKm-Cqu8S14KqY4Lub4LyB4KuD4LGP4LyF4KuH4K2L4LyI4LyK4YeaxYvgvI3hl67hiq3gvJDhlLJr4Yqw4ZSb26vgvJXhirTCkeGKtuGUuOGKuGXgq6LhkKbgvKHhj4Phi4DhgLzQo-Crq-GPh-C8qeGBgeCyuOGPi-GLiGXgvK_dgOC8tjk04Ku8NDI14YuWM9C-4Ly34KyG4L2A1LLdkeGLnuGLoN6y1JThi6Thl43HuuGLpuGGi-GLqOGVvOC9j8qq1Yvhi7Hgr63RquC9l-GZhOC9meGPmeC9m-CsqeCsq-CqleGLuOCsr-GLutWp4L2n4YyC4Yu94LKS4Yu_347hjILhjIThlZXVi9K1QtW74L214K2C4L2435_hlZ_gvb3hh7bgrYzgrY7gvoLhk5jhjJnhmYLhlqjhiJHEluGMnuGYj-GAjuGMocaN4K2eReC-kdG44ZOt4K2n4K2p4Yyr4K2t4Yyt4L6b4Yyx4YaL4Yyz4YaO4ZWNa-GMt9ma4Yy54KG_0arhjLzgr6DhjL7gqYzhipTgroXguoXhjYTFsuGNhuC-seC1uuGNieCukeGNjeC-ueGOvOGNkeC-vuCunmXgrqDhjZbgv4XhkqDgv4jhjZ3Yj-GNn-C_jeGNoeC_j-GGi-C_kuGXkuGFt8ix4Y2K4KS54L-Z4ZCW4L-b4LGO24_gsZDhjazgv5_hgZfgsZXgv6Xhhrngr4zhj6PgsZrhjbXWneGOmMu74Y264LKI4Y6d4Y-54LWQ4Y6V4Y6P4ZCN4Zau4Y2-4Y6F4Y6A4ZCV4ZCR4Y-44ZuQ4ZOg4ZKR4Y-14ZCM4ZKv4ZCX4ZuK4YCC4Y2AyIvhm4XXseGQhcmC26nhj6vhjp7hgJzgoYJG4Zat4Y6D4ZCK4YKIy7TSnkfhgJ7hm5XhgpbhgKfSnkjgsJLhj7_hlJjhkJnhlLjhkJvSr-GQneCwnOGQn-Cyo-Cul-GQouCwpuGCpOGYmeGQqOGYm-Cwr-GQq-GAveGQreGYoOGLheGQsOGBg9y54YKx4Y-P4LOA4LGB3YTgsYTdh-Cxh92J4LOK4YuZ4Y-YZeGPmuGNq-GPnOC6luGPnuGFmuGBmuGPoeGav-CxmOGNtMWW4Y-m4Zmu2qfhj6jhm5nhm5Pbq-GBpuGbluGRmOGSh-GPqUbgsavgv7_hkpDhm5JH4YG04YCH4ZuX4ZuS4Zu34LKY4Zy_4Zy14ZuY4K-2ReGQg-CvlOGbo8iy4ZCH4KqV4Zyz4ZSN26_hgo7NsOGQjuClq-GCk82w4Y6K4Y6x4L2c4Zyx4Zub4ZSS4YCo4LqL4Zu91rDhm7_hjrngsJ7hnILgsqXhnITgsqjhkKXhgqbhgLnhj4ThgqrhkKzgsLPhnI7hgq3gvKvhj4vhgYThj43hgrLhkLbhgrjhmKrhmKzhmK7hmLDhmLLJsOGRgNir4ZGC4YOD4ZGF4LOW4LOY4YOI4LOd4ZGL4YOM4ZGO4ZGQ4LSd4ZGS4LOt4LOv4YOw4Y6F4YOZ4YOb4ZGc4K-t4LO94LO_4LSB4LSD4ZGjwpbhkaXhg6bhkajhg6rhhILhg6zhka7CluGRsOGRsuGDseGRtOGRtuGDteGRueCzleC0qeGRu-CzmkXhg7rhnLvgtJFG4ZKE4YSA4ZCB4LS0R-GEhOGSi-GetuGEgkjgtYvhko_hkozhhI7gtZThkpXWk-GEkmngtZrhkpjgtZ5u4YSY4ZKc4YScx5ngvZHhjI7hkqLgtazhhKPOieGSpQJc4LWy4ZKp4ZW54ZSJ4KOj4ZKu4LW44Zuc4ZKx3bHDjuGStOGEs-CjsOGEttS44ZK63Izhkrzgo7vgtonhhL_gtovhk4HgpIfgto_hhYbhhYPhk4jhk4rhhYzgtpnhhZDgtpvgpJrgtp_gubzYkOGFmOGTl-CkpOGFnuCkqOGTn-GdheGFouC1t-C2tOGUnuC2tuGFqeGTqeGTq-GPmeGZu-GFr-GTsOGFseGTsuCli-GGi-GTteGcreC6o-GasMSW4ZO54YW74ZO74LeO4Kqd4LeS4YaB4LeU4YaE4YaG4Zi904jgt5vaoeGUiuGcreGUjOGQj-GUj-CvoOC3p-GUkuGUlOGNheGUluGUkuGUmuC7sOCmgNmP4ZiS4Yak4Ze44YaodOC3veGGq-GUpOGVgeC5mtST4KaQ4ZSp4Ya24Yea4ZWIxZDhlK3hm4HguI3IheGUseGXseGUs-GVkOGUtciy4ZS34Y2L4ZaE4ZS74ZWZ4ZaI4Lm04Ka24YeR4ZSl4ZWC4Ye2COGVheGVuOCphuGVi-GgluGahuGVj-GZs-GVkeChgeGMguGVlOGhlOGHqeGWheGhl9Kz4KeW4Yev1Ifhmabhh7TguYLhoYLgrJDguYXguYfgvIvguYnhlabhoY3guY7hlb_hlq_hla7hiIThoZzhoYHXn-ClhOC5neC5n-GGt-CoguCjoOGVu-GWp-GMm-GhjuGWq-GKrOGZtOGHhcKR4ZaC4aGs4ZS64Li24KeT4Li44Lm04ZaKxIzgubfhk6zgubnhlo3gqKHhiKTgqKbhiKfguoLhhbbgr7rhopDhlpfhoJvhlpnEjOGIs2XhiLXgupLhlp7gqL_hlqDhnKPhlqLhh5rhlqTgv5DhlqbgqYrhh5_hmovhl5bhoJfhgorhm4_hm7ThoanIsuGWstGw4KmW4KmY4Kma4Kmc4Za42IrhiZbgqaThiZjgurnhiZrgur3hiZ7gu4DhiaHgu4LhiaXhl6bhl4nhiangu4jhio7hl4_hn5py4ZeR4aGk4ZeT4YqS4ZiM4ZqR4KqN4YqW4Kq24Ym64LuW2orgoZjajeC7muCqmuC7neGjl-GXh-GJp-GSo-ChteGKi-GKjeGgpOGKj-C_kOC7ruGar-GXr-CqsNqB4aOo4Lu44aOr4Lu94Ze74aOv4LyA4KuB4Ze_4Zq44ZiB4Yql4LyJ4Yqn4ZiI4ZWo2oPhmIvhopDhmI7gu7DPv-Crm-GgiOGMguGYlOC6i-GYluGKuuGKvOC8oNCX4Z2r4Zic4YuC4ZCu4Y-J4Zij4Kuz4LK84YuL3YDhi5Thi47grIMyM9C4M-CzhzfgvLThmLTEjOGLm8ed4Yud4KyMxrzgvYbhmLvguKXhi6XHveGfmeCphuGZgeGijuC-quGZheGgg-GRneGQlOGZicaE1ZXhmYbgt7DgvZ3hmY_gvaHVouC_v-C9peGZlOGLvOCstd6C4L2t4Zmb4Ky7QcONC8O34YyJ4L224K2D4Zml4L284YyR4aG34L2_4Zmq4K2Q4Zms4aG-0arhmbLhlb3hnZnbpRPhmbjhoJzhjKbEkOGZu-GMqteA4Yys4Yyu4LyL4Yyw4L6d4Yy04ZaVxJbhmojgoIHhmorKruGajOC-pOCugeGivuGXsuGLquC5jeGalOCuiuC-sOC-puGEruGameC5rdyG4Y2O4K6V4ZqdxYfgvr3hjZPhmqDhmqLgv4PhjZfgtpHgv4bhhKDhmqbgv4rhjZ7gv4zXo-C8i-GNouC_kOGaruGjouGgmGvhmrLgopLhmrThjpDHo-GatuGNquGauOC_nsuR4L-g4Zq94YGc4aGK4K-Q4ZuE4Zyv4K-24Y274Z2O4Y294ZCA4ZuR4Y6O4Zy54Y-s4ZKC4Y-u4ZuN4Z2X4ZCS4Zy04aWI4Z2G4ZCQ4Y6v4ZKw4aeC4Z2A4Y6O4Z2J4aKp4ZGq4K-94Zum4YKH4Z2R4ZuvzY_hm6rhjqLgsIHhm6jhjILhm7Hhj7fgsbXhlq_hjqzFo-GdguGQluGdneGOtOGbvuGCm-GOuOGAr-GQoOGmluCwpOGOvuCyquGPgeGKvuCwruCyr-Gci-GYnuGdr-CytOGYoeGLhuGQseGdtOGQs-GPjuGQteGcleGBiuGPkuGcmeGBjuGcnOCxjOC_nOGmtOGausev4Yi74Zq84Y2w4Zyn4ZSs4ZuA4K-O4ZuC4Zyr4aa84ZCE4ZuM4ZuI4aeG4Zy24Zyw4Zy44aef4Z2E4aeN4Zy84Zy-4Zud4YG24Zyw4aep4aaw4Z-f4aeS4Z2F4ZuS4Z2I4YKA4aia4Y6a4ZCG4aic4Zun4Z2S4LCG4aea4Y6l4ail4Z2Z4aeP4Z2c4ZCY4LCW4Liy4Z2g3Ifhp67hkJ7hnaThgp_hnIPhp7PgsKbhkKThp7XhpJ_hj4Lhir_hnIrgsrHhna7hi4Pgq63hkK_hnbLhgLvhnJPhqITgvLHdgeGkqzPhpK3hpK_hi5ThpLLhpLThnb_JguGegeGRhOGDheGeheGRieGeh-GDi-CzouGDjeGRj-GRjOGejeGDlOGej-GelOCzqOGRmuGDnOGDseGRn-GemOGDo-GRpOGDpeGRp-C0jeGRqeC0keGeoeGDruGRseGekOGbl-GDsuGRteGDtOGRuOC0p-Geq-GDuOCzleGer-GRv-GDu-Geu-C0vuGes-GDv-GeseGet-GeueGqlOGevOGevuGEi-GqkMSx4Z-B4YSQ4Z-E4ZKX4YSV4Z-J4Z-L4YSa4Z-NybXZh-GapeGfkuGmoMyxx7LMv-GfmOGHu9-14LW34YSt1KvDjOGfo8204LaA4ZK34Z-m4YS44LaF4KO54YS84Z-s4ZK_4YWC4ZOC4Z-x4LaR4YWH4Z-04ZOL4Z-34ZOO4Z-54YWU4Z-74Lah4KSg4Z-_4YSo4aCB4ZOe4YWg4Y6F4aCF4YSrwqThoIfhqLjhk6fgtrnLg-CkvOGioOGFreClgeC2vsev4KWF4aCR4LeC4YW04ZO04aKo4L6I0arhoJrhiLDhoq3hoJ3gqbfhoJ_Sv-GUguCnvOGUhOGgo8uX4YaI4ZSH4aOf4aCo4aKO4aCq4Lej4LuP4Lel4aCt4ZSR4ai-xJbhoLDhmpXhoLLhrIFr4aC04aKS4aC24auR4Zut4Le34KGC4aC54LqL4Yan4ZSh4Let4aC_4YeT4Lii4aWm4Yaz4aGE4aGh4aGJ4aiW4aGLcuGGvuGmquGiqdKU4aOm4YeE4Yek4YeG4LiY4Li14ZWY4aKa4ZS-4YeQxIzhh5LhiIbhh5ThrJfhlYThpL7hoorhh5zhpavGjOGhpuGlruGjg-GWsOGHpeGsp-GHquGhr9iB4aGxy4PhlZ3hh7LhlaDgp5_hobbhoobhobjhh7nguYjhk5jhlafho73hq6jhlarhooDhpa_hiIPhoJzhlbLhhrDhoZ3hlKfhlbbhoonhoYbhoovWmuGijeGivOGahuGso-GIgOGZtcWj4aKW4KS54ZWW4ayo4Lmx4ayq4ZWa4YeP4aKdZOGin-GgjeGioeGTruGio-CriOGWkOGipuGWkuGrp-C-q-C6huCoseC3jeGir-GiseGWneC6lOGiteGIuuGIvOCphOGWpeGhjeGWquGjpuGbq-GPsuGIgdKe4aOGyoHho4jhiZDho4vhiZPgurTho47hlrvho5DgurrgurzhiZzgur7hiZ_gu4Hgu5_ho5jhl4jgu6Tho5vhiavhl6zhibDhipHhl7DhrKLhpIDhl7Tho6nhl5rhpIPhib_ho63hl7zho7DhioPho7Lgu4Thiojho7Xhl6rho7jhq7Xhia7gu6vho5_ho7zhrKDFqeGXlOGup-Cnr-GXmOGXtciy4Ze34ayQ4Zed4Ze64KO34aSG4Yqg4aSJ2pXgq4XgvIbgq4jhmIThpI7gv5Dhiqrhrr3GheGkktKU4aSU4aKS4aSW4Zew4Y6k4LyZ4Kuf3JrgvJ7gsKrhp7fhgqnhmJ3hmKbhmJ_hp73hnI_hqZXQoOCwvOGkqeCzgOGYrjDhi5Q5OTfhpLPhkLvRgzA04Ku94YuZ4aS3wrHhpLnhi5_grI3hi6HhpL3hh5jgvYrhpYDgvYzWneGlheGfj-Gcn-GZjeGLr-C9mOGljeGLs-Glj-C9n-GLt-GlkuGLueCijOGlleCss-Gll-C9rOChv9Ke4Zmc4Y2L4L2xw5DhpaDhmaPhjIzhpaPhjJDhrYffqeGlp-C-geGlqeC-hOGstuGMneGtkeGsuuGlsOGlsuGrrOGltMKs4aW24Zm94aW44Zm_4aW64Yea4aW84Yyy4L6e4ayh4L6g4Yy44L6i4Yy6xJbhmo3gspLhmo_hsYHhopHhporhrKHhpozhmpbhpo_gro_hmprPheGmlHThkKFl4aaY4K6c4aaa4L-C4L-E4Y2Y4aaf4Y2b4L-JxoDgv4vhjaDhpqbhmqzhlYnhpqnhoo7hor3hmIzhpq3grrvhmrXhjajhqIzhr43hprXMsuGmt-GokuGavuGolOGcqeGUr8ar4Y224Zyt4Zuh4K-74Y6V4aa_4Zyy4aeB4aqX4Y-p4aeJ4ai34aeM4ZuL4aeI4ai64ais4aij4aeE4Z2D4aim4Y-74Zyw4ZqR4bG4xbLhnYtz4Zul4ZCI4ZuJ4ayM4Y6l0p7hp57hj7HhjqPhnZXhgKHNj-Gno-CvoOGdmOGsuuGnp8KR4aip4aeQ4air4Zu64ai_4ZCa4LKd4YKC4YKc4amF4bGS4YCz4Yq54ZyG4Z2q4ZCp4amP3KvhqZHhpKThmKLhgq_hqIHhi4nhqIPgsL_hqIXhj5HhnJjhgY3hnJvhgr7hqIvhmrfhsazhqI7OiuCxk-GBmOGcpeGPoOGxseGhiOGoleGBnuCxm-GomeGdiuGom-GnmeGyguGbnsaM4aig4bKZ4aid4aeOxozhnL3hp6ThnLrhkozRquGypOGoveGyiuGnh-GPqeGor-Coi-GyjuGnl-CyhuGotOGouOGovOGygeGdkOGoueGzn-GdneGbuOGnkeGyp-GOs-GpgOGyquCgoOGyrOGCnuGyruGntOGAtuGpjOGvo-GdrOGnuuGvpuGnvOGLhOGdseGPiuGpluGdteGclOGpmSDhr6_hr7Hhr7Phr7XgvLngvLzhr7nhgr7hg4Dhg4LhqaXhkYbhqafgs5vhqanhkYzhqazhnovhg5Dgs6vhno7hg5bhqbLgs6LhqbThtKXgtJ3hqbfhg6Hhnpnhg6ThkabgtIvhqb3hnp_gtL7hqoDhka_hg6_htKjgs7zhnqfhqofhg7bhqorhnq3hqozhnrDhkozCluGqkuGSheG0v-GeuOGSiuGxvuC1iOGeveGEiuG1hnThqp3hn4PgtZjhn4bhhJTgtZ3hhJfhkpvhqqTPlEThsZrhkqHhn5PYjwJRw4zhrrfPqOGEp-GZgOGfnOGZs-GfnuGNiOGMgsSOw5DhqrXgr4_hhLXgtoPgo7Xhkrvhqrzhkr3gtorhhYHhn6_gto7gpInhq4Phn7PgtpXEjOGftcWb4ZOM4Laa4KSX4ZOR4YWV4ZOU2a7hn77gpKLhk5jhk5rhr5Xhk53FoeGwjuGCl-GTouGkleGrl-GyleGrmeGFquGrm-GWjOGtsuGroOGIieGTseGrpOGTs-GglOGtuOGZsGvhq6rguorgpLngqLXhk73hk7_SveGgoOGrseGroeGrs-GUhuGgpuC_kOGrueCpiuGru9u34aCs4LKS4aCu4ayG4ayD4ZSi06fhoLPgq5jhrIrhtonhpJjhhqPhlKDhhpXhoL3hlKPgpovhooThlYPhhrThoYXhlYfgqILhrJvhs5DMveGsn-GxpOGtoOGwreGui-C4l-C5reGhleGimeGOteGim-GHj-GhmuGsreG3guGhnuGhoOC5oOC_kOGho-G3jOGlv2vhrLjhopLhoajhrLvFo-Ghq-GtpuG3kuGsqeG3lOGUvuGVnOGhs-C9vOGhteGVouGhueGVpeGGi-GtjeGvleG2nOGVq-G3o-GhkcWj4ZWv4ZS44LmW4beZ4a2Y4aKI4aGh4aKM4bCr4aGP4aGn4be64aKV4ay94aGu4a2q4aGY4a2s4Yig4YWs4La84ZaO4Kij4a214Zaj4Yio4ZWJ4ZaT4aCW4ZO34ZiM4aKr4aur4be94Yiy4Zab4Yi24aKz4Yi54aiP4a6D4Yi-4a6F4ZiJ4Zap4Zuf0abhqKHhooHguqfhiY3guqzguq7gurDgurLhrpLhlrnhiZfgurjhrpfhlr_hrprho5Xhl4PhrrLhiofhl6fho7UH4ZeL4a6j4YaL4aOh4bef2Ynho6ThopDho6bhr4LhrqrIsuGXm-GXuOGvh-C7mOGuruGviuGXouG4vOGjmeGuoOGKiuC7p-GjueGjnuCphuGuvOG5heGjvuGJteGuqOCqj-Gvg8Wj4a-F4KS54Ze54aSE4a-J4YqB4Ze-4LyD4ZiA4Yqk4a-Q4Yqm4KuN4aSP4a2O4a-Wz7bgrZfhr5nhlqjhr5vhmJLhpJrhmrPhr6DhpJ7hkKfhtILhpKLhkKzhqZLhj4jhsrjhkLHhmKXhmKfgs4DQujc44bqKMjYy3YTRgeGkr8mx4a-74Zi21LThmLjhsIDhmLrgvYjhrLPhrrjhmL_hlYnhpYPgqYrhsIjhtorgtq_hpYrFqeGljOGlh-GZh8aM4Yu14K6E4L6q1aHhj7LhpZTgor7hmZbhsJjhjIDhsJvhpZvYkMKI4bCg4YyLZOGMjWXhjI_grYfhpaXhrYjhsKfhjJXhh5rhjJfhhovhma3huZ3hrY_hsKzhlLThloDgtrbhpbHhmbngraThrbHhmbzEhOGZvuC-muGMr-C-nOGwu-GlvuGmq-GmgeCqtOGmg-C-p8aM4bGD4KKa4bGF4aaI4biF4Y2B4K6G4bGK4K6L4ZqX4K6O4L6z4bGOzbThsZDhsZLhsZRv4Y2U4Zqh4bGX4aad4ZOF4bWX4aah4bGd4aaj4bGf4Yea4aan4Zqt4biE4aas4Y2m4bGpxIzhjanhj5nhj5valeCvg-GokeGPn-GNseGcqOGGu-Gol-GxteGzkuGnluGbh-GzleGyhuGyg-Gxv-GnheGoouG8lOGyjOGyheG1iuGovOG1pOG8l-Gzl-GmieGcruGoseCgoOGOm-Gyk-GnoOGynOGbqeGuieGymuGAm-G8p-GnouGbsuGnpeGou-Gnociy4bOj4byd4aem4Zu74Z2f4bO626Ths7zhjrvhqYfhsq_hmJfhsrHhp7bhpKHhsrThr6XhgL7hnbDhqZThtInhkLLhsrvhnbbhsr7hnJfhgYzhj5ThgY_hs4ThprPhs4bhnKLhroLhvIjhs4vhvIrhsbLhvIzhrJ3hnKzhoo7hs6rhsojhvKXhvJ7hqKfgr7bhs5nho4Hhm6zhvJPhvJ_EluGznuGyn-Gni-G9puG9oeGzouGzteGoq-G8m8aM4bOo4Y6X4aa94YKD4bOt4bKV4bOv4Z2U4byr4Zua4LKT4byv4bKh4Z2W4by04byw4bKo4Zu84by43InhvLrhp7HhvLzhs7_hj4DhtIHhvYHhp7nhqZDhnIzhtIbhqZPhpKXhsrnhnJLhtIvhqZjhgrTgs4E24bqK4bqM4bqO4bqQNOG6kuG0luGRgeGDgeGRg-GDhOG0muGDh-GpqOGDiuG0nuGeiuGpruG0ouGpsOG0pOGDmOG0p-GDneGel-G0q-GpueGem-Gpu-G0r-GDqeGRquGRrOGDreG0tOGqguG0tuCztOG0uOGRt-G0usKW4Z6s4ZG8wpbhqo3hkoDhtL_htYHhnrXhp4PhqpXhtYXhtL_htYjhnr_hqpvhtYvhkpPhn4LgtZbhqp_htY_hn4jhtZLhhJngtaThqqXEjkPhu7bhqqngo5fXgAJO2brhkqjhoqfhqrDhq5XhqrLdscOP4bWp4aq3z4Xhkrjhn6fhta3hn6nhta_hn6vhkr7hn67hhYfhq4Lhk4Xhq4Thtbjhk4nhq4bhhY7htb3hhZLgtpzhk5LhhZbhtoLhk5bhtoThoIDhuKfhtojgvqbhvr_hnZrhtozhr5rhto7hs7HhtpDhoIvhtpLhuI_hiKLhrbPgtr_hq6PhhbPhtpnhlYnhoJXhsaThuJnhopDhtp7hhbzhoJ7hhoDhq7DTgeGUg-C3l-GgpOGGieGgp-GwvOGGkOGrvOGYjOGrvuG2seGsgOG8teGGmeCltuGsheKAteGGneG2uOGUneGrmOGUn-C7uuGgu-G2v-C3v8SM4Yau4ZWz4ayw4buA4ayY4LiI4bec4byL4ZSu4byN4aye4bu-4a2h4LiV4aKU4aGT4beo4aGt4aGW4biL4aGw4Ka04beXZOGsruKBheGsluKBh-GssuGwg-KBiuGVieG3nuGtn-G3oOG3ouGZr-G4h-G3p-Cmq-G3qeGtqeG3q-Gtq2Xht63gp5rhobThlaHhh7bhlaPhobrhh5rhobzht7Thu77ht7jigajhu4vhjILht7zguovht77hoYDhlYPhrZnhuILhrZ3igY_ht47hraPhuIjht5HigZXht5Phh43iga_gubXhop7htpPhq5_hn7zgqKThoqXhuJThv6nhiKvht6DhuJvhtp_gopLgqLXhrb3hlpzhiLfhorThlqHhroThorrhrobhuKnFo-G8qeG4h-GujeC6quGJjuGjieGJkeGjjOC6teGjj-G4tuGjkuGumeGjlOGXgmThl4Thk77hl4bhrrPhuL7gu4fhrqLho53hia_huYPhrqXho7_hr4HhpIHgu5XhibzgqpThrq3ajOGur-Gkh-GjseGuneGjs-GutM-h4a624bmC4ZWJ4bmc4oGl4bmG4a6m4oKo4aOn4a6p4aSC4oOJ4Ym-xLjhip7hl73hpIjhuavhpIrhua3hmIPhua_hhKbhk5jhr5Thu4fhubPhiq_gtbfhmJHhtrvhirXhr5_gsKbhr6Hhir3hvo3gq6nhuoHhsrfhp7_gvKzhr6zgq7bhqZnhkLvhpLMz4Ly1NDHhvpo50LzgsYfhupPgrIfhupXgrIvhr7_hpLvhsIHhuprigaHhoKThup3ho5_hup_apuG6oeG6p-GljmvhuqThmZ_huqLhkJThuqrhu6TPvuGZkcWx4bqv4ZmVyLLhmZfgoprhmZnhpZnIsuGwnOGtptW2B8OE4bq44aWi4K2F4aWk4bCl4KGy4YyU4Zmr4bCq4bin4bac4aWt4be54oG-4Zm24buN4aWz4Zm64buQ4aW34K2r4bC34ZqB4aW94ZqF4beg4buaxLjhu5zhlqrhu5_NsOG7oeGmhOGXluGNguG1pcaN4aeJ4aaN4Y2H4ZqY4YyC4bGnzI3hjYzhsY_hmpzhqYfhu6_hu7HhppvhsZjhpp7hqqjhjZzhpqLhmqjhpqTgv47hjaPihLzgrrjhvIDhqKrhprLhvIThnKHhvIbhja3hsa_hvInhqJPhs47hsbPigY3hsbbhvZzhpr3gr5fhvbfhvazhsovhgIPhvJbhs6XhqJ7ihobhs7PhvaDihoXhvJzhgpXhvbHhvKDhvZ3gsp7hvKThp4DhkInhs7HhsqLhspjhvaThrorhspvhp5zgoYLhsp7hm5Thvb7hs7fhgJbNj-G8s-GCleKGouGdnuCkueGpgeGOtuGpg-GcgOGyreGnsuG8veCwp-Gpi-GQp-GpjeGnuOGPheGytuG9heG-k-GogOG-leGoguG9iuG0jeGohuGzgOG9juGoiuGPl-Gxq8-b4bGtxL7hs4nhprjhj6LhrJzhgZ_hvI_gv63hs5ThvZ_ihojhs5zIseG9o-GbjuG9peKGkOG9qOG8muGzocaM4oal4Y-_4oeXa-G9s8qc4oaS4aiy4YyC4Z2N4bG84oaW4ZCP4Z2W4bOw4oeo4ai24bKg4oan4b2v4aer4bO54YKa4bKr4aev4ZyB4amG4Z2m4amI4Z2o4oay3K3ig7jhna3hvpDhuoLhp77hnJDhnbPihrvhvYnhtIzhvpjhtI7hr7Mw4oSD4aSx4oSGN-KEiOC8vOC8s-G-oeGegOG-o-GeguGppuG-p-G0nOG-qeGeieGDjuCzqOGpr-GRlOGpseG-sOGDmuGRm-G-suGDn-GpuOGemuGenOGpvOG-ueGpv-GRreGqgeGepeGekeG_geGeqeGqieG_hOGqi-G_h-G0vuG_k-G1gOGetOG1isKW4bWE4YSF4b-Q4aqZ4bWK4bWM4b-X4bWO4Z-H4aqh4b-b4Z-Mz5RGybjgt5Tgrafhu6fgvpfRnHDFiuCqqOGGiuGVidSx4buY4aWL4bCJ0pTEjsOP4Yuw4K2X4bWn1ZThv6DiiZsBw5HigLvgt7XigL3goocBw5Lgt43EjteK3Y_iiYlM4omLz6HhiozgtbHig4HiiZHho5_OguKJlOG6peKJltOtw4niiZrgu4_EjsOK4omd4KWsxI7Di-KJouGgt-KDstKfw5PiiagB4ZmL4Zyf4oms4omu14DTluGSpuKJkNqh2IXiibbSteKJuNOVw4ziibvhmIzEjsON4om_4omfw47iioPhrIvigJPdscOU4oqIS-G_oeGEouGqqs6JRsORw75X4aqu4buX4ZKt4bWj4b-s4omlw5fhv6_hkrbhv7Hhqrnhn6jhhLrhv7bhhL3htbHhk4Dhv7rhtbXhv7zhtbfElsSY4bW64KSS4oCB4Z-44bW-4oCE4baA4Z-82a_igIjgtqTgtqbhhovhtobig63igIzihJ_igI_hoIbhk6XiiaThhajhk6jht73hoIzhnJ_hoI7huJHhtpbigJvhnKXhq6XhtprguoThpqvigKPhoJzhtqLiiYnhtqXigKjhq7LigKrhrrjigKzhtqvigK7ihpfhtrDgoprhtrLigLnhlJPhhprigLjhvoLigLrhhKvhtrnhhpbgvJjigL7hiprigYDhtrXhhqzht4HigoPhoZ7hrJnigaLihbzhvZngppvigojhu4rhuKzgoYLigZPigavigo3ht6rigo_huIzhlL_hoZvijInhlKfhoZ_hupvht4bhrLXihbDhh6DigonhopTigargvrbigazhiJvhlL3iga_igbHguL3igbPhrYbht7HhrYrhobvhrYzigbvijKThrKXCkeKCgOG2oOGVseG3v-GsseKCheKMjOCphuGtnuC6nuGmq-KBkOGnluKCiuGtpeKMleGimOKMl-GInOKBmOGinOG4juGrneG4kOKAmeG4kuKCl-GiuOG4leGjn-G4l-KAoOKCm-Gtu-GgnOKCoOG4oOGugOKCpOG4peKCpuKMouG7ouGxh-KCqeG4q-GtkuGJjOC6qeGuj-GjiuGJkuGIl-GJlOGjjeGWuuGWvOGjkeGWvuGjk-GXgeGunOGKheC7oOG5leGXqM-i4bmB4oOB4a664KmG4bmE4oOY4bme4ZW-4oOG4oOd4oOI4Zec4oOK4Zef4bmR4bmp4Kqb4bmU4a6f4o254oOU4o284Zet4aSQ4o6B4aOl4bmg4Yqt4bmiwpHhuaTgopLhuabhip3hpIXijorEjOGKoeGItOGKo-Gvj-KDqOGkjeG5sOGvk-C8juGKruG5teKDsOGKs-KKheG5uuGmruG5vOGch-G5v-Cwr-G9g-Gvp-G0h-G9huGkpuGvq-GkqOKDv-G-mOCju-KIieGvuOCxhzfgvLPiiIzQueKEi-GYteCsieGYt-GkutS44oSR4Yuj4oyf4KyV4bCF4Yun4bCH4Kyd4ouW4ZmI4oqZ4bCK4YWh4bqp4aWQ27XhsJPhmZLhsJXhurDihKjhurLhmZrihK3hurUCyo_hmaDgrYDhpaHhmaTihLXhsKThlYPhmanhsKjhjJbhparijaHhmIzihL7igb3ijJLgvo_hsLDhuJ3hjKXihYThq57ihYbgvpjihYjhu5XhmoLhlYnhmoThlIvhmobihY3goILhsYDijaLihZHCpeKFk-G7neG8oOKFluKFnOKFmOGGmuKJi-KFl8Wj4oWe0qXhppPihaLih7fihaThsZbhmqPhsZnihanhsZzFoeGxnuGaquGxoOKFr-KOkuG7iMSW4pCVxprhjafhvILih4TaluGzh8ew4oW54b2W4oW7xprhs4_hnKrhvI7gsZ3hvKLhnLDhsbvFquGdj-KHnuGygOGCi-KQveKHmeG_k-KGjuKHneKHmuKGkeG9teKGlOKHpuGylOKGl-G8scWj4oaZ4oeV4oab4b274oaj4oae4byu4Y6j4oSb4Y6m4oak4oev4ayG4oao4KKS4oaq4Z2i4aew4Z2l4YKh4Z2n4YC04Z2p4b2A4bKz4b6O4bK14oe-4oO74oiB4bSK4oa84oiF3KPihr_hvY3hnJrhj5XhnJ3ikKzhmrnhvZPhuKPhvZXMt-GzjOGmueKHi-GzkeKQt-Gzk-GyhOG8kuKHnuKHlOGdk-GjguKHnuG9qeKGoOGzoOKRguKHm-KRmeKHkeGoruGnleKHjuKHo-GdjOKGg-KHq-G9vOG9uuGQi-Gdm-G9veKRleGwj-Gdm-G-geG9v-G-g-G8t-KHsuGzu-KHtOKGruG-ieGcheKRpOG-jOKRpuKGtuKRqeKGuOG6hOGckeCyu-KRreG-l9yj4o690YXRguKPgcmy4oSH4Ku54oiR4amj4oiT4bSZ4Z6E4oiW4ZGK4amq4LSd4bSf4b6s4YOS4bSj4ZGW4oif4Z6T4oii4ZGg4ZGi4bSt4Z6d4bSw4b664bSz4Z6j4bS14ZGz4YOz4b-C4Z6q4oix4bS84oiz4aqO4oi44b-L4oi44oi64Z664b-N4aqY4bWJ4Z-A4b-V4aqe4omB4bWQ4ZKZ4Z-K4bWT4b-dz5RM4oqn4ZKizLHiiqvDvsKx4oqv4bu94b-q4Z-d4oqz4bWmAcOY4oq24Z-l4bWs4YS54KO34oq84aq-4b-54YWD4b-74ZOG4KSN4b--4ouG4LaY4ouI4auI4ouK4Z-64ZOT4ouN4baD4ouQ4baF4auQ4ba64auS4ZuX4auU4Z-d4oCS4a-dyrDgtrfii5zigoHii57CreKLoOKNkOKLouClh-GgkuGFteKLp-GwveGFuOKNmeGrrOKLq9K84ZSB4ouu4ban4ouwx7fLmOKLsuGGi-G2rNqm4bau4LCI4ou2zbDii7jii73ii7rigLfhhqvhtrfii7_igLzhto_ijIPhoLrhrJLhlJbhrJThrK_igZ7hsKbigYjhlKrijL7ht4jikLXigY7ij7HhuYjijLXhlZLijJPhuInigZbiga7ijJnhrKzigZvijLvigZ_ijJ7ihJPhrZvijKHikKXhrbnguK3ijJHijabhoarilZvigo7ijYrhrYDhh67hrYLht67guL_ht7DigbXht7LhrYvhqq_ilafht7filZjho4Tht7vhooPijJzijLzhuIHijL7huIPilZbhr4DhoZDihYDhraTila3ijYnijKrilZ7hra3hra_ii5_hu5DhoI_hlo_ijZLPqNeG4oKZ4ZaU4aar4oKc4a284bif4aKy4o2d4aK24oKl4YaL4aK74o2B4aKp4a6H4YmH4oaa4pKb4oy24oKs4Za04biw4Za34biz4o2u4bi14Za94a6Y4ZeA4a6b4aOW4oOQ4oK94aOa4Kij4o274bmZ4oOC4ZeQ4oOE4bmf4o6D4bmh4bmLxaPhuY3hr4bijofgqpbijonhl6HijovilrbhuL3ilrjhl6nho7fig5Xhrrvilr7ijoLgu5Hig4fhipjhrqzig6Hijp3il4nijp_hr4zPm-Gki-G5ruKOpeKDquG5seGvleC8j-G5tOC8keKOq-Gkl-KLmsiy4o6u0IvijrDhr6Lih7zijrTih7_hr6nhvYfhuobhi4rijrvQltC-3o3RgzY14KyEMeKIjeKIieKIkOG6lOKPh-G6luKPieGkvOKEkuGVhuKPjtWD4o-Q4K2V4oSZ4pSY4aCE4bCM4ZmK4o-T4o-Y4bCR4oSj4o-b4oSl4ZmT4o-exaPihKnNsOKEq-GwmuCsueG6tQFf4oSz4o-p4L264Zmm4bq_4pWPz6LihLnhsKnhjJjhu77ij7Phoo_ht4_hu4zij7figoHJtOGwsuGwtOG7kuGwtuG7lOGlu-G7luGag-KLtOG2nOKQheKFj-GmheGMveCugOGMv-KFleG7peCij-KQkeGmjuKQk8KR4pCo4oWg4bus4pCY4pGh4bGT4Y2S4bGV4L-A4buy4pCc4oWo4L264Z-R4oWq4bu44oWs4bu6z6jhu7zhsaLhu77ikKjhpq_hsqXihbThnJ_hvIXamOKFuOKRucS94pG74oeK4beJxZbihb_gqYrih6Lhj6nikLrgr7_ikYrikYDijaXihoThs6bhvJnihoviko7hvZ7hqKrhs5vhm5Lhso3ikYffj-GAkuGngeKSleKRkuGMguKRjuKSheG9peKah-KRl-KRk-KZvOKVgOKajuGMguKHnOGztuKRluGnrOGdoeKGrOGdo-GzveKGr-G-iuGch-KGtOGCqeG0hOG9hOGvqOG0iOKOuOGyuuG0heKGveKIhuKRsOGPk-KRsuG9j-KHg-GzheKHheKQruGokOGcpOKRuuG9l-KMjeKBjOG9muKHjeGAjuKZvuKRieKagOC_vOKShOGzsOKSh-KRgeKTouGPqeKalOG9sOKRhcSW4oeg4Zug4pqD4oek4pKU4oac4pKZ4pKX4Zuu4pKZ4oet4pGW4pKN4pqR4pqX4amC4oez4amE4pqb4pKm4oe54bSA4oaz4o6y4pGn4o604b6R4bqD4oO84oiC4pKw4oiE4pKy3YHil7jejeKEhuKXvOKEheKXvzPiiJDhqaLGjeGppOG-peKSv-GRiOKIl-GeiOGpq-G-q-KIm-G-reKIneG-r-GDseG-seGptuG-s-GRoeG0rOGpuuG0ruGDp-KTkOKIqeG-vOKTk-G-vuKTleGqhuKTl-KIsOG_heGeruKItOKbg-C1iOKTnuG1g-GqluKIvOKTpOG_k-KIv-GSluG_meKJg-GSmuG_nOC1pc-UTeKTsOG1mcS84oqrw7_gpY7hv6jgv5DWjeKTuOKKsuGPv-GmkOKTu8OZ4pO-4bWr4ZK54b-04oq74LaH4b-34oq-4auA4Z-w4ouB4pSI4LaU4ouE4bW54oCA4ZONZOGTj-GisOG1v-Gri-GTleGrjeKAieGrj-KAi-GFn-GZjOKPl-CkreKLmNio4oOy4pSf4auaxIzhq5zhrbDhq57ilpLhq6HhtpfigJzhoJPigJ7htpvgt4nilK3ij7jhk7zigKXhlIDii63FtuGgouG2qeKJs-CphuKUudKQ4pS74ZSO4au94YaU05vhoK_ii7vilYPhrIbhrIjhlqjijIDhoLjhtr3gpofijIbilYzigZ3hlKbhrLHht4ThrJrikLThsbTilZXilbrig4Xilofij7XhoZLiloriga3ijJjijYvht5bhlYDhrJXinoXilaLht5vhrLTht53hu77igafimK_igorijKbihZ_ijKjhlobht5XigbDhobLigbLht6_igbThlKfigbbht7PhlYnht7Xig63ilbvilarhsK7hrZPhq6zhrZXhlbThuIDhiIviloPigofiloXig5vhrKTilZnhjILijYbijKfijJbinpLila_gqJnilo7igpPinZ7gub3ilpTFieKWluGtt-KUquKQpmvilprijZrilpzhrb_hlp_ijZ7hlqPhk5jilqLhiYPilqTig5vigqrilojCkeKWquKCruGukOKNq-GVleKNreKCsuGuleKCtOKNsuKCtuKNtOKWteKNtuGunuGjtOKCv-GXjOGuuOGjuuKDg-G4p-Guv-KDm-G5itKe4peE4bml4bmP4oOL4aOu4o6e4a6x4peL4o244a614peP4o6Q4aO74peS4o6U4peA4o6W4peC4o6Y4peX2Zvil5nig6Pil5vig6Xhr43il57ijqThmIXhtZ_ig6vijqjhr5fRquG5tuCmpOG5uOKOreKDtOCroeKDtuGkn-KboOKDueGcjOKXseKapOGLh-KDvuGLjDrgq7nQv9GD4bqP4YuQN-C8uDHgq7_ij4XhpLbihI3gvYThupjgrI_Hr-CskeKPjdWB4o-P4bWh4piM4o-S4oSa4pKc4oSd4bqm4piO4aeN4ZmO4piU4Kys4piW4L2k4piY4oSn4pia4o-g4oSsxaPihK7gpqvVizvimKPhsKLij6rhur7ihLfgq4jimKrij6_ihLvinozgrZfimK7hsaXinrPimLHhu47gvpPihYXhsLXihYfimLnhsLnimLvikIHimL3gpazimL_ikIfihZThjLvhpobimYTikI3imYbfj-KZiOKFm-G7qeGmkeGIl-KQl-GNj-GnsuKQmuKZlOKFpuG7tOGNmeKZmOC_h-CuquGap8ev4Zqp4aal4bu74bGh4aOf4bGj4o6A4p-Q4pmi4pCqZOG8g-KZpuKFtuKZqOGau-Kas-KZq-KateKQs-KFveGsneKZsNqm4pmy4pC54oaD4pm34bOa4oaM4pm64oaK4b2q4Zuz4qKq4pm_4qKs4oaJ4oKo4qKn4peC4bKS4oaV4pGK4pqN4bKX4p-e4bOu4pGMwpHihp_hgo_hvavihqfhm7bim5Xikp_hs7jhsqnikqLhvLnikqTim5vih7fihrDhvL_ikqnhnInim6Hhj4bimqPijrfhvpTim6fimqfika7dgeKaquGoiOGzguGPluGBkeKRteKHhuKasuGziuKatOKQsuKVk-KeiuG9m-KZseKGgeG-gOKQvOKbh2vimr_ikL_io67ikojio4LiorDio67im4Ximr3hjpXim4nhgIzim4vikpPhvJLimo3ihofhvbjih6nim5Pikpzhp4nikp7ihqfim5fihqvim5nihq3io43imZDio4_ikqjim5_ih7zimqHhnI3io5Xihrnikq_il7ThsrzhgYjhnJXioK7ij4HioLU44qCy4qC04qC24pK74pu04pK94pu24ZGH4Z6G4oiY4pu74oia4ZGR4pu-4ZGV4aqD4Z2F4Z6S4oih4pyD4oij4b604oil4b634pyJ4oio4YOr4oiq4b694ois4aqE4oiu4aqI4ZG64b-G4b-I4aqP4pyW4ZGr4pyY4oi14pOg4oi44b-R4aqa4qWE4pye4b-Y4omC4bWR4pyi4omF15lO4omI4pSw4omt4aaO4omvaOKKrOKTteKJstqh0YviipThpYbiibwBw5fij5XiiZfik7ziip3ipaLDmeKKoOKUl-KVh-KJpcOh4oqIT-Kcp-KKqcqFUMORw7954pO24ZWJ4K6m4pyw4aSV4pO6zqoBw5rinLbhqrjilIDhqrvinLviir3hn63htbLii4DhhYXhtbbhk4fhv75V4p2F4oCC4ZOQ4ouL4p2L4oCH4p2N4pSU4oCK4pWn4ouV4qGF4baL4p2V4ZSX4oyC4aCJ4pSg4bag4pSi4pSk4baVw43hq6LilKfhtpjinaLho5_igJ_horzigKHgpZLinabimLPLg-KUr-Grr-GGguKUsuGIieG2qOGJreKUt-GVieKdsdOP4KWq4bav4p214ZSQ4p234baz4p254KW44pWE4ZKu4p2-4oqF4ayP4bml4oyF4ayT4oyI4p6X4a2X4p6G4oyL4p6b4oGL4aa64Ya94oyQ4p6O4pWr4p6Q4oKM4o2I4p-E4paM4p6U4oya4beY4paA4p6Z4oyfxYnhoYfhoaLinp3ilbzht6XCkeKeoeGHieKfg-KMqeGWh-Knn-KMrOGHseKMruKYp9SU4pW34oyy4pW54bmy4p6x4qeY4qGn4oG_4pW_4qeP4aKF4pio4oy94qeT4ZWJ4o2A4p-b4p-Q4o2D4Yyg4aKU4p-B4p6i4qeu4p6k4ayr4p-H4oCX4aKi4qal4oKW4Lm_4ZaR4Yip4p2k4Yit4qaw4oy54Zaa4Ki44o2c4p-W4paf4o2f4pah4oKn4aK_4qK94qeZxaPin6HhiY_ijarigrHhrpTijbDhuLfijbPilrThuLvioILijo3huL_ilrrin7PhuZrgo6Dijb_ilqPhrr7huYfilobguqLin7nijoXhuY7il4bhl6DioJHioIHin67ig5Higr7gu6XioIXilrvijb3go6Dig5fiqLvgu7HiqL3in7jil5Xhl7bioI7ig6LhrrDijqDhorDijqLhmILgqKPhr5Hijqbhhovig6ziopXig67ijqrhq5Xig7Hil6nig7PgvJvil63ig7fikqrhi4Hig7rikq3im6XhpKfhkLPhr63hqZnQueG0k96N4KyF4b6a4Ku74Zir4qC34Yua4qC54bqX4oSQ4bqZ4o-M4pWk4pS14Zi-4qGB4bqe4o-R4Yur4qab4bqj4o-V4oCO4qGL4Yu24piV4bqu4qGQ4aWW4L2q4Ky24o-h4qGV4bq1DuKEsuKPpuGZouG6ueG6u-G6vdSM4qe14qGf4aWo4qGh4pis4p68xozioaXinr7ilb3grZ5S4qGp4Yyn4qGr4pi34qGt4ZqA4o-_4oWK4pCD4oWM4L6h4KCE4pCI4qG44ZqQ4o-Z4Y2D4pmH4KW24pCS4pCP4pCU4burxarimY_gvrzimZLhu7DikJvhppzhmqTioorhpqDioozihavioo7iha3hmqvikKTip7rihbHgvJviopjioprhnKDhqI3ikbfhsa7imarhnKbhs43ioqLijI7gv6nimrnhjbnhsbrioqnio67ikL7ikobiq6fim4Lhp5Pih4_iorLimb3hm4zikpDimrrihpPimoTio77im47impLIslPiqKbikYvhvKzIslTikZThnZ3SnlXio4bipIfih7HhkJzimpnikZ_ih7bipI3imp3hsrLio5Likqvhp7vioKjio5bihrrio5jcvOKjmuGcluGBi-Kaq-GoieGzg-KaruG9keKasOKrm-KHh-KrneKZrOKnlOKRveGPpeKro-GOmeG8leKSguKjrlPipIDimbniorTGjFTiq6vhqK3gv7zirILhsonhs5bhva3GjFLiq7Hiq6TikpLFo-KHpeKQu-KahuKrtuKsq-Kjv-KakOKjh-KSneKGpuKaluKsheGnreKkiuKamuG8u-KjjuKsi-KRpeKsjeKHveKsj-KRquGvquKapuKslOKbqSDiqbXioLDipKHiqbnioLPhpLPipKLhhY3htJjipKXhtJvik4HhvqripKrhnozipKziiJ7inIHiiKDhqbXhnpHhtKrinIXhvrXiiKbhvrjhqb7ipLninIzhnqTipK7hp43hqoXhnqjipL_htLvhv4ZS4pyV4qus4YSCU-KIt-G0v1TinJriiLVV4oi94pOl4LWT4pOn4Z-F4qWP4pOq4aqj4pOt15lQ4qWy4b-j4qW0w5DDk-KlueGjnxThtaLipb3inLLUq8Ob4qaC4oq44qaE4bWu4qaG4pSE4qaJ4pSG4p2A4b-94p2DZOKmj-GftuKUjeKdh-GrieKAheG2geC4huKUk-GFmuKLkeGVieKLk-KpouKmmuKhieG6qOKdlOGrleKUnOKmn-KLm-KdmWTinZvilpDinZ3ii6HipqbinaDii6TigJ3ipqviqJnhk7jiqJvigp7gpZfinanhtqTigKfinazigKnhlIXiprnhq7finbDii7ThoKvip4Dhq7_ip4Lii7nhtrThhpvinbvipavijIHgpLTilYjhrJDip4zilYvip47ilY3inpjimKjinofilZLinonigY3ht4viqaLhtpziqInhopPijLbijJTin4Lip5zip6_inqXilZ_igZzhrZbiqIHguKTiqoPip6XhrZzgp4PiqqbIseKenuKhpuKYsOKVrOKnm-GImeKVnOKek-KVsOGVm-Kep-KMreKeqeKMr-KVtuKMseKBuOKMs-KwiMSW4oG84p6f4aKU4oy44q-R4Ke34pWh4qiC4paC4qiE4aOf4qiG4ay54qi-4ay54rCM4Lmr4p6R4q-94qiQ4o2N4p2c4o2P4qiU4biT4o2T4paX4biY4o2Y4Lqp4oKd4Ki04bie4qie4pad4qig4b2UAeGit-KWleKfmeKopOG8oOGjgOKRj-KWqOKev-GjheG4ruGWteG4seKorOKNr-GuluKCteKWs-G4uuKCueKOjOKfsOGXiuGjnOKpjNqh4qi64qiH4qmR4oOa4aK_4qmA4aOq4oOf4Zee4peH4oOM4bmS4peK4qmH4pa34bmW4peO4bmY4qi34pa84peR4p-24qmS4rGi4qmU4a-E4qmW4qCQ4qmY4pecxLLioJXiqZ3ig6nhmIbioJnhuKfil6Tig6_iqaXijqziqafhmJPioKHQjlfhub3hmJrhqY7gvKThpKPiqa_ikavijrniqbLil7Y64LGF4Ku54LOH4Ly5ybDioLPgq7034piC4L2C4o-I4oSP4o-K4qqB4qC94Zi84bqc4qqG4oSW4qqI4ZmE4bCJ4qqN4piQ4aWL4oqK4rKt4Yu04o-Z4bqt4aWT4qqS4bCX4qqU4aWY4pie4L2u4bq1D-GMiOKqm-GMiuKEtOKYpeKEtuKPrOKhoOG7g-KPsOKho-C7j-KqqOGtouGHheKqq-KqreGlteKqr-KJjOGlneKPvuKYuuKQgOGjn-KQguGgqeKQhOKqt-C-o-KZguC-peKqu-KhjOGxieKqvuC3rOKrgOKhv-KFneKrg-G7reKihOKrh-KFpeG7s-Kri-GfkOKii-KZmuKQoOG7ueKQouKikeKrk-G3tuKrleGKt-Krl-KjoeKQruGNruKjpOKioOKjpuKvsuKipOKspeGbhuKrpeKsqOKSi-GotuKjseK0heG9vOGyoOKiseGypeKjuOGniOKsueKspuGAkOKrtOKHkOKkgeKrvMWj4qu54pm44qK7zY_iq77irYPio4TNj-Kss-GnquKRmuKkiOKRnuKHteGzvuKSp-KHuuGciOKyjuKsjuG0heKskOKkleKbpuKkl-KaqOKRr-Gyv-KRseKsmeKjn2ThnJ7iq5nhvZLihbfisYLis7ziq57ikbzima7Gq-KjqeKipuKjq-GdkuKZteK0jeGPqeKsquKZuOKHnuKsr-Ktg-KHnuK0n-KrruKsteKGjeKst-K0j-K0guKsu8KR4qy94rWF4ai14pKW4aOC4q2C4qKv4oah4puU4qy04q2E4pGbyrbikZ3irIfitKTimpzgsKZo4qSP4oe74qms4qSS4puj4oiA4q2U4oiD4qOZ4q2X4rKX4a-4OOKymuC8tOG0lTfim7PiraDhvqThnoPipKbhvqjim7rik4Pim7zipKvik4bhvq7ik4jirarik4ripLLik4zinIbhvrbinIjhnp7ik5HipLrinI3ipLzipK_ipL7hv4PinJPgs5Xirb7ik5zhtL_iroLhqpPiroTirobipYTCluKuiOKcnOKljOKTpuG1jeKujeKTqeGqouKTrOKcpNeZUeKulOGXqFDUseKcreGGixXirpzhr5ripb7Jg8Oc4q6hzbThv7LhqrrirqThqr3hv7jirqfhq4Hirqnii4PEl8SM4q6t4bW74auH4q6w4pSP4auK4pSR4auM4YWZxYjirrfho5_irrniqZDirrvinZLhq5PGjOKAkOG5t-KvgOKvp-KmoOKvg-KvheKUo-KWkeKviOKmp-GFsuKvi-KmquCphuKmrOCoh-KmruGrqeKvkOKwveKmsuKvk-KUseKvluKLr-KvmOKAq-KvmuCjoOKmvMum4qa-4pS84q-e4oCz4q-g4pWA4q-i4ou84q2E4p284Kak4qeI4rKH4qeK4o6a4q-q4aC-4q-s4p6E4qeQ4pWi4qeS4pWl4pmt4pWU4q-04qmQ4q-24qep0p7ir7riqI3ir7ziqI_igpDigZrisIDinrfinobinpriuI_hhovigaTiuJPgpazisIriqqnip6rip6zhlLnisI_ila7ip57isJLGoOKnsuGVnuKwluKqoeGtieGVpOKVuOGhveKwnGvisJ7isIvigorisKHit63EjOKetuKBhuKwpeKeueKwp-KMv-Knl-G4huKfn-KojOKnreK4meGsv-KfhuKwsuKvhuKwtOKCleKwtuKWleKNlOCphuKNluKmreKwuuGIr-KwvNG04rC-4LqP4oKh4bih4a6B4pG44rGD4pag4ZWJ4p-a4ay54pal4Kev4qu64rCt4qio4YmN4qiq4oKw4pau4p-n4qiu4rGU4bi54oK44oK62abijbfiqLTin7Hil5Dijb7ioIjilZfioIrgu5PioIzin7vijprin73ijojisajioIDhl6Pigrvhl6XiubjiqYrisa_iqoThrrnijpHhubLin7fisbXijoTil5bisaXhr4jig43hr4vioJPil53ig6fisb7il6DisoDil6Lig63isoPiqaThn53iqabipa3hpJnisonhirnioKPhub7il6_ispDipJTikq7hmKTioKvdgOG-n-GLj-GYquGLkOKXvt6NOOKEg-C8vOGkteKpveKYg-KEjuGYueKgvMS94qC-4qqD4piJ4aWB4KOg4oSX0pDimI3it5bilJnisq7huqXisrDhsIvisrLis5_hpZHiqpHij53ioZHCkeKYm96A4qqV4qGU4YyD4bq1DcKX4qGa4bq64bCj4qGd4rOE4qqj4rOG4qGi4quU4qGk4riV4pSeE-KqrOKFg-G7j-KPu-KhrOKPveKhrs-o4bC64pi84oqU4pi-4rOa4bGG4pCJ4pCL4rmn4qqP4aaL4rOh4L6u4rOj4Z-g4qKA4ZWV4qKC4aaV4oWj4rOp4quJ4oWn4bu14pCe4qKNxL3ioo_iha7hpqjimaHihbLimaThsarimq_ikK3irJ7is7vih4nirKLitL9y4qKl0pDiorbihoLitITipYThvbniq6nitIjim5LhvavitIvhs6TitZDioq3iorXio7zhspHimoXih6fiq7bSnuK0l-Kiq-KivuK0lcKR4rSb4rWd4rGL4ZCU4qu3xaPitY7itIzitKHirYjimpjirYrirIjitKXim53hvovipJDitazhvo_irZLispHitbDirJPhkLThsr3ihr7itLLirJjio57ikbTivJbikbbitLriuaHitLzirKHhvZjimrfih4zikb_hvJDiq63imrziorPih5LEluK1iOK8teK8q-Ksrcix4rWL4ry64rWG4Zyw4ry_4ryq4qys4r2la-KsuOGosOKSgOG8o-Gos-KrteKRkeKrqOKajOKtgOK0nOK1n-K0oOKLueK1ouCynOKjiuG-huKjjOKtjOKsiuK0puKbnuK1q-KtkOK1reK0rOK6ruKRrOKbqOK9keKIhuK6suK1tuCzh9GD4o-B4bqP4rq54Zyc4bSX4rW94oiV4pu44q2k4oiZ4amt4pu94raF4pu_4raH4Z6R4pyC4q2t4pyE4pON4pyH4pOP4qS44Z6g4raR4q224oCO4q254bS54pOY4raXwpbitpnhv4niiLXitpzhtYLiiLXiroXhv4_irofironinJ3itqXiiYDitqfhv5ripZHhtZTXmVLipZXgt5LipZfgroziia9y4q6X4oqR4L-QKOKLtOKloeKKmuKmgOKlpdOtw5vipajiv5jDnOKvpeGYksSOw6LiiojgpYjihanik7Hhv6Qm4oqsYeKumeCpht-t4qW84ra24q6e3bHin6ThjYvgo6zhhLLhqrbiirfitrviirninLnilILirqXit4Diir_irqjipovii4Lipo3irqvit4fii4finYbinYjgpJjippPit43inYzit4_hhZvippjhubLit5Xij5bit5firr7ilJvii5niuqXhmbbhoIrii53igJbijY7igJjipqXit6PilKjhq6bin4_ilajilKzisLvigKThq67igKbiprXit7HilLPit7Pii7Hit7XWmuK3t8Wi4p2z4YaS4re74ou34oC04re-4qeE4ba24q-k4pWF4omj44CXxaPiuIbKtuGskeG2vuKeguK4iuKwgeG3g-K4juKMoOK4kOKeiuK4kuKxn-K4lOKesuK5qsKR4riX4rmK4rir4paL4qew4riu4qeg4pWg4qei4q-v4rig44GI4rii4qeo44GO4p6g4rCv4ria4oyZ4riw4a2E4LmA4rCX4p6r4qe34rCa4qe54rO14Ye94rup4LmT4qe_4q-t4riM4rmC4ZW34p6604visKnihL_il5PiuYfino_ilonisI7hlZfip53jgZXiuY3hloviqJLhtpTiuZHin4vDjOKfjeKomOOAouG2nOKfkuGrrOKNm-KxgOKCo-KooeKfmOG4puKziOKhtuG7o86i4rmp4oKK4p-h4biv4Za24biy4o2s4a6T4rGS4p-p4pay4rmz4o214Zek4rm34rGZ4a6h4p-y4rqN4p-04pa94rGz4rGh4rGI4rGj4a6r4rqV4bmQ4rqF4pea4qmG44Kl4p-v4oOS4rqL4Zer4qCG4YaL4qmP4rGf4rqR44Kv4rG24bmj4rG44bmo44K14qmZz5jhuazijqPiupzioJfFieGYh-KOp-KyguKOqeKXpuKyheKXqOOAveKyiOKpqeKDteKyjOGkoOKprOKXsOKtk-KXs-K6sOCzgOKIjeKpu-G6jeGCuNC70LvRheKSuuKyn-GLnOKyoeK6v-GLouKypeKgv-KqheKYiuKhguC_k-K7ieOAkuK7i8ix4qGH4ruO4p2T4bCQ4ru94ZmQ4qGO3avisrbgvajioZPisrrhpZrgvbBBw4zCgeK7n-KqnuKYpuKhnuCti-Kzhc-o4buE4ZWJ4buG4q-14KWs4rOK4oGR4ayl4rON4rut4qGq4ruv4qqw4rux4qqy4rOU4qq04rOY4qq24bC_4qq444KVa-K7uuKZg-KznuODvOC-iOG7puKZieKrgeKZi-KzpuKrheGanuGmmeKihuKzq-KQneKrjOGxm-K8jcON4ryP4quS4ryR4ri44qKX4byB4qKZ4rO54ryY4pCw4qOl4quf4qOn4oW-4rSB4Zui4rSD4rST4r2y4pqB4qyr4ryp4pKa4r2u4qKu4rWP44WN4aeU4r224r2h4qy74qK44r2j4ry24oad4YyC4ry04pan4bym44Wd4qu94qu_4pGa4qyB4qyD4q2H4qOJ4qyG4r2E4rWm4puc4pGj4rSn4pqf4bSD4r2L4rSr44Od4pql4rWx4q2W4r6T4rSx4b2M4r2U4pGz4b2Q4oW14qua4r2Z4bOI4qyg4qKh44WH4pq44r2g4pKR4qyn44WM4oee4r2n44Wg4r2k4ZuS4r2s4pKJ44WS0arivbDikp7ih57ivbXhs6nivK7itZbim43ivbvirYHivb7iva3ikZrjhafipITitKLitaXikqXirY3ivorivYjivozitKnirZHjhbPivY3hvYfirZXivZDipJnhtI3jg6Hhr7Xgq73jg6Xjg6Yw4pK64rW74pu14rW-4q2j4bSd4r6i4bSg4LO04oic4qSt4r6z4r6p4aqE4q2u4r6s4raN4r6u4q2z4r6w4q214pOU4Z6m4pOW4oiv4qWA4LOa4r654qWD4q6A4LS-4r684b-M44eV4LWI4r6_4oi74r-B4raj44eZ4b-U4q6L4ram4aqg4qWQ4pOr4pyj4ZKd15lV4rau4aO1AuK_qcO-wrviv6zgo6AX4ra14bm34ra30p_jgp3hlZXiv7XhkrXik7_inLjilIHhn6ripofhqr_htbPhk4Phn7LjgIPit4XirqzippDii4nigIPilJDigIbirrTii4_irrbilJXinZDhoILirrzihJvit5nioJ7it5vTtuKUnuOAmeKUoeOAm-Kws-OAneGfvOOAn-KmqeKUqeKCmuKLqOK3rOK5m-K3ruOAp-KdquKvleCln-Kvl-GrtOK6jeKmuuGruOKvnOKAsOGikOKAsuOAteK3veKthOK3v-KduuKLueK4guCnsOK4hOODleOAv-GGpuK4iOG3gOC4gOKwpNaJ44GH4rCF4rS-4riR4rmG4rCs4oKK44GR4riq44G-4rCw4rib4p6W44Gx4rCC4KaQ44Gb44mG4p6c4ri44rim4rOL4oy24rip4a2n4ay-4oGX44GW44Gk4qe044SM4qC944Gpz6jigbninq7ijLTjgZ_isKDjgbDiuIvjiZPguZziuYPiuKHiqIXjiYnjgbjiqKfigovhiJfinqPiuYzhiJ7iuY7it6Dir4filKXPouK5kuKfjOK5lOCjoOK5luK3qeK5mOGWmOKdp-CotuKflOKCouG4ouOGgeK5ouKoouK5pOKxh-OCluG4quK9qOKnveKxjeKNqOKfouKoq-K5r-KoreKxk-KfquKxleK5tOKxmOOCueOCqOK5uuKoueK5vOKwq-GXs-KXgeKfuuKXl-Kxp-Kfv-OCteK6h-K5tuOCuOKpidiP4o6P4rGc4qCH44Kt4p6N4qi_44OC4qCN44Ky4o6c44OF4qmF44OH4qmb4aSM44OM4LyM44OP4pWn4rqh44OS4rqj4rKG44OV4per4L-Y4qmq4qCk4rqr4qmu4rqt4qmw4rKT4YuJ4qmz4b6Y0LniqbvRhuCruzHikrrhuo_iqbzhr7zhr77jg6zhsILimIjioYDjg7HiqofioYPiqonjiJLioYbiqoziu4_jg7vhuqvhsJLiu5PgrLHiqpPhi77iu5njhIPij6LjhIXZscO744SJ4ruh4qqg44mj4YyT4ruk44SP4rOH4run4rOJ44Gu4L6P4rus4bCx4o-64K2m4o-8xL3hpbnihYniirDiqrXhu5niu7jiqrnis5zhpofjhKXhmpHikI7is6TikJDiqr_jhK3jjJjiq4LhppLgvrjiooPivIfhmp_jhLTimZbivIvjhLfhhKHikJ_is5HjhLvikKPjhL3jgpThopDjhL_ihbPivJXirJzivJfjhoDikK_jhoLis77ioqPhprvjhobiq7Lhj67imbTio63ivKbivbzhj7LjhZDitIriq6ritaDikL3itZPjhYrjhZnivLDiorrivLLNj-OFn-KxiuOFoeKaiOOFo-K9v-KkhOOFpuK1oOKshOOFqeKtieKSo-KbmuK-iOGOveOGpuKanuKgpeOGquKaouKOtuK0reK-keK1suOFuOKjm-K9k-KjneOFvOKsm-OFvuK0ueKineK9muK8muK9neKnleKspOOMuuKsuuOGiOKiueOGkcaM44aL442P44aN4L-844aP4qO04b2-4rWN4qOG44aV442H4bG54rWV4rWX4Z2P4rWc44aM44Wc4ryn4Zuz4oeu442W44Wo4b6E4r6F4pSB4r2F4rWn4r2H442f4qSR44Wy442i4b6S4r6Q4b2I442m44aw4oiG44uX4q2eybHji5rji5zjhrjhgr_hvqLiraHjhrvik4Djhr3ipKnivqPitoThkZPjh4Lik4nipLHivqripLPira_ipLXito7inIrirbThnqLivrLinI_irbritpbiiLLjh5PiiLjjh5fiiLjjh5vik6Hjh5_itqHiv4LitqTjh6Hiv4Xjh6Piro_itqrjh6fHmVbiv4zgpZviv47jhJzRnEjiv6riv5PhhovSuOKloOKKlsu_w53iv5rTlcOe4r-d4aKQxI7Dn-K_oOKKhdSX4oqIU-OHqs-h44es4oqs4KWo4ray4ZWJGOOHs-KgnuOHtcSOw53itrrdq-K_uuOHveKUg-K_vuKcvuG1tOOAgeKdgeGFiOKmjuOIh-KUjuOIieK3jOOIi-GGs-KuteK3kOOIj-KmmeKdkeODteKYj-OAlOG1o-OIltiq4q-C4baR4p2a4p-I4rei4q-KzLfii6XinaPjgorinaXjgKXii6rit6_inavjiKrit7LjiKzgt5njgK7gpafjiLDipr_igLHinbbgpbHip4PilYLip4XjgLrip4filYbiiqLhrI7inoDhhqnip43jiYLjgZnjiYTigYniuYTjhoTijI_iuLjir7fht6TiuJbjgaHjibnigZnjiZHjia3ht4PjiZXhh5vjiZfjjK3SlOOJmeOEluKxjOG3puORiOOJn9iC4rCU4qez4riy44u94Ye344mlxYnjiafho5_inq_jhJPjga3jiarijLbiuL3jiKXiuL_jiYPhoofjibDjgZzjibLjkYTjjITisK7jgb3hrajjiY_ilo3jibvipqTjgoXiqJbhrbbjgonjiKLilKvhlpbjiKTXl-K5nOGItOK5nuKWnuKxguKxhOKfjOKxhuKVluK7vOC6ouOCmOGilOKoqeKCr-GukeOCnuG4tOKCs-KWseG4uOKCt-OCpOK6iOOCpuOKoeKWueKxm-KxsOKpjdaa4rGe4Luw44OA44qS4ZeX44q54rqB44GA4rqD44qr4rqX4bmT4qiz44Kn4bmX44K744q044K944ql4qmT4rqT4qmV44q74peY44q94rG64rqZ4rG84rqbyobiqZ7il6Hji4ThubLji4bhmIzioJ3gp7DioJ_isofji4vGmeGknOK6qeKyjeKGteKpreKgp-OFtOKgquKOuuKgrOKIjTngq7rihIjhj5PgvLzihIPgs4Tjg6nhpLjjg6vioLvjg63iu4Hisqbiuo3ihJXhpYLisqriiZXimJLjg7fji6vjg7pr4oSh4ZmD44O944uw4Yu74rK344uz4rK5yq7hurTji7cPKOOLuuKhnOOLvOK7o-KPruK7peKqpeORkeGlrOORscS84rur4rOO4bCz4rOQ4buT44Se4qGv4rOV4KmG4rOX4au64rOZ44Sj4rOb4ZqO44So4bGG44yW4qG74Zuk4qG94buo4ryC4rOl44ye4Zqb44yg4pCZ4ryI44yj4quK44S24rOt4quN4rOv44yp4quR44yr4pO345SCxozjjK_ivJTikKvivZfih4bivJnhsbDjiYfinorivJ7ih6HitYPgv6_iq6bjjL_jhY_jjYTjhp7iq6_ikoHivoHivanivbPimoLikLjiorfjjYrjjZDivL3CkeONjuKai-KRkOKSmOOVi-K8ueOGkOOFpeK0nuOGoOGCl-K-g-GAquG-heOOlOOFrOOGpeOOl-KsjOOGqeK-juOTkeKskuK0r-KsleKjnOGzgeONq-KjoOOUsuKaseKHiOOUteOBieKBjeK1geK8n-OUuuKSneOMvuK8o-ONuuOUvuK8puONv-GniuKjteK8puOGk-KGj-KjruOGluG9tOOVh-G9tuK9uuOVkOOGnOOGm-ONk-OVl-OVluGAp-OGouOFq-OGpOK-ieOVnuKtj-OVoOOOmuKkk-ONo-OOneOGruKkmOKgrCDjk5Xjk5fhuo7dh-OTmuCrvOK-nOOOqeK-nuG-puK-oOOOreK2guKtpuG0oeK-peOOsuK2iOOOtOOHheK-q-K2jOKtseKkt-OHiuG0suK-seOHjeKIreOHj-Ktu-KTmeKtveKtv-KsseC0tOOPhOK2nuK_gOK2oOK2ouG_kuOPi-GSlOOPjeKcoOOHpOKukOK2q8eZWOOPruC7pXXiiqzgorHjj7Pho58Z44-245OG44-4AcOj44-74ra84oq64r-84ra_4py944iB4pSH4q6q44iF4pSL4bW844iI4qaS44iK4q6z45CM44iN45CO44CP4baH45CR4rKxxJbjiJTjk4bjkJbhrI3jkJjigJXjkJrjgoPigpThhbDipqjinaHjiKHilpjjkb7hoJnjkoDguozinajjiKfir5TjgKnjkKfjgKvjkKnilLbjkKvMveOAsHPjgLLFt-KUveGgu-KduOOQs-OAueOIueOPqeK4heOQuuGgvOOBg-OQveKogOOBhuORgOOJseKatuONs-GUsOORsOORpuORleOBkOORl-KVneKnn-Kvv-ORq9mu45GO4qem4KOg4rij44GM4ril45SE4qer45iq4rCR45GZ4pWy4p6o4pW04p6q4ayx4p6s4ri24oG64ri44ri64rin4aKC4a2U45iu4auh4rCm45ii4rmF45im4qe844GP4rmJ44mN45G044Gi45is4qiR44Cc4qiT45G54Yim4oKY4p-O45G94p-Q44KM44qI44KO4p-V44KQ45KG4rmj4aOf4rml44m04pCM45Kk4rGJ45WO4ry74qeq45KP4p-j4rGR4paw4o2x44Ki45KX4p-t44K34qmI4peN4o2645Kd44Kq4qi445Kg45Kz4rqS44qo4qmB4peF4oOg45Kq4rGp4oOP4rGr4peM4rGt4aO24rqM04fjgqvisbLilafjkqPijaPig5zjmoDiupTijobig6DioI_jkrnig45k44q_44OJ4qmc45K-4rG_4qCY4rqf4qmi45OD4aST4pen4a-c4q-B4peq4rqn4ZiX45OM44Oa4q2Q44Oc44as4o644pe044uV0LfJsuC8uOGvueGQu-Cru9C54bqK0Ybjk53hr73jk5_iqoDiu4Dhh7fjk6Piu4ThsIbji6fisqvjk6ngvZbjk6vjgJPji63ihKLioY3jk7HhsJbjhIHisrjhsJnjk7bimJ_ji7cJw4Pjk7vis4Lij6vhmajjhI7FieOEkOGjn-OEkuK4pOK7qOOYp-KqquKFguOMh-K7ruOMieK7sOOMi-Kzk-OUjOOEoOOUkOOEouGaieKhteOZqOOEpuKquuOUluKqvOKQk-KFmeGxi-KZiuKZjOK8heGxkeKzqOOMouGNleOUpOKZl-OUpuOEuOKrj-K8juOUquKzs-OMrOOMguGxpuK8k-Gbm-KZpeK0uOKsneOMtOOUtOKFuuOFhuKzv-OMueGBoeOVh-K8oeOGieOUv-OOi-OVhOOFjuK1jOOcm-K9gOOVgeGxv-OOheGyj-Krs-GbpOOVieK1meONkeKRjeK5qeONjOKaj-OVgOKakeKjheOOkOOGoeK9guKbmOONmuKki-ONnOGCouONnuOVn-OTjuOVoeOar-Kjl-OVpOKtl-OVpuKHgeKsmuOVqeOMsuK9mOONr-OKjeK9m-OGg-OcleKRvuOcl-K9t-KZu-OcmuK8puKjsOK8peOVtcix4qOz45W6446B4qO2446D4qOu4qO64byh452P4qCM446I4qy_45aH44qU446K446A45ms4pGD4pqV45yz442Y4r2D45y24q2L4b6I45Wd44Wu4r6L4rSo45y845aT4rWu4pey44W14r2P45aY4YGJ45q04Ziq4bqOOeOauOG6i-KSuuKtn-OGuuK-n-Kkp-K2geCzvOKThOK-pOOOseKtqeK-qOKtq-K-s-OHhuOWsOKktuK2j-Kci-OOvOOWtuKkveOWuOOPgOKTmuKlguKTneKug-Klh-K2n-OPiOKliuKIvuK_hOKcn-KujuK2qeOHpuG_ngFZ45eO44qy45eQw77iv6vjl5PgqYYa45eW4qOG4pyz4qW_w6Tjl5vjj73ipoXjl5_ipojiv7_it4LjkIPjl6Pii4XjkIfit4rjkInirrLilJLjl6zjgI7inY_jkJDjiJHiu4rjkJPjl7Lipp3hirTinZjjkJnir4TjkJvjib7jiJ_jl77jgKHjmZzjgKPIseKLqeKUruOQpeOIqeC3leOIq-KdruKAreKKlOKvneOQr-KngeOQseKvoeOAuOGUl-KEm-OIutOj45C34pSd45C54oC_4pWK4riJ45ie44mS45ig4pWR45GB452M4beK44mz4o-044m144mM44md4biK45ir44GW45it45C-44mU4qek45GP44Gd44mY45i244mc44m445GY4a2B4KeY4pWz4Yez45i-4oGf45mA4qe44ri345StyLHjmYTjiZrjmKjjkajjkoHisKPjoIXjia_jgbTiuYTiloTjoJjjmanjmYXhloHjmLjin4XjibrjgoLjmZbjgoThoqTjkbrjmZrjkbzjmIDjmZ3jmIPigp_jioriuZ_in5fhorjjkonjjK3jkovhlqzitJjjgpnisY7ilqzjh7fhjYvin6bjipvjgqHjkpbin6ziqLLjmofioIPiubnjgrzjgqzjmo_isbTjg4HjkrXhuYzjiqriqYThrrDjiq7igrzjmojijo7iqYvjkp7iuo_hr5XjmpDhuYnjirnijpnjkqjijofjmpfjkqvig6ThiqLjmpzji4Hhr5LiqaDioJril6Xjk4TjmqXhubnjmqnhmJjil67jg5viuqzjlpXji5LjmrHispXRhdGD0Lnji5vhuo_gvLfjk5XioLPiurvji5_jmr7isqPjm4Diu4Lji6Pjg7Diu4XWmuK7h-ObjOOTqOKqiuGlieObieODtuObi-OTr-K7kuKyteK7lOOLsuGZmOOLtOObk-Kyu-OblXDjm5jhjI7jhIvjk77hu4LjjIDiu6bjgazjjIPjm6Pht6XhmbfjlIfimLbis5HjjIziqrPjjI7jhKHjjJDjlJLiu7njm7TijaLjlJfhmpPiu7_hjYXivIHgvqzhu6rjlJ7ihaHjlKDimZDiooXjnIDivIrioonjnIPjjKfjhLnjjKrjnIjjlKzjnIrjjK7jnIzhn57jnI7imafis5HjnJLikLHjnJTjjLjiq6LjjbXitJDhpr7jlLzjnZXitZrih5bjnKDjnZjikorjo57irYXikYTjjL_jnKThs6vitJLjjbjjnKnjlYvimorih6rjnK3hvK3jlojhm7XikZjjnLLjlZfjlozjna3jjpXjha3hsrDitarjnbPimqDjnbXivo_ji5LjlpfitLDjjajjhbrjjarimq3jnYXjja3jnJDjnYjirJ_iop_itL3jla7jhoXjnY7jhZjjjbfjhZvjnJ3imr7jlbfjo6TjnZfjhZHjjb3hjpXio7fjpJvhj67jnZ3iorbjloPjhYzjnaXjmavjlYrhsoXjjo_jlYPitaHjo7fio4vjjZvjna_jlo_jnbHjhqfjo73jhbHikajivYzji5HispLjpILirJXjobwx46G-4YuQ0LrhmKvhr7LjooPjhrnipKTjjqvjlqXipKjjlqfjjq_irafjlqrjnozhqoTjh4TipK_jnpDirbDjnpLjjrrjh4vjnpXinI7jh47inJDjh5DirbzinJTitpriiLXipYbitqDipYjinJvjl4Tjh5_ipY3ik6jiv4fjh6XipZLHmdmB4r-m4pyo4Zep456t44ev456w4KOg2pLiv6_jh7Tiv7HiiaXDpeOeuOKuo-G_teK_veOXoOKmiuGThOOQhOGrheKuruOAh-KuseKLjOK3juGrjuKLkuKUluKAjeOLrOC2sOOfj-Kdl-OImeKmouOIm-K5j-OIneOXvOK3pOOQnuKvjOK3p-KvjuGYjOOfnOOKiOKms-OAqOGgoeOfoeKvmeG2quKUuOOQreK3uuOfpuKvn-OfqOOAt-OYluOfq-KSnOOfreC3tOKKhOOYmuOfsuOBguOQvOKBg-OZiOKVkOG3heOJluK8m-OJiOOZjeOBuuOfvuOgqeK4reComeK4nOOms-KBoOGVhuOmtuKBo-OBnuOZjuOBoOORs-OJnuOgguOYuuOgkOOYvOOgkuOBp-OYv-ORn8OM45Gh4KmG45Gj45uh4LuP46Ca45GU4pW94oy344ms44GF4ZW145mK45Gu4rCo45-84rCf4oy245mQ46CA4rCQ46Cq4ZaJ45G34reh44m-4qiV45mZ4rC345mb46Cz45-a4Kiv46C145KC4aKw45KE4rGB4rmh45KH44KH46C746OO46C944KX46C_45KO4rms45KQ4r-z4a2m46GF44Kg45KV4qiw4rGW4rm146GZ46GM4rGa4oOA45Kx46GP4rqQ46GR45mp44Kw46GU45K345qE4rqG44qg44qx45Kv4bWe45qM45m804vjgr7jkqLjqJPjmpHjqJXjg4PjkrfjoabjmoXjmprisbvhr47jmp3PouOSv-K6nuOTgeKXo-ODkeOhsOODk-OapuK3nOK6puODl-KgouODmeONoOOaruOktuGvquOhuuKgrNC54qSf4aSu4bqR4oSI4a-y44Oo4oSM4rq94qC645q_45Oh45uB44Ov4KOa4rKo45Om45uF46KQ44up4YKX44O445uH45Ot4rKz4oSk4qGP46KZ45Oz46Kb45O14KKF45O34YyF4aWcBcOt46Kh4bq846Kj45ub44u_45ud44yB46Ko4o-y45SE46Ks44SZ4qqu44Sb46Kv45ur4ruz4qGw4rOW4qGy4K2X4qG044Sk45uy44Sn4rOd45u14ruR4a2544Ss4qG-45ScyLLjm7vjjJ_ivIbjlKHjm7_imZXjnIHjjKXjo4jhu7fis7DimZzis7LimZ7iopLgqYbiopTjp5bjnIviq5bjhYDiq5jjo5PhvIfjpI3ivZzjmKPirKPima_jhYnjjobimbPjo53jh5_ivKTjo6DjlL3jnJ_jqqzjpKnjjYbjhZfjhofitJHjnKfjloTim5Hjo63jnKzivbvhm7DjhaTivoLjnLHjpKnjjZfjjpLjharjo7jjlZzjpK_jo7vjha_jjaDjnL3jqL7jhq3jhbbjhq_jlpnjnYLimqzih4LjpIjiopvjhb_jpIvio6PjjbHjqqLivJzjlbDjlLnjnJjio6zhsb3io67jnZPjqqvjpJjirLDhsofjpJzjnZvivKbjpKDjhpjjnaHivLHjnaPjnJziq7vitInio4PivoDjhZTjqr_ikqHjq4HjpKzjnLfjpK7jjZ3jlpDio5HjlpLjpLTjhqvjq4njnbjjnYDjjafirZjipJ7Qv-GYreGYseG-n-OphuKPhOOeg-Olg-OeheK2gOKTguOeiOK2g-OlieOei-KcgOOejeK2ieOOteK2i-OlkOOOueK-r-OWtOOHjOOlleOWt-Oll-OWueK-t-Oem-G_iuOeneOlnuOen-OWveKTo-OloeOsp-GSkuOPjOOepOK2qOKJhOK_iceZW-OPlOGUgOOPluOjlMKX44-a4qWd4L-Q1oPjj57iioDjl5njj6LLv8Ok44-l4qWmw6XjmJnjg5XEjsOt4oqI4Z-X46Wq4qWz4Kqkf-KlttK446Wv1prPluOlsuOPt-OltOKTu8Om46W344e845664bWw456845CB44iC4qaM4pSJ44CE45-C44CI4p2K44CL4qaV44CN4reR4KmG4reT4rGf44CR45ex46aK4q6_44CW45C445e344Ca45e546Ct45e74aCQ45e94rel45e_4rC544ij45Cj45-d45iG4rew45iJ4qa34pS045Cq46ag4qa746ai4p2046ak4re846am44i245-q4qeG4Zmz44i8462y4ba846av4p6B46axZOKBhOOnneKMneOJheOgiOONsuOqo-GhjOOmueOJiuKBkuOmvOOCgOC4nuOmv-OgoOGHluOgh-OYsdaa45iz4rCq4pWp46eG4oyl466j4p6l44mh45Gc4oyw4ri146CW45mC46Cl4ri545i246Cd45iEZOK5gOKVjtGW46ef46eD46eh466g45mn45mP466x4rCx46Cs44ic45mX46Cv46eu4rmT4rC44o2X4paZ46e04qid4rmd4qif45mi46e545mk4KmG45mm45-945uy4a6I46iA4pap46iC45mv44qa46iH45my46GI4qix4rGX45Kt45KbyobiqLbjmbvisbHiubvjirbilr_il5TjoZPil4PjoZXil4jiqYXjoZjiuonjkq7isa7jkrDjoZ3jirXjoZDjgq7jqJTjoaLjg4TjoafioJLjoanig6bjg4rjmp7iup3jmqDjqLHiuqDjqLPjmqTjqLXjobLjqLngvJ3jqLvji4_jk5DjnL7huoXjg5_hqZngrITgq73jobzhi5bhuovQvNGE4YuQ46KE4qm-4piF4o-L44Ou4ruD44uk46KM04vjoo7jopbiipXjqZjjqZfjopHhnZrjk67hsYjjopfhsJTji7HjqZ7ihKrjopzjqaHjm5TjqaNH46mn4qqf4Zmn4ZSn4o-t46Kl46ms46Kn4p6w44SU46mw45SG46my4rOP46m045SK4bC446m345SN4KOg45SP4bat45SR45uw46m94oWQ46K344yV45u24quB45u446K9456144yd4qKB46qJ45u944yh44Sz46OF4qKI4oqn44yo4pCh4qKQ46qV4rO047GH4K2X45Sv45yN44yx46SJ44yz46SL46OV44WF45S244WI46Oa4rWU46qn4ryi46qp4oep4rSH46Ok4bKA442D46qu44WU46qw44aX45aC4pGI4qy-46uq45WQ4ryz46q447KM4rSa46q745yw45WV46O145aL45y04qSJ46uC45aO46u446Sw446Y4r2K46u8446b4puk46S346uL45264b2L4qyX46SG46uQ4rS244WC44y046uV45Wt46a34qOo46ql45yl45WC46Or45yi4Zyw442746Sl46Se4Y-p45W546Sa47Kz4K-245W946Om46Ok45aA46ua452f46Si47Ky4rSU46Of45WP46q246Sn46uw45yh4puW47KW4rSj47KZ45y546u54r2J4r6N46O_45Wi4qSW4amX46yB47Cb4o6-4ZiuNuOwnzHjsKHgvLPjpYLjjqrjrIzim7njrI7gs7TjnonjjrDik4firbfhnpXjpY3irbjjpY_jjrjjh4nhtLHgtYjik5Ljjr3jpZbjjr_ivrbjj4Hjlrzjq6PiroHjrKTjj4jjj4biiLjjl4PipYvjpaLjnqPipY7jrK7iv4jirpHHmcuu44ym4KOT4r-n44qyf8OQxaXjrZHTi8uF462U45eX462W4qW_w6fjrZnhv7Pjj77jpbrjrZ3jl6Hit4PjiITEmOOAheKUjOOmgeK3i-OfheOmhOKdjuOmhuOIkOKKoeOtruOXs-C2s-OtseOfsOOts-OImuOtteOvi-OgruOtuOOmk9Gc46aV4KOg4reo4KqH4req44Ck4rmZ44Cm4YqF4qa046ad45Co45-i4ouz45-k44ix0pTjiLPilL7jgLbjro3jpqjjro_hoLXjn6_jmqfjgL7jmJvigYHijIfjn7XjkYzijIrjmKHjp6Diq6DivZ7ip5bjr4Xjr5zjgY_jn7_joI3jp4rjrqXjkYvjrpniuJ_jrqnisIbMveOurOOZp-ORkuOgi-OviOKMq-ORmuK4seOYveOnj-OglOOnkeOnk-CjoOOnleOYtOORpeOur-ORp-OnnOK4nuKBn-Kog-OZi-OgpOOjjuOKpuO1oOKNheO1sOORtuOviuOmkOOvjOGttOOChuOCiOG4luOml-GiquOvk-GiruOgt-OSheOvmOOKj-OZpeOKkeOakeOSjeOvoOOKl-OCm-KxkOOvo-OZseKor-Kfq-Ovp-Ooi-OvueOvquOZueOoj-OvveKfteOvv-OKt-CqsuOSpuOvteOCtOOvt-OomuOZuOOKs-O2rOKDluOZvuOhkuOak-OStuOaleGXnuOoqOKggOOam-Owh-OoreCrieOan-ODjeKygeOLheOwjuGvmOOhseKgoOOwkuK6qOOwlOOhtuOLkOOhuOKykuOpgOK6sd2344ub4pe84a-44pe8452_ybLji57jsKTisqLimIbiqoLjoorjqZDji6XisqnjqZPiibfjsK_jopPjn43jqZnjqoLisrTjsLbjk7Ljm5Djk7Tjm5LjsLvjop7jqaPEjsOU47C_46mp47GC45uc4aq046mt47Gu46Kp47W945GV44SY45um44Sa45uo44-X4rOS4ruyxYniu7TiobHiu7biobPjjJHjhKXjqb_jjJTjr53jsZvjjJzjsZ3jjJvjqobjsaDivITjsaLhu67jlKLjsabis6zhurzimZnjsanis7HjsavFieKZn-Kik-K8kuOqm-OMsOOUseOdhuOUs-OFhOKzveOjl-KroeGbg-OxuuONiOOxvOOdkeOygeOkl-OxvuKHrOK8qOOjoeOGlOKrp-OjqOGykOOFmuOyiuONi-OqueONjeOyjuOqttKe45WS452m4qyA47KT46q-446R46uz442Z46u1452u4pGg47Ka46uF452y44Ww4ZCq47OU47CX47OW4b6W46yB46uO4rS04r2W47is45Wr44y247iw47Wd442046SR46qy44WT46SU44WV4Y6V47K14puA4qOu47K547KD46Ok47K94aeR446E46qx44y74r244puM46q14aeb4puP4rWb44ad45WT4r6C45aK4ry846Sr4r6G46St47mT47OQ47Kb45y746O-47Ke45aU446c46SB47Ki46SDIOG-n8yjOOO3meCsgOOkuzXjt53jrIrjs6LjlqTjnobjs6Vy4ZGN45ao44eA4q2o46yT46WM456O4pOL4oik4pOO4oin45az47Oy45a146yd456X46yf456Z45a746Wb4rag45a_4r6-46ym47O64LS-47SA456i46ys47SE46Wl45eK44-RybVe456r462Nw5DDneOHsNaa357jtJTjnrTUq8Oo47SZ4ra946W5456744iA46W844iD462h44iF47Si45em45CI45eo45CK45eq4Z-945-H462p4KOg462r4Luw462t46aJ47St4YWl4p2W4qmn45-R45e445-T45e64p-J4q-J4ouj46aU4rem47S647aS4qav462-46aa45-e45iI45-g47WE46af4p2v4re2466I44Cz466K44i0466M4oai44i345C045iY44C746at44i947WU45id46ay466n46a04p6I46OY45-747Wf46ej45io47Wi4qiO45GJ4aGZ47Wm47aA44Ga47Wp4pWm47aF466u46a644qV45GW46eI46CB45i546CP4Li746CR4a2F4riz44mk4rCZ44mm4rCb466546eY4o2E44mr45mH47yN4qam46-C466c46-E466545GF4biH46el47Wj47yl46ep47aL44m84rmQ46-N4qiX47aR45Ch4qia47u14qax47aV4rC_45mh44qM46SM46e64aK54qij45KK4p-d46-f45io45mu44qZ45KS4pav45KU46-l46iJ44qf46-p46ib46-r45m646ie46-u44qk46-w44G547aw46-zwpHjkqfhhqbjkqnjoZbjmpnjr7jjkprjvZ_jmorjr7zjr63jkp_jqKDjtrrjsIHjvajjoaPjvavjoaXiqZfjmpnjt4LioJTjkr3jqK7jt4bji4Pjoa3jg5DioJvGjOOThduT4rqk466S4qmo4Yq344uN4rqq47eR47CW46u-45OS4rKU4qCs4Ku54pux4aSt4Ly34oSD4bqR456C45q844ug45Og44ui4bCE47el46mS44Oz4qGE46mV4qqL4bCN47Cx4qqO44uu4qqQ46KY47C347ex46mf47ez4YyB44u247e2D8OM47e54rOD46mq45O_46Km45SB47ye4qqn47GJ44yG44qI4pi145SJ4pi445SL47GQ45ut47GU45uv4aaC45ux47GY44yT4qG545Kk44yX47iY47iW46qF46K-4ryD4Y2L45u847ic46qM4qKH47ifwq7juKHjo4rjnIfjsazjnInjqa7jo4_juKnjlLDjhYHjlarjhYPjuaPjsbjitIDjuLPjqqbioqjjsb3jrKrjnZDjq6zjjYLjuLvjsoTjs4vjuavitI7jubbjjbbjqrPihZjjnKjjjozjlYvjlY3jo6_juYTgoYLjuYnjo6LjuYvgoYLjubPhsqbjuY7ihqnjlZrhvofjuobikaLjuZXjpLHjuZfhvYLio5Tjt5PivY7jrIDjjqDjhbnjsqXjlafjpIfjsqjjv6jjsqrjlazjnJPjv6vivZ_juafjubfjv7LjuarjhorjuLjjv7Hgr7bjubDjv7XjubLjq6Xjsr_juL_jnKbio73jpKPjub7jjbzjv7_js4nipITjuoHhnZrjlZhz4rWk45aN4qSM47mU4by-46O85ICT4qOT4oa3476T45Wj47OX5ICZ4LOB4piA476Z4b6f3Yfhi4_hgY_ivp3iiJTjupzjrI3iraXjpYjjlqnjrJLivqfjuqXjrJXjlq7jjrbjh4fjlrHjnpPjjrviiKvjs6rgs6jitpXjs7fik5rjj4Litpvjs7zkgKvCluOzvuG0v-O6uuKuiuOXhuOsreO6vuOPkOOeqF_jrLPSveOstdqZwqHjtI_jj5vhlYnXm-OsvOKJn8Om46y_z7nDp-OtgtOtw6jjrYXjvozSn8Ou4oqI4r-r462L4q6V4aiPVeKKrOCrguO0kcy9H-Oes-K1oOOxn9Kfw6rju47jl53jh77irqbjnr3inL_jnr_it4TjtKHjraPjpoLippTjiIzippbjiI7jl67ii5Tjl7Dju6Tjpovju6jjpo3igp7ipqPjp6vjgJ7jkJ3jtLjju7HgpY3ju7Pit6vjvYjiqJzjmIXjtYHjppzhtqbjroPjgKzjiK3jmI3gt57ju77jmJLjgLTjtYvjiLXjvIPjro7jkLXjrpDjtZHjqLfjrpPijITjn7PjiYHjvIzjmJ_jtZnjn7jjmYvjkYLjtZ7jvLnjmLbjvJXiuYvjoI7jkYrijJvkg5rijJ3jmLDjtarFluO1rOOvnOO1ruOiquC4sOO2ieKnseO1suOBpeKVteOBqOO8rOORoOO8ruO-vuOgmeOuu-O1v-K5geOvgeORreOvg-OZjOSDoOSDr-OgqOO8o-Onp-OmveOgq-KCkuO7rOKviOOnreO9hOKNleSCvcaM45me472J44qJ472L44qL4rmg44qN472P46e847-j46e-44qT46us44GP44Ka4rGP4pat472Y4rmw44qc45mz46GJ46-o46GL4rqK44qi46GO4aOf45Kh4aKS46Gg4o6V4rm_44qp46iX472t4YqC472v44qw47a246Gc472046Ge4oOt5ISw4rm-4Lu34Kq347CD46ip472_4rqa47CI476C47CK47eH45qh4qmQ45qj47eL47CQ47eN476O44OY4o6x47CV4Zie46SA47eU47CZ4b6Y4pe74rW24a-w47Oc4aSv4amcM-Oku-OTnOOpieKyoOKYhOO3oOOwpuOTouOpj-OTpeK7huOTp-O3qOO-quK7jOKEnuSFreK7kOOEquKPmuObjuKYmeK7luOEguOineOEhOO3tgPCo-O-uOObmuO3u-Opq-O3veOxhuORpOO4gOO8oOK5quO4g-O_guOMiOC-leObqeO4iOO_huO4iuOpuOOUjuOpuuC7j-OpvOOUk-GxhOOUleOiuOO4lOO_kuOUmuGxjOOiv-OxoeOUn-OqiuOjg-O4neOqjeOjhuOxqOO_n-KZneO4peOqluCjoOOqmOO1u-GNpeO_peOxseO4q-Oxs-Odh-OjlOO4ruOkjuOyreOxueSApeO_u-OjnOO_sOO6uOSAp-OytuOyu-Gzr-O5seO4ueGbmuO4veOjp-O_uuOjm-GnmOSAteSAg-OFnuO5huO5u-OVkeOykeK1oeONleO5jeOdquOrgOO5kOO6hOOrtuSAj-KHuOO6iOOWkeOdtOO6i-OdtuKgqeSBieO5nOSBi-KsluGoh-SAnOOyp-K0t-OqnuGco-OdiuOMt-O4seGomOO_reOysOOkk-O5guONucix47mt47KA5IeBa-SAreOVu-SAr-ONheOVv-SAsuOOh-OGmuOWheK0mOSAtuSAhuOGn-OylOO6guOzjeOGo-SBgeO6h-SAkeOynOOzk-SHnOSFleSAl-SBiuOrjTXkhZrihIjiurg25IWe5IWg45ah4oiS47qb4pu347qd5IGX44a_47qf44eB46WL4qSv47Os4Z6V47Ou47qp4q2y47Ox4ZGr47Oz456W4raU456Y5IGo47qy4r6647q05IGs5Ia74ZGr5IGv44ed46yp5Ii046Wj4r-G4pyh46Wm46ywybVj5IG54omK4qWY4KuId-SCleSBv-Gjn9SG5IKC4qWiw6nkgoXRq-C5huSCiNOVw6vkgovjtLDipb_DrOKKiGDju4POilTDkcO9yorhhKbjsKrMvceb47uK5IKb1KvDqeSCn-K_u-SCoeOQgOO0nuSCpeO0oOK3huSCqOO0peOmg-OAjOOmheKuuOOmh-OpmOO7peGTpOO7p-OAveO7qeOttOO7q-OttuO7reOfluOtuuOfmOOnseG2nOOmmeSEk-Omm-OIqOO7uOKdreO7u-Ofo-KFi-CuieO1iNGq47WK45iU45Cy4Les4riA4oai46ar4Yag44C85IKM44i-4Le746aw4q-r47WX47Wn4riN47Wa5ISB5IOe47yR5ISD47iB46ea5IOi44GT44G_4q--466m5IOn47Wo4rCE47y34qen46CK5ISE4KeM5IOx44mg5IOz44mi46614oG347yt44Gr47e_4ZiM47yw4qiK47W-47yz5Iqu47aB47y2466q44G246ei4ri74qiL5Iq244KB5ISK5Im-5ISM44qA44KH44qC1prjioTjtLzjiobhoqzjmZ_jtpbjp7jkhJjjr5ngo6Djr5vhoo_khJzijaTjnaTjoYDjipfiua3jkpHin6Xjgp_jtqPiubLjmbTjoYrjmbbisazijbnhuYDjvaHhl47jvaPjmb3jvaXioInjr7LjtrzjqJbjtr7ho6zjtrPjoZfjtrXjmonjtrfkhLvjr77jqJLjsIDjqKTjsILjqKfjvb3iupjjsIbjvoDkhYbjt4XkhYjjvoThlYniqaHkhYvjt4rioJzjt4zjk4jjobPjmqvjqLzjobfjuo3khZbjk5PiurHhr7ngvLXhgrfgsYfhr7PipJ7gsYfhr7rkhaLjg6rkhaTji6HimIfjvqLkiaDgrJnkhavjsK7khbDjm4jjvqnjvqfihKDjqZrjg77ihKbjoprjsLnjqaDjvrPiqpfji7cNEOSFveK7ouO-uuOxhOSGgeO-veO_o-C-ieO_gOOireO_hOKqseOxj-SGjuOxkdaa47GT4pS647GV47-L47GX4pmB45SU46qA5IaX46qC4qq94qG844ya47-U5IKc46qI5Iae47Gj46qL47Gl5Iai47Gn4ryM45yF44S647-g5Ian47Gt5IaD46qa4rO346qc47Kp47G15Iaz46qh47Wc45ik4pC25Ia346Ob45yZ47OE47-45Iev47mu47-25IiC5Ia-4b6A45W-5IeE47KH47OC47KJ4rWY47-_47KN5IiA5IeJ442S45yv5IeP47mM46ux5ICL4pGc5ICN4r6H46u35IiJ5IGD46uG446Z5IiN47OV4rSu5IiQ4Y-Q46SF5Iek452E5ICe47mh4qye47Kr5ICi46SP5ICk4Y-n46ub4rWE45W05Ie15Iez452U5Ie15Ie3452Z45W85ICw5Ie147OA4puK47KI4r255IeI5Ie_452k5IiB47K64pqR5IC72q7juoPjlZvjs4_kgJDkjpnjuZbjq4fjuZnkgYjjuZvikrHjrIHgo7vhvpriiIrgq77kjKTioK7gq73js6HjlqPkiJzkgZbjhr7ik4XkgZrkgaXhtKbjuqbitorjuqjivq3juqrkiKnhvrvjpZTitpPirbjkgafinJLjs7jjurPjj4jjurXitqDkiLbjl4Ljj4rjtILjurzjpaTkiLzjur_jnqhH5ImB5IG714ADwqLikbnjvaLju7zWmjHiv5bjj5_PucOS5ImNxI7Dk-SJkMu_w5TkiZPjtZLSn8Ov4oqI4oqu4omr4qWW4oqN2I8DesOQwo3kiYfgqYbWuOSJiuK_mMOg5JCJAcOh5JCMz7nDouSQj-SDlMmDw7Diiojjqb3CreKKjOSJg-Cti8Kp4qW21YbjrLnhhosw5JCF46y9w6zkkKPDreSQpuSJjsOu5JCp44iX4omlw7Hiiojgv7_kkK_kkJbkkLHgqqRq4K2y5JCd4KOgM-SQueKJn8Ov5JCjw7DkkL7EjsOx5JGB45CX4qW_w7LiiojRmuOTvOOxgeGssQRq5IO35I2G4YaL2LPiuLjEjsOy45i2xYHkipvjrr3EjtS_5IKR4o25BuSJm8O-cOO7h9OLxKfkiaPjpKnkgpzEjsOr5Imn47Sb47uR4pSF456-46W945-A5Imu46aA4qaR4p2J44CK45CL47ud5IKs45et45-J44CQ5IKw45Os5Im34KqV45e10ITjiJjipqHkgrXjpo_jvYHjppHjtLbjgKDii6bjn5nkioTjtpThq63kg4LkiojjtYPjmIrjtYXjpqHjtYfjkK7jiLLjkLDhhpbihJvjvITjmJfilYDkipfhlJzkipnkiZTjtZPjrpTjkLvkip7kg5njn7bkg5vjprXkirHkiqTjmKXkiqbkhoXjiYvki4zjtaXkg6bkkrvkg6jjvJzjkZDkg7rhlY7jta_khIbiuKzjrqTilbHjp4zisJXjtbTjvKriu4Hjtbfkg7nkjYjRquSLgOKvuOOgnOSDveOvgOORrOOgouO2g-Keu-STgeOuoeOnpOSThOO8v-SLjuO0tOOtt-KWk-OgsOOnr-OgsuOtvOOYgeKfkeSSoeOZoOSEluOgueKxheOCk-OnveO9k-SLo-OogeOKl8KbXsKXw7fDgCfkiabjtqLjvZrjtqTjip7jkpjjiq_jmbfjmonki7HjtqvkjILjtq3kjITjtq_jiqfioIvkhLPki7vjgrPjiqzjtrTjvZ7khLnjmovki7PjvbXgu63jvbfkjIbjvbnkhYLjt4HjqKvisb3jsInji4Ljg47jvoXjt4njvofIseO-ic--476L5JK144OW5IWQ46i65IWS476R5IWU5I6d4qmx44uU4rKV0YDgq7_ihInkjKXhqZzjpLvhi47jt57jqYriqb_joofjqY3joonkjK3jm4TjvqXji6jjn4zioYrkha7ioYjklY3irr3jopXjsLTkhbPjvq7jt7DhurHjm5HhurPjsLzhmZ3hpZwOw7HkjYLjk73kjYTihLrkjYfkir7hopDjhJXjvLHjhJfjsYrjuITjqbPjuIbjqbXjuIngrbLkho_jsZLkhpHhmIzkhpPjorbjv47jhKnjvqziu77kjZ3is6LjuJfjv5XjlJ3khp3jo4Hkhp_iq4bjv5rjhLXjnILjuKDis67juKLjqpPjuKTDjOO4puOql-O4qOSNsOO4quO_p-SOpeOckeSNtOOdi-O8kOOqpOSHreGRquSNu-SAqOOjoeSNv-O4t-OqreSWn-Oqr-O4vuSHheOxu-O_vOK8r-O5uuGyluO5heSOjOOyj-SAhOSHjuK0neSAiOSPguG8tuSAjOOOk-SAjuKsieSBguKGseSPieSOm-KbouSIjuOriuOdueO6kOO5nuK9leOFveOrkuONruKzkeSOp-OjluSAo-OdjeSOq-Odn-G8nOSOruSAq9Gq5I6w46ug5I6y46ui4byY47K85I625JeO4rWS5Jak47i05Jam44aZ5Jao46qq47OH5IeM5IC545aJ5IiE5IC85I-E5Ja14r2G5IeZ46u65Ieb5Ja75JS4446e44W35Ieh5JS84a-54Ly85JS_4KyD4aSr5IiZ4pK85Iib4rW_47Ok5Iie5I-c47Op44eD5I-g46yW5I-i44eI5I-k4raQ46yc5I-o4Z6V5I-q44eR4raY47O55JeUwpbkj6_js73jurfkmIzkgbHiv4Pkj7XkiLvjl4nkgbbPlEXkiZnFgU7eneSRtsy9ybfkkbnjhZTkkbviiaDkkb7jrZvinLzjtJ3ju5PjraDinYLjl6Tkia_jn4TkibHjrafkibPit5LkibXkjLLjra_jgJXkibnjvozkibvjtLLkib3kk6rkib_kgrngt4PkgrvTi-O0u-OgvuOtveO0v-OQpOOugOOQpuO7ueSSpuSKi-O1huSKjeC3ouSSquO1ieSSrOOYleSKlOOIuOSSseSRmOOXtuSDleKVieSKneOftOSSuuO1mOOumuSKouSSvuOfuuSTgOSTi-OakeOgp-KVmuSTjuOBlOSKrOO8meSDvuOghuSKsOSLh-O1q-OnheSTguOusOSZp-SKq-G3rOSKuOOutOKwmOOutuOBquOgl-SZo-STm-ORhuKetOOKiOOuv-KvruSDv-SToeO1m-O2hOSTmeGiv-SZpeKfgOSTp-KNjOO9gOORuOO9g-ORu-O9heSSn-ClrOSEkuSDgOSElOOvleOCj-O9jeKasuSEmeSTuOSEm-STuuSEnuSLpOGWs0N4wprDtsKCOXjCjOOZsOSUhuSLq-SEp-O2p-O9sOOZuOSUjeOCqeO9ouSUnsWW5ISu4Zao5IS-5Iu45JSU45qB4p-84qmD46-25Iu-5JSa5IyA5IS65Jqz5IS84qmi5Jq444q45JSi5IyI4rG5472-5JSl476B5IyO5JSo47eI45OC5IyU476I5IyW44uK5IyY47eQ45qt5Iyb47Kg46i_5IWX4Lyy4Ziv4LGE4rq60YHhr7Thr7Diurrjvp7joobjt6HjsKfjt6Pkhanjoo3kjLDiv5fjkJLklY7jk6rkjLTklZHihJvjsLPhmpLjm43klZbjm4_klZjjt7LklZrjt7XklZzYkD_klaDkkZ_igZ_jsYPklaPhu4XimK3jsYnimLLkmpXjv4PjsY3jv4XkjY7klbDkjZDTi-SNkuKdsuSNlOG7m-O_jOSNl-SGleSNmeOxmuSNm-Obt-SGmuObuuOEsOOjguSWg-SNpeO_m-OUpeSWh-OUp-SWieKrkOSGpuSWjOSGqNaa5Iaq466t45Su46OQyZ_jo5LiopzkhrLjv6rkjqnjo5nkjbnklqXkhrnjuLbkh7XjjYDjo6PknLvkl5Phvafjo6XjubTklqPkjobjpJLklqbjuYHkjonjs4XjnKrCkeOjruKbkOSHjOOquuOjsuK8vOOqveSOkuSHkuO5j-OdrOO5keOjueOdsOSIiuO6ieOks-SXq-O5muSOnuSHoOOrjeONqeSOouK0teSHpuScsuGPneSHqeO5pOSNt-CjoeOyr-SWmuOrnOKGluKSg-SAquSItNGq46SZ5IeA5JeXyLHjpJ3kjoLIseOrp-SOuuO5ueSOvOOziOSWq-Sdv-SOj-OkqOSdk-OjtuSIhuSBgOOcuOSPh-SWuOSAkuSPiuSOnOSdnuONpeSXruOWmeGdu-Sbn-OOpOGYq-Gks-Csg-SXtuKko-SXuOOGvOOlhuOsj-O6oeSIoOO6o-SBm-SIo-SXv-SBnuOsl-Ozr-SYg-OelOSBpOK-s-SYiOOlmeG0veSPreSBreOlneOPiOOln-KIteOeoeSBsuG_luSBtOSPt-SBtuGDgEPClsW7xI4gAMSmxZ3Qg-SevAHOjyHkn4ABHuSPpcqk5J6-AeCtjgDgtKPEjsKU5J-PxI4e4YO0xI7bpwEb5J-IHOCzmsSO5J-E5J-dxI4d4LOg5J-DzInEjiPkn4gdAuSfkeC5v8SOJuSfiCfkn57iio8B5J-vxI4p5J-ywp3EjuSfoeSftOSPnuC0ndOhxI4q5J-IKeO6nuSfhMKfxI4r5KCC5Iif5J-EwqDEji7kn4gt4q2s4aqE07jkn7bkn4gs5J-y5I-_zpDkoI_kn73gs7zEjsKjxI4t5J-IL-SfssOAxI7kn5vEjjXkn7LDgeSflQPYk-SfssOC5KCt5KCH5J-yw4Tkn5UCxI43AOCgs-GLoeSfhOC5vjjkn4g35J-XAcOIxI455J-IHgPkn6zDicSOO-SfiD7kn7LDisSOPOShjOCzkeSfhMOLxI495KGM4LOT5J-Ew4zEjj_kn4jhmaDgs5XiipvgtqLkoZ7koZPEjsOOxI5B5KGe5KGZ4omY4b-f5J-IRuSfssOQxI5E5KGt5KGk4omgxI5F5KGt5KGq4ommxI7koa7Ejkfkn7LDk-KJqeSfiEfkobTDlMSO4Zmg5KG95KG5w5fEjkvkn4hO5J-yw5jEjkzkoo3kobTDmcSOTeSijeShucOaxI5P5J-IUuSfssObxI5Q5KKd5KG0w5zEjlHkop3kobnDncSOU-SfiFbkn7LDnuGFseSireShtMOfxI5V5KKt5KG54K2tAeSirsSOV-SfssOhxI7koo7korzkobTDosSO5KKe5KK85KG5w6PEjljkn4hb5J-y4KuK456p5KOM5KG0w6XEjlrko4zkobnDpsSOXOSfiF_kn7LDp8SOXeSjm-ShtMOoy4Dko5vkobnDqcSOYOSfiGPkn7LDqsSOYeSjquShtMOr5JGu5KOq5KG5w6zEjuSjq8SOZOSfssOtxI7ko43ko7nkobTDrsSO5KOc5KO55KG5w6_kob3kn4jFnOShoAHDsOSivOSkiOShtMOx5KO55KSI5KG5w7LEjsWc0Znkn57Nkcym5J-IG-OHmOSBrc6rzoHkpJvjj4fkpJ4CBOSgtuSkm-O0geSkowXkpJfkoKXjh5TkpKPRmOSfmuSfjgE307_Qg-SIuuOPjuOepuGfjA",
},
{
  header: "Episode 4",
  color: "#2196f3",
  name: "Blockchain",
  image: "thumbs/blockchain.png",
  desc: "We'll use proof-of-work to jam on a hash to mine a block of transactions. Then we can create a chain of these blocks...",
  video: "https://youtu.be/zcX7OJ-L8XQ",
  save: "wofCrGxhc3Rfbm9kZV9pZMONAVTEgcSDxIVsaW5rxIvEjQJSwqXEh8SJc8KdworCosSMw4zDrcKkdHlwZcKtQ29udHJvbC9UaW1lcsKjcG9zwpLEjsKmw40Cw4LCpHNpemXCgsKhMMOMwqjCoTEYwqVmxIJnc8KBwqljxLHEgnBzZWTDg8Klb3LEiXIAwqRtxIhlAMKnb3V0cMWsc8KRwoTCpG5hxLbFqm5fdGlja8SmxKhlw7_CpcSUxJbFsMSOwpLGgmFiZWzCpzMwxo8wbXPCqnDEsMSpcsW6ZXPCgsKoxJV0xLd2YWzDjXUwwqVldmXErsSmxbtrwqhib3jFl2zFoMKkIzLGuMShxKPDv8W-xKnEq8StxK_EscSzxLXEt8S5xLvEvQHCiifFg8WFxYfFicOMwozFjRrFkMWSxZTFlsWYYcWaxZzFnsWgxaIBxaXFp8WpxavFrcWvxbHFs8W1ZcW3xbnGrca9xoDGgsSVa8aFAcKuxojGimzCpsaOxo_GksaUxpbEt8aZxpvGncSuxqDGosONC8K4xqfGqcarxbrFvMavxrHGs8a1xrfGucSiZMOMw4_HrcKsSW7FrnQvQsWsdMStx4bEvMWAKsWAwp3HjMWGwpLDjMKJLceUYcWTwoDFn8WhxLcFx6DEiQDCpsSVyJvFsMKDx6fEtsKgx63GvMaDa8aGxarFrMi7wpLIvcW0yL_JgcevxoTCk8SOdcSOwpTEjsOjyYrHqMmAxKfEqcKnxrDEsWVhbsmOx7HDgMe8b8aXx7_Cg8KlxqFsdWXFnsW6dGxlwqVDybJhcsKlxZd1xK7EjmjGusiUw67HrcKrxKzErsSwxLJBbnnIoseIwrJFyKjHjsWKx5ExQsiuxZPFlcazxZnFm8WdyLLFogfItsWoyLnImsWvwpPJl8S2wqFByYHCpMmDxI7CrsqlZcKhQsqpyqsBwpTKrsKhQ8qyx7DEjsOkyYbHpHTIvMi-ZcKmx6PIm8mNyYPHssKVyaXJp2nGmsKAyb_EjhPHrca_yoXHgkTGi2HKisS6yKMBw5DFgMOZyo_FiMqRx5LKlceWypjHmcqax5zIs3IGyp_IuMi6x6XKrsmZxb_Jgsq6AcOjyr3Iu8KRy7HLhsewx7LDpMuKx77LjMWUwqrFusS2xIvFuMaSw40Dw6jJv8OMw6nIl8iZyJvIncifyKHLmsS9Ahwoyo_IqsKQLMukyLHHncS3CMutyqHLucu7yZrGgMqqy7XClcu4xa_JicuBy7LEqcaBy4fCkcSOwo7Mp8W_yZxvyZ7JoMmic8mkxpXJpsyBxprJqcmrya3CoMKlybDJssKjQWRkybnFq8m8CjrMjcOMx63Crk3EiHXJsnMvzZlkzZtlyovDjMK-Msybw4zCmR7Mn8qcxLcCy63Mrcq_y7rLgcKidHjHrQDMvsy1AcaTzYHLi82EwqfGqsaJybLKm82Kx6lOZXR3xaBrzZDGtHLCpjdlNTdjMsKoc3ViZ3LHmWjEgMSCxITEhsWnxJgdxJHOocmDxJjEjgzEnMWnc8Keyb8EyoJNYXRoL1LJoGRvbcqLF37Np8OIzarFkcivy6XHmMeaypvMocWjzKTLr82xzLjMssyqxJbDgM2wxbDFssmLybPNhmXHrcKmbnVtxorJuMy0Bce1xovDi0PCpcOlWg1xwqXCncyAxpjMgsKDwqlhxazOu860xbvDg8KjbcSVAM-5YXjPpcKrw4FtZ07DiADJv8i1zKjCq86zzrXNns2axrTNo8OVw4zCpsybeDzLpMqXz4bLqM2scsyjxabIt8ylzK7KtsqozKjPm8-dz5_PkGsFyrbKsdClz5zPnsS30KkGz5PNss-WwqE9z5rQr8-fzbkJz67JqMqnz6XCkCDChDjCgsK3w5zKsAnCok9QwqElyb_LrMyowq1PYmplY8icybJuZ861zaPDn8OMwojNp8K-z4LHldCZbMqZx5vQnMus0J_KoM-My4DPlsuD0ZXRl3TNt9CpB9C0z5XHqMKm0ZrRnGjHrc2IzLQGz6Ns0L3Nvc2DxZTJqsaizYfJv8yj0IrQjM62zrhuzrrOvMyWIcOMw6zPgNGkz4TRptGoz4jLqsef0azLrsqiz43MsMq5z5HRuMuB0onJrM-Z0K7Qp8S3zbkK0oPPpcKbw4XDsDd1wqPDrtC-z7DPss-0bc-2Y8-4z7puz7zSv8-_Q9CB0IPQhdCHyJMJzrLOtM62zZ_Nm2_QkcSOFNCV0JfPg8qWx5fRp8un0anPidOO0qHQocq_zK_QttCkxb_QptCwctCpCtCs0LnSrtOryYML0LTKttC40q3Tqs25DtK7zYTRgEPCkggrw7NBUsWMQtGK0YzRjsm_CsuS0ZTRltGYL9G80Z3MlsOM0Z_DttGi0prTm8umz4fLqcqdz4vSo9Gv0bpv0bLRmNG1yYMM0qjRsNSR0b7MqNKAy73CkQvSg9KFx73Pr8aawoHSqtKLyJMLyJfUjdGzL8SVxIl4yovEjmvDjNSWxYTIqc2k05nRpdOc0p3DgtCc1LrTotGu06XHqMKj1KJq1KXHsA3KrsKl1L9lzbbTt9CoyYMOz5PVk8S21LfSrMW_wrPEhHLElWcs1ZbRsyzJt86cec25xI4L1ZvVndWfxb_UrcaEzYDUs8e_y47Ikw3Tj9CN05LQkMyWxI7CpcWAwrTTmM2rz4nItdWR1J_Vpcqv06fEqdOp1aHHsA_TrtWg0LHJgxDTtMuB0LfTr9O4zLTOqtO7c8KD073CnMKywojDncKgwoHChcqwZNGL0Y3Rj8iTDsyQ0qMvTtOwzaPCocWAw7rRojLWj8uqza7Wksym0qXMqMWkyYPPksuEy7DXitOo0LrSr8y0ENaowoPCq3DEgmNlaMSxxaLCoSPNiWnJscuC1r3TuM-YwqMxxo_JvwzWhdKQzrnOu8qLeMWAwpTSmdeFxaID1J7Xic-WzLHMqdeN1KjHqNWn1qTQu8y0D9KyQ8KUcsO2wq_Dk8OafdeX0r3IoNK_yIvTgs-7z73Th9OJ0ITQhsKJyJMPzZfWh8aaL0_Jh8Ws1YICTte1zafCtCjXuMS31oTXiNeQ173VmMSWFNaowoHNs821yb_KnsyowqzUvNSP1brVggFhetGi1YrSm9WM057SnsWi1IvYsdOkyq7VldGV2LRrCNW50pLVntiE1p7HsAnVpNWbz5jHrdWqxK_VrdWv1KN01bJy1bTVtgHTrdKp1brRv8y-1b_NgtS0c9aCxIzXutGS2L_InNm5zaPDkkbMm8SOfMOMwoXQmNmJ1JvQnM6x2Y5zwprPjsuC1bDUpNeNyrYwx63CtNWr2aPXk3LZpNSO0bTakNaiMdqT2pXRmyzal9qZ0bPQqcOAyrbNpsyo2pTZotqh2qPajtqbx7Dap9aiM9qf2qzVrtqu2aXapsq2NNq11azardOw2qTaj9qxyrY12r3altuA2q_autaiNtuG2r_TqtuB2rDPkcq2N9uN2rfbiNq52pzQtjjbldqi25famtqmz5Pai9eR1pfar8y-wpQHCAzVmtai2pLQpdqgZ9uK0Lbantuu2rbbsceowqHaqdOo26_btsqm2rTbtNq-27Dbmdu32rzbv9Wt27zKr9uF3IXRm9yHwqHbjNyK3IHbg9ai25Tcj9yM25vclNeN1qjChNej16XCptm5zo3FoMKnIzVh3KPco8KoZseAU8eNENWnw5lgWwogICLGosW7ZSIs3LHcs8awYty43LoiY8m3xrRz3L7csiJkYcap3YXcs8ao3Lfcud2GZs6cxJbdiyLOm2HXnN2UaGXEjGndlGnGoW4iCl3Jv82u2bjZpdij2aXKi1DEjsKG2b8CLcOMwqrahNSa0JvPideu2onKtduj2o3bmNyRz5bNtG_bnNq425_Ks9msz5bCpN2Rzrvegtue2qXKs9W40qnZn9qq26_bnduP24nKs9Sn14_Kv9262LPQpdulzLQUyq7egM-a27vcgsS23ojEsG3eo9u13qXPl9KK1ajWl9qX2qbcmdybybLcndml3J9y3KHcpdykYdyn3Kncq9ytM3vcv8igIjrdjN2K3Y_cs96Jbd-G3LPctd2Y34oiz5jfjjIwCn3MvsOcABDClgUEAAXIuNqXwpYGBt-hAdaYxLfClgcDAN-nAMKWCN-uBwDfsQnfogffqd-kCggACd-j07DClgsK37_fu-CgggzfruCghd-xDd-uC9-2wpYO4KCAC-Cgh9OqwpYPDAAN4KCB4KCWEA7goJrgoJXPn8KWFAIAD-CgkMSOCt-1AgHaq9yA3pTPn9uQwpbVt-CgjwIC4KCu24feldml4KCzAduqAAID4KC4247goLHar8KmzpvFq8WawpDCpsWXbmZpZ8KAwqfGqXLFhMStw4s_w5nCmeChmuChmsKay48BOsetwqrMkcWsxLPVnnTVggM-Wtm_ASzXhNOa2bTQnNe62onQtcmY2ZPXjtil0qTenNu62rbVtt2w3JnCq2LGtMW8y4zcqsWGMteZ15vXndefxLfCr8aqxp9yIMafeHQg3ZpyybPOhcKkVOChptWnwqfSv9GnxaB5zI3Djc2XU8SpY2nGoi9MxZxnx4XMllDDjMKC3a_CisSOw7bYrnLToceh06Nz3pvHqM201bvbpN29xJbEjtapy4HCo2HNjtKmyYQBzLfLgcKn4KKvbsaaaXPPmt6W3b7YguCimMWb0bTMqMu04KOFAXXPk-Civ8mM2L3Vs8uY25Dgob4uyq7CqWLGosmg15woKcet3KfJu9GYacStzL7CkMquwqfEh27go7Hgo7PMqOCjteCjv8W64KO5y4fass-WwqpkaWbgoY5jzZvEp9mZz6DLvdmxzb5z2oPgoppQzLtswqzgophxdWngophOxK3XnMOC4KSK4KSM4KSO4KSQeQDCqeCknuCkoOCimFRvw4PCqc-YVMW_x5RvzrTgoZ5Hy5LgoqfRl-CiqsSyTcSV4KKwx4fMisKYxI7OsdWHypDDjMK0xY3KlOChsMygy6rZjeCivNGuyqTgo5Dgo4pk4KOb4KOW3JfKut2w1ZvgooJvxbzIl-Cjp3nbkNCpxYBRyq7CpMS6xLHgpaPZqOCjqOCjmOCjhQIuz5PgpZbPlsKsxK_JoHPdl-CkhW7gpZvFv8Ks4KWk4KOp1qYCT9G51abgo77XnOCkkuChvlDSg8OOAMOOWMOw2Z7ctWTLvNW-1qjCguCkp-CkjcW74KSqAsKw4KWY4KWC4KOTcuCksULgooPHscOC4KGeTcetwrLgpL7goqngoqvgpqbgpaFrY2hhxJXVggfJlAEiy6DHj8OS4KWO4KK53bjgpZTUn-ChtcS2wqZwybfgoo_go5fgo4TJhMSa4KW1yq7Cpt2a4KGPaOCjndeS07Dgo7rgo6zgo67EguCjv2Xgo7Lgo7Rm4KO24KW94KeY4KOQ4KaJ4Ked4KSBxb_gpIPgo7fgpIbgpJTWqOCkmNekybLCquCmscW84Ka04Ka2buCknWXgpJ_gpKFl4KSj4Kec4KSm4KSL4Kac4KSPbMSn4KSs4KSu4Ke64KSx4KSz4KS1xb_Co8ae4KGeSuCkveCiqOClgMid4Kan1YIEwqbDjMOI3a_CgMm94KK51ZDgp4PIu-ClttG64KeI4KKYyIrFv9eM4KWdMsqu4KW43ZLgpbvgp6rgpb7gp4vehOClnU_Vm-CnpeCkkuClpwJQ4KeP3bvgpoHgpa_gpaXensu9zJdRxYBS4KWq4Ka1c9Sr4KG83IDZsOCmlMSU4KaW4KOe2bDWqMKK3rRlwqLGt9-qcgLgppvgpKngqIJ5A8Kw4KanT25W4KaV4Keya8OD4Ke34Ke54KKY4KaixLfDguCigeCmp1Jld8m3ZArgpLTgppVUeOClvsOaARdbeyLfhToi3Z_JoNy4It-M34bgqobdkmvgqoXflDo5Nn0s4Km-4KqA4KqC3aDgqoXgqofgqoHdkcmg4KqLLN-T3q7fhuCqj-CqkeCqk2_gqojgp5LgpIvgqpfeqOCqiN2I34ngqp7Sq-CqoOCqkOCqkuCpv-CqpOCqgd-Q3Y7gqonOu-Cqqt2J4Kq24KqNMzLgqqLgqrLgqojdjeCqqOCquOCqgdy84KqM4KqfOjY04Kq_4KqU3ZbfkeCqt9-N4KqB4KqD3aHgqp3gqo3gq4rgq4zgqrPdh-CquuCrg-Crkd2A3YLEu-Crh-CqruCqjuCqkF3CqsmrxIzgp7zXnMOOAiFaw5TgqbXgqYxIxINow4DCq-Crp2RQ4KeJxK7DmUIweMaQZmM515xkMzNhNmI1OWQxYWYw3KMxY2I5NDYz4KyW4KuKODJh4KqP4KyUOGPgrI004KyDOeCsiuCsh82OMjNjYzDgrKLcpOChnkngqI_gpL_gprDgqJPWiQNSxYDCsuComeCom-ClkNqH17vKo-CnkOCoouCniteL3IfgqKrgpbrgpbzgo7jgqK7eneCnjOCkiNiC4Ki01p3Tsdqx4Ki54KG7xKngqLvVtOCmg9SuxYDgqKjLgcKk4KmF4KmH1pfbr-Cpit6Q4KaV4KaXyaPWqMKJ4KmS4KmUMeCplgHgqZngpp3gqZvgpp_gqZ_gqaHgqaPgpqfgqabgqIXgqangpYNy4Kms4KWgxbzgqa_gqbHFoeCptOCrt-Cpt-ClvsOZw7Lgqb3gq4DgqoHgqqbdneCqneCqmCLgrovgq6HJrd-GNDjgq5jgqqXdm-Cqp-CujeCqqeCuiuCumOCujOCqreCukjrgrpTgrpbgqrTElOCrj-CujuCukOCrleCriOCrl-CqseCqlN2Bct2D4Kuc4KqI4KuG4K6p4Kui35bgrqPdlc6c4K6m4K6b4KqJ4Kqb4K6R3Lfgq6PgrrfgrrPgq5Dgq4Hgqqzgqo04MH3gq6Xgq7fgq6llw44BT8OaA-CrsMSM4Kuy4KmG4Ku84Ku-4KyA4KyC4KyE4KyG4KyI4KyK4KyM4KyO4KyQ4KyS4KyU4Kya4KyZ4KyX4K6U4Kyd4KyfYuCsoeCso-CspeCsp-ClmOCsquCsrOCsrt2INd-a35zgoLxzw4zDjADDjMONyLjar-CgvHXIleCvu8yKw7_goLzCjsyO4LCDAeCwhcaGxKTgr7vDjwDgsIvKtOCwgsOMw67gsIrgoLzCleCwlOCvu8Op4LCQ4KC8wq7DjMO_4K-7w67gsJzJleCwgsuQ4LCjAcOk4LCm4LCUAuCwi92wxI46AMSOR8i426_goLPgpbPgr7zgsLEBRwLgrZfgpbDgoLvgrZvEjkngsLlK4KCo4KaF4LCy4LGD36ngr7_FgN2s4LC6AcSOSgLgqZbgsLbgqYEB4LGE4LCyAeCwveCoveCwv8Sa4LGP4LC5TeCvvtml4KGGxLB14KGJ4KGLxK3goY7goZDgoZLEt-ChlW7goZfgoZngoZvCmcKa",
},
{
  header: "Episode 5",
  color: "#2196f3",
  name: "Transactions",
  image: "thumbs/transactionsnew.png",
  desc: "We craft transactions and explore how gas prices incentivize miners to include us in the block!",
  video: "https://youtu.be/er-0ihqFQB0",
  save: "wofCrGxhc3Rfbm9kZV9pZMONAcKtxIHEg8SFbGlua8SLxI0CLsKlxIfEiXPDnAAdworCosSMxI7CiMKkdHlwZcKwU3RvcmFnZS9WYXJpYWJsZcKjcG9zwpLEjsK9w4zDkMKkc2l6ZcKCwqEww4zCjMKhMRrCpWbEgmdzwoDCpcSwxIlyAMKkbcSIZQDCpsSVcHV0c8KRwoPCpG5hbWXEpG7EqMSqxaLCpMSUxJbDgMKnb8WnxabFqMKRwoLFrMWuxL3Fu3TCpcW3a8Wpw40CA8KqcHJvxKtydGllc8KCwqd2xLfFrcWvwqXGjmljZcKmZ2xvYmFsw4PCicSkxI0BwozFs8Srwq9EaXNwxIJ5L0FkZHLGlXPEvsWAxYIDwoTEjsOgxYfFiWXFggFUUMWUxZbFmMWacsWcE8WfxaHFo8WlxafFqcWrxptlwqDGr8W1xofGigXGjcaPxpHGk8aVwoTCq8S7b2NrxpRTx4cywqvGtWHGoGhvbMWcwqDCpcaTdMS8wqfGuca7xr3CpcaZbHVlw5kqMHg2ZjRjMmJixIk2MzJmOWQwNTU0yJ0yYTJlyI5kZjFhMzQyZDjIoGJlxKPEpQHCjceexrHGs8ezxrdEx7fEgnLGvsS_xYHDjQPCrMaKwoDHhsWKwpLDjMK-N8eNxLLHj8WbZXIVx5TEiceWbsW9x5nGgcWvx53EqcSrxZ7HoAIGxbrFvMeYxarJmMecx57Cpm51bciucsaGxJXGiMOAx6PGkMmPx6Zzx6jHqsesx67HsMeyxILHtce3xZzCr2VudMmPIMqEeHQgaMmPZce7ace9ZcKnyLlsyLtzyIPGp8iGAMaqyLHCiceewq3Gssa0xrYvV2F0Y2jGv8i_AmzDjMaAxYjJhsOMw4g8yYvFl8WZyY5yCsmSxaLFpMmVyaPChMmlyZrFtMmdya_GigPGhsS6ZWzCoMmyx6XGlMWYyLDGrMKHx57Crk3EiHXEvHMvy5Vky5fEvci-x4nCuMWyyq_HiMWPxJvFlcmMyrbHkcmPAcq6AMmhdMmWyaTHm8adxLjGoMeeAMmuxJZzybHGjsmzxpLLjsKDwqfKgsS6xLxkwqJvbsqOypDCpVDLtcqNY8e3xLDCpjdlY8yWMsKoc3ViZ8SxcGjEgMSCxITEhsWhxJgPxJHMo8aHxJgRxJzFoXPCm8uQBcqeVcaTbMuZVG9GxqTKpcqpx4F6yrHJhcukwqoeyrTJjcuqcgfLrcq8y7HHmsaCy4HJnMW2ya8Ey6_NjMuAyafJqcmryY_LucaIwpIFBsuMybTLjsKAyptkBsqeyqDIt8qjyqXKp8y9yYBSRs2ByYfDscqzy6fKtceQxZwIzYrHl8W-yr_Hm82Px5_JrwXLh8iuy4rNoMu_xpXCgMuQA8qeQ8yIdMaPbC9UacWvcsy9w4zCtMOMw5zNgcWMxY7FkMWSzYXLqcWcxZ7FoMmTzZTKvsmlxbpuX8aTx6zHnsO_zZvFqQrOg8uJwqczMM64MG1zzobJtcKCwqjElcqEcsiEw411MMKlZXbKgnTEqMafa8KoYm94zJDGpHLCpCMyz5nLkM2JyZvErMSuxLDEssS0xLbEuMyEy57HgMONBFbJiM6cxY3Fj8WRxZPNtc2GxZwJzbrKvcW-zY3Fr8Wxy7fNkcSWyaDGhMuxxoDHm8KjxoTOscKRC869y47Gl8aZcsuzxp7GoMaixqTGpsaozaTKuc-dy5TLlsuYL0_JonTNrQRqxI42zbHOmCjOoc23yY_Kuc6lyrvNu8mXzb7Pu8aH0IfLvcuNxpXCgcmly7TGn8ivxqsLx57CqknPts6SZcqIzL1QxI5ozbHEjiwy0KbKt8us0KrJlM2V0K7PncuDxbjOp8-3zZbPncKmxITEuG5nzrHCkNCIx6fHqcakybllx6_Fisexx7PJvse4yY_KgcqDyoXKh8qJyovGvMyKxLzCpFTRgcaFyITIhsOZNWh0y7BzOi8vYXBpLsSxZMS3xrzGti7MkG0vdjIvbcS3a2XFqMqjRVRILURBSS_OrdKXcsuQAtC80L7FvdGA0YLLn1DNsMujx4nRidGLzYfSp9GOzYvJo8-4yabRks-8a8W5z7_SuNGXxbTRmc6PxJXRncaHxakM0aDJttGix6vHrdGlybvRqWXHttGrctGtz4LKhtG4yorKjNG0ZdG20bjKl8iFyIcx0b7SgNKC0oTShtKOb8SV0pVy0pfKptKF06nSkHYx0qLPjsmPL9KY0bJlyaovy5DLrM-dwq9O0ph3xLBrL1JlcciGxITNrQHCrsOMx53Lo86dzpjFkcumx47OosmPBM-1yZbCktK5wqVbdXJsXcmn0ZrThdK8DNK5wqfGvNSKxpXPjM-dw7_SvArRlcWpzb3GgsKm0r_Ur9OCxqVqzJXGhdOHwpEOzrRsAdOKwoLCo9ShbMOZ06PRv3DSgdKD0oXSh8yQ06vSltKYY9Ow0o_SkdO00qPTt9O5yozTvMKoxInPkXVuxqDJgMOoy5AOx57CrNKpxacvTsmqyazNrQIc0YXQo8K-0YrPscKBwqnPlMSC1Y5lZMOD0KdyzovSttCsy7LNjtCvya_SvtCc0K3WidGYzZjJrNCFD9OKwoPJvMe005LJv8mPwqEj05zCptWwzZnJrdG6ZcWNy5AN1atPYtS9Y3QvxJXEiXjVs8KKxI5A1bfNtNSX1oPMstaGz7bFgdK50IPWqtaKxJYO1J7Wr9GBzZfVscmP0rwP1LTUndC21qPHnsKz1KbRnCzUvNS-LNKLYXnQhRHXhG7WsNeH1qHOscu8x6TNoc6Iy5DUmtSA1qnWq9at0LLJtHnVs8Kez6vSsMmIzYTPsdSYcs2m1rvRkMaC1r9q14FrEdS01ojJmceex7rVgATTisKB06DIhsKp0I7EinVzZM6xwpnClgQEAAUAAMKWBdiZBtiawpYG2JkH2KAKAwABAcO_wpYL2KQK2KAMAtioxaPXkmfClg4BAA3YoA8O2LoByajXiHLClhHYu9iXxaPMncW71Y7CkMKmzJBuZmlnwoDGmMmPxYjMiMOLP8OZwpnZm9mbwprNpMSOwpTItM2oyqLIgMa8c8i9z6cFw5Io0YfHiseM17bWgxHUm9OA0ZHLgtK8xorQsdekzofTi8m4047RpmXRqMm91pnTlMe6x7zHvtmlyILWo8iIyIrIqce0ZjDIpTTIpWU5yJIxMTdkzJZlyIww2o0yNzY4NDgzNsyVNWXZnwHCk8eewrHPn8SxxLMvRmnEvCBEx6TNrQPCtsOMwpbQo8OCJNKzxZzStceV2ILSudS40JzUpdOE0ZzQhcaKCtiJwqTZkMS8wqJ7fcuQxI7Cm9WrzLTatcy3byBXZWnNrQY2xI7Dgs-sxY7Cqs-v24LJjwzZs9GWy7PNu9egyazZtwIU24bJpduIy7DFp9uzzZrVgMaKFtiJ1aHMlc6UxqdzEtuXAc2_wq3bm8y2zpLbnkd326Hbo0rGiibbqNSQ26vZsMq30LvXutm0xoLCpduy1pDZgtu1G9u4x5vbusW9273Jrdu_1bTcgsSJY9yFzLYS2qvCoc2nyLbKosqkyqbKqMufyYDCosmAFtCjyrLbrHLdgdyezbzTgc2QyZ4d1YPLi9et2bvOicarxI7Co8eexK3Er9qxz6LEt8S5xLvPpsi_BMKcxI4Y3JjOn8-w1rjKt9aFx5XSt9uwxoLPutK7xofWjNu7xb7Qgde80ITcrR7VhsaYxprcoNiO0JDGpcanw4PcicKiyp5NyqVoy5rLl8aTxrXXr9y9BcK-0KHNsXjWt8uo1oPWp92H1r3JpcKhQdyr27Ue0rnCoULem8meH9ynxoLCoT3cq9uNAiDWld6Zw4tAYBFOOcKwwpTCot6f2ZjCqdmc2Z3Cok9QwqEq3InCpNmi3LjXmS_Kk8qV26PCmt2h1bfJitybzYcQ26_WjtiE3a7LhN6q3qTfk9OC1pHbvsmvy7vTism30aPZvtOQ2oLTk8qAz4vRr9OZ07rTnMqSyLrEt8qW1qPerhnCtUnDtcOnVDfcicKd1avVrdat1qDVst6MRsaKOtW31bndps2H1JreltiD0rrZtt2v35fgoIrEq9mB16HcrRvWldaX0arFnNac1p7fvc2a1qPCpjEwLs64MdyJwprfutC_4KCazpbfv9um4KCD3YTWut2p1ofSuc2_0ZPSveCgjc2_4KCQ1pLTh8WC27bGih_goJTTkd-k1pvWndqGxqHgoKfYi9Od4KCfyJraq8Kn3LfKod-F3LrNrNy9CMOKxI7DvtGHClHeks22yrfdouCgiNS235jdit-V1p3Egs6E3Y7Zusm13ZHIscKOyLTboGIzL0LfoMqnYcSVzpfCqsSOwobcmMOSxZF-3YTXueCgrta84KCJwqxb2b3gobHEldSk0ZjYtdK83bDJlsKW0rnCquCig2jgobLFsuCih9uL04bfnMKRxorXnMmlwqnQkmHVpWUoKceewqhm1aTWrGnMiM6x4KC5B8aK14POqcSH4KKe4KKg4KKi4KKk1aXGk-CiqNOHw4DSucKt2b3goKfgorHPneCio-CipeCitcyJ4KK34KK5zo_gop1zx7Tgo4Hgor3FtOCiv-CitOCip-CjguCilsaKJduHc8qCZOCjisSr4KOM4KKm4KK24KOQAiTduGHGutmmc8KgwqjLvXbEjMmPw5k906TVjtOm0pXElW7SmC7EleCipMSx4KOzb9KR4KGtZTU5YzQ2yI7IlciWNMyUMjnIlGY12o8wyJQ4yK7IljjcicKQ3ZXgoavgoa1UxLFu4KOH4KOabs2tB07EjnzcmMOwxZHDjMK63YQU35HCmdK54KKB4KKP4KKR4KKG04LgoojJnuCimceb4KKBxp7GmcqE0pd54KSv4KCP4KSx35Ut0rnCpFvEr-Cku8ah4KS9xJbGii7UqlvWo-ClhMKt35pyLOClhmvcgNuHW9KKdGHgpYTTg9GbZ-CiidSeW2fEg-CljeClj-ClkeCilOClnsmlwqrgpaDEg8yN0LjgpaPZguClpeClnNu1HOCliuCir8ag4KWu1qHgpbDUp92v4KWAxYhn4KKSxbTUscmeCNS0wpPSucKr4KOF4KSZ4KOI4KOOyafXldas3qki4KOT2ZHgo7Fk24rgpZzgoqnGiiPcluCmkeClvtaAzq_eqSfTisKI4KGFw4tDyI1XwoXDmMKgy7jgpbVlw4DCpOCll2HCosiKwqPgpaFzw41Zw5jCqOCmteClrMagw4_YmgACVBsmQOCjpcaP4KOnxZzgo6rgo6zVj9KU4KKR4KOxdOCjs9mP1KFh4KO34KO507jgo7zgo77gpIBj4KSCyI3gpIXgpIcz4KSJ4KSL4KSN4KSPZjjHo2ngpLdlS2V5w5lCyIramDfInWM5yJcxNsiRMDcy2qkx2pzgpI022pow2qM0YcicNzMxZmE5N8S6ZOCnu2HanGJmYuCkgGE0NWM3OOCkgMiowqLEr9qLyIvIjciPyJHIk8iVyJfImcibyJ3an8iiY8ikyKbIqMiqyKzIkNqq3ZLVheChi82p4KGO3LzPpwpaxop20YcDMeChmM-yyY8a35HCkeChneCgjs6A4KWHAtCl4KGiy4ngoaTLvuChptyJwqjLk9yNy5lG4KOA4KOOza0Iw57GiuCpl9SSz63DpsWRQt2EGd-R4KaF3Yll4KOZ4KOB27Uk4KWA1ZfKlM6v27Un4Kab4KaT4KaV4KW635Um14zUnteP0ZLgppfgqY_GiirgoLDgpp7gorfVhsmlxYfgo5XCqcS3Z8mqz4tzwpDcicKp4KmYzLXgqZrgqZzMiM2tCQbJgFzcmOCppTHgqaffjsWcG-CpquCqhuCivuCis-Ckm9u14KOS4KqK4KmzbOCptcmeKeClgOCikHPRhuCik-ClscmeKuCpvteOypjTneCqgdytK-CqqOCmgNei4KqJx5vgpofgpJjgpJrgo4Hgqo1y4KqPxa_Kg-CqktyJwpXfg-ChjMi436zIvOCknVg834zdhBLgqYngq4PgoZ_gqY4M4KC03qjgqojdj8m135_Tjcm60afgoJXag9-l0a5y05jKiNOa0bPgoYLfq8qU363goYUA3InCq86Mzo7OkM6SzpTJj-CpnnDJgOChqeCpo86e3JrHjtW71b3SheCjlNaB1oPNidGO2ILgqYvOqs6sz47gqofgo5wp1YPCps63zrjOu9WGz4Dgq7DPhAvCuM-Iz4rKg8-Nx6zPkM-Sz5TEsM-Xz5ky2qvCrdqu2rDPodqz2rVl2rfaucufw4zDsMmD2r_bgeCqpMmPzbngrJPUud-SxqHUueCputuM3K0s25DbksWw25XcicKR4KCl0qpCxafEr-CknNy9B9W1AuCposeHyYfDiOCghN6TyrfPtOCgiOCroGXgpoHWi-CqvNm1xKvOsNytCOCtqMKnz5HHt2Xgop3gq4Xgq6fMgOChhcKoY8SUx6wgxpzgoYLCpuCtl9G_4KKozJDVpHQKwovgqLfCksuTy5vLncuZ4K6PxLzQnsOEWtCjwrJq3YTVqt6W143Hm-Cim8an4KKdxqDgo5fgqY3gpZMC4KKtx5vCqG3go7HFoG7Gn9e_247UtMKU1Krgo6DIgdmny7feqQvgpobgpLbKpeCsuuCkueCut9yt4KS_zqlk4KuXc-Cuv-CjnNSpzqngopzgop7gr4bLutGf4K25xpXMgcyD3ZzgrJDgq7ZBzJbFu8qDwqXgrK5ywqZm4KSJN8iPzJnMm8yd0oXMoMyoxIXEncSKxIwm4K-nX8yqxIxezK3EnsSgENO-yLRDcsSqxK_LmuCuq8yIxp_MvQzEjsOG26jDikM64K-e4Kmm3YTgoIfgob7JluCpq8eb4KWp4K6qZeCurMaf4KWa4KWSXOCliteFeOClmuClj-Clp-CuqMSz4KOxxLHKhOCqseCtq-Cth-CuncaCx7LEuOCnqSDgrr7gqrjThdCFAdK54K6p4K-94K6tY-Cti-Cilcu616PgqZTLjtiK4LCZyprGq86L1IDZo9-F2ojZp9WzHsSOwrzZrceL3YTgrJLgsIzcn-ChnuCupALfntOM0aTZv9qB1pjgoL9y2oXKj9qH4KOh2ongqr7gqKLajWPaj9qR2pPalWTal9qZ2pvandqf2qHao9ql2qdj2qnNpM25z53CquCxgsa3UVLgsYbGij7ZrcKQxI7CkN2E4K2m4LGO3Yjgra3grqQH1YPgqKLajznIrDM4MeCyjzYxzJY2yJzWgGPgqJbEuuCogTPHtMiqN9qPYeCojuCyljnYicKmcXLZv92hy5DQu-Cxgd-E4KuW4Ku44KuY3L0Ew67EjuCrntezyYngrprgq5_gqazgoLIJ4Kuk3KPgoJHfnOCwudCz2bzfoOCrq9qA4Kut4LGZ05bfp-Crs9-p4Ku234fgq7nWo-CwvsSM1arQluCuksaV0JrQnNCeJ8aKw4XQo8K00KXgrYPKuOCyu-Cyh-Cgsg3bkMebwqfgrrTgo6LSpuCvt-CvuXDgr7vgp6t5IFDgobLgoKjHgMOMw6jgsYjgsIRDU8KZwprgsIngs6LgoK3Jk92q3pfHm8KtW-Cuu8qE4LCr4Kes4LCV4KWmxofgsLDJpeCmusqCyY_grrzgsKPRlOCth-CwjuCwp-C0iuCuveCnrOCwttCF4K6nxoLGjcyb4K2-4LSMeeC0n-Cjg86p4LOrxr3gtKjfnMKUAgQH4LOn4K-Pc8KB4Ken4Kep4LOy4Keu4KewN-CnssiO4Ke1OeCnt-CnueCnu-CnveCnv-CykuCoguCohOCohuCkhOCoieCoi-CojeCoj-CokeCok-ColeCol-ComeCom-ConTTIqM2k1qfgs5bQmOCzmNCb3bHQniTGiuC0p9ez4LOg4KG84LOk1o_goIvJrw7gs6jgtJvgsKngrrzgtKbMseCrvsqD4KyAzpPOlc6X4Ky_AU3do-CsismM4KyM36zVv-CskMq3zqTbheCth-Cpis6pzIjgrJfOrtSw0IXLhuCpkWzgrJ3OueCsoOC0tM6_z4HJj-CspOCsps-Jz4vgrKrPj8-Rz5PMkc-Wz5jPmsar0JXFtMKt3oR03oZN3ohp3orQnuCilwHCnN6Q4KmF17fbruCunN6e3prgs4DbtMaH4K2x3pjeoOC2uNeJxocQ4KCN3qbgq6XfnMKSCd234LS0woPerd6v3rHes9613p8A3rzevirNpNmy4LWay5zQmeC1ncW90J44yYA04LOf4LOh4KCFxZwP4LWm4LGQ4KCy4LeI4KGl4LC74K-C4K-EzaTgq57gt5fgrpDgs5ngtZ7gsrNMyYDCmOC3oN2E3pXgsoXgrYjgoLHSvOCgvOC0tNC14LOp4K-KxqDLkM2m0JbgqZnas8aPbduf3JPcvQLDpMSOzYngrIjcmc6g1brVvOC1vuCsj8OC1oPcneC3uuCgidyhz7beoc6B4KCN3KnbvOC2vtys4LeFEOC3vuC3qdC03IPcsdKV3LPNpNuuz53gtqXgtZvLmd-7zL3goIACYuChuMWRJt2E0Y3gtoPWjeCgieCwsuCwkuCvvuCwtd2v0IVc4LWrxa_guYPgsJNjy5DPtM-d3ZbPoNqyz6Pdm-Cuk9y9A8OM4LO74LiS3aTdhNuE4LSE4KCvyaXdreC1qOC0mOC5gd2zxa_Qg8Wn0IUI3bjQi9CNzI7dvdCS3oDGq9eoxbTCruC4h-Cpm-CjjeCqmty9AcK4xI7ZsuC4kuCqoeCqo-C3ouCthOCqp-CprOCpruCmi8aHXuCpssan4Kqw1LDSvAPgrrPgsZ7grrbgsK3RnNK8zZPgsKXgqb_gqr7gr4zGiMKRBeCtqOCtr-CzguCrhsaC4K2z4K6g4KKe4KuM4KuO4KqRwpDNpN-Q4Liy4LOX4Li1z7bMvSjOmuC4uzHguL3gs6LdqM6m4LaE0rngrp_EguCisOCioeC5h9WAXuC5imXgur3grqHgop_grJvTh8KfwpbYqeCngNi04KKUwpYC4LuS2KfYmwPYmQTYqtiV4LuSBALgpZvThdic2JfYn-CgtsmPwpYH4LuSCNigCAkA2K_gu6PZgwnYrwvYoA3gu5LYvtibDtiy2LvYmxDYnwrZgOClj8KWHtivEdigH9ifEtigXAzYs-C7ntGcwpZeEADYl-C6iMyIxqLGj3XZi9mNzIjZkNmS2ZTIvOCjjtmY2ZreusKa4K6LyLHCiuCujuC4tMua4LWb1bPgpJ8C4LK34K2gw4zgrpjdhOC3pOC2teC0kuCwkeC5jeCurwIs4Lq84LiC4LuI4Ly5B-CuseC6kuCuteCvheCrgOC3hceh4KWI4K664LWt4LSL4LCsy4LRntSq4K-D4LKx4L2E4L2N3K0G1KrgvL3gupzGiQId1pXMgsWt4K-T1oLgr5Xgr5fgrojgr5rgtp7gr53gr5_gr6HMmsyczJ7gr6bMouCvqMylxIwT4K-t4K-vZEDgr7LGlcSgEeCvttSA4K-44K-64KO4TeCws-Cvv8uf4LCBAeCwg-CsiOCwheCwh2bgtIHguoRy4LCL4Lmg1rzgtJrFr-CwkOC-gGPgtI7gqrnJr0DgsJjXntGB4LCb3KTgpbvgtJLgsJ_gtJXgsKLguo_goIzgupnJpeCwqOCnqOC1ruC9jOCkvOCilOCwr-CwseC8t-C5heC0reCwuNiJ4Lie1rDgs5Nk4LGAxbTIteCrlca44LqT2ajKquCxhwHgsYnSsMSO4LGL4LOi4LGN4L6O17vgt6bSvOCxkuC0tOCrqeCxld-i4LGY1prgsZrfquCxhN-u4LGgyIngqKPIjsiQyJLanOCoqMiYyJrInMieyKDgqK7gqLDIp8ipyKvIreCotsSM4LG1xbTgsbfgsq8v4LG64LG8AuCxvuC_gwHgsoDgv7bgsoPgqYngqYvgt7zGh-CyieC2jeCoomHgqIzIpjXgr6Bk4KSG4KiI4LGyMjQxYuCjvuCvoMiNODDSijjhgIbgqJdiNGI34LKl4Le_4LKn4LKpx4fgsqvQuuCrlM2p4LOQ4LKyz6fgsrTgsrbgq5zgs6LgvLTguJzgrajgsr3gsr_fmdmC4K244Liq4LOF4Kuq04_gq6zgoL7gv5Lgs4vgq7HRsOCrtMqN4LOP4K-E4Ku6zaTgs5Xgubbguq_gt7Hgt5vgsrPgs5wC4LOe4LWj4Leh4K2kzYfQqeGArOCyvNK84LSz4YCz4LiA4Lqk4LSr2afgs63gvbvgs6_gs7Hgp6zgs7Tgs7bOl-CzuuC_geCzvOCzvuC0gOCqouCgrN-R4LCmxa_gtIjgtJzgtKbgvpXgqbvEluC0keCwnuC0lOCwoeCqv-CmgOCiieCmhOC9ieC-qOC9i-C0nuC6leCwt-C6neC0oeC-kcWmxLvGn-C0puC-scmw4L2C4KOi4YKHc-C0r-C0seGBlOCwutC04LS34K684LS54KeveOC1jDPamciO4Ke04KiSZDngso3MlOCjv-CjvTLIj8ii4KSO4YCaMjjgp5s02p40ZDbImmbgrbbIpTnhgqM24Ke14YKt2pLgp7414KSANs2kz5zgtqTgsbjNqty72rrDnsOMw5_Qo8O94Lay1oPgtrTguJzgv7vXvwbdjdOKzaPGq-C1meGBhOC8qeC3msWn4LWf4LWh4Le34LOi4KG94L-I4LGP4KmM4KCy4LWq4Le_4L6m4YGt4KS54LWw4Liyzo3gtbLHt-CsgeC1teCsveC1t-C1ueC5nOC1u8WX4LW94Ku44LW_1oLgtoHLreCslOC2hs6r0qPgrJnLusKR4LaMy4jgto7grJ7Ous684LaS4Kyiz4LgtpbgrKfgtpnSo-CsrOC2nc-V4Kyw4LahxIzgubXEq-C5t-Cql9qz4KqZ4K2az6fgub3gub_gqqDgvorhgY7NuOC6huCyh-C8lMWyxoc-4LqM4Km04L6jya_gupHgtKrgvr3gsLbgupfgrazcoOCqgOC9k-CiluC6n-CprOC6oeC-suC2kuCvieC6psag4Lqo4KqQ4KuQ4Lqrxqvguq3gtqThgYXguLbLn-C6s86b4LiS4KG54Lq24Li-4YO64Lq74KKa4Ly94KKx4LuB4KKWPuC7hOC7huC6v8uQ4LajxKvgtqXehd6HbN6JbN6L4YCm4Lau4Law0rDekeC3uOGBqeC2tuC4oMSW4La7x5ven-GFrGvgt4HhhZDhha_ep-C4peCiqeC3h96sQd6u3rDest603rZC4LeR3r3ev-C3leC8qOC3mOC1nOCzmuCys-C3nQPgt5_hgYzdhN-Q4K2n4YGSxofgt6jhgpDgtLXgt6vgvZHgt63hhobgt7Dhg5jQneC3s-C3teGDnOC-i-Cum-GBkeCzpeC3veC7hOC6peC6vuC4g8ar4LiF4Lm24Lm44LiJ4LiL26LguI3guI8B4LiRx4fUk8Kg4YOz4LS14LiW4YO24LiY4Lia4Lelyo3couGAsNah0rwF4Lii4K2K4YW304fCkwbguKjcr9yE4Liu3IfguLDeg-C8qeGFh8eA4Li44Li64YWL4Li84Lme4YWP4LmB4L6u4L6T4KKJ0IVA4LuE4LmM4LmF4LmP3ZXgrLbguZTdms-l2rrgoZLgub3gtbrguJTgvovgurnQq-Chv9K54Lmj4Kuh4KCz4LaE4LmnxoPguarVgOC5rOC2kt250Izdu-C5sMaj3b7GqM6x4K-04LuM2LnYsuC8jdi24LuSxovYoOC7luC8kuC7meC7nOC0sOC7ndi14LugAOC7ouC8gAbYn9ik2Jvgu6YC4Luo2Jvgu6rgu6zFo-C8gOC7sADgu7LYm-C7tOCuptig4Lu42LrYoOC7vOC7rOC7v9mC4LyB4LyD4LyF4LyH2KA-4LyR4LyT4Kqq4KOBwpZA4LyL2LnhiIrgvJbZiuCqkuC8mtmP2ZHZk8-K4Lyf2ZfZmd664LO_2qvCrOCoudy5zavgqLzIvwoU3YDRhwLCuOC8sd2EHOC_uuGGkt-VK-GDkeC0tOGDk8ixwqbhiZLgoY3hiZTgqZ7CmNSQ4KmCRsOMw6bdhBfhiaDhhqTJniLhiaThgLPFmdOHxKAfwpbLhcSmAMSOwonYoOC9hwHCiuGKgsat4YqFyZ_EjsKKAsSOwo3hiovgoqsBwo4B4YqN2Lnhib_hiJ_EjsKR4YqJwpAI2KvbjsSOwpPhionCkuGKmNm4xI7CkuGKicKU4YqL4L6DwpLhio8BwpXhiosOxI7hipXhiqjhiosR4Yq04Yqd4LuP4KWc4YqZ4YmYAcKa4YqJwpvhiKThiLPcgNuY4YqdA-CljuClr-GIlcaKG8SOwp3hiongpqrgu67hipnVtdyK4YqdBuGLieCluOGLi-C9muGKjQPEjsKh4YqL4L-AwqPhionCouGLg9ah4YqZH8SO4YuAxI7CouGIsuGLpsaKIOGLq-GKicKk4YqLIuCygeGKicKm4YqL4KaZ4L-24YqWAcKn4YqL4LWg4YqUBcSOwqgA4YSl4YqZJeGKtATEjsKp4YyF4Yi84KOO4YqZJuCygeGLvMKo4YiU4LuQxorgs5zgv7bhiq_CqOC7mcaKKOGMg-GKicKq4YqLKcSOwqvhionCqeGMnAIq4Yyf4YyL4YyV4Yq8xoor4YyL4YqJwqzhiossxI7CreGKieGKiNibxoot4Yqo4Yu8wpDZgOGLmi7hio3hip3hjK3TheGJg-C8mOGJhdmO4Lyc4YmJ2ZXgvKDhiY3gvKM",
}]





allCards = lessons.map(lesson => {
  return (
    <Card className={classes.card}>
      <CardActionArea onClick={()=>{  window.open(lesson.video) }}>
        <div style={{padding:3,fontSize:18,backgroundColor:lesson.color,color:"#FFFFFF",fontFamily: "'Rubik Mono One', sans-serif"}}>
          {lesson.header}
        </div>
        <CardMedia
          className={classes.media}
          image={lesson.image}
          title={lesson.name}
          />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {lesson.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {lesson.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{justifyContent:"center"}}>

        <Button size="small" variant="contained" onClick={()=>{
            codec.decompress(lesson.save).then(json => {
              global.graph.configure( json )
              global.graph.stop()
              global.graph.start()
              setShowVideoLibrary(false)
            })
          }}>
          Load
        </Button>

        <Button size="small" style={{marginLeft:20}} variant="contained" onClick={()=>{
            window.open(lesson.video)
          }}>
          Watch
        </Button>

      </CardActions>
    </Card>
  )
})


/* FOR TOP MENU FOR TABLETS:
<div style={{zIndex:1,position:"fixed",right:0,top:0,width:"100%"}}>
  <div style={{borderRadius:"0px 0px 8px 8px",paddingLeft:6,margin:"auto",textAlign:"left",color:"#222222",height:barHeight,right:0,top:0,width:475,backgroundColor:"#DFDFDF"}}>
    <div style={{cursor:"pointer",letterSpacing:-5,fontSize:32, fontFamily: "'Rubik Mono One', sans-serif"}}>

      <span style={{margin:5,borderLeft:"1px solid #888888",height:barHeight}} onClick={async ()=>{
          alert("click")
        }}>
        <Tooltip title="Learn More" style={{marginLeft:10,cursor:"pointer"}}>
          <Icon>
            swap_vert
          </Icon>
        </Tooltip>
      </span>

    </div>
  </div>
</div>
*/

/*
<div style={{zIndex:1,position:"fixed",width:"100%",left:0,top:0}}>
  <Grid container className={classes.root} spacing={2}>
    {customNodes}
  </Grid>
</div>

 */


let [width, height] = useWindowSize();


let spacing = 0

const mouseEnter = (name,e)=>{
  if(e.pageY>60){
    setMenu("")
  }else{
    setMenu(name)
  }
}

const mouseLeave = (e)=>{
  setMenu("")
}


//console.log("MENU:",menu)
let customNodes = []
for(let n in global.customNodes){
  //console.log("GRID",global.customNodes[n])
  if(global.customNodes[n].name!="Special" && global.customNodes[n].name!="Modules"){
    if(global.customNodes[n].name==menu){

      let items = []
      let itemspace = 40
      for(let i in global.customNodeItems[global.customNodes[n].name]){
        let item = global.customNodeItems[global.customNodes[n].name][i]
        //console.log("Add item",item)
        let style = {whiteSpace:"nowrap",letterSpacing:-1,fontSize:14,position:"absolute",top:50+itemspace*i,margin:4,borderRadius:"8px 8px 8px 8px",padding:6,textAlign:"center",color:"#FFFFFF",backgroundColor:"#"+global.customNodes[n].color}
        if(n < 6 ){
          style.left = 0
        }else{
          style.right = 0
        }

        items.push([
          <Dragger key={"dragger"+n+"_"+i} name={item.title}  drop={(name,x,y)=>{
              //console.log("DO A DROP AT ",name,x,y)
              setMenu("")
              var node_watch = global.LiteGraphJS.LiteGraph.createNode(menu+"/"+item.title);
              node_watch.pos = [x-40+global.graph.canvas.visible_area[0],y+global.graph.canvas.visible_area[1]];
              //console.log("looking in",,liteGraph,liteGraph._is_subgraph)
              global.graph.canvas.graph.add(node_watch);
            }}>
            <div onMouseUp={()=>{
                if(menu){
                  setMenu("")
                  var node_watch = global.LiteGraphJS.LiteGraph.createNode(menu+"/"+item.title);
                  node_watch.pos = [width/2-40+global.graph.canvas.visible_area[0],height/2+global.graph.canvas.visible_area[1]];
                  //console.log("looking in",,liteGraph,liteGraph._is_subgraph)
                  global.graph.canvas.graph.add(node_watch);
                }

            }} style={style}>
              {item.title}
            </div>
          </Dragger>
        ])
      }

      customNodes.push(
        <Grid key={"girdder"+n} onMouseLeave={mouseLeave}  item xs={1} style={{zIndex:3,cursor:"pointer",fontSize:18, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={()=>{setMenu(global.customNodes[n].name)}}>
          <div style={{height:itemspace*items.length+80,position:"relative",borderRadius:"0px 0px 8px 8px",padding:6,textAlign:"center",letterSpacing:-5,color:"#888888",backgroundColor:"#222222",opacity:0.9}}>

              {global.customNodes[n].name}


              {items}

          </div>
        </Grid>
      )
    }else{
      customNodes.push(
        <Grid key={"grd"+n} onMouseLeave={mouseLeave}  onMouseEnter={mouseEnter.bind(this,global.customNodes[n].name)} item xs={1} style={{cursor:"pointer",letterSpacing:-5,fontSize:18, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={(e)=>{

            if(e.pageY>60){
              setMenu("")
            }else{
              setMenu(global.customNodes[n].name)
            }
          }}>
          <div style={{borderRadius:"0px 0px 8px 8px",padding:6,textAlign:"center",color:"#222222",height:20,backgroundColor:"#"+global.customNodes[n].color,opacity:0.6}}>

              {global.customNodes[n].name}

          </div>
        </Grid>
      )
    }

  }

}



let clickawayscreen = ""
if(menu){
  clickawayscreen = (
    <div ref={drop}  style={{position:"absolute",left:0,top:0,zIndex:1,width:"100%",height:"100%"}} onClick={()=>{setMenu("");if(global.graph&&global.graph.canvas.search_box)  global.graph.canvas.search_box.close()}}></div>
  )
}

let tools = ""

if(global.graph&&global.graph.canvas){
  //console.log("TOOLSm",selectToolActive)
  tools = (
    <div>

      <div style={{margin:5}} onClick={async (e)=>{
          if(global.graph.canvas.search_box){
            global.graph.canvas.search_box.close()
            setMenu("")
          }else{
            global.graph.canvas.last_mouse_position[0] = e.clientX-209
            global.graph.canvas.last_mouse_position[1] = e.clientY
            global.graph.canvas.showSearchBox()
            setMenu("search")
          }
          global.graph.canvas.last_mouse_position[0] = width/2
          global.graph.canvas.last_mouse_position[1] = height/2
        }}>
        <Tooltip title="Add Item" style={{marginLeft:4,cursor:"pointer"}}>
          <Icon>
            add_circle_outline
          </Icon>
        </Tooltip>
      </div>



            <div style={{margin:5}} onClick={async ()=>{
                if(global.graph.canvas.search_box) global.graph.canvas.search_box.close()
                global.graph.canvas.closeSubgraph()
                global.graph.canvas.ds.reset()
                global.graph.canvas.setDirty(true);
                global.graph.canvas.graph.change();
              }}>
              <Tooltip title="Reorient" style={{marginLeft:4,cursor:"pointer"}}>
                <Icon>
                  aspect_ratio
                </Icon>
              </Tooltip>
            </div>


      <div style={{margin:5,color:selectToolActive?"#03A9F4":"#dddddd"}} onClick={async ()=>{
          //console.log(JSON.stringify(global.graph.canvas.graph))
          global.graph.canvas.selectToolActive = !global.graph.canvas.selectToolActive
          setSelectToolActive(global.graph.canvas.selectToolActive)
        }}>
        <Tooltip title="Select" style={{marginLeft:4,cursor:"pointer"}}>
          <Icon>
            photo_size_select_small
          </Icon>
        </Tooltip>
      </div>

      <div style={{margin:5}} onClick={async ()=>{
          //console.log(JSON.stringify(global.graph.canvas.graph))
          global.graph.canvas.selectNodes()
        }}>
        <Tooltip title="Select All" style={{marginLeft:4,cursor:"pointer"}}>
          <Icon>
            select_all
          </Icon>
        </Tooltip>
      </div>




      <div style={{margin:5}} onClick={async ()=>{
          //console.log(JSON.stringify(global.graph.canvas.graph))
          global.graph.canvas.deleteSelectedNodes()
        }}>
        <Tooltip title="Delete Selected" style={{marginLeft:4,cursor:"pointer"}}>
          <Icon>
            delete
          </Icon>
        </Tooltip>
      </div>





    </div>

  )
}

return (
  <div className="App" style={{color:"#FFFFFF"}}>

    <div style={{zIndex:1,position:"fixed",right:0,top:"50%",width:40}}>
      <div style={{borderRadius:"8px 0px 0px 8px",textAlign:"left",color:"#dddddd",height:220,right:0,top:0,width:475,backgroundColor:"#333333"}}>
        <div style={{cursor:"pointer",letterSpacing:-5,fontSize:32, fontFamily: "'Rubik Mono One', sans-serif"}}>

          {tools}
        </div>
      </div>
    </div>


      <div style={{zIndex:2,marginRight:8,position:"fixed",width:width-16,left:8,top:0}} ref={drop2} >
        <Grid container spacing={3}>
          {customNodes}
        </Grid>
      </div>

      {clickawayscreen}


    <AboutDialog/>
    <SaveDialog liteGraph={liteGraph}/>
    <div style={{zIndex:1,position:"fixed",height:barHeight,left:0,bottom:0,width:"100%"}}>
      <div style={{borderRadius:"8px 8px 0px 0px",paddingLeft:6,margin:"auto",textAlign:"left",color:"#222222",height:barHeight,left:0,bottom:0,width:475,backgroundColor:"#DFDFDF"}}>
        <div style={{cursor:"pointer",letterSpacing:-5,fontSize:32, fontFamily: "'Rubik Mono One', sans-serif"}}>

          <span style={{margin:5,borderRight:"1px solid #888888",height:barHeight}} onClick={()=>{
              liteGraphCanvas.switchLiveMode(true);
              setLive(!live)
              liteGraphCanvas.draw();
            }}>
            <Tooltip title={live?"Edit":"View"} style={{marginRight:10,cursor:"pointer"}}>
              <Icon>
                {live?"build":"visibility"}
              </Icon>
            </Tooltip>
          </span>
          <span style={{margin:5,borderRight:"1px solid #888888",height:barHeight}} onClick={()=>{
              //console.log(liteGraph.status,playing)//liteGraph.status==2
              if(playing){
                liteGraph.start()
                setPlaying(false)
              }else{
                liteGraph.stop()
                setPlaying(true)
              }
            }}>
            <Tooltip title={playing?"Playing":"Fast Forwarding"} style={{marginRight:10,cursor:"pointer"}}>
              <Icon>
                {playing ? "play_circle_outline":"fast_forward"}
              </Icon>
            </Tooltip>
          </span>

          <span onClick={()=>{setShowVideoLibrary(true);localStorage.setItem("eth.build.showLibrary",true);}}
            onTouchStart={()=>{setShowVideoLibrary(true);localStorage.setItem("eth.build.showLibrary",true);}}
          >
            <span style={{color:"#03a9f4"}}>eth</span>
            <span style={{position:'relative',left:-5,bottom:15,color:"#f44336",marginBottom:25}}>.</span>
            <span style={{position:'relative',left:-10,color:"#333"}}>build</span>
          </span>

          <span style={{margin:5,borderLeft:"1px solid #888888",height:barHeight}} onClick={()=>{
              setOpenSaveDialog(true)
            }}>
            <Tooltip title="Save" style={{marginLeft:10,cursor:"pointer"}}>
              <Icon>
                save
              </Icon>
            </Tooltip>
          </span>
          <span style={{margin:5,borderLeft:"1px solid #888888",height:barHeight}} onClick={async ()=>{
              document.getElementById("loadjsonfile").click()
            }}>
            <Tooltip title="Load" style={{marginLeft:10,cursor:"pointer"}}>
              <Icon>
                open_in_browser
              </Icon>
            </Tooltip>
          </span>
          <span style={{margin:5,borderLeft:"1px solid #888888",height:barHeight}} onClick={async ()=>{
              setOpenAboutDialog(true)
            }}>
            <Tooltip title="About" style={{marginLeft:10,cursor:"pointer"}}>
              <Icon>
                info
              </Icon>
            </Tooltip>
          </span>
          <span style={{margin:5,borderLeft:"1px solid #888888",height:barHeight}} onClick={async ()=>{
              setShowVideoLibrary(true);localStorage.setItem("eth.build.showLibrary",true)
            }}>
            <Tooltip title="Learn More" style={{marginLeft:10,cursor:"pointer"}}>
              <Icon>
                swap_vert
              </Icon>
            </Tooltip>
          </span>

        </div>
      </div>
    </div>





    <div style={{position:'absolute',bottom:-100000,left:-100000}}>
      <span style={{border:'1px solid #777777',color:live?"#00ff00":"#0000ff",padding:5,cursor:"pointer"}}>
        <input id="loadjsonfile" type="file" name="file" onChange={(e)=>{
            console.log("FILE",e.target.files[0])
            var reader = new FileReader();
            reader.onload = (event) => {
              let compressedString = event.target.result
              //console.log("compressedString",compressedString)
              let loc = compressedString.indexOf("<string>")
              if(loc>0){
                loc += 8
                let endloc = compressedString.indexOf("</string>",loc)
                //console.log("loc",loc,"endloc",endloc)
                compressedString = compressedString.substr(loc,endloc-loc)
                compressedString = compressedString.substr(compressedString.lastIndexOf("/")+1)
              }
              console.log("decompress:",compressedString)
              codec.decompress(compressedString).then(json => {
                console.log("configure graph with:",json)
                if(json){
                  localStorage.setItem("litegraph",JSON.stringify(json));
                  liteGraph.configure( json );
                }
              })
            }
            try{
              reader.readAsText(e.target.files[0])
            }catch(e){console.log(e)}
          }}>
        </input>
      </span>
    </div>

    <div id="mainCanvas" style={{position:"relative",overflow:'hidden',background:"#222",width:'100%',height:"100%"}}>
      <canvas id='main' width={Math.max(100,width)} height={Math.max(100,height)} tabIndex={10} style={{background:"#111111",outline: 'none',borderBottom:'1px solid #666666'}}></canvas>
      <div id="reactElements"></div>
    </div>

    <canvas id="chart"  style={{outline: 'none', position:'absolute',left:-10000,top:-10000,zIndex:-1,width:320,height:240}}></canvas>

    <div id="clipboarddiv" style={{position:'absolute',left:-10000,top:-10000,zIndex:-1}}></div>


    <Drawer
      variant="persistent"
      anchor="bottom"
      open={showVideoLibrary}
      >
      <div style={{height:height*0.6,backgroundColor:"#eeeeee"}}>
        <div style={{margin:"auto",textAlign:"center",color:"#222222",height:barHeight+3,left:0,bottom:0,width:"100%",backgroundColor:"#DFDFDF"}}>
          <div style={{cursor:"pointer",letterSpacing:-5,borderBottom:"1px solid #999999",borderLeft:"1px solid #999999",borderRight:"1px solid #999999",fontSize:32, fontFamily: "'Rubik Mono One', sans-serif"}}
            onTouchStart={
              async ()=>{
                setShowVideoLibrary(false)
                localStorage.setItem("eth.build.showLibrary",false)
              }
            }
            onClick={async ()=>{
              setShowVideoLibrary(false)
              localStorage.setItem("eth.build.showLibrary",false)
            }}>
            <span style={{color:"#03a9f4"}}>eth</span>
            <span style={{position:'relative',left:-5,bottom:15,color:"#f44336",marginBottom:25}}>.</span>
            <span style={{position:'relative',left:-10,color:"#333"}}>build</span>
            <span style={{margin:5,borderLeft:"1px solid #BBBBBB",height:barHeight}}>
              <Tooltip title="Collapse" style={{marginLeft:10,cursor:"pointer"}}>
                <Icon>
                  swap_vert
                </Icon>
              </Tooltip>
            </span>
          </div>
          <div>
            <StackGrid columnWidth={350}>
              {allCards}
            </StackGrid>
          </div>
        </div>
      </div>
    </Drawer>


    <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        key={'bottomcentersnackbar'}
        open={snackbar!=""}
        onClose={()=>{setSnackbar("")}}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id" style={{fontFamily: "monospace",color:"#EE4444",fontSize:22}}>{snackbar}</span>}
      />
  </div>
);
}

//,borderRadius:"16px 16px 0px 0px"


function useWindowSize() {
  let [size, setSize] = React.useState([0, 0]);
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([(window.clientWidth||window.scrollWidth||window.innerWidth),(window.clientHeight||window.scrollHeight||window.innerHeight)-8]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}


export default App;
