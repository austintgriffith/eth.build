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

import QrReader from "react-qr-reader";

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


console.log("LOAD MODULES")
let dynamicallyloadedis = require('./Modules')
console.log("dynamicallyloadedis",dynamicallyloadedis);
global.modules = {
  "price": {"nodes":[{"type":"Modules/Module","pos":[280,310],"size":{"0":140,"1":46},"flags":{},"order":0,"mode":0,"outputs":[{"name":"price","type":0,"links":null}],"properties":{"enabled":"on","title":"Price","color":"7eccc2"},"subgraph":{"last_node_id":16,"last_link_id":21,"nodes":[{"id":3,"type":"Control/Timer","pos":[180,220],"size":{"0":140,"1":26},"flags":{},"order":0,"mode":0,"outputs":[{"name":"on_tick","type":-1,"links":[10],"label":"30000ms"}],"properties":{"interval":30000,"event":"tick"},"boxcolor":"#222"},{"id":7,"type":"Storage/Variable","pos":[1110,190],"size":{"0":140,"1":26},"flags":{},"order":8,"mode":0,"inputs":[{"name":"in","type":0,"link":19}],"outputs":[{"name":"out","links":[11]}],"properties":{"varname":"price","global":true}},{"id":10,"type":"Modules/Output","pos":[1130,310],"size":[180,40],"flags":{},"order":10,"mode":0,"inputs":[{"name":"","type":0,"link":11}],"properties":{"name":"price"}},{"id":11,"type":"Input/Text","pos":[80,360],"size":[300,50],"flags":{},"order":1,"mode":0,"inputs":[{"name":"","type":0,"link":null}],"outputs":[{"name":"","type":"string","links":[]}],"properties":{"blockieSize":50,"placeholder":"enter text here","title":"Text","value":"https://api.radarrelay.com/v2/markets/WETH-DAI/ticker"}},{"id":2,"type":"Input/Text","pos":[80,70],"size":[300,50],"flags":{},"order":2,"mode":0,"inputs":[{"name":"","type":0,"link":null}],"outputs":[{"name":"","type":"string","links":[12]}],"properties":{"blockieSize":50,"placeholder":"enter text here","title":"Text","value":"https://api.coinmarketcap.com/v1/ticker/ethereum/"}},{"id":1,"type":"Network/Request","pos":[430,160],"size":{"0":180,"1":46},"flags":{},"order":4,"mode":0,"inputs":[{"name":"[url]","type":"string","link":12},{"name":"request","type":-1,"link":10}],"outputs":[{"name":"output","type":"object","links":[14],"label":1}],"properties":{"url":"https://api.coinmarketcap.com/v1/ticker/ethereum/","debounce":1000}},{"id":14,"type":"Input/Number","pos":[540,360],"size":[190,50],"flags":{"collapsed":true},"order":3,"mode":0,"inputs":[{"name":"","type":0,"link":null}],"outputs":[{"name":"","type":"number","links":[15]}],"properties":{"placeholder":"#","title":"Number","value":"0"}},{"id":13,"type":"Object/index","pos":[650,320],"size":[190,60],"flags":{},"order":5,"mode":0,"inputs":[{"name":"obj","type":0,"link":14},{"name":"index","type":"number","link":15}],"outputs":[{"name":"value","type":"string,object,array","links":[17]},{"name":"index","type":"number","links":null}],"properties":{}},{"id":4,"type":"Object/property","pos":[670,190],"size":[190,30],"flags":{},"order":6,"mode":0,"inputs":[{"name":"obj","type":0,"link":17}],"outputs":[{"name":"","type":"","links":[18]}],"properties":{"value":"price_usd"}},{"id":6,"type":"Display/Watch","pos":[850,70],"size":[200,60],"flags":{},"order":9,"mode":0,"inputs":[{"name":"","type":0,"link":21,"label":""}],"properties":{}},{"id":16,"type":"Utils/To Float","pos":[900,220],"size":[170,30],"flags":{},"order":7,"mode":0,"inputs":[{"name":"","type":0,"link":18}],"outputs":[{"name":"","type":"number","links":[19,21]}],"properties":{}}],"links":[[10,3,0,1,1,-1],[11,7,0,10,0,0],[12,2,0,1,0,"string"],[14,1,0,13,0,0],[15,14,0,13,1,"number"],[17,13,0,4,0,0],[18,4,0,16,0,0],[19,16,0,7,0,0],[21,16,0,6,0,0]],"groups":[],"config":{},"version":0.4}}],"links":[]}
}

const touchHandler = (event)=>{



  //console.log("global.showLibrary",global.showLibrary)

    var touches = event.changedTouches,
        first = touches[0],
        type = "";
    switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type = "mousemove"; if(global.showLibrary==true){}else{event.preventDefault()};break;
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
  console.log("APP")

  /*
  window.addEventListener("wheel", event => {
    console.info(event.deltaY)
    event.preventDefault();
  });*/


  const [menu, setMenu] = React.useState("");

  const [selectToolActive, setSelectToolActive] = React.useState(false);




//  var defaultPrevent=function(e){e.preventDefault();}
//document.addEventListener("touchstart", defaultPrevent);
//document.addEventListener("touchmove" , defaultPrevent);
//
//
//
  const [moreInfo, setMoreInfo] = React.useState(false);

  const [drawing, setDrawing] = React.useState(false);
  const [drawingColor, setDrawingColor] = React.useState("#03A9F4");

  const classes = useStyles();

  const [snackbar, setSnackbar] = React.useState("");
  global.setSnackbar = setSnackbar

  const [readQr, setReadQr] = React.useState(false);

  const [live, setLive] = React.useState();
  const [liteGraph, setLiteGraph] = React.useState();
  const [liteGraphCanvas, setLiteGraphCanvas] = React.useState();
  const [playing, setPlaying] = React.useState(true);

  const [openSaveDialog, setOpenSaveDialog] = React.useState(false);

  let showLibrary = localStorage.getItem("eth.build.showLibrary");
  if(showLibrary=="true") showLibrary=true
  else if(showLibrary=="false") showLibrary=false
  //console.log("showLibrary",showLibrary)
  const [showVideoLibrary, setShowVideoLibrary] = React.useState(showLibrary);
  global.showLibrary=showLibrary


  const dynamicWidth = window.innerWidth/3
  /*
   document.ontouchstart = touchHandler
   document.ontouchmove = touchHandler
   document.ontouchend = touchHandler
   document.ontouchcancel = touchHandler
   */

    document.addEventListener("touchstart", touchHandler, {passive: false});
    document.addEventListener("touchmove", touchHandler, {passive: false});
    document.addEventListener("touchend", touchHandler, {passive: false});
    document.addEventListener("touchcancel", touchHandler, {passive: false});

    //console.log("ADDING KEY DOWN!!!",document.onkeydown)
    document.onkeydown = (keydown)=>{

      //console.log("EVENT")
      if(keydown.key=="Escape"){
        setMenu("")
        setDrawing("")
        global.graph.canvas.drawing = false
        global.graph.canvas.selectToolActive = false
        setSelectToolActive(global.graph.canvas.selectToolActive)
      }else{
        //console.log(keydown)
      }

    }


  function SaveDialog(props) {
    const { liteGraph } = props;


    const [compressed, setCompressed] = React.useState();

    React.useEffect(()=>{
      if(liteGraph) codec.compress(liteGraph.serialize()).then((data)=>{
        setCompressed(data)
      })
    },[liteGraph])

    let link = window.location.protocol+"//"+window.location.host+"/"+compressed


    let qrcode = ""
    if(link && link.length<2580){
      qrcode = (
        <div>
          <QRCode size={dynamicWidth} value={link} style={{ border: '1px solid #dddddd',padding:5,margin:5}}/>
        </div>
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

      setShowVideoLibrary(false);global.showLibrary=false;
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
      let defaultData = "wofCrGxhc3Rfbm9kZV9pZMONAcKZxIHEg8SFbGlua8SLxI0CH8KlxIfEiXPClsKKwqLEjMSOwobCpHR5cGXCrElucHV0L0LEr3RvbsKjcG9zwpI6YMKkc2l6ZcKSw4zDiDLCpWbEgmdzwoDCpW9yxIlyAMKkbcSIZQDCpsSVxK50c8KRwoPCpG5hbWXCoMSmxKhlw7_CpMSUxJbDgMKnb8SvxZrEusWexaDFosWkxKfEqcO_wqXFqmvFnMONAhDFssWhxaPFpcSpwqdib29sZWFuxbnElcW7w4DCqnByb8SpcnRpZXPCg8KldmFsdWXCqGdlbmVyYXRlwqXGl3TGicKmxLJ0xLTGjGPFrm50S8ShxKMBXcaDZcKvQ3LEqMS0L0tleSBQYWlyxLfEucKSZMOMw5zEvsWAZcKCwqEww4pDU8KZwprCoTFCxYfFicWLxY3Fj8amAsWTxZXFl8WZxK_FscWfxoHCrVvGkmnGncapIGvHhsa8xbZlwqbEhHLElWfFqcaOxI7DpsaAxaLGosakxqbGqGXGvcWoxbrFrMWudMWwwpPIhWXCq8eyx7Rlx7bHhsa9x7x0x75uZ8aNxJZzwpDIlMaRdWLElGPImnnInMe9x7_IosW7yKXHrsWiwqdhZGRyxplzyK7InsiwxbrEusW9AsW9FsaRxpPGlcaXxpnCgcmGx7PIiseFecOZQjB4MzdjY2I3MGM4ZMmdZDc3NWHJpGI1M2RhyZs2OWZiyZxkMDJhYzA1NmFmOGPJrmLJujAxMTI4M2PEiTdmNjJkYsKJxKLEjQHCkca9wq9EaXNwxIJ5L0HIuMi6c3PHjcmBAWjDjMOSx5PFgcKSxI5UUMehYcWKxYzFjsWQBceoxInHqsStx6zFnci0xoLHusWSxbrJhMmGxpTGpsmJc8KEwqvIqW9ja8aYU8eUMsiWxIJjZWjGiMWQwqDGq2nGrWXCp8qcyLnIu8acxp7GoMOZKsmTN2LJsjFmNMmzYTI0MzFjYWVkM8m_NWZmN2XLuWU4MDDJpDljy6UzxrnKkFzKk8eAx4JvL03GpcWUbmljyqHKqQE2ZMqnx5XHl8eZOsu4x57HoMWIyq7Ho8qxxqYByrTFlsWYyrfFm8iTyrrCqlttzI_EtcySx7nFpsidyJ_IgMiOyJTCp1vElcSJeMy0xKnCpm51bWLGpsiBxavIlMiHxqXGp8apyIzNiGvFvRDFrcWvx6zCksiUyJbHvsiYyKzIvcy3yLHFvAHIhMq6wqjMsGXMkMySzZ3Iv8aOxbwCE8uAyYjGmHPCgcKlzL1leADKjsa6wojGvcKtypXKl8qZL1fGqGNozJQyw5DCnMyZyqkDVTzKrcqvx6TFkAPMp8q2xbDCkcKEyrrFtcWmyr3Igs2txblhzYZswqDNr8uCzbHCgM25ypB9xr3Cqs2-yphhyppRUsyUw4zCqsSOwprOisSOwpDOuc6PzKPHpXIEzpTMqc6WzpjFs8q7zpvNkMmCzp_Oocuiy6TLpjLLqMuqyaTLrcuvy7HLs8u1y77Lt8u8y7zLvsyAYcyCzITOpMaWzbHCgcKmcXLLjMWBxI4YzZ_ClcKWyIPEjlwAxI5dxZfIr8igz64CyYPGu8-6fQAAz7gQxKTPsgFcAsO_z7gTz7ABxI7CiM--z7gWz7PPusKRz77CpmfGk3VwyKTCpsa0bmZpZ8KAwqd2xqbEv8S1w4s_w5nCmdCq0KrCmg"
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


const barHeight = 45

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
},{
  header: "Look Ahead",
  color: "#565656",
  name: "Meta Transactions",
  image: "thumbs/metatx.png",
  desc: "A look at how signed messages can be recovered in a smart contract for better UX and onboarding into Ethereum.",
  video: "https://youtu.be/CbbcISQvy1E",
  save: "wofCrGxhc3Rfbm9kZV9pZMOMwo_EgcSDxIVsaW5rxItkw40BL8KlxIfEiXPDnABAworCosSML8KkdHlwZcKsSW5wdXQvQsSwdG9uwqNwb3PCksONChPDjQldwqRzaXplwpLDjMOIMsKlZsSCZ3PCgMKlb3LEiXIAwqRtxIhlAMKmxJTEr3RzwpHCg8KkbmFtZcKgxKfEqWXDv8KkxJPElcOAwqdvxLDFn8S7xaPFpcWnxanEqMSqw7_CpcWva8WhNsW3xabFqMWqxKrCp2Jvb2xlYW7FvsSUxoDDgMKqcHJvxKpydGllc8KDwqV2YWx1ZcKoY8STY2sgxafCpcaadMaMwqbEs3TEtcaPY8WzbnQDxKPEjDPGhmXCq0NyxKnEtS9IxINoxLjEusS8Ch3EvX_Fg8WFxYd4HsWMxY7FkMWSxZRlchLFmMWaxZzFnsSwxaHGg8arx590xr3CrcSEcsSUZyxudW1ix5nFrsaRO8WyxbTHoMWixaTGhMKkaMeGxr3Cpseox6rGkMSVxaE6xpTGlsaYxprGnMKAxrpkNMa9wqrErcWfL1RleHTHiMS7w40IwqHEvcKJx4_FhsS8ASzFi8WNYcWPxZHFk8WVAcecxInHnsSux7fHosaFxbvFm8eyxbDHtXTFtce4xbjIssWrx790x6luZ8iCxoDCkTvIhsaXx5nIiXPChMKrYmxvxqjGm1PHkDLCq3DEgmNlaMaLxZXCr2XGt8eZIHTIlXQgaMeZZcasacauZcKkyJTIlsafxqHGo8KjxoliwonEpGQ1xr3Cr0Rpc8mXYXkvQWRkcsacc8iYxLwMw7fEvcKdyJ_Fh8SZVFDHlMimx5bIqceZJ8isxZvFncivxaDIusaExbrFq8WXxb88yYfIiMabyYvJjcmPyZFlyZPFhsmVyoDJmcmbbMWVwqDJqsmswqfKhMqGyojJscaiZcOZKjB4MWQ5NmYyZjbHsGYxMjAyZTTJmTFmy4tkYWQwYzJjYjDLkTg2y4UzZciMMcm7x4DHgm8vS2V5IFBhaXLKisONCyvEvcKTypDCgsKhMMOKQ1PCmcKawqExQsqVyKfHl8WVHcqbyK7FtcKSyLHCrVvGlWnGoMmjIGvLsMWCyLPIvsmAZ8i1azrIscKoZ8mfx5lhyaPGvcWtxb_FscWzyLjHoMKTyLHJlsepzJdlzJnLsMe-yIDJgcmDxaE9yLHGlHXJjmljzLh5zLrIv8iBxb9zw4DIscKny5rKvHNzzYjMn8y9wpHKpsaVyYjGmcqpwoHIhsyWzKlly695w5lCy4MzOMuTN2E3YjcxOWTJmTYzNjYyYcaNZjQzNDQwMzLLiDU1MWI4zatlZc2vOMmZZTM1y581ybkxN8uJZDLLh2EyyIw6xr3CrsurcMeDUmXGtXbHmcu3D8KLxYDJusWExYbLvsyAQyEzM8yGLsyJypfHmHLLqcWZyK3KncyQyLHCqVvFp82SyKZlzJzIvcy7zKDFv0HMs1vFhGfFpXR1yofPh8SqzJ7HqsyhQsi3yLnNjs2QyofNks2UzYrGkcWhQ8qnyYnKqcKCwqfPg3PPhc2ky4M0za43zoA4NWE4ZM-yNDFlNWU5N8uKYzY30IDLo82nNGY4y5HQiWXNus23z71jNWbNv2JiZs6aNcuUy6DLlsuawqnPj8-Rz5PLgMKEy4M5zpjQhMumz7UzYs24OGbPv2QxNTgyN8uG0LNiz70zYzDOjM25zb_LnNCV0Lpmz7gxYdCXy5vNqDFjy6PRiDc4MTPNkDc2Y2Ewy47OitCrM9GOzobRhjUyNGXLoM6BZNGR0Y7RhjDLh9GFzazLnzQyOMew0LTQlzPQrsudOc6FybfEjDvHpsm9yb_EgsqCV8ypY8eHxLnImRB7xYArypDEvAIRPM63yKjOuTbMjs6-x7fChMe5xbnGvcqkxpFDxb5hx7BswqDPps2byIrRuWQ90bzJvsqA0oDSgtKEx4nDjRXDqcONB8O10ovDjRLNl9KQzIvHmTfSlMekxaHSl8i7yqLEqtKbxJVI0p7SoNKizZnKqMiKyIxGxr3CsFPEtXLPhS9WYcep0p_GjMu3Fcu6CcKjy73Lv8SZMsyGK9K6yphyAtK-yp7HodKYZcSkbtKazKHMrse2yp_CgtOuwqPMr82WUNKjyYrPqcagcsi7wrDGtca305RjyaXPnsqIwqZnyY_Qq2zDg8iMR8a9xKzKnsSyxLTEttOcwo_EvXXSi8WJyKTHldKRxZUD06vPnNOu04PFrNOzz5vHoMyR1KbMq82WUcix1KfGiMaKxozGjsy9xpPTi8-nxpzGnsagyr_GpcanxqnGq8atxq_GscazwqXGtXXGtwjSpkjSqdG-yoEv0oF00oPLtxh9xYA_0rYcUdKPyKXMitOozp3OvMqc0r_CkdOByqHTssW_UtOIZdKh073KqciLybhE05DTksWT05XTl9OZyY5l05zChciaw6_ToTDDjMORzIYf06fOuQTUpMiw067TsNWoxpHTtMyw07bTuNO6zYvCkk1U1a7GnNO_05jIu8KqyY7JkGvSg8u0btSL1I3GodSQybhM1JPIkcSw1JbGstSY0oXEvBhzxYDDn9SdxYrWhcWV0bvVosyP1onTgsyrzKHDjMOB1KrFoNSs1r3Is8W9zYvCkVfUsca91LPGi8aNxo_Ni9S4yIfUusadyr7Go9S_zYTVgcmp1YNlxrDUl8a0xrZ0CtKmTdWO0qvVkdKty7ca1bwJwq3StgMx1Z3UoNK7ctKo1rrSlcqf1abSmciz04VrWNWr1a3UudKkxZDIjE7WqdSVTseux7DLttav0rDCo8S9B9Sdwr7Un8qW1KHHmQXWiMqf14vXvNSpzK_UpdeFyL3Hrcevx5nNllnWl8adyZbJmMmayZzHmcKhI8q4xq_YidijcteW153LkMuhy6HIjFHHptOSzJ8vTMmfZ3TSrsiZFcOVyJpj1J3CjBrWt8eZOdiZ063Iu8-XyYHPodmUxb9b14LTgNOuwqbGjMmB2YPHvtii2IvUt9iAxJnCitin1bDEjE_Yh8iS2LLYi8u3FwHEvWHYktiU1Z_OuQbZkMqg17vKo9id07XZkdWnzJ3Zodik14hc2KfCg9ipYcqz2Kxy2K7YsNed2a3YpNS9xqPMhsiMUsemVcaabHPIk28gR3dladWVBcid1b_DjMKgzIbZjNWezrjFlRTZucixwqXHpNmg2IrHscW_XNmZ2brXndiexLDas9izzZZd2KfCgcKoxIljaW3GoXMSyIxKybtX0aIzxLLKrNafx7zElNmvW8iawovapsOSzIZ-2Y1yE9qv067CrFvWncao1qDElM-V153PicyhVNmZwpbNgNul25PWodmVyYLXkc-A1I7GjsmZKCnGvcKoZtWJ1IdpxLbUt82OxIdu27rbvMiz277cgMaa3IPbttOuwq3bsdqQctu7273bv9yH3I3XkM-jzY3ckMi_xo7PrNyBxLbcldyK3JfcodyayIPCkV7Isce_yZ9k3KPFq9yL3JjcgtynyYRV2KfPqdSJzZLCoMKozZl2xIzHmcK1aMaycDovL8qsxqHJm8SEOs-0NDXIjEvOntqYadqaL0bcjNyzy7cZT8WAwrfapsOmzIbMiNqr2JZyPNmQzLLUrdyk3ZjEtsyhVcixwqTRlWxs1r7Fv9eK2ZvQn2Vk27TMoVbZmdeExoTYtdKazL3Cklhf2JvFq9eH3Jvct9OuxYPcrcKp05hnx67Jn8WgwpDIjFXHpkPEtsi_xovIk9uGzqfYjRoDxL3Eps6tZc6vw4zCjNqp257Ykda62rjXumXFsm5fxprGqNSu14hh2IDCpjPYuG1z3LfCqMSUyaNy1L3LuMK4wqVlzqbGt8Sn15nCqMaJeMa1yY9ywqQjMt-VyIxU2avWq9WF1q7SrxnDh8eN1rXZtdqsx5kV26HYoMW8zKFh3b7eh8W8zZZg36zesMaJ147UtteR2obYtdeYxqjGqtebyavVhNef1YfXocONV8OCyIxT3ZLamdqb3Zfcst-cyJka2I8K2Y_epd6n3aDMh9uePt2n37DcsdymzKHcqt6M3bHds9eGzKHfr96Mx7xzaN27xb9f36vTrt6B17zNlmLfsN6JyIPXks2a077TrsKr3J5u3KDcmd6Pct6RxafGt3Pelcm4Q9Wz05PVttOYadOa1brYjRVxxYBJ2qbDpMyGGNueCN-mxoTWi9iczK3auNO3yLvTucSwzZZM3LfCp9SAyLvMtM2fzJjMmnnWo2_UjtamxIwtx6bbjmLbkN6Z1IXaiciX2I0LIcWADdKLzIFLzrNW254R2ZDClMix26Pbsdunbtup2ZPPitaNz53Khc-fzZPMndurzK3IscKj0p9px77goa1qzqTHpeCil-Cgq8SJYnXMoOCgoMW_Nt2-3q_Cq8ymdMmTz5DHmdyvxKrUg96a1IZ04KCJ4KCazK3NlsOMw67er8Ko3bjclNyJxavCrNSE3J7Uh0PGod2z4KK614jDjMOv3LfajsKo4KG24KOGdNy8xpbcvsWVw5k93YLIuHPdhS_bh8SUbmV0LsSU27_TlOCjpcutdtuQz7w5YzQ2y5TOgMuKz7BlzpjNs2bQksuhzbPRsOCjttCJyIxe3pjgorXenFTentiM0q8Kw5HImsKf2qbeqTHaqtez06gJzI7ertOu3rHes9eZ3rbPo8KRw4zCvt653rvLod693r_fgceZ34QL34bfiN6T34vGqN-Nb9-PxovFk9-T35XOm8m44KCWyLPCsOChs9uQVNOU4KC54KG43ZnYjRc9zqvapsOwzIbDjMK625442ZDCmeCiiNuk25Lgoovgoo3gopbGkU3gpY3Mlcy24KGq4KWRzYnZlsaRTN2vW8S14KWZzJ_MoVDNjlvaks-Gx6bagnIs4KWSxbDcq1vLmXRh4KWhz5jFv07NgFtnxINM24bJq9upwq3gpargpazgpZrgoo_ElVngpbjgpbpzUMepyZngpb_gpoHgpa1rXeClpdyG4KaM4KWp2rTgpavgpo_cnMi7x4_PkN20xpFR2ZndqOChpuCguOCgutyz4KKcYuCintSHzL3CkNyr3bjduuCileCmg96DUlbgpqxp4KKw4Kau3ojgorvDgdinwojYtQDEnMS2yZnDgMKk4KWxYcOaAcKKy4NmzazLktC7yI3Psc-zz7XPt8-5z7vPvc-_0IHQg9CF4KO80IjQisuKzajQjmHQkOCjutCq0JbQmNCaMNCcy5vYuOCnquCnq-CnrOCnreCnruCnr-CnsOCnr82-4Kex4Ke04Ke14Ke24Ke0z7rQs9G3z7s40bDOlOCjr9CP0LBmZdGwy4jOpOCnnuCnm8-_0LPOiTjgo7DQljRhzbQ2zqTQgDDdjsuWyI3RqeCnu86SyI3NrcuZZNCTy6bLic--zbTgqIM4Oc20M86XOdCK0aIwzpdly4zgqKw10KrRgzA30ZfQuNC80K3QsuCokdCuy5vOheCnt-CpguCpg-CntsKj4KaIw44AAw1AzKXEg-Cmis2EZcOOO8Kaw4oA4KOVb-Cjl92A4KOb3YTdht2IbN2KdN2M0Jk1zZ7Mts2iz6540IFjN8mZ4Kig0aLgqKjLpM2ty4nLkdG3y6I3zbDNvuCnveCojTXNrNGQ0LrLh-Cok-Cop9G10a80zbDRldC7MDU2YcKixLXLgcuDNWLQkdC7zo3RsM6Q0KXRlOCqitCEzajOhtGfzpll4KenOd25Y8uXN9Km2Y_Is8Kt0b3Xp9WS1ZTYjQ7Cud6j0rYGSdey2JXXtDDZud6v1KfXvUDYgNOK15PYg9moZFzfmcSx35vEt-ChutSaCHffodueFuChl9m736jFv-CkneCgqt-nxazgorvCpN-w143Utdy0zYzftuClp9-415rajtee1q3XoNWJdMONRt2PybjSvcizyJDUlcmv4KG54KSICdaz0rbIot-i3aQK4KuRyLzThNm91o_Zv-Crktuq4Kaw4KOMw5rYp8mM27HJksmU2ojaisq1x5nJnsmgcsmiyaTJpsmo2o7Jrsmk2LXCq8mn3bLanXfFk8q1yIzgprfEqsa_x4HOocutx4XgoKXLtwtnxYDDi9KLx5Lbnhfgq7zascqex6bPices4KaW1r_Dmtq43a_goKTgoKbgpq_NleCjjMOb2afSpuCliuCqqeCqq9G_16jVk9mExLzgqrDFgNeu3qXEvNeww4pCwpLCqsKw257Epte31aTgqrvWjMSVP-Cqv9mnyIzgqrngqqngpLndlt2r4KuJ0q8QP-Cki9qmw4jdodueMuCgl92pxavgorTgobfUh-CiuNyZ1r_DrtqwX-Csv-Cgp8aRw4zDoM2AX9CfzKnQoeCugcSVw4zDoeCrltqAyqPMvcKTSE5b4KCw1Lfei8i7wqngoq3goq_go6Jy4KC84KC-3pPgoYHSplbXpuCtiuCqreCtjcONG8OjxL3goJDHkOCtk3DMgcKoKsKs257VmeCtnNOs1aXgrbXgq77Fv2LgraLYgsmK4KuDW8a9wqngrafgo4jdssu3DMKJ25jgra_OtdueHtmQ3b_grILgo4TgorXgobjgr4bgo4rgroLDr92v4KCe4Kad4K6LwqTgro7grILgpr7go4zDpOCult-14K6_z6jdt-CmteCuneCun96S4KGAwpDSpsmtyLPJvNKq4K2KyrvgopPLtw4tyJrLqeCtksqSypTdo9e0KOCrvOCqvNa_w6TgrIfKq9ae4KyKyrDgrIzYq-CsjnLKt9ecyrrgopLKveClp-Cqj8uERMuHRsuKNkJlRsuPy5FFNEPOikbLi0TLmsucMkPNpcuiy6TRpcunybjSk8iz4Kyly6wv4K6c4K-IwrHgq7bgoJHLv8yBOsuXzIbgooPgr7_TqCbgoobgpZXMtc2g4KWY4K6Ka8y_067CqsyU4KOW3L9y4KW04KWb4KWu067Pgc-rz4XgsZPgpoRrw4zDm92v0J_gr5xr1o7FteCih-Cklty54KKUz4jgrITgpJvDjMOlzY7gsZjMptu04K6RP0HgroPPgOCuh8-SyofgsbHNi8KTQELgrozgprTgprbgpJrgoLLYp8KFz6rKiM-tzaV4z7DOlOCnkM-2z7jNvOCnlM--0IBm0ILQhNGv4Kea0InQi-CoiNCPzqTgp6LQldCXMtCZy5_gp6fRh-Cppc2g4Kmn4LKJzafNqc2rza3Nr82x4Kix4KiSzbfNuc27zb3Nv86B4KO5zoTRnTfOic6Lzo3Oj86RzpPOlTLgqKvgqosy4KmX4KmZcsK64Kmb4KOd3YZhdcSEx6rHqcuXyatoLsa1bdCe4K-p4K6IyofDgMKo4LOOxLXgrpzDg9KmZsm74K2J1ZDgr7XKiOCvt-CvuQjCs-Crt8qT254u4LCC4K2f4LGcw6XgsIbgrInKruCsi8qy4LCMyrbajuCwkc2Rc9i14LCVy4tl0IQ50Iw50p_Rk2bgsq020Jngo7HgqIM24KqYMMuTzbzgqK_gsqHNv8KIybjfkuCtiOCvs9WQ4KSFyazKilDDjMKW0ovDi0DChX7CquC0qgAABNueC8yO2KfCh9u-3prKr2Us4LCHyq3gtLbKsdiqyrTgs7zXnMKl4LSfxozYtcKxxafgpbIg4KS73J_gpL7Ett6-Zt6aRsWm3ZR5wrwnUs2CacapTcS22p1P4KOiJywgz6zgoLktc8eZaWbfv9-RwqcjyoXgta1kwovJuOCgn8Wrwq7gtZpkdcaM2pvgtbXgtbfgoYvSrwHDqsSZ4KSB4K2S4KKA4KKC254Z4Ku84KKJ4KWP25Tgoozgs7PDjMOw4KagzLPgpZbNoM2G3oLcj8i7zY_gsJLPoOCgreCjjMOxzY7buNyH4K-w4K6Q4KOMw7LahsKnyZ_goYpkw4Pgq6TSgd2y4KOj4LWpxZPCpuCqkeCjsDU54KK_zYJn05RwaMSAxILEhMSGxZrElxfEkOC2veCgqMSMOOCmv8SexKAUyIzgoZbgqqngo5LGlmzencWn4KSHyJkFw6fgtKZyWuC0qsKg4LSs4KSN3qrgsYLOucWX3q3au9e54KSWxLbgpJjetdeGzZYH4KSf3rzevuCvptaY34DgrJHgpKbgpKjficel3rRr4KSt4KSv35HgpLLflsm41ofgr7HgradC4LaJ1qHLtwN6xYnbmtuc257YmOCut9ifxoTgtojWnuClkOCxijjbrtuw4LiDxJTgsbrgpJsJ27fGodu5ZeCissak3KXcmc2WBNyF4KeA4Lif4KOCxKrgoJnguKPgtpXGhNyR25Lck-C4oOC4q9yz3ITcneCkvOCmpNyi4Lip4Lih4K2p4Kaq4Kas3K3guLLguKLguLTNi8KQ4KGj4LGn3LvcveCxkd2B3YPgo57gqZ7gqaDgqaLdjtKm4KST4LSc1Y_SrOCtjMu3CCrgtKPgq7cJ4Kq22bbFlQzgqrrgrrrItMW_COCuvuCrgeCvgMiM2bjIs8Ku3ZPdleCtuuCkv9KvBsKR4LSm4Kmh4Lea4Lec4LC71oDgoJPdouCkkc654KST4LiNzLHgoJjguYHdrMW_4Lil4KCd4KOJ4LGhBeCikeCzv-Cxigbgr5_JqeClp-C2lM-jwpIID-CvpN6K4Levc-ChncaExojguJ3gtp_gr6vgoL_elMiMD9OQ3pltxLngo6LgoYAv4KmPyZnLtwbDlsSZw7TapsK-4Lee4Lm8yKrgq7zCqM-OecevxovgsZrgq7_guI7grILCpuClqs2WEOCto8m44KKF4Lmr4Lmt4KCIxpZtINuO2qLYjQgCxJnChtqm2qjgpI_bnuChvuC5v9ia4KCr2rLageCsusW_D-Csvdmb4Lej2r3ZoteIEtuB24POpNuG24jbism4EMemTcypaC9N4LW3xprJl3nguZfDnsSZw4zgrLDguZ3fo3Lgu7Dgu5rFttOuwqFB4Lul2rXGkRLIscKhQuC8id-Sxb8Q4LuiyLvCodKo4Lue2r7XiBPahuC8h-C0pljDv8OBd8Kqw4LCneC8juC0pt-qw4vCo1fCkRTCok9QwqEq0qbUo-CvseCzpsqC4LOozZLLtwVjw40DLOCzruCvvuC6tceZDuCzsuChmsaRDeCzttuS4LCJ4KO24LCL4LS-x5ngsI_fvN6w4Ly44LSA4LCUy4J4OM2s4Kmy4LSNxo3LlNGpza_dueC0jeCjrsqFYjE00JbLh2PRlc2t4KqR4LSTyIzgvYTgpLfVtNOUzKbTluChiOChisu3CSTEmeC8v-C5uMOMwr3MhjbgooTgq7zgoZnZvMW_E-ChnNaR4KGg1pMUF-Cho-ChpeC6m-C2nsmZ4KGs4KGu0qbgq5DguavgtbrgtbgvT9O1y7cKWsSZw4LUncK0KNue26DgvITaueCwg8W_4L6M4LqYwoHgpJbgvpBl0qbgrLPgqqngvpfGnC_WquCrs8iZAcOWw4zDuuC4iTEm257TquC3otm-2rnguJDbpuC2isWC4KOL4KSbONuB26LgpY7guJHgv4fIjOCru-C9sOChhuC9s9W34KGJ1bngvLoyw4zCqtqm1oIx1oTgt5_Fld6sx53XuOCsgdOv4LiY4L2GxJUJ4L6H4KGe1pLgupfguafPqOChpNaaxoTWnOC4l9ai1Izgoa3WpciM4LSw4L-T1bXgv5XgvbXgv5jYjQPCv8ONAnjgoZHgoZPgoZXgvoLgv6jgvoTGkQrgv6zGhOChn3TNlhXgvo3gv7PFp-Chp8y2zYbgvpLgv7rJuOChvuC_veC9smXgvbTVuNOb2I0EI-C8vUDapsKw1oPbnuCru-C-psix4L6D4K67xpEM4YCQxafhgJLegw0W4YCW1IHgupvgsafhgJzUj9Km2q7gvpbEiOC1u9qb4L6a1o_LtwTDoeGAheCwgeCtksOM4L6i4LSv4L2F4YCNxJXhgJXgvqvgoLbgtpHgoanLsNKm36XhgYTgtbbgvpjhgYjFn-C8unjhgIXCsuC-oeC-o-C_oceZ4Lqj4YCw4Lmi173hgLvhgZfgtpbgsafIjNiRyLPUlMiS4KuI4Ly6wrTKkuCrjuGBqXLWh-GBrOCrl8ysxpEH4LqO1KfgoLHJhOC6ieC5ouCrnNeP4K6X4LqY1LzJssakxqbXmd-64Kuk4KuI37_gq6jDjVrgq6zEjNug4Ly14LSdyoJExovEgnLKidiNCuC_msOc2JI3257Hm-GCgOCuj-GAs8SVFOC8lOGCr9ed4LuC4K-l4L-wxpzgrIjgvYrgs7jgsIrgs7rgvY5y4KyQ34LgrJPIluCslcqH4LO94YKh3bLTmOC9lOGCkOC0psOLwpXDqS7Ck2fCqciMyKvgr7HOoMeDzaLLssu04LeT0ozDmuGAhcOa1b_MgcyDzIXgoJThgb3ZuOC8hOCvkWXMk-GBmcy34LGJ4K2B4KW1xpEBzKTMpuCunc2g4LGh4LGj4LqA4YGY4LGH4YGazYfhg7DMvNeICs2AxK_Ng82F4KGq4LiZ4KCy4LqK4KKT4YSIxoDCkgYM24HgsqbJo-CyqMuD4Kmq4Kms3bngqINi4KmwzoXgs4LgqbQx4Km24Km44Ki74Km74Km9zrNj4KqA4KiE4LSG4KOu4KqE4KqG2onLoeCqimHIjNOq4Kuv4L62yJPJpMqK4L6eAuChluCtkuC0psKDw4bgtKrCquC0rEbbntSj4YKu4K-g4Lq-1rzhgrTgoo7NlgHgvYngsIjhgrzgvYzhgr7ai-GDgcmhyaPhg4TJp-GDhtec4KyYybDgsJTgsonhhJbgqa3hhJnhhJvgqbLLkM6Y4YSf0a_gqbfgqJngqbrdjuGEpOCpv8214YSo4KqD4KiN4YSs4KqI4YSvzL3EoBPClgECAAHFnM-JwpYEBAEG4KmW4LqCbsKWBQcABgHDv8KW4YaKAgYC4KKOwpYHCADhhojhhowI4YaCCeC0rMKWCQQACuGGnArhhbsL4YacDOGFuA3hhpwN4YapA-GGnA_hhoIRxZzgparClhAPABAB4LuB4KaWwpYS4YaxEOGGsuGGuxPhhr8O4YacFOGHhBPhhpwV4YalFOGGnBbhhqkV4YacF-GHhBbhhpw4F-C0reGFvOCmg9SLxpZ1cOChgcKm1IRm4Ka1woDgoaTHmcWExLbDiz_DmcKZ4Yes4YeswprIjG_gs6Xhgp8v4YOI4YKj4YKl0q8DPuC-n-GCqtueIuGBk-GCsOCxnMOy4YKz4LuA4YK24L-v4KC0yqnhgrrhhY7gtLvgvY3hhZLek-GFlOCslOGFl9-7yrnhh7Xhg4rYteGDjeGDj-GDkeGDk8iM4YCH4YG14YS04YG44YCmfuC8veCzpOGBj9a24YG94Lmg4YWF4Ku91KjgoZvgt6PgvIXhgoHgorvDteCrm9-y4Kud4YKN4YK415Xgq6HhgpLfudWC4L2R4Kul1YbViMa3HtKm4YO-xavgqqrhh7Pgrqfguq3CpOGDoNev17Hbnh_guaHgq5fXvcOMw7bguabhiIfTjcm44KuN4YOX4Kym4YOZy7Dhg5vLteC8usKM4Ly91Y3gubjhg6PMhOCtseGBvRjgr5DMkuCxj-ChqOGDrsyb4LGK4KaZxoTMpcyn05TMquCip-CugsO14LaP4YO74Ymr4LaT4YO_27XgupLhiZHDjMO44YSDzYLGp-GJu-CxqeCtgtyb4YSKyojhhIzFocOMw7fhhJHhg63hhJR40YPLhuCoqOC2s-Cqks2_yoXgqJbgqKrQq-CprNCAy53QtdGTzoPRosuPzoQx4KinNuCooOCpvNCCzozQgs6Qy5fRi-Cjr-CqnjjSpsOM4L6s4LmT4Kqs16nYjQlgw40E1qjgr7zgqrTgvIDdpNu84L6m4K2e4L-p4LGc14fSn9Ws4KuA4YmUxZDSpuCxqMSq4K-y4LmUyoPgtpjhh7fImQfWgMOS4L2A254b4Ye_4Lmj4K6Cw7PhhY3gtLrgs7ngtL3ai-C9kMq54L2T4LSB4L2W4KqR4KqTy5zgqIzQuOGEps6B0JHgp5jgqpzPtOCjt8244Kqh4Kqj4KqlyIxtyI_hhLTgq7LKiuGBpAHfkuCvvOCruOC7mOGLnte94YO54Lub4KuX4YWK1pPgto3EmQXhi6Jr4L2L4LS82ongs7vgrI_hiI7grJLhhZXJpeGIkeCsl-Crsti14LmKyLjguYzJkN2JxLrgqaHdjeGCm8SNwofgq4bWrMaz4L23BuC2jeGBvOC9gnLgvYThiKjhgobhhYfXg-C6lsiDyKEIxJkL4Yix1LThgozhgrfhi43hgo_UvuGIuOCro9ec4Yi83IPhiL7GuMiMw4zCiOCvg-CvheCjieCsq1TEmeGAquC9vOCtsDHOtuGBvSXhiajguaLgr5Pgrbh04K-WzKHEmS3gr5rguofhibXEleGMvuGCheC6kdyoxJkM4Yy6xpLgrpjGhMe_4K-px5ngup_grqHgr67JuMOMworhh7Lhi5PgvZPgr4hs4L264Yub4YG94KGx4Yy24LOz4Y2v4YyS4YyU4YiM4LCN4Yunxozgs77gopPhi6rLg0TRjuGKpkXPtkbNvdCAzpQxRTkwQdCt4Y6fMcqE4KOuNzRkRTXgp6fgsKo34Yyp3qjTkOC7idqcIEJ5yaNzzoDLtwcc4Yq94Yq_4K6uw4zDhCXbnhrhjIjhjaQBDuGIg-GIqeGMjeCkm8SZD-Cthcm407Hhgp7hjb_hi5XguIU0xJnWh-GMheCzr-GBvSHhj4Xgq5TDseGOiuGFj-GMleCsjeC0v-C9keGOkOCwk-GCkOCwleC9mNCVzpXgvZth4L2d0bfgqqJk4L2hY-C9o-C9peC9p9GU4L2q4Y6uy6DgsLDEjOC3tuC1s-C-s-C1ueGBheGApdKvC-C1vwLHm-GMhR8x257IjuGIqOCng8yp2bPhi4fEmeC8m-GCjuC2pcWl1bngtqjajtOR3K3gtYjguLfgtYvXoN-Rwqbgsrvhiqrgs4Zz4La24La44La64LeCxIXEncSKxIwV4ZCqX-C3hGTgooPhkKzEnwDgt4rJuOGEsuCttuC9seChh-GApOC1vMS7w4zCk8SZwqzhgIgx4KGU4YG94Leh4L-k1aThgLHhgIzhiIDhjIrFoeC6muGAt-C_rtyoAuGAvOChpuGDreGAm-C_uOC-k8m44Lmq4YmD4Ly24K2L4Kqu4Ye4wp_EmcKi1ZrVnNue4Yin4ZGK4K644YuG4YGUa-C3q8SC04ngu4XEjOGBtMWrwq_guIHgv7bLtwJ94KK84L69253hgb3gub7hkargur_Eq-C_juC_htah4Lq94Lmk4LiV4LGN4KKK4LaK4YqL4YmvxafCqeC-ruC5gOC4vOC4rcWnwqfgppPguKjcluGSk-GKiNyQ3JLgppbhkpLgoIrgq57hko7hg6vgpqPhkJ_hkp_cps2W4LqV3bfguL_guLrguLPcjuC4muC5heGLleC5h-CxkMWV4Yyh4Kmc3YfhjKTgqZ_hjKbguY_hjKngt4zgtbPhjrLgua_goIvEvATgoY4C4Y-E4L284Lm6257hjLXhkoHhg7rgq5fhkq3TscW_4Lib4LqG3bLgsaHhhILgr6jgsoHhibzMoQvguo7goKzgtqHgupINEeGNseCrn-C6mOGRkcmt4LWlbmThjbjgr63SpuC_kuGRnuGJheGKudKvBcKn4YCF4Luw4K-817Dhi4LXtOGBq-GTi-C3pOGJj8yhDeGJk9OM2ITJuOC_vOCjg-GEtNyTyorDjMOF4YCFatm0257Iq-GOh-GLh-GRj-C-p-C8kOC4pNqG4Y6MxZXajeGNidyT2LXCpti32LjIjOC5oOGIndiI4KaW4ZG54YCoAsOE4ZSM4YG94L-B4ZO64L-m4L6o1o3hj4nUp-GGuuC8meCkmw7hlJXhhZHgsI3hlJjhiLvhlJrgpafalOGAntqX4KCH4Y6z2p_aoeC4hSfhgIXDrOC7leC6tOCqt9Oo4KGW4Yio4Ky1xZ_gvJDMoeGPiOGIrNq5wqbgu6TgvJjgu6bgpJvhjJHgvqvgu6rbhduH2prgu67EjOC8tOGQu-C_lOGAouC_luC9ttavw4zYjwFZ4L-d4YCt4YG94YWE4ZSr2rnhgLLhi5_ItuGVkuGTpOGAuNaTAQjhkZbgv7ThkovWoeGBgOChr2TguZLhlITUleGIn-GHuMK24YCF1bLhiKTfosKBwqnfkMSC4Yee3bngtqnTqOC7meGVsOCgsMyhFuGNrOC3qeGEgeGNgN-z4ZKh4Kug4YKQ4Kui4YKU4Y2J4YKW4Y2MDOC6ouGMrOGWhciZBMOs4YCFw6ThjLLKluGWjOGWjmHhlpDhkJnTqOGAr-GWleC5ouGCgsSVEuGWmeCmuNeIEOGWnOGIs-GNg-GUgOGNhdeX4Y2H4Zai4Yi74Zak4KCAWWDIjOC7sOC3jeCkg-C3kOCkheC3kuC8ugrhiYngvbzgpI7gpJDhlrDhlo3hgqLhlrPgtaXhlrXWhuCklOGVkt6v4KSX4Le34LKCyYQS4Les4KSh4Leu4Yi1woLgt7HfguC3s9-H4Le14KSr4Le4347fkOCksd-U4Le9xIzYmOGUoeGBt9ef4ZSHwpbgvL3TquGMhSc04LiL4Yue4Za64LGi4Za9363XiAbhl4HhjYLhiIbhl4TYteGOjmXhkJvhk6fhkJ3gtYrhkqfhjYwK4L2u4KCG3ZTgoIjgrangvLrhlIkCwpzdn-GJpeGMs-C8g-GUq-CmoeGCtOGTjsyh4ZKp4Kaa4K-b4Y2pa-GXgOCgo8e94ZOYxb8R4ZOb4LqQ4Laa4LqSExfhk6HgoLPhlIDhk6TgoLfhkJ7cpuGTqeC6ocm44YGD4ZG1T-Cmp-Ciny_grr_gu7rhgKbgq6kD4ZGl4YGPwr7Hk-GBveGCreGWuOC_reCmp-CzsxfhlK_Gvcq314gY24HegWbgu4vhgZzhjb7Xp-GOgNiNBW7gvL3CjuGOhOGMs-C-peGZm-GCtNe94Zmk4LqY4YiJ4Yuj4YK94Yul4Y6N4LO94Yup4L2Vy4PgvZhCQjdG4L2bQeCwouC9nuGPseC9oUPKhULgvaVC0K7hj7hB4L2ry6BF0qbHm-C-suGQguC-tOC-tsqKP8OMw5fgvr3gvr_hg6fhl6Lgv4Pdr-CnhNOzzZZW4L-M4Kaa4KeE4YOV05DgrafgtYngpL3cpuGRueGOggHCmuClhOClhuCliOGBveC0sOC8hOCljOC_jeGVvduo4LGK4YOz4L-N4YOt4YOv4YqG4YOxxJUC4KWe4KWg4LGKA-ClpeClp-CmjeCmluCmguClouCiodmS4KWw4ZCQ4ZKHxpFS4KaH4KW74KW9dOGbk9iz4ZuV4ZuKa-C6hdab4KW54KmO4KaL4KWo4Kqp4KaO4KaDzKHhgongtpZb4ZKX4Zui2Ivhm6TgsZTgsaLgsZ_gr6ngsaHguo3hiKzhmKvhgJjhkqTgoJrMneCineCin-C4veGTluCjouCso-Csg-GKh-GMuwfhjL_hnIfdueGXp8Wh4YGv4Yi14Ka84KWn4Ka-4ZKX4KeC4KeEw4DgqYbEg-CpiOCpiuCpjOCmiOC6q-CpkeCpk-CpleCzh-C5ieCpm-GMo92x4LmO4Yyo4YSSzaHLsOCpqOGFnuGEmOCpr8204YSc4Kmz4YWk4YSg4YWo4Ke94YWq4L2k4YSl4YSn4KqC4YSq4YWwzbHhhK3gqongqovgqo1v4LCV4YuszpDhi67gqIThi7Dgqpjhi7PgqpvRouGLtuCqn-GLuc2x4Yu74Le-4KGF4L--4ZWk4YCA4ZCDxLtQxJnDvtW_06PTpd6r4YCL4Y-R4ZGt4ZSR4ZW24ZGTyYQD4ZW7xafgrbfgo5Mg4YC_4ZGa1qXSpuC7h-GTreGLk-GJhtiNB8KU4YCFwrzStgLDuMSZwpvgvoHhi4Xhga3MoRPhk7_XlMWRzYvEoBbhhbfhhq3hhbvhhpIC4YW5AeGGueGFvQPhhp_hhbjhhpIE4YalAQXgpoDhm5Thhb0F4Yap4YaB4Z6g4Zuj4YW9BgXhhboI4YaMB-GeleGGggDClgjhhq3hhojhhpIJBwXhhpXhk47ClgrhhpsI4YaLwpYL4Z6V4LuR4YaSDeGGleGGoeGesQ4MAOGGqeGUsdiLwpYPBwThh4ThnrvhhrUADuGfgBHhhpUO4YaR4YW9EuGGv-GGtuGGjBPhh4ThhrHhnrEW4YW44Yab4YaM4YeS4ZC34YacGOGHjOGHkOGesVYS4YW6BOCijuGHm8Wz4YeewpDhh6DEtuGHomfhh6TOpuGCpNyz4Yep4Yer4YetzIThirTgu5Thirfgrqbhk6_ImQvCkN2m4ZO14YmL4YG90orhnoXhk7zFv8SZ4ZGv4YuK2IHhiLXgq4PDjMKF4Y2R248v4K-W4L6cFOC4iOGNmOCvjeGBvSThjZ7gq5fhjaDgo5PhjaPhoJYBK-GNp-GTk-GYssSZCOGYi8Wb3oPhoJfEmRThmYDhjbPhkpXgsa9l4ZmH4KGB4Y2O4Zmx4LuI4ZS_RuC7iyBIyJXgrKvCpOGgpceQ3qfgu5bhl5rguZ7HmeC8v-GVjOC7neGbieGbuOGgu-GPieGVlNO14YqLwpHEmeGBluGgm-GKtMKP4K6l1ZDhnbnSrwzCnuCknda14ZO306jJuuGglOGZtuGPhhXhnongq4LhjY7Sl-CtpuGgoOC3juChuOC6rcO-xJnCkOChv-Cwq8OMw43gsYHhjLMc4LGF4ZuB4L-24Zub4Y2q4Z6e4YqJ4LaZ4aGZ4LGb4Y-X4KKY4KKa4Kam4Kao4KKgxpHEmeGbkOCiotGi4KKl4YO44Kag3q_CqeGhgOC4oOGgrOCituGgrtaNzZbEmSver8Kq0J_grKlo4Lig4Z2v4KK24ZOA4ZOP4aKn14jgvbrgor7go4DhoqPgo4XhoqXguofgv4nhja4BLeCjj9ec4KOR4K-U1IfhnKbhkrThnKjgqZ3hkrjhnKvgqaPhjY7bmeGhueChtOCtqOGSoOC-nMK-4Ly9IOCvjOGDpuGMsyrgrbTgq5fhorHgobjhorPhj4YszKRf4aGA4LGKxJku4K6F4LG34K6J4Zi34aKYxJrhoLfgr6HgupLEmRLhkJPhoL3hk6PTruCiv-CvqeGiruGhguChgsSMw4zCjdOQ4ZGf4KuyQcqHYcu3DcOo4YCF3bPgr7wCwq3EmcKn257GvOGUj-GikOGPhuGWvOGVkt-w4Y-L4LKD4L6r4KOQ4aSC4aSEyIx84Yu-4Kux4YS24Zmt4YmfBOC8j-GMhcij257hk7nOveGRi-GehuGIq-Gap-C5ouGkmMmExJnhlLThmbngtLnhjJPhj6HhlJbhjJjgrJHhg4PhjJzgrJbhhZnhjJ_gpafgrJvVrMmPIOCsn3LgrKHJuHDOnuGQgOC7teGanOC8usKC4Y6D4YyFC3DbnuGYqcit4LqO4LaX4LqL4Zi84Yy7w4zDs-GiktO44aKU4aWb4aSyAeGdrOGQleC2puGQmOC2qeGjg0RlyZdvedik4Ze3cuC2sOCohNGp4ZCl4ZCn4Zaz4ZCp4La84ZCr4La_xIw14ZCw4ZCy4ZCL4ZC1xKAl4LeL4Yys4ZSG4ZmtGOC8veGHvuGZluGWi-GXnOGDieGWtMOC17ThkYnhpKvgrrjfsOGMieGZoOGVltqD4ZKv4YKO4aS52ozYr-GUmeCmlti14ZS8xIzhloLEqsKt4Y6yVNqd4ZWB4LuP4LmxOuGmiuGVh-C7l-GIpuCstOGhmM-W4KWqzKHgv6vhpJbgu6PhoZ7hppnYtNeIB-C7qduE4Lus4ZWeyIzhlaHEquCrsMiS4YyA1q8y04_hpKfgq7nXtOGUjuGZteGFhuGkruCsgOGUkuGJvOGFi-GPoOGIi-GUtsmd4YyZ4aS84YOF4YiSxozhhZrhgJPgpafCp86jzqXHmeGUn-GkgOGHs-GknMaN4Ly6w4jDkcO-wrbhnb_hpI0B4aSP4YG94Zm04aaU4ZKC4ZSw4KaP4ZOa4aa54YyMz4nhiLThi43CgeGkm8mk4aSDxo3SpuC6o-GgieGhp-Ggi8S8CMK24aev4KeC4aSLWGTbntqu4aGx4aeS4YC04aG14LmoybjhkbTEquGBttar4aaH4ZOwHuGdveGUqOGMs-GUquGnuOGFiOGol-GVtOGkr-GMjOGIhdyoBuGUteGZveGUl-Gmn-GUueGmoeClp-C2sOCnq8iM4Z224KKz4ZC84L-_4ZC-4LqtNuGAheCqueC9vOChkuGRhuGFg-GdpeCzs-GdqOC-iOGAk9eI4aS04Zet4L-y4YC94YCY4ZGY4KGq4ZW_yIzgvrHhloPhl77gq6bgvpzhmIED4KuF4ZaKzrfhlrHhl53hlrThlpLOueGWlOGop-GMi-GCtOGYieGWmOGIrOGDquGChuGAlOGYj9-04ZiR15Thl4XhgpHVgOGXiMms4Y2K4KunxrfSs3rIjOGJp-GXkNSF4KSE4KSG4ama4Ly94amd4aGQy7_eqOGViMWP4amg4aaP4Zef4amjxZXhgb_HneCkleC2luC3puGXpuGWmuCkmxbhl6ow4KSi4ZOj4Zev4KSlxqHfheGXsuCkquC3t-C3ueGlseC3vDLSpuGUg-GmpuGRn-GhqMiZCTjhqYHStmngqrXgrLLhiY7hobLFvwrhqJnVr8iM4YGd4ZK-4aGH4Zih4Yq6QuGjluGYpuGjmeGVic654Ymn4LyE4Zu_4Yip4Zit4LyS4aCy4LWy4KuT4LyL4LKA4ZyI4LGK4Zi54amr2rDhmLvhk53hjLsUGOGjteGXrd6M4ZOm4ZOo3pDgr6zelNKm4Y-E4aiJ4LmV4ZGh4aqtVuGAhcKo4YmK4aGuzrnhoofhqJbhiKnhmbfhqrnhiZXEjOGLneGXveGon-GUo-GKusOXw40GUOGopOGrhcWV4YmN4aSS4YiAGeGmmNih4aah14gc4aiw4YyW4YK_4ZS44am34ZS64YKQD8iM4aOX4K-x4ZmM4aKW4ZmP4Lmn4ZmR0q8Iw53hq71a2JLhmZjhjLPgr4_hiKjTueGZneGLhx_hrIfEquGZouCkmxnhmaXgpafgpr_gtp_IjOC-leGqveGYn-GjkuGateChumjgvL3ho5vhk4fhmKfhrIHHmeGLneGriOC6geCtqeGeh-GrjeCxoRXgrL7hmLbhpJPFv-GCsuGrleCgq-Grl9OE3oMXH-GrnOGLjeGZg-GcgeCgu-GroeC6oOGhg8m44Y-c4YCg4ZC94L-X4Z2cxLwJwrDDjQXhi5rgvbzhgKzgv5_hmIfhiKjhlbLhppfhlbXhqYrNlh7hna3esOGdstak1I_hhLHUk-CvhW_guqbdlOGQv-GTgsOE4YCH4L2825vhq4Thqorhpo7hlo_hl5_hppHTqOGlltWj06zhq4nejOGjrMSV4ZuFyLvgor_Gi8SMyavhiYLPluCmj-GbjOCkluCzl3Dhrb7gsaED4LqO343hjrbOpMWa4YqLwpIF4ZyO4KGe4aWhyL3hnITgpqnWkwwg3r_hrp7hrb5kwoLhl5zhjaFzwoHCq-GnpeCpmMeZLnPGi8KB4aek4a6m4aCAwofgopliaeCih-C_pcKQwq_EhM2g4Lu24KWy4a-KxJPEqMKq3IZwyoHgoYrGvcKr1ITHqHXUh8WTwofhr43gpJbhoYDgrL3CrOCkpOGAvWxUxavGiOGupeGOuOCts-Crl-GvruGOt86A4a-P4KWyyaPhr5Lgoprhr5XNh9y-ZeGJl9yw4YaExqXgtYzgpbLGt8OD4LOZz5Dgs5tlwqrLg-CjtsuW0ZvJmcKG4L-lzJHhr6jgrJHFpeGvq-GvrWLhr6_OgOGjt-GjpOCyh-CxsMiz4a-zxpzOgMKD4bCU34LhsJbhr6zEqsKl4bCZ4Y634LGN4K6G4LOa4LG44Lag4bCp4bCrxpzho7fhoq3HhuGvp-GvqeGwp-GvreCxp-GCiuCxp-GvtuGvkcSw4a-64a6Y4a-XxLbhr5l54a-b3arhkqDhsIfQoMqH4bCLeM6O0JPLltCW4a-j0r_hooDZkuCjgOGwuOGwlcah4bCo4a214YuV4bC94YuV4bC_4a-44bGB4a-U4a6YwqThr73hr7_guKrhsIHhr57hsIR04bCG4aOq4bGN4YSVzafaieCoqDPCpsSJdmTJkOGvhOC1hsmbZMWQwqPfiG3ChuCzns2SZcevbHnDmjvDuCDhso0gLyogIuGuvuGggOGvgcaLIjrgsqE64Km3MeGyjeGiu-ChuCDhspTJoXsu4bKlICovCuGyjd6905PguJ_PrzDgtaDhmoIwKeGyquGyjuGykOGykuGyonLhspZs4bKY4YSfNDrQsTXhsp7hsINy4a-g05PbuyDhhIThioThsqThsqbhsqjhsrXgoJ7gpafhsrXhso3hsrciLS1DT0RFR0VO4bOW4bKYOOGzgDfhso7hs47hso3gtbZwMeGzkuGyj-GykeGzleGzl-GzmeGzm-GzneGznzo14bKb4bOk4bKp4bKNyb7FhsaW4bK14KWyZ1_hs6nhso1qx67hrp_hs6rhs5Ths5bhs5jhs5rhs5zhs54t4bKY3rs6M-GyneGyjeGzpSDLg8uh4bSF4bOs4bSH4bOv4bSK4bOy0LThspk44bO24bK14bOn4bSA4bK24bSY4bOu4bSJ4bOx4bSM4bKZMOG0jzLhtKDhso3Kh-GggNei4bKO4bOr4bKS4bSZ4bSn4bSL4bKY4bO04bOj4bSS4bKp4bO94bO_OuG0l-GyuOGvhuGvgOGvguGyvOGzgOColuGzgM6D4bOD4KC5yL_hs4bFk-GziOGzis2EIOGzjC7hsqfhs7fhs4nGl-G1geGyk-G1g-GyuuG1heGyvc2-4bWJMOGyq3Nn4a-B3K3JoeG0k-CgnseZ4bWa4bK54bK74bK94bSQ4bOA0Zvhso3go4DhtZbhsrXhtJUw4bSh4Yed4bSj4bOT4bOs4bWt4bWe4bWxMeG1oeG1s-GNtuCskj3GquG1pOG1puGTp-G1qOG1l-G0leGEn-G1uOGyjciVcOG1uXAy4bK1c8mPy5rhtpPhtpXhso3gp4nLl-G2nuG2n-G2oOG2oeG2ouG2o-G2n-GytW3gtbfhsrXEh-G0suGdseGTp-G2lnfhlrPhtKPhs6c04bW24YqS4bak4ba24ba34bak4bK1xo5k4bam4bao4bKNxZPhtq7htrDhtpbEhMWTZeGytcS54baS4bSz4bOU4bW-4bKX4bKZ4bS60bfhtYvhnbDhsrnhtZPhsqXhtZXhtJPgp4TgtLYo4ZCmYl_hsrPhtpPhtrHhkJBPy5fgtaV04beazYLht53hsrThtpx44bSW4bOD24TGl3nhtrTht6wgyofgsbhuCuG3hOG2kuG3t-G3p-G0q-GdseGyheGyh8uxe-GzquG3iuG1veG1nOG1ruG3juGym-G3kCDhsp_Uh-GyoeG1nOG3lOGzjeG1l-G0s-GyrOG3hSjhsq_hsrHgvZfht57htLPhsp7go4nhs5HhuJrhtKThtLXhtKbhs7DhtLjdjOGzouG0ruG4muG0ouG4guG4n-GzreG0iOG4ouGzsuG0uuG4puG0s-GzuceZb-G4qeG0vuG1u-GyjuG0guGtveG4qeG1vOG4oOG4rOG0m-G0qeG0juG0kOG4sOGyjuG1t-G4u-G0tOG4q-G0muG0qOGymOG0ndGv4bmD4bOm4bW64bmG4bSG4bih4bi_4bmL4bSrzoDhuY7ht7PgpKnGmeG5keG0peG4vuG5iuGzs-GzteG0vOGzquG4tuG1gOG4nuG4vOG1m-GnpuG1neG3jeGymuGynOG3keCituG4jeG5qeG4j-G3luG4keGyjuG3iOG4qeG4ueGunyjhtL4y4LWgbOG3peCgnuCnhN6l4biX4KiWKeG3qeG4muCgpdyU4bCM4bKw4biK4KOJ4KeE4baY3K7htbfhuoXhuKnhuKjhuJ7hsbHOh-GEps6z4bipZXHhuLXIpl8z4bm34bSDaeG6k-G5kOG6leGxjzLhsI7hhJfhuprhupzhuJ7htL7htrPhuJ7hubjhuqPhuJ7hupThuJrhsIzRtOCypNCW4bqr4bqd4bO-NeG6oeG4uuG0s-G5u-G5peG6teG3q-G2j-G4p-G6peG4muG0sMmJ4bmc4bWC4bmp4biGz7A6NuG0n-GdseGLleGzieGKg-G1kuG1tOG0k-GyjeG0vjPhu4Lhu4Dhup424bq7Xzfhur5wCd2GIMSU4bmj4buf4bud4bKObeG6j-G4leCyiuG4meG7huGzqOG6pHDhuqDhuqbhtrjhu7nhu7pm4bip4ba74bip4bad4bu74byB4bai4bu94bat4bqz4Yed4bab4bia4biTyofhu7_gqanhu4XhtLPNkOG4qXPhtq_htpThuKnhubbhuJ7hvJbhvInhu6_hsq_huobhtLPhurThtLPhvJLhlrPhvIjhvJ_NguG8keG8k-G4t-G0r-Cjo8-T4be24bmm4bmH4beM4bWG0IA6OTThso3hsLPhr7Dhu5XhhIXfus-EzKbhtbXhu57hs77hsr_hu6E44buhOeG7pOG7pi_hu6jhvKvhso7htL7hs6HhuKnhu65vy5rhu7DNvuG8nOGyjuG8nuG9k-GHneG7t-G7s-G8ouG7reG3hOG8i-G6psuQ4bu9yoXhvKXhvKHhvJXhtZnhvJfhvaThvJnhvY7hupDhu7HhvZLhuY_hu7ThuJ7hvKDhvJThva7hvKThva7hvKbhuKnht7ThvKrhu4vhuajhrr_huarhtYbQsTnhspvgp73hso3hhoTgtaHho7nHhijhvLXhuZfhsJ3hvLrgtLcg4by137rFmceBIOGwruGwiOGwsCnhvLfhioThvbbUgXMgKOCxpynhtZThvLzhvYnhup7hs7Thu6HhhJ_hvIzgqJbhu7XhvKfhuozdsuG6gceQ4byR4b2y4bmm4bmS4bme4bij0ZDhtYnhuZjhsq_hvbjhtLbhuK3htKnhs6Ex4bSR4b6g4byd4byH4b644bmT4bmf4bO0MTbhuZjhub7hv4LhvrLhtJw64byz4bmi4bie4biy4bO74bqt4bqe4b694buk4bqy4b6w4bmd4bmJ4bijzpjhtI_htaLhv4_hu4Pht7LhuJ7hvrHhv5rhtJw24bKZ4bS74b6_4b2V4b2t4b-Y4bi94b-k4bSpza_htI_hvr7hu5nhso7hu4nhuZvhvKzhv6PhtLfhv4zhv47hv6nhuLbhtoHhvbjhvK7hsr3gtrPhvb_hu5LhvoLhsLbgoKXhvobhsJrhtK3hvonPrMym4LWg4b6Nxafhvo_LseG-kuGxjGXhvpXhtZHNheG-mOCgueG-m-G-neG-n-G_s-G9rOG9meGyjeG8kOG9s-G3guG8huG_q-G_gOKApuGyjuG6gOGQkOG6j-G9oeKAqOG3quG9nuG4nuKAouG6h-G9tOKAo-G7tuKAreKAoOC1oeKAtOG7s-G-qeKAquClsuKArOKAteG-qeGEleG8juGyjuKAsuG8n-KAuuG_ouG_meG_ueG0qeG6qOG0rOG-tuG3q-G2juCnrOG_iuG_ruGzoOGzgDnhuZjhs6figLjhuafhvrnhuZThuaDOs-G5mNmC4oGS4oGK4bmL4b-N4bmY4b-R4bi04b-T4bO-y4_hv5bigaHhvrrhspjgo7Dhv43hv6jigJ7htJThu4TigazigZzNu-G_jeG_u-KBsuG9lOG4g-G_reKBouG0j-G_pjThu5Lhv6nhvKjhtLHigbXhuZ8y4oGk4b-f4bua4b-U4oKI4b-_4biF4bW_4b294oCD4b6B4K2p4b6Dz5Dhoq7igIjhr7TigIrhoYDigI7hr6_hvo7Fk-KAkuGxr-KAleG-luG1kuKAmeG-muG-nOGLleG-nuG3leKCgyDhs6fhvZfhvI_hvaDhv7figYniga3htI_hs7TNveKBl-GHneG6r-G_rOG5iOKBvtGv4oGN4oKK4bmE4byN4oKG4b6z4oKIzoHigrfigLbigrHigb3igrPhs6HigZ7igr_igKHigrDigrrigZvhv4Thv43hs4Lig40g4oGg4oOI4oK74oKz4oKI4oG54bm04bO4c-GzuuKBp-G4muG4tuKCruG4uOG6ouKDguG4ruGzoeC2s-KBjuG_oeG4muG_uOKCs86D4bOz4b-H4oOV4oG74biq4oOR4bij4oKB4buQ4b-e4oKr4b-14bar4oGI4oOJ4oGc4oOb4bmD4oOj4bus4oG84b254bKV4oKQ4oCC0Y7igITigpTigIbhoq_hvofigprhsJ7hvovigI_hsobigp_hvpHigqHigJbhu5bigJjhvKnhvpnigJvigqjigJ3ig53igqzhu4fhtLPigL3GoeG9qOKAreKBgeKDgeKAseKDj-KBhuG9ouKDmOKDtuGzsuG2juG1h-KBluKDs-GHneG6veKEruG_g-G4oznhs7TLh-KDq-G-qeKBmuKEuOGzstGP4byxM-KDhuKCueKDvuKDmeKBnNCE4byx4oGx4oSg4banbOKDp-G0qdCD4bKb4oOU4oKr4bOn4oS24oOQ4oWA4oWR4buc4Kis4bmY4oGF4oOt4oKy4oGcNuG0q-G-veKDuuKBsuKDl-KFmOG_i-G5gOG9vuGOq-KEveCnruKFkOG5i-GztOG1suKEtHDihYbihZ_ig7_igofigojOhOKBn-KDveKFtuKFiOG5n-G-veGzgOGKpuG5mOG3gOKEt-KFqeKBlOGEn-KBpeKDn-G4s-G-pOKFteG0geKDpuKGheKBk-G2gOG1seG0reKDleG5heKGkOKBvsuP4b68zpjig4bihL7huYfihK_hv6_igYzgqb7huZjig7ziha_huKTihojigr_huLbhvL_ig5jigIDhtYnhvb7ihIrigpPhkqDigpVu4oKX4oSP4b6R4oKb4b6M4oKd4oCQ4oSV4oCT4bCJ4oSY4by44oKl4oSd4LO_4oKp4biQ4oC34oSn4b6o4oeH4bqmy5bhvZ_htrzhvZ3igYPhvazhvqnhva_igLhkzJbhvYzhtr7hu4PigLDhuJrihZ7hsqvhvJrhvarih4bigKXigLjih5rigbPNvuG9jOG9m-G3huKApeKHkOG8k-KGjeKAueGWs-KDpOG1s-G8k-KAuOG9r-G-qeKBmOG7teKAuOG8iuKHpuKHl-KHjuG7k-KHjOG7s-KHquG2suKGpeG5geKFhOKFs-KGneKDruKEgOKDhOKCguKBuuG9luKGpeC9peG0quKDhuKFl-KFh-KGn-GyveG0j-KDnOG4qeKEpMa1cOG3sOKGl-KCsznhvb7hto7ig6vih7nihL_ihobihYPhvLHig7LihZXhv4HiiJnigZzPtOG8seG_suKEoOKFluKGpeKFgs-_4oWd4oSr4oW94oiQ4bKb4bK_4YSf4oir4oek4bKt4oiK0Zvhs4DPuuKBjuKHiuKIp-KFv86z4oi94oaU4oKr4baq4oiKzoHhtbHihaXihKDLg-KJgOKFqOKGkcuP4baBy4_iiJPigKXih63ig7XihZnhsr3OlOG2gOKIseKHu-KIj-KJmOKGgeG7nOC9peKIgeKCq-G7vuKJgeG-szDhv6biiaLhuZjih7HhvaPht4niiY_ihpjgtJHhs6LiiYXiiIjigK7iiZfiiKHhv4biiZLQg-KFheKIiuCpvOGzouKJo-KBsuKHoeKIoOKJkOG7j-CyjOKJq-G8k-KJluG8mOKFh-KGrOKCkeKGryDigIXhvoTigIfihrXigIvPheKCnOGOt-KCnuG-kOKGvOG-lOKCo-KEmuG3teKCpuKAnOKCquKBsuKKieG5teG9puG0s-KKouGyjeKKpuG1mOKJruKKpeKKpOGyjuKHkeKAreKJluKKruKAteKKsOKBh-KKo-KKquKKteKJreG-pOKIjuKDpeC6puG9heG9h-G7quKBqeG0q-G9jOKHnOG9keKHiOG7s-KJluG8gOG8guKLicuX4byE4omd4oOA4ouK4ouP4bu84oCx4byF4b2Y4oi54beF4byM4oeY4oKv4ouN4oeu4oSt4bia4oqo4oqo4b2N4b2P4byb4ouF4oSs4b2w4bqH4b6v4ouk4b6p4oCZ4oKO4buN4bW_4buP4buR4oOO4LO_4oqb4oay4baL4oq_4bui4oSE4oGz4oOs4oeP4oee4bqH4oC_4oCz4oCk4b-g4baO4bqaeOKKtuKLm-KJteKHk3bhvIzii5Dii4rii4zih7ThvYThu6fMr-KLq-G9uuG4huG8sOG8suG8tOKAieKLsuGhgOG_vOG6nuG9vuG8keKHnOCnp-G9q-KEoeKLpeG0s-G5uOKKveKMkOKGq-KCj-G3jeKKjOG-gOKKjuKEjOKKkOKEjuKMl-KKk-KAjeKGuOKKluKGuuKKmOKEl-KLsuKHgOKCp-KHguKEn-KLtdCx4ou34bmn4oasMs204bKZzbvii7DgopPigqvihpbigrrijYHhjqvht47ihLPihrXgrJLiibTiiIPhuITii6zhuavgtI3hv6fhv47ihrXhvprigbLijYniiorijKjhtYbRr-G0q-GFpuGyjXXfgeG0n3biiKXiibXijYDijZ7htI3hiqbhtKzhv57gtI3ijYjgsorijZLhu4zijJLhtb_QpuG_neG0u-KKmdCh4o2o4bug4oyn4o2U4o2fz7_hv7Hhv47ijbrKhy7ZndmCaOKCq-KLoOKLmuG4quKNgeKOgc6A4b-e4o6EZeKOhtmB2YMgIeG2huKNsOKBsuG6m-KMkeKEh-G5q-CoqOKCtOG_juC1p-G-m-KOkuKOlNme4o6J4o6YIOC0jeG-leKMvOKBqOGzv-G7o-G6sOKGj-KNiuKNq-KIkuKFseCjsOG2nOKNseKLueKOjeKOtM6z4bmWz7DhvKjht7Xih7rgopPhuJXhvpXigbLhva_ih6rii57iiqziiqfij4riiqnhu6Thubrhv5Q24oyg4o2q4o2_4bmL4o6gzo_ijqJm4o6k4oKh4o6m4o6I4o6X4o6ZNeKOrOKKoOG5tOG4tjfijL_hvK3ijrTNvuG7nM2-4oOU4bmX4o2b4oSp4o6z4o-U4bSP0bfhv43gp6fhso3ijpLijbzijp3htYTht43Np-KPpc2-4oOyzZAo4o6S4LWgzoDij4XihKDiioHij6fij7HNp-G2gc2-4bS74o6L4oy64pCB4oKh4pCDMuG6heKOiuKLveKNneKQidGT4o-04bS74KySOuG2huKQjuKQgOKQgiDikITikIXiiq_iirjijb7ijbXht43NveKQi-KNheKOquG8s-KPruKHo-KQp-KOnuG1htGu4b2-zbvihLPij7fiibTijb3ij7DikKjikLPhsprNveG_juKQoOKQkeKQreKQpOKEquKOjOKPk-KQvOKBruG_sM294oOU4pCfyoXikJDhsK_QoeC1oOCjseKQlOKBsuKOi-KPueG9u-KRieGyv-KRi-G1syDikJ3GquG7r-KRgeKRkMqH4pGSNOKRlOKEoOKKseKLneKPjOKRh-KQsuKBruC9mOG_jeCop-GyjeKEvOKPruKFouKRl-G7juGOruKRr-KDlOKQuOKIrOGHneKQuuKQl-KRiOKBsOKQi-GOn-KLsOKRj-G-k-KRkSDLh-KRhOKHmeKIsuKEheKGrOC2suG_jeG4ieKRjdyu4pCh4pKI4pKJ4biS4pCW4oW94pKNzbbhv43Ns-KOuOKPruKOuuKRq-KPuuKQs-KJveCqheKGlOGws-G4leC1oOKSkeKShOKAlOC1oOKSlOKSleGyjuGws-KRteKLrdGf4pKP4oaU4o2n4pGe4pKm4bqL4pKp4pKT4o-R4pGm4ou74oqr4oyE4o674o-x4Yql4bOz0ZDhso3QtOKNsc6F4pKx4beN4Y6r4o-l4Y6r4buS4o2n4om04oGZ4pCI4pG_4pOM4pOE4oiB4o2nPCDik4fij67ii4vii5Lijozhv4nikLHikqHhtLnNv-Gzs-KFsuKOoyjik5jik5o34o-h4oeE4b-Q4oaK4b-S4oOi4b-U4b2B4o6x4bq_4pC74pGs4bOz4oK94Ki04b-e4pOb4omMy4Ri4pOK4bWG0Z_hu5zik7rhso3ijacr4baG4pO84oyN4pGF4pK-4oq34pOh4pGY4bOz4pOk4Ki04bS74pOn4pOp0LTik6zhubPijL3hvYvilI7huIbOg-G2gc6D4oiB4pSJ4oeJ4pO_4pSb4bW_4LSO4bOz4o6_IOKTkOKRu-KMouKSmOKOtOKUpuKUn-KUheKPnuKTquKNseKTneKHmeKLk-G0s-KOnOKTruKDoOKUgOG0ueKBr-CqiuG_juKNp-KOqeKThyYm4pSp4pSy4bmN4o2R4bip4oGm4b6k4b2D4pO04bSE4b2l4pOA4pKg4pSP4KqK4oW54KOx4pOG4bSf4o-u0YrilLzhs7Piib3Og-KTj-KNqOKTkuG3i-KUruKVneKVluKVhuKVguKVmOKTveKUteG8j-KUt-GyjuKUueG4muKVi-KUpOKTi-KUvuKVpeKVgeKUiOGzo-KVhOKVpuKUiOKVqOKMveKMnOKVseKUgdGu4b2_4o-Y4b6b4pW14pSz4pW44paE0a_ilJfigqvilbDik7Hhs77ii5jiirvilY_ik7bik6Lhs7PgqKfhs7PikoLhtJTijrniiJ_ik5Pik7fgqbzhsr_gtrPhtJHigJnij4LKiOKPhOKCq-KPh-KQpuKRqeKTgOKPieKTgOG5uOKPj-KBqeKPkeKVm9CZ4oKI0Y7iloLik6jilYfilbfilYXiloc44paJ4b-z4bm74ouB4pW-4bKYzbbigojNs-KOkeKMmeKQueKVm8uk4peBza_hsqvihJHijrnijbPihIbilpLil4fhu5Deu-KXiuG-iiDhtobijLHMt-KTkeKUjOG1s-KHpeKWpuKRvuKTt-CjseKPpeGOruKDss6kyofhuakozJrgvalha-CyoTYo4o-i4b6m4peN4oas0IDihq7ihbLil5fijajijrDilpHilI_Qg-G_ps-y4buS4KKaLsmfxrXEicuzxqjduSgiXMuEOUXZg8mox64g4K6c3bkgTeKEkTpcbs6AIuC1oOKXl-KSruKSg-KBguKSqOKLg-Gys-KMoOKDtOKDtOKJjeG8suKWnOG7keC0jdCA4piq4KqKzpfgqonNtMuH0ZPgqLHilL_LkOGOqOKYqtGb4Zy04pe74Ki00ZbgqJHOs-GUneCnq-KUiuG8ieKXnOKVkOG8jOKVmuKUi-KJleKZgeG4kuKZg-KHuOKHi-KHheKZhOKZj-G9p-KLoeKHneKJpuGzsuCqheKTpeKBjuKWjuKEheKItDPikLXiiKTil5nimZThuYDhuZbihYzhu7Xih6riioLigrzigoDimaPhvbHilKPiia_ig5rihbniiZTii6bimaviiZ7iibfhu5zLkOKDhuKVoeKFoOG5n-G_puG1iuKDleKHtuKXhuKQmeKXveKAoeGviuKYgNyHxZrimITMmtyu4piI4piK4piM4YiR4piP4piRZOKYk-KYleKYl-KYmeKYm-GhgOKYneKHq-KJteG-t-G4nuKZveKWvuG7kOKJveGOp-KDsuKXqNGV4per4KqK4peu4pOt4oC74ouC4oSm4oGA4ouX4oe54oeh4pqh4peq4pes4pWb4Y6n4bOh4Y6n4oSz4pSq4bu14omW4pWS4oyTzoTihZPihpTijZDilKvikb3ilK3ij7Hhjq7hsr_hjq7ig5TijZrimr_il4bhu4_il6LhtpBj4pel4b264penzqTimqLil6zimqXilJjimprimKHijKDijZzhv6rih7XimYvhtLPigYLimY3huqbikLDimYLiiLrim5bhvajhvZDhu7LigKfih7LikbzimYnhvZrim6PimYzimYfhu7Piirrht6rilarigYTilazim7Lii5HilLbijozih7Pimprim5zig4DimZnih7rimaTim6vhtaPim63im53ij6_ii5nimrfinIHhtofinIPim73imqzikovimpfim7Hij43imZDikr_il53ilI3im67imZHhvanii4Tih43inIjht5vil5rijKHim6lw4pyP4pyb4pqq4oCl4puA4bKN4KaI4byR4a-3zYTgoJ7ilYrik6_ig6HimbLihpHhvrzimanimqfimaDhtLnhuaHilorinKzhu6HijYLigavinLPig5Phu5DiiLjhuJ7igJnhvqzFhuKGpeKWgOKQrOKWmOKHv-KQteKJi-KLo-KIs-KJn9Gg4buQ4omz4oSg4p2A4ZCQ4oiW4oiY4pms4oWJ4o-l4Kio4oaj4oSb4ZOn4ZCQ3qXihqXhjqfihZPiiJ7ihqXihZLijJXig5XihqTinLvhuK_ihqjhup7ijYLij6bilaLij7Hil6DihZPil6Pim43htZzim5Dil6nimqPil63il6_inJHinJTinJLim6ThvY_ht5so4pCO4byb4biXy5DhupLimpzgo7zhu5Digrbii7Pimr7hvqbih7nig7Timrnhtb_inobim4vinonil5Ug4pek4p2z4pqu4p224puU4peM4o664baR4pya4pKX4oCf4oyJ4oyK4byC4oeV4oWP4bie4omH4pOe4pyc4oe-4bu44p6h4byB4oyM4pqa4oeW4bSz4oaE4ou-4om1zZLinIrij4vilZHilprilpLQhOG2gdCE4bS74buY4pO94o664oO04oms4b2u4p6e4pqX4oSo4Ken4p6b4oyD4p6o4oeU4p6q4p6r4bu64p6t4pe54oyT4KOx4bKb0ITij4DhvKrinpLij4bih6ninJPinrbin5rinJDin5DihIjihq7ijKviio_igpbhvoXiipLihrfihJPigJHihJbikaLigqLigJfhuZniip3ih4HgopPih4Pim5XhvqHilq3ii7fhva_iirPii5zinbvilqfijI7hvYbijJDhs6rgs4544KeEOuKBs86a4KOx4LSR4Ki4zbXPstCy35XLj8uQy4bPu8um4Y6fzbDgqLfQlc6X4L2k4LK20Z3gqKrgqI1j4KiSy53OmOCor-CormLNu8uf0ZbRleCyu9CJ4KiD4Y-s4KOv4Y6oYeKXoOCopdGUzbPNu9i44oWi4baO4bqZfQrhrqTJo-KYgmXChMKu1anQjcmo4LafxZDhlZThmY3Uh8OaCBjihaLQiuKFouKPq-KNguKCgeCnp-CqiuG2juGEn-CpvOKFosuh0IrRg-CqkeGOq86z4qGU0LziiajiiLfYuM-20LHigoHgsozin43hu7vLkc2v4b-G4Y6fOOKYuOKhpOG7uuG_huKhpuCpt-Cqic6D4qGdzb_aieKhiuG2juKFouKhm-KZnOKhm2bRtOCoseKhnOKhi-CqieKhjdCK0LHLpMuh4qGS0ZPYuOKhlsm54Ki64qGUzbviooXiooXgqJbQseKiiMuhzo_ihaLgqqDRiuKhis6A4bGy4bqY4bSQ4KOw4baO4Lay0Y7iiajLpuG6qOKhvOGEl-C9peKikOGOn-CpvOKimeGxkOG6uMuO4qKey6HNuOCpvOCqkeKhm-KiiuKis-Kin-CoseKIt-ChtOCqiuKis-ColuCqieGKptC80LTRtOKhrOG2uOG_hs-y4qOD4qOE4buR0LHOgcuR4qKG0bfhjqvhjqviooDOhNCK4Km14pmc0ZfOj2LioqjLo-KIt2TPtOC0jeKjmOKiveKjkuKjgNGP0Z_ihaLYt-Khp-Kjj-KJqOKjoOKiv-KjlOGOn-KhvOKituCnp82u4qKN0IrNtM2_4qKA0Y_iiLfioZDLoeGKseKik-KhnOKhl86G4oi34qGp4qGczo_hjp_io6Xio43hpbXhj7DipILgtrPio6nio6bipITNvuKBkOCnq-Kjt-G-veKjueC0k9C44qO84qK1zobLkOGKpuKjtMuQ0LPgp6fhvr3iooThto7ioZfipJbRl-Kii-Kjs-KkiuKkheCqoeGKpuCjsOKihuKhqsui4qSO4b694KOx4p-H4Ket4qGq4qSfza7io7nhvr3go7nipKPio77ipIjQiuKhiuCypOCnp-KkheKjk-GyvsuR4qSo4qGu4o-rza_QvOKIt-KjkeKNoOCoqNCl4qS84Yqm4qOK4qWF4qGq4qWT4qOizbvipJbipKrioY_io4vLls2v4qCz0InipJnioajgqonioZzipK3Nr-C0l-KjqOKlpuKloeGPsOGFpOKljuKloeKjqOKihcuFz7zio57io5Hior_Qs-KjhuKjh-G2tuKjheKjguKltuG2o-G_huKjo-Kji-KkjNCx4qWh4qWy4qWCzb_io63io5fiorTRqeCqieCqheKhs-KBkGHhjp_gqJbipbXipbrhtqLipbziooTiorzioY_ioaLiorvio5_ioZXio6nipprioYvhiqbilJ3ioqfiiLfQruKhk9i44YqV4qWs4qaB4YSf0ZvhnYTiorzipJzhjqvQseKlpOKjkOKivc-04qGP4qOn4qOp4qGJ4qatzoTioZvRheKiqeKjqc6F0Y_ihaLLl-KJuOKhj-Kihd-V4YWq4qCz4qO_4Kqh4qWs4qOf4qa94qGu4qeAy6TPutCy4qeC4YWl0LriorLiprzRi-KnjMuO4qeO4bOB4L2k4qO50aDJueKjvOKmpeKlp-KiheKmqeKmmOKjneKkrOKliM6D4qaw4Keny6PipbLipZLioZzOlc2v4YWq4KOwy6PgqbzOgeKisuGKqMuQ4Ki04LSR4pe74piz4KOx4pi14Y-y4Km84pi4y6TimLrRkTDimL3ijpDipLPio4riprDRiuKnqtGv4qWR4qOM4qSp4qWt4qOq4qWB4qSa0L_ikIrgqp7io6nioYzQis6E4qSE4qiP4LCf0LPPtOKnpeKlh-KitOKojuKjpuKli-KmgtC80LLiqKTipKzipKvip43ipr_ip5jipb3ipZLiqJbipb7ipKziqI3io6TiqJ3imKfipqbiqJHLkOKnrOKjjNGP4qaE4qWi4o-p4qGpzoPRhmHQseKig-KnnMuX4qiA4Y-y4qKJzb_OjuKpi8uh4qO-4qeh4qOM4qWyzb_iprjiqYzipa7ioZ_io6PioaLippDippHhtqDioabRt-C0kdC84qGr4qmd4bah4qGu4bqo4qGw4qeo4qab4qGc4qKp4qaK4qmY4qKw4qaOz7DipbniqaThtp7ioajOj-KoueCqieGEmuGFpOKlpuCohuKghOCjsM-_4omo0IPOj9Cz4bqo35XgqK_Rt86Oz77Rqcub4L2Z4qCV4qaoMuKgmOKjnOCjss214qCd4Y6f4KKjMOKgodC60KvLnM6I4qCn4LSEy4vioKrLmeKgrcuI4qCvzbzgpKDiprziopQzxbJw4qC6c8OaEkNQVVNI4bKd4bKyy7LiqrLiqrTih6LhtaJNU1RPUkUgQ0FMTFbiq4RV4quBRFVQ4bKdSVNaRVJP4qq34qqz4bSt4omN4bWiSlVNUEniq5XiqrnhtJUg4quL4quN4bKhRVbiq5JUIOKrmuKrnOGzmuKqvcuy4Lyv4quC4quETOKrkuKrn-KqteG3q-KrouKrjOGyneKqseKrluKBs-KInUVYUOKruFDhtK1TTE9BROKsguG0reKru0jimbXLg0birJDirJHirJLirJPirJTirJXirJbirJLimJNVTCBOT-KrqUFO4qyJU1dB4quk4quj4byz4qyM4qyOeOKsl-KsrOKsreKsrCDirKDirIlN4qyaIOKqv-KYkOKspOKrpFPiqr3iqr_iq4FQ4quw4qyp4oGzM0FD4qyC4qu64qq44quXeOKFouKrteKLuOKrguGzr-GzmFBZ4q2L4quh4quAVFVSTiBJTuKrh0xJ4qyJ4qyM4qu20IrirZLhu7HimJPirLviq4Diq7Hiq4XirZziq4nirYXirZniq5Diq5Liq5TirYDiq5jiq6riq5viq53iraPhtaLiq6Phsp3iq4Diq6dS4qup4qurUOKrreKrqeKsvuKsgeKtoOKHouKtqExEQVRBU0niq5EgTOKugeKth-KHouGyneKtvuKrnuKuhOKroeKrg-KrheKuiOKuiuKshuKsiOKto0XhtaLiqrNS4q2s4qyM4byz4bqW4q2D4bG0IEVR4quf4q2I4o634q6V4q6k4qq44q6meEXhuqhG0ZtD4quB4q6r4q6t4oGz4pKC4q6w4q244quf4q6zRTNG4KenRkJG4q6q4q6s4q2xeEHiq4HirrDirb7iroDirbbirazirbriq6jirbPiq6xF4quu4q-MNOKsveKukuKJjULihYTirb7ir5firb_ir5nirpHiqrPiq7bNvuKYk-KuneKsieKvgOKro-KFhOKsqeG1ouKsj-KsruKvs-KvtOKssOKsoeKureKvseKsq-KvtOKvu-Ksr-KsseKsiuKtpeKqvuKtp-Kul-G8jeKssETirKLirLjirIvirL_irL_iqrjir6jiqrvir6virazirKPirKXirIRVQuKst-KspeKtuUXirZXirZfir6Pir5Lir4zihZzir4wxROG0n-KvouKvkeKvpeKto-KvqU3isI_ir63iq4zihYTiq6PhtK3iqrzisIHir53ir6figbPimbXirIjisIfisJLiq6_iroPisIvisLPhsq_ir6rirIfir6ziq7nisJbirIPimJDisJTisYLisJjisJrirZjisKXir5rir57LhM2u4rCn4q2s4q6Z4q6H4q6J4q6L4q6N4quBU-KxheKwg-KvqeKwruKuj-KrqeKrj-KrkeKrk-KuvMuDQ-G8s-KusOKwg-Ktt-KxgeKvleKtvOKwnOKwpuKxm-KwtuKxhuKtrOKvgOKxkeKum-KrhOKwv-Kxr-Kwg-KwteKwhuKxr-KwkVDihYTisbvirITirLjhsp3isbHiq7LisbPisI_isbvirYbisLzisITisa7isobiq5_hs4Liq5jgp63ir79H4rGd4q2u4rGg4q-MReKwleKxpeKwjOKtjOKvgOKxqeKtveKttOKvkuKvruKwheKxgFDirKjispnigYLirILihYTisa7ispHira3isZ_irbDisYxG4qyJ4rKY4rKI4rGn4quk4rKc4rGr4quu4rKC4q6a4rGT4rKF4rKA4q2j4rG44rC34rGD4quj4bOC4rCD4rKB4quM4byz4qyz4qyb4rOB4rKh2p7ir6ZI4rKNy4Tgp67irILhvLPisqrirLbisZ7ira_isaHLhDHir4nisrHiq6Diq7fispviq6bir5bisYriq6nisb7isa_isKviq6Tis4Pir4nisa7isbfisrPhsp3is6NESVbirJnirJvis6ris4risZnisI7isbXisovisa3isbnis7XisIDirLzisJDirLjhvLPisbvisb3isIjis6Tiq4zhtK3isZvisLDis73is7Pisa7irKfis5HisbDisKzirILhs4LisbLisZPirY_irZHisabir7_is4nisa7itIjisILisqXLhOKvieKsneKzjOKrtuKzmeKyp-KziuKvvuKyi-KuguK0juKyo-KziuK0geKwueK0rOK0p-K0ruKwiuKwuuKsgeKzo-K0q-K0s-KsuOK0guKwl-K0reK0sOKzl-KwoeKvj-KttOKytuK0oOKquuKwvuKunuKzpeKvr-Kth-KvueKvvOK1iOKsleKvtuKtn-K1huKBs-K1ieK1j-KskeK1i-Kvv-K0muKwsuKznOKyvuKxguKwieK0seKwp-KztuK1g-KxgeK0s-KxheKyi-KtlOKtluKxieKynuKwpuK0luKvgOKyi-KsheKzt-KyvOKwoMuh4q6q4qyA4rOk4rOv4q-44rWO4rWQ4rWP4rWS4rGb4rCk4rWl4rGL4rKI4rOs4rCq4rSF4q-j4rS_4q-T4q-A4rWn4rGB4rGZ4rOEUOG_h-KwqeKxteKuu-KwoEbigZbis5viq7birqHis7_itLnitZritK7isYzipqnitoDis6Hisr3isrPhv4fitJnisrvirKXir6_isLvis5zisZriq4zitp3isbnitorirp7is6PitpbisojirYriq6PitqbirLLisI_itJZCWVTisZbitazitqLitKHisJXisZvisIPirJDitZLirpDisqvis5bir4zip4Tir6PirpbitJzMh-Kvv-KyiuK2t-KsgeK2muKzg-K2uuK1v-K2vOKzqOKvt-Kuu-KzleKxoOKvgOK3lOKyreKrvOGxseKthOKxpeK2uOKrveKthOK2u-K0nOK2veKvvuK3k-Kyk-KrlOK2muK3l-Kzl9Gg4rKw4q204reF4rKy4rGC4qyo4rS64rSv4q6D4raX4Ki44raZ4rW64qup4rau4q2j4raH4rG_4rS44qy64rCx4rSt4reG4qyC4bOj4rO74rao4rWM4rKI4rWX4rOl4rKHSOG5l-KYpuKnseKYqeKntOKYrDZE4qe44piw4pe7ReC0jeKnveColkTimLfPsuKoguGKoeKtguGOoM6z4qiH4Kes4rWT4q2m4qy94red4omN4q2E4rSL4rSP4rSH4rim4rab4rSq4rSD4rey4rWb4rWC4riG4rWW4rKz4rSG4rOF4rGE4rCV4rGX4reO4rGD4rWU4rG24rSc4rCo4riu4q-A4riF4rmA4riH4bWi4rGuS0VD4quDS-KXrOK0o-K3ueK3ueK4hOK2seK0nOK4t-KzvOK0m-K5h-KztOK5geKqu-K4ruK5k-KxteKzpeG_h-K4reK3v-K0iuKxueKzieK3kOK1kuK5p-KvvuK5ouK0ieK0nOK4iOK4ueK5q-K5mOK4tuKziuKyoOK5sOK1leKrtuK1l-Kxu-KzguK3seK5u-K3s-K5meK5nuKunuKzs-Kxm-K4vOK0hOKspuKrjOGzguK6g-KzuOK2pdqe4q6L4piQ4q6KVEniuYziq7Lit4Dit5XisYHit6jit4Litr3irrDitaLirZfisbPiroziro7itoTisrTisJnitaPisbPitJTiq6XisYjiupzisZXir5PisrXit4ziubziuK_iub_irKLisYXiuYXiup_iuIrirYjiq77itbDiuoLitb7isYPir7DitbTitbXitYjis7HirJzirJ7itZLiuonitKniurrir7Liurzir7zitZLis4firLXirqPitaniuZ3iuKjis53itZ7isrzitaritqnitazisYziurXitLLisrzis67is7Diu4Tir7riu4bir7viu4HitpPiuLLiuLLitpritLTiuLHitLrir6LirZrirZzirZ7iro9PR-Ksi-KquOKzjuKghuKqgOKgieG0n-GEleKshOK2v-K5iuK6keK5juCqiuKBs-Cwl-KrveKrgeK6muKsoeK0k-C8r-KtkeK1qeKygOK0gE3hs5nigbPhmoTiu7zirYjhmpDiuLrisLTiuL3hvr3iuqXiuqLisZPiup3iq4riuobigbND4rWF4qqz4bOj4rGi35Xhjp_hs5rNpULNu-Cwq-K7q0fir7niq4Piq5_huYLirI84RkXhmoY24rGjNOKuiOKqouGah0PioLDiqqbioLPiqqjgqYTgp7Ag0J7Fs3LJmeC7snDDmW3huazNtTrhtKst4r2JO-K9jeGyvuKThDvhs6Hhvb4tMTvhs7Qy4r2NO-G0juK9ldC0O8uQ4bOA4r2Y4r2XO-K9j-KauzDivaPhtaDhhJ_ivaPhtbA24r2N4oGV4r2Z4r2v4r2w4r2x4r2H4r2s4r2wwrDEieGlreGlr2ThjrXioLnFmuKgvOKgvuCog8qH4qGBwoDioYPhopbDmgdY4qGJ4qiY4qKBzbziqYfiopDioofipofiqZHippvioo7hhJ_iopDip4_io7ziopXgtJPgp6fRi-KiouKNguG6l-GxtOKmoMuh4qKg4qKr4qKk4bCPzorioq_ipojioqrioqLioqzhsZLioq7iopDiorHhj7rivpDioovivpXiorjgp6fiorripbHio6ripL3io4HiqbPhtqDipbjivrvhtp_ippPiqLbipb_iqJHipYfipoPio5Xio67io5jhto7gqKzipa7io5zippjiqKfiqJ_iqKriqJDipoHivrjgvZ7iqL_iv4fipa7io7HivqHio7PihaLio7TgqbnihaTipKDio7rip4XiqYzio77iqL7ipYjipL3iqZXiqJzipIzipIfiv6Xiv6fipIvipIbipLHipI_gp6ripJHiv5_ipJTipqPippriv6PipJnioaripYHipZ_ipJLiopDipKLivrHgqpHipKbiv6jio43ipKrioZTiqJTgqoTipJ7hv4bipI7gp67ipLThvr3ipLbipa7LluK_teKjveKii-KkvOKhv-Kkv-KppuKpq-Klg-Kos-KlgOKjquKhqeKliuKjoOKljOKZnOKlquKlieKosOKoneKlk82n4qWV0ZviqKPgqI3ipZnipZ3ipZzgsqTipJ3ipLDiprvipL3eu-Kmr-Kpt-Klp-KlqeOAuOKpt-K_i-KlsOKivOK_hOKjgOKpnOK-u-K-veK-vuKnjeOApOK_guK_kuOAvuKjrOKjluKmleKpq-KmieKkhOKhnuKpr-K-oeOBgOKps-K_gOK-t-KmluKjo-OBleOAleKmnOKikc-04Yql4qKvy5bihLrip5_iqbbip6HipqjgqLjiv43iqL3iprfjgLXio7bjgajio47iprXiqKjiprPiprnipo3iv5Lip4viqK7ip4Hiv5_ip4TipqPip4vip4jio4_ip4rio7_jgbTip5nip5Djgbbip5Phjq7ip5Xipr7Rl-KnmOC9peKnmuOBtuGOqOOAkeKnoOKmpuKnouOBpeKjnuKnpeKnquKnp-KhsuOAheKnq-KokuOApeKnrsuO4pin4pqf4qez4pir4qe24piu4qe54pix4KiT4riY0a7gqJbip7_PsuK4neKjheC0jeKohOKohuKYv-K_seKoieKnleKojOOBheOAg-K_g-KivuKok-Kkrd674qiy4qic4qiZ4qK-44CC4Y6s4qOi0LLgqorjgpjioZXiv5DipYbiooHiv47iqKniv4HiqKvjgb7jgb7jgrTip6riqLLipZLiqLXjgJrip7DipafiqLrivoriqZbipJzipqjipIHjgKvio5XjgZziqYTiqYbip5HQi-KkueCoquKmh8um44Ol2LjivpHjg5fiqZTOj-KhruKmnOOBj-KoheKpmtGP44GS4qmk4qmf4qWg4qGq44O04qmd4qmmzpTioqnjgpXiqYziqazjgY7ipLLiqIXiqbDjg7nippHiqbXjg5biqbjipY7ipoDio4_iqbzOgeKpvuKgh-KqgeKgiuKqhOKgjeKqh-KgkOKqiuKgk2Liqo3ioJfOh-KgmeKqktGU4ryf4qCfy6DiqpjioKPiqpvioKbQreKqntGUzb3iqqHiqbHiqqPQguKqpeKgsuKkss6z4qqq4qqsw5oQw4fisIPiraLiuITiuK7isZHirarivJfiq6Tiupbiu5Xiq5nit6zitoLisajis5_isariuqviub3itqPirobiuqfiro7itr_ir5virpTjhYPitJbitJLirpzisbXisIPirqDimJBI4q6j4raD4q6y4rC0zafirqjigZ7itozisYzirq_jhYPjhZviqrPir4Lirrbirrjirrrir4visYzirr7jhaTitoXjhZzLg-Kvg-KvheKzmeKviOKviuKzl-KvjuK3hOK2geK6suKrpeKtu-KyneKvmOK1u-KsjeKHouK1leK6tOKvoOK3tuOFv-K1gOKwveK5heK1hOK1s-K7heK7neKvs-K5qOK1jeOGjeOGjuKsreK1t-K1v-K4v-K5pOKyv-K1meK4gOKyiOKwqOK6uOKzrOK0g-K6iOKyvOK8gOOFuuOFrOG0n-KwoOKwouOGhuKvpOOGgOKwjeK4tOK0qOKwreOGluK5neK5reK5iOKxueK2quK3seK5m-OGreK1qOOGoOK1oOOGouK6oeKwm-K3jOK7leKxjuKxmeKxkOKyg-K8leK6qOK6g-Kzu-Kxm-K2v-OFgOK3mXjisaPjhbnjhbviuqrit7fit4jjhrTiu5jisYHisrjisZLjhZTiu5PitLjjhpjisbritLbitZjiuoThsp3jhZPisbTjh5ris6bjhrLiuLDjh5viu6_iq73is5DisZvisqrjh4vjhoHjhbHispfjhZHiuZXir5TjhYbjhb7jhqrit7jitI_iuKviu4Pjh6bisqDisqnispLisqzis5fisq_jh4_jh7Pis57jhb3itoHjh5fisoTitavjh6jiuZnit4nisLjiuabiuIHitIziu4nitJjisbnisqrirIzis47iv7DYuOK0jeKzk-Kuo-OHruK6tOK0ouK2kOKymuOFheOIhuK7o-OGoOOHleK6heOHpeK1vOKzqOKzuuOHvOK7kOOIjuK1suK7ieOHnOK6ruK6hOG0reKzqeOGt-K4v-OGueKspeK0gOOHnuK0teK0uOKxm-K5teK4r-OHuuG8s-K0jOOGi-KzieOHouK6pOK6n-K4uFDhs4LitJnjhrHjiKniur_jhojitJ3itKPisa7itKXit4ritKjhvLPjiI3isbzitpTjiZriu6Hiq7DjiLzjiZnjiZ7itLfis6biuqzjhqfitL3iq5zjhqTjhpzitZzisqLitofivJvirI3itYfjhpPjho_ir77iu5vjia_jibDir7fjiL_jh5zjhrXitpXjiLbjhp7jh5_jhqHitLjjhqPjhr_it67jiLjirLnitp_jiKjjh6_is4_htaLiq7_iu5fjiL3itbLjibLjibPjhpTiuaritb_itbnjhofit7rimJDiurjhtK3jipLjh7fjhYTjioXitpHirrHjhpzitofitonisI_jhaHjh4zis5nito_jh7Lit67isbvit7DitpXjhrbjh4zitpjjipjisJ3jiKzitojis4riuYXitKvitqvitqPitpzjirLjioTjhprisIPitq3iuoritp7jhZXjh7PitrPitrXisbbiu47it4fit6Disojit6Lir7fjh4rit6Xit6nRoOOIg-K1vOK4veOItOOHlOOHm-KrsOOKgOKznOOLheK3j-K3oeK3keKsieK3pOOIgOK3luOLi-K3gjPit5vjhZHji4Tit5_ji5jji4fji5rjhbbit6jit6fji5_isYzit6rji47is5zitpLjiLnjiZvjiqvjiobjiq3itL7itpriuZLjiJDitb_iu4ziuaPji4TiuILiuLPiurHjh6bjh7ritofiuIriuIzimIriuI7jgp7ip7Xil6LiuJPimK_ip7rRk-K4l-KYtOK4muK4nOKYueK4n0HiuKHimL7jh6vjhrDji73jhYnitKHiuKriuaXiuKzjjJriuazjiIzji5Liurnji7TjhqzjjIHiuZnjiL7iuLniuojisYXjiL_itKbjiLbiuYPisYHjirPiu5TjjKPirIniu7jiuY3iuY_iubTiuorji7njiajjhq3jiYjiuZfiubbisLTjhrPiuLXjjKfjiY3jirbjhrjjh5bjjLvjjKHiubHiubfjjYPitJDiraPji4jjjYTitbTjhpXiuL7jjYbjjY3iubPiua_jjYvjjYHisqbjh7rjhq_jjZXiuaPjjILjjKTiubrjiqrjjaTiuq3jibrjir_jjKnji7vjhrvjiL3jjYnjiYrivI_iu4Lhv4dH4rqM4qq94q6J4rqQ4rGR4rqT4quU44ue44iA4rqX4rOa44WD4ryA44WM442b4ruP4rqg4rqm4ryC4q2Q4ryT4rqb44eF4rqe44ez44eR44qT44mc44yc442C44yA4rKF4rqw4rmU44qB44Wv44qj4rWu44qJ4q-_4ruS4rKi4ruu4quW44mu44qO4qyX4rq-4rSf4ruf442s44e7446e4rq7446g4rWK4q--4ruJ4qy244u84rSJ4ruO4rOr4rG644qE4rqz44eq44qI4rWw4rO444qM44aR4ruc446p4qyU446k4ruD44mj44uU44eS4ruk4rC44rui4rS-4ruo4quE4ruq4qyG4rut4rKM4oGz4rux4qCI4qqC4rC04ru24qup44y3QeK7uuG_h-GOk-KBluKJjeK7v-OGveK8geKuiuK6pOK8heKwl-K8h-K8icuD4ryL4Y6T4ryN4rOs4rGF4YSV4ryR4rGH4ryU4q6K4ryW442P4rGi44ms4ryd44eN44Sg4ryhMOK8o-OLoeKwleOPiuK8qEHivKriq7ZG4ryt4ryv4ry2zb3ivLTjhKzivLbivLjjhLDioLTiqqbivLziuKTivL_Pk-K9guGWs8OaBXfivbPivYk64r2L4r2m4r2Z4r2S45CX4r2V4r2i4r2N4r2b4r2eN-K9nuKFo-K9oeGymeK9nuG0uuK9iOOQmeK9seOQq-OQrOK9seG7j-G6qOK9mTrjkLJpO-OQsuOQl-OQreOQuOK9r-G8sN-V45Cx45Cz45C145CyLeOQueOQrOKCkc22OeK9seG-tOKCiOK9lOK9keG0j-K9luKGgeK9nuOQpuK9jeG_nOK9nOK9rOG_sMuP45GP4r2Y45GE4b-c45Cq45GC4r2v4oah4baB45GKOOORjdGv45GX4r2Z4oGv4r2VzbvivZriianivZjig4TivaPigILjkYXivYzivZrihLvjkJzivZ7hs6E04r2j4oKI4L2l45GL4LKh45GNzb7jkaTivY3QsuGzgOK9ljU74oO445GW45Gs45GZ4b2-45Gb4r2Oy6HhvLHjkbPihLrjkoHihYLjkZbihYrLkDvihZLjkaHNs-KCtOOSleG0q-GOq-K9muKInOK9nOG_heORq-KDhOORhuKGgOGEn-OQouGzoeK9mOK9juG1sOK9leKGmeORt-KJkuK9mOOSp-ORreG9vuORr-OSiuORnOOSteG5geORs9-V4buQ4r2n4r2j4bSPMzviiJvjkoHij5bivZHhs7TivazjkpHivazinZ_ivZ3RkOKPveK9quKFm-ORt-KCgOOSreORjOOAjeKIveK9o-G-tN674r2j4omo4bSP45Ci4r2j4omx45K-4om445K64qKS4bOA45GU45Cv4r2045KI45Gw45Gc45C245C045C245GB45K145Cs45Cv4r2V45GC45C2bzvjkLvigojjkLfjkL0645Oy45Ol45C34o2C4pe845Cn4bSr45GG4qe145G04bSr45Ci4bSQ45Kw4o234r2p4bOi45C14o2C4r2e4o6gy6TjkJ_djuOSgeKOveOUieK9suOUjeORp-KTpOK9mOKZnOKJkuK9puKPvOK9ruKQiuGymeK9rOOAqeG_seK9jeKQquOQpuKQtOG1h-OShOGyms2v45KE4b-wzoHjlKvhsr_htJDjlKPika7ivZjPsOG_heK9puCyi-K9ruKSjuOUreCjsOORuOOShOKJvc6P45S94oOb45CZ4pOD4r2h4Ki345KB45K645G_4pOkzbzivZnRn-OSsOKUguGym-K9r-KhmeKIkuOSguG2geK9oeORpuOQteOTmuK9reGKpuK9sOKVlOOQps6D4o-l4r2V45WP45WL45Gm45Gh4paw4o2E45Ko4r2W4paU45Cd4p2fzpTjkKvjlaXRoOK9mOKXgN2M45KVy4_jlY_hs4DjkaHivZnina_hhJ_jkYbil7PjlbLil7vinY7jk6zjkKvimZbhsr_jkYrimZzjlY_jk5biiYnjkLDjkrnOgOK9quOVj-KCgOORhuOVvuKSmuOQquKYqt2M45GG4r2w4pqy45KB4Y6u4r2V4puD45KV4oqE0anjloDjlp_jlqDivbHjkJvjkYrjkJ7jlL3jk6HjlKjjlJHjlIDjlK_jkaHihYrhv4bjk7PiiLbjkpXij6XivZ3ivaLjlbnRqeOTpuK9sOKehuK9tOKGgeOVt-OWgOKeuuOVh-OQrdGT4oi245K-4r2v45KI4r2w45OxwqzgpohF4LOQ24fhjrfhl67inbLMqdyzwoPCr-KguuGlq9KFyavemcSEwqbhiqbQisuhwq3Ilc6kxLDcs-OXmOGAk-G6qNGpOMKpxLXigL7jl6PhlJzipojgqKzCqMmkx5nhsJbCg-GioeKEkdyV4baONcK34oSN4oKY4bCi4bm84by1KeC3seGHom7Jq8ak4aK527zipqgx4qC9ZeClumN5QeG3vsmOecKCwqXgs5bFmsSgKsKE4bCq45iKxJQZ4bKA4ZOn4Ly94Kyz4Kaa4qyM2LXCotCK45iYx7Bn45ib45idxJgD45igx7rjmKLgpafCos2-xp7jmKfjmKncreOYn9mb4rWU45iz45iabseH3K3DjMKb4LGW44S84quIReOYuuOYqG4I45iq4KKF4Kaa4q2445mFxJQF45iq2JHZkuK3l-OYpuOYu-OZj9yt45mR4L-04qyMIOCln8imXeGmojHjmY1u45mW4ZOn45mYxqvirpXjmZTjmYYe45iq4YmN45ih4qq44aaiMOOZoRvjmKrhoofjmYviq7njmaEU45iq4aOX2ZLispzjmajjmY7jmZDTuOGzveOZn-OZoeOZo2TjmaXGpOKzoeOZoeOYveGTp-OYv9O44q6C45mh3qjjmKrguZrZkuKxkeKrkuOZvW7DjMKD45qRyJ7jma3iqrPjma_jmo_jmpnjmL7jmpvHuuKtuOOaluOamOOakeC0pOOanNOH4KWnwqPhto7jmp_jmqfTuOOKieOaruOYvuOaqOOao-K0heOasuOai-OatMar446b45q3xI3jmrnJreKwruOapeOaoOOauN6M45iv4Y-oKOOOvOKsluOavOOakuGAkeKzh-ObiuOavsKj4rSf45uO07jirLHjm5LIu8Kl4rKG45uV45q14rKj45uB45qv45qp4LSB45uH45uI4qyU45uZ4YC345uU45iZ45mG45qm45qz07jjm43jm6bElOObqOObg8i74Lyu4Zud45us45qX45uC45q94KCr45uY45uz45uu45u22ZLit77irLzjm6PVuuKuguOaluOYnOOYtuOYrOCxluOZmiNbJOOZnuCwlEDjkIzjnI7jnI_jmbDjm7PjnIPjmJ7jnIXjmbXiq43jnILjmKrjmLfhrpTjmZrjnInjnIvhj6jjnI3jnJDjnKHgqYLjnJjjnITjmK3Fp8Kk45uFyr_Lv-OZoeOck-OYq-Ocpsak4bis4rSU45yk45yU45yv45yo45mu4ZS745yR45i0buOcreOcmuGNtOK8gOOYk-CnhMKBy7_hl64u4p-_4KeEw5lq4qm944-O44SR4qqD4qCM4qqG4qCP4qqJ4qCS4qqM4qqP4qqO4qqQ4qCa4qCc44Sg4qqW44Sj4qqa4qCl0I3jhKfioKnjhKrioKzjhKziqp_jkIjgo7vjhLEz45iT4qC6w5wCL-Ocs-OcruObhOOct-GCkOOYpDDjna7jnL3jnKfjnKnGo-OYseOcueOYu-OcvOOcleGNtOOYueOckuOcmeOdvuGSj-OZgkziq4njmaHjmYjcreOZiuObmuOZoOObs-OahOOahsKm45mT456O45m_1pvjnJzhs73jnJ7jnKrjno3jnLrjno_goKvjmafjm7PjmarcreOZrOOYruOdseOcquOdu-OZhuOZstyt45m0456M45m345m52ZvjmbzjnpPjmZfjmoDIpuOaguOesOOZpOGjt-OaiOOegeOcpeOajeC8r-OdteOeg8mt4524ZcKhNOOcrOOeguOcr8Ks44ei4ryW45-E456645uw4q6Q456945yvwqrjnpbjmZ3hpqIy45-K45y0456d4res45-O452w45qd45y445-V452vyLvjn4fjh4Tjh5lE45-Z45ue45iw4q6g45-d45221brirqLjn6jjnr7CpOOapOOeueOfluOfpeGWoOK-neOFnzPjn6zjnK_CouKuq-OfpOOZmeKquOOZm-Oel-GmouOftuOfsOOfnt6A4q6V45-33ozjn6_jnLrjnb3jnLXjn4DCqOKuteKzmeOFqeOghuObsOOfuuOgguOfqeOfkOOfveOZnGfjnpjak-Ofg-OglOOevsKl46CF46Cd45y146CI452845-F45-a45qq4Zag44Wy4q-G4q-I46CR4KGY46CT46CJ46Cl456V46CX45-_4ZS7NeOgrOOZpuOfmOOgoeOessmC4ZS745-U46C54a6U4rOh45-74523456k2pPjnqbjmLXjn7HjnqvjoL7jnL7jh7XjmpYv45iq1bLgoZ7jmoHhlLvjoIHjnLrjoY3creOhj-GJsOOhgOObs-OhleGTp-Ohl8Wn46CW4qqz45--45-S4ZS7NuOhjOOhjuCxjeOfkeOgmeGmojfjoaXjoZbejOKtvt6BW9uo46Gs46Gc46C64aaixoLjoZrjoabjoL_it7fjobNk46Gd456_46GD06_jmLLjobjjoa3jm5biuIXjmaHjoZvjob3joIfjmbbjooPjobTjnJYz46G846G-45y245-b45uG45uh45ui46KM46KJ4KGe4qyx46KQ46Cm45uf46KV4qyT46KH46G54YCR45ul46GU46Kh45yn4rCu46Kg46KE452_4rim46Kb45-yyr_CosuQ46Ko46KN46Ki4rCG46Kx46KY3oDisb7jorXjob7Co-OajuOil-OiuuOcgeOiveOinOOYsOOiguOipOOiqcar46KG46OA45yW456a45i746KI46G-45uX4rCI46K507jiuLzjo5Djm5bjm7jjo4TjorLFp8Km4ryA45qWSOOYquCkgeOhkOOes-GUu-OgnOOcuuOjnNyt46Oe46GY46G745uz46Ok4ZOn46Om46Ge46Go46Ca45-BOOOjm-OjneOhp-OgsuOhouGCkMKhOeOjsuOjpeOhruKttOOhsOOhsuOjqeOjs-Ojn-Ogu-OjtzjjmaHjo6pk46Os45qH46Oo46Oj46SB456j46KT46Ku46OD45i746SH46SJwqXjo4fjpIzjo7vjo4njpIbjpI3joqbisKzjpJrjpJjjm5rjoL3jpJfjo6vjmLjjoqvjpIDjpJ_joYLjpI_jnbnjorDjpKbjpKPjopnjorTjpKzjpIjjm7fjo4_jpLDjpInjorvgvK_jpJ7jpK3hgJHjor_jpKLjpLHjoq3jnbnjpJHjmYbjpJPgoKvjpJbjpJLjpJvjmr_joovjpLzjpJTjorjjpLTjo5HisJTjpLjjpL3jorfisoDjpY_jpInjo5njj5zjmqXCn-Oegtqu46SC4aai46C145u546WY45yE46Wa46On44aH46WX46WZ46O046Gg46CY46OvwqLhhJ_jpaTjpaDjo4Hjo7fjo6LjmLvDjOOln-OclOOloeOknOKrjeOaj-Ols-OYq-OltcSr45-I4rGV46W446Wl4KGe4ri845qWDeOYquC6o-OkvuOigeOhheOZh-OYquC0sOOcluOkoeOZleOYquC7sOOfjFTjmaEC45iq1ofjmZLit6XjmpbjppXcreOml-OfvOOlp-Ogs-OdsuG-veOmlOOmluOfl-KrnEnjmpYd45iq4K-P46aH45yr45uz4KCN3K3hi53jpJnjm7MT45mr456u46GL45uz46ab4ZOn46ad4YC346GR46ah46OK45mG46a5ZOOmu-OkiuOGh-Olv-OlreOmjeOnhuOltOObk-Okr-OcuuOlsuOmgOOlkeKwl-OnieOluuOiiuOlt-OlnuOnj-OltuOmv-ObreOlueC8veOlu-OfoOKyueOfouOnkuOnnOOksuKwl-OlrOOniuOmh-Oir-OmieOnjuOnh-Ois0Tjp6ED46W746OO46eR46eW46er45q64rS246eu46ew46WL46eN46eb46ev46ej46eV46e646eX46WH46e-46Wx46e746ed44ei4q-r46e346e9MeOnpeOnk-Onp-Okq-Onv-OntNW64rC246iI46OU4rKA45qWFeOereOmh8Kp44iYy6HjnojjmKrboOOniOOetWThj5zjm7DispHjpqPjppzZm-OekuOcuuOngeOng-Ohn0jjoaHjoanjmLDLj-OopuOmuuOmpeKrneOali7jmKrEpuOmrOOmiSvjmKrgvL_jprLjnLok45iq4Kq545m746a346iq46ak46Wb46ix46aO46eA46mI46Wi44e346iT45ua46GT46iD46iAwqPjqJLjm7Mj46i-46eUNOOalhzjqJjjpI7joKfjoq7jqI7jmLsM45iq4Y-E46KO46id3K3jqKPjp6zjmoPjmKrgobHjqKTjppPjprjjqY3jo5jjqKnjmLvjqKvjpabjqK7jpajjmKPRkOOos-OnguOoteOmp-ObszrjmKrRu-Oou-OZoTfjmKrgpYrjqYDjmLsw45iq3abjqYXjhb3jpprjqbLVuuOmveOiruOpu-OpseOop-OhuuOnheOns-OnpuOhiOOoj-Oqm8Wn46ee44eY44ej46et46qa46iM46eQ45yX46qk46ei46iN46ep46iE46eL46qj46qd46ql46e14rCS45mhZOOYquGLveOcljXjmpZf45iqYOOlruOemeOZoVHjmKrFguOcluOlsOOZhk3jmKrZs-ChnuObq-OcukPjmKrdkeOqt-OZoT_jmKpi46qt45mhPOOYqtOx46mv45qWJ-OYquGvseOpn9i146ia4Keu45-d4Y2d46uD45mhFuOYqsa846mv45mhC-OYqnbWiuKqv-OpqOG2reOoqOOmmeObs-OeieOrseOgseOmn-OjtuOqlOOrhMSU46u14ba846m-45uc45i-3q_jopLjqaDjoYTjmo_CgOOakeC-rOOqieOZhuC7uuOYvuGgnuOqjuKrqOOaluOrveCru-OpieOmoeOru-Omityt46yT46mO4q6A46mQ46qx4qyD46ycyanjo5XjqZPjqJDjn67jpYjjrKLjqp7jqIHjqIrjqqjjp7zjp6fis5njrJ_jqZXisIbjqIvjqqnjq57jmLDjqaLjm6fjqqzjrIrjp5rjqIDjp7HjrJ7jrKrjpbvCo-K7meOsruKzh-OsseOsq-Oss-OdsuOsteOsueOokOOsr-Ofo-OsveOqveOkv-Oqq-OsuuOlhOOstuOsuuOsoeOtkuOso-Oip-OtjOOkruOti-Oqr-OssuOkqOOshOOmiOOsn8Km456A462b462E46eY46yf46y746yW46eq46yn46y746mS462V462q46e546ym46qw46yg46WS462Y46Sg46yf46yk46y8462j46W7462h46Sl4625462N06_jrYfjmpfjrLfjqavjrbTjpbbjrajjroLjroXjmaHjnqDhk6fjqarjraXjm7Pjq6bjnqnjp5TjrazElA7jmKrjpbvjrbfjpZ3jnLoB45iq4Ye-45-f44mG4ryD45qWY-OYqt2646qE45uzXeOqu-OnlOOpi8SUVeOYquCvguOrj-Obs-OrgNyt46uI466D45y6SuOYqsmt2ZLitZTjmqXCieOakeGjv-OsrEbjmo_CheOakeGZseChnuK0n-Oaln7jmpHhk6TjrIPjqbrjrr_jm7PjrIzhk6fhpJ_jqafjm7N145qR4KKY46mW45y6ceOakeGhpeOimeKsoeOZoWrjr5njqInjr53jr5_goZ7jorzjp43CqeOakeGRhOOsuOOal8Kh45qRwqfjqZrjmo_CneOakdeu462Z45qPwpPjr7Hjp73jrpLjmpfjr7XjmL7jr7LjpLrjpLfjroTjnIDjr77jrb3jr6PjsIHjrbDjrZzjsIDgpaTjr7_jpLbjsIjjsILjr73jsIvjsIXjraTjsIfjrabjra_jra3jrbHjravjsJLjpLPjsIzjrJ3jr7jjranjsJXjrZTjrYjjrKfjsIrjrK7jr6TjsI_jrL7jpLvjsKTjqbfjqK_jpanQseOtg-OuluOhr-C6kOOhseCijOOwrOOhteOoseOtj-OokMKo46GZ47CZ46G_46Sp462f46-_46SV46iH46-_462346eZ466B46iA462346KP47GA45-Aw5njm6Djop7irJDjrK7joprjsYfjooDjsYnjsYvirJHjsY3jr5zjsYDjrZfjsLnjrbvisLHjsLLjqqrjsY3jp4zjsKfjqJTjqrLjsInjsKPjsJTjsIbjsIrjsZvjrYXjpJDjsLXjrarjrZHjsJ_jrbHjsYHjsJfjsaHjsLnCo-OjkuOwveOwnuOxg-OokOOlleKxiOOirOGAkeOqk9qTN-Ojk-OsmuKvpeOxu-OtneOanuOjiOOqnOOji-OipeOtsuOnsuOjluOituOauuOwv-OyjOOjjeKyhuOyg-OwuuOtnuOarOOonOOyhuGAt-OaseOymOOyiuOoguOZhuOjjNO44ruZ47KT46-K4LCU47GK47GL47KA45uk47GV47KQ466o47Ki47Cu4YKQwqVbzK9d46O646S546a846Og46O3OeOlk-Oet-Oki-OlheOkp-OylOOetOOlieObt-Oyj-OyvOOytOOogTLjsrPjpZDjnKfjsq3Kv-Oyr-OyseOxp-OyteOkg-OqlOOumOOxn-OygeKqveOapcOs45qRw7Pjrb7jpq3jp43DuuOcmeGlpOOnlOOsqeOcusSZ05_jmLYBx5vjrqTjs6IBGOOznuOeouOnmOOalsSZPuOznuGAquOnp8-645mhxJkp47Oe46uo45ua46G347Op47O447Olzp3jooXjs4LjmYbjs7fjs7LWiuOgruOYu8SZJeOznuOrk-Ort-OpuOOmoOOqlOOxv-Obs-O0ieO0i-Orv-O0kuGVquOznuGsoOOzqOO0iAHjrrXjs6Xjrq3jqqbjrJbEmeO0neOYngHjtJ_hgLfjsaPElOO0ouOznuO0puOwkeO0luO0o8SY47Sl456747CO47SD47Sc47Sr47Sy47Ov47S147Se47Co46m546ix47O847Sb47SvxJnjtKzCpOKtvuO0uOO0iuOzpeO0jOOxvOOytuO0kOOztgHjtYbjtKTjtYjFp-Owt-Oyu-O0tOOvuuO0pMKV462-46eo47WM4a-I47OlwpHjp5TjtL7jtLTjm7XEmeObj-OvluO0m33js57Cl-Olg-O0guO0qQF447Wn46-347WM47Wt47Ol47Wo47CDUOO0uMK547OewrvjtZjjpYDjtavCreOznt2e45yW47Wf47Wr46-m47Ol4Z2-46-z47SWwqPjs57CveO1qeKwv-O1jMKe47aJ46e9466p4ZmvAeO2juOzpeO2iuO1tOO0uMOn47Oew6njtZjihaLjtYzDm-OznsOl47We47WMw5fjs57DquOrlOO0lsOR47Oew6vjtovirIjjtLjDjuOznsOP47Oa46aJxJnDieOznuGVhuCmmuOLgeOZhOO0lsOE47a246-g47a747a947aX47SWw7_jnJkCyKvjrKxC47WMw7vjs57DvOOyq-O0luO3iuOYtuO3heO1mOOxjOO3juO3hOO3huOiouOyqeO0m-O3j-OYnuO3keOmkuO1jMO347eE4LaG46aY4rKs47S447ef47eQ47eh46ae47SO46u545254Yqm47ee47eg47SV47OiAhDjt4Tjs6fjsajjt6vjt4jjtJIC46ur47eQ47e046W247aR4YCF47e647eb47e846iR47Ge47SD47e547ez47a-47ew47iAxJjhkIfjtLfjtJbjt6Xjt5vjt6fjs4_jqbrjpIXjuI7jt67jqpjjh7fjs68C46ub47eQ27zjt4fjs7YCIuO3hCPjt43jt7DjuKHjuJzjt5Ljr4zjuKXjt4TjuJ3jt5fjqq7jtIjjuKDjuKvjtIbUsOO3uOO4puO3m-O4rOOps-K3peO4n-O4teO4i8iO46-p4YCF47i74YCF47i94Y2046m047iF47mAAuO5guOjreOjteOosOOmoeOyuOO4tOO3hOO5iMmp46Cg47iq47eQ47mQ47Gm47e4MuO5j-O1mDFD47ifLeO3hOCzseOmjeO4meO5nuO5lOO4qOO5neO5meOvm-O4ruO4heO5o-O3m-O5kOOfueO4s-O3sOO5q-O4vOOrsuO3o-O5juO5pOOslOOqlOO5jeO5k-O5rOOyuuOqmeO3sOOuiuOYq-OmkeO5g-Ors-O5vuOeguO6geO5ieOruOO5i-OpoeO2swLjub_gvL3juobjuZHjoLjjt7Djq4bjt5DYhuO0muO4heOzseO3kNmq47Gg4rKj47if47qY47eb47qa47CN47qd47eE47qg47Sn47CE47qX47qj47Sy47qi47qZ47iN47ew47qe47iL47qk4bCK46Ou46m647aB4ZmvAuO6ruGAheO6sOO1g-KttOO4meO6jQPjuo_Co-OxveOtv-O6i-O6veO6j-O1kuO5veO4r8S347eQ46ut47aA47iZ46q047eQa-OzmuOxguGAheO7juO3m-O7i-OtteO3uOO7lOO4i-O7luOsneO7kgLju5nhgIXju5vXneObveKrgOO4n-O7nwLju6HjuZbjt7DjtZvjt5vgurHjpqzju53DmeO3hMOh46eU46Gr47e4wqTjt4TDouO1uuO6i-O7tuO3kOO7uOO0geKwv-O4meO7u-O3m-O7veO3teO7guO4n-O8geO4i-O8g-ObpOO4hOO0qdOq47u347Og47yG47yO46OJ47yA47yR47yEw5lA44OV44Kd4piq44yK4KqK44yM44Ki4riW44Kl4pi14rib4qiA44Kq4qiD44yWQeK4ouOCr9i447yQ47u8466o47yr47yC46Sk4rCx47yu47yI47qs47iv47yH4YCF47yJ47K-46ix47mc47u147yU47yK47mp47yM47y2AuO8uOOxheO8suO8t-O8reO8vOO8rOOuuOOtvOO8teO8veO8ueOthuO7uuO9jeOtiuO9heO9guO2kOO9k-O8uOOwoeO9iOO8r-O3geO3sOO9geO9g-OfgOOduuO9luO2rOOtmuOYuzHjmKrJuuOxnOObs-O4m-GTp-O5oOO7l-OcuuO5v-Oro-ObmuOsluOmr-GTp-OouuGAkeOxtOOcuuOuj-GTp9KT46aB46WO45uz46aE3K3jrpbjsZfjmLsG45iq0r3jvYrjvLHjvZnjvLPjupvjs6HjvYzjvYnjvITjvaDjvonjvYbjvofjm77jt7jCkeO3hOO2puO4vgLjvpbjt5DjvpjegOOxrOO6teO-m-O3m-O-neO7nOO4meO-oeO4i-O-o-O9juO6iuO4n-O-puGAheO-qOO9kuO-leO-l-CxluOPlOOPluO4n-Ozl-O3kMOt466R47ifw6_jt4TDsOO2ouO3uMOy47eE47OZ47uM47e447ur47iL47ut476P47W747q147-F4YCF47-H46OG4q-r47iZ47-LAuO_jeO-qeOsheO_hOO3hOO_k-Ott-O3vgLjv5Hjv5PjsZnirLzjv5Djv5fjtZjjroDhgIXjv5zjqq3jv6Djt5Djv5jjvZ_jv4njv6Tjv6HjvpPiq4Djv6fju6zju7njuJ_jv6Xju77irIjjv7Pjv63jsofjuIXjv7Tjs7vjv7fjv6jjvYfju6rjv7jjo5jjrrnjv5bjv77jvajkgIDkgIXjrrPjuK_jv7vjpbbjqrjkgITjv7Hjp6fjt5PkgIfkgI_juK3jv7Djv4bjuaXkgI7kgJbjuajjv73kgJPjt73kgJvkgJnjoqrjsZrkgJjjv4zjv6LjuovkgIvjuIPjvL_jv4rkgIHjqIHjtKHjv5vkgKrjv5nkgJ7kgKPjv65F5ICV5ICx476P47-j5ICt5ICI47y-5ICw47-S47655ICi5IC846ig5ICS5ICf5ICC472L47-65ICu472f5IC35ICm476v5IGB5IC146yd47OS5IGF5IC547St5IGL5IC_47qh5IC-47-T472Y5IGS5IGW47So5ICp5IGQ47up5ICK5IGG46KA46eo5IC05IGT47KE46OC5ICl5ICq47C-47u_5IGV5ICk5IC747-Y476C5IGP5ICc45-q47295IGY47iI5IGe5IGQ47Gv5IGq466u5IGz472847e35IG646qm47ud5ICm462347q047-s5IGc442yU-SBrOCxjeONtOK6j-K6keKrheSCh-O3ouKtr-OrsGTjnovjro3jnpvjnpTjuoLjubTkgpTjnrHjtI3jsKnjmKPijYLjqazkgpnjoITit6zjmaHjubHSqMi7wq7jjb_jjonkgLPjm7Mq45iq0orjupbElOO9qtyu47yP45uz47Or3K3goJbkgqXkgqfjj57ivIPjmaHjupPhk6fjq4LGhOSCpuOPnOOOgOOaluO0r-OrjuO8hOOzm-OYu-OrjOOyveOlleOqj-OooeOahuO7gOO1iuOkquOvuOOenOO4l-Osm-SBuOSBlOSBveO6peO0s-O8jOSBieOwpuSBr-SBguO_lOO7guSBouO_qeSBoOO_q-SAuOSBsOSBqOO_tuSDluGAt-O9t-SBteSDp-K4heO4meOvh-O3kOOsguOfgOSDh-O4heSDseO3m-OsguOgo-SDtuSBn-Owu-OyluO6i-SDt-SDn8Kj47Ka47ew5ISA5IGM47OF47if5ISF5IGj46yg47Wq47q15ISJ5IGt4rSF5IOw5IO8462e47GR47GS47ip47iv5ISO45uq4qya5ISI5ICq45uQ4qye5ISb5IGc46Kj5ISX5IGn47G24YCF5ISY46uD5ISR5IG247GI47Kl46Ke5ISf5IGw46mV47eY5IO75IGc46uK5ISi5IGQ45ux5ISt5IOf46y747ud5ISm4Y2047uj47a65ISE5ISc5IOd47SpAwPjnoLgpJPkgq7hma_khYPkhYXkgrLjs6LkhYnjnITkhYbkgb7js7bkhY3jnJTkhY_jso7jtozjtJLkhZLjmKvkhZTjspzjvozjtIPkhZjgvL3khZrjsqPhgpDkg77khZHkhYTkhY7jmrDirIDkhaTkhYrjvovkhankhabgoZ7jsqHkhZfkhaXkhZPjrb7khJTjsZLkhazkhbLkgJrjt7jDvOSFquO0oOO4n-SFuuSFreSDl-O4r-SFvuSFt-SGgOO4heSGguSFmeO6qeSFueSFu-SDmeOzjuOqkuSDkNOv4b-G46yf47uG46mP47G146e25IaU47Gx47OT5IOZ47Ci456847GA47OKxqPjs4zEsF3gtYXgo6Phsb1JxInGt-C1p8ab4YKk45ez4aKi45e_4bCN4qKlyZnjl7nijK7jl7vhr7As45e-45ev4bq34r6s4aO44KKw4KOBwqjivp3hsbPOs9-H4bavc23gvqzkh4Jt3LvgtYbLmuGQkMOaBMK4eyLhrrXGjHLhspjkh4_hoIDhh6du4bKYIjAuNi4xK-Czl23Jq-KYgMuI0LXPtTQifSwixILJgXXPheSHmVPhrpbih5PEqOKYmiLgt6Pkh5Qi4KKa4bKYW-SHj9K_5Ie8XeSHq-GvkOGxouGvk92U4a6Y5IeZ4a-Y4a-a1bnkh7bIs-SHmeGxq-GzheGvoeSHk-SHquSHvtOs5IiA5IeryLvkh5nhoYDkh7bhiKzkh7zkiJThsKbhsZvFq-SHmeKEj-SHtuSImDoi5IiM5Iih5Iim5IijfeSIgSLkiINl4a-54bGk5Ie15Iim4bGn5IioxKrkh5nhhoTkh6ks5IiUxbXkiJ0i4bC55Iig5Ii35Iiq4oCJ5IikxoTkh5nil5fkiLZl5Iii5ImE5IiT5Ii_4bGa4bCX5ImCIuG8teSJhcWn5ImH4oKh5ImJ5ImL4Y635Iep5Iit5Iil5Iiu4oyu5Iib2b7kiL7kiYDkiZDkiYrkiKbgsafkiZTkiaXkiKfkh6vkiI3kiabhi5XkiZvkiILhr7fkiLDhsaPkiIbkiLMi5IiJ4bGH5IiL5Imr5IipIuSIueSJjeSHvzpb5Imc5ImG5Iim4KOA5Img4KyA5Imi5ImP4bGc5IeZ5Imn5IiX5IqD5ImqIuSJrOSHuuSJruSIrOSJsOGxgOSIheGvu-SHmeSIteSJuuSJkeSJveSIreGxt-GxuWPkh7nhsbzEiHPkh5R95IeqIuCzj8eZ5Iqg5Iqi5Iaj5Iqk5Iqm5Iqn5IiC4KOjxprJgeSKpTrkh4_kh5Hjl5DEtlTekOCjo-SHueKGrOKXjuSIkuSHq-GygVbhh6bcs-SHmcm-4bCE4KKk4bK85IerxJNi05THqcac5Iqm5Ier5IeJ4KeE5Ie54bCz4qC64aKu5IuIcGbkiqXkiqjGl8aa5Iei4bO65Ie54aWnxoxk4bKY0JfamuC0tyLhs4XgoLnhuZUw5Iqoyofbh3Dhrp_kirXkiIDkiqjhr4LjkI_ki5Lkirfki4HhuIbkh4_inpfil6zkh5nLg8uI4Kigz7vPsOGFp8qF4YSc4Kig4qmF0YPio53huqjRpeCoquGPtOCoueKgoeCpuNCq4omoz7jNu8uXy5PNvdC6zbngs4Lki6fkh6vPk9qa5Ie85ImSenot05R34KOe4KqF4qCx4Kms4KqAyoXLkOCqoNCZy4_Qk-Cps82x4byy4qaN0LDgp6DiqIXhiqLgp6DLnuKqhuCog-C9rOGOq-C9pMewz7jOhMuX5Ie2ZNqgYt2FaeSLnNqbUW1kVzVMSEFCesWnQUdS4qyATnBEd-Cmp1FRc-Kyr-KrhzJnWFN4V0djemZUdG1Z45iOIl3kirEi5IeW5IuH4bOAfcen4ZWjTMqBzK_PqeG9m8-FwpLChsKlxJHkhqUD4bCC4Y2hwrPhvK464bK53rngo4DhlZTht6Pgo6PFl-G2l290y7_gr4PEheCxp-SOiuSOjGQF5I6P4KOT5I6R4o2e5I6T4bWc2IDgsobhvorkjpfki53kjpnFg8mP5I6dy6nIs-OXqF_ihI_GrMWr4LqZ5I634LGnwoPjl6_imoTih5PJgcKnxZ7YquSOrOCxp-GeptiL4bei4r27xpzjp6jkjrfihI_kjr_imIHEiMeq5I-ExK7kj4bhkbDVrOGwoeGvsOSPiceZ5I-L4a-vwqLOgMKn5IqqxZThsbrgsobZg-SKpOGHpOSLueK9gcac4a684byuwoHJuOCpluG1heGul8Sow5oDGMaVyKbbh-C1oeSHs-GumCBe5Ieb5Ied4r2mCgrhuIvJpeG3k-G4geG2uuG7lOKfrOCjgDvhsrXihrXin6zhoYDkkI3htLPkkIPhtYvhr5_kiJHhtZDihJnhtZPhs6rhtbTikJ7htojhq5_HmeSQkiDioLbhsrXin6LihrPin6TijLDin6bihrnihJTijLbin6rihr7hvpfinZriip7ihJ7hs6rijY_kkKHijJbigpngtaHkkLUg4o2kxrfijabkkLnik6fijqXijofijpbijqnijqvkkJrinL_inZrilqHNkuKPhOSQueKgtuG8j-OYj-GyiOSRheG7iOKRneKQnuKRoOKRjuKQoeKQo-G8keSRkuKRn-KbpeKRoeKSheKRo-KRg-KMoOKStuG2huKSuOKYoOSRm-SRleKRguKSreGzquSRjOGyjuKUlCDik5nilJbkkZDhtLPilIbilbbkkYvhs6rkkazilYLilrbilbnik5rilrnkkbDhv7TkkYfgsafkkYrkkaninpTki6rkkbzil5PigIzMt-KXluSQkeG8keG2hOKek-KeleKXpuSMgOKapOG5huKXv-SPkuKYg9qJ4pqH4piH4piJza_imovimI7gu4zimo7impDhvorimJbimJgy4pia4oa24oSR4oygKeC1oHbgtaDgpavgtaEp5JC54p-V1IHinonkkbThso3kkKPioLbgv5Hhlqjhl7_hnbrCvOC8vdKX4ame4Zql4ayE4Yiq4ZSu4a2O4Yiu14gI4amv4Zae4YKO4ZiT4Kuk45eVyY954YKXxrcWyIzgt7_hqZffmuSSuNKvBMOE4L674Zav4aGUcuC_o-GppuGUrOGinuSTguGpqM2W4aKa4a-y4Yiy4ZiQ4aSZ4Yi14amz4ZiUwqfguqXhrp_gtYPhjYwj0qbgtobhq6bhkaDgrqgJTOC8veGokOCuruGAheGoktuezI3hq7HhlK3ElRfhq7ThlIHEjOGJjeGtn-GoveGtoeGtv8ON4Zam4au94Y2X4aqGMOGdouSHn-GHveGph-GLhx3hgLbVuuGdqsWhIeGttOGjnuG4jOGttuC_ueGBgcm447ij4YGe4YGG4L6Z4L6b4Kqv5JO4BuGmi-GOv-GBkeGgqOGPncaR5JSc4YGw4YC-4YuV0qbMjeSTtOGqrMqLw4bhrabhroLkk7vSjeGFguGPm-GqteGoqWvZjOSPmOGgmuGLjcKA0qbhoKnklKXhgaDklKjgpIjgpInDvsiO4YGP5JSu4Yyz4LaG5JK_170i4Zqt4YCR4KKayIzhh77klIjhnZrhqL7gu5DhqI7DvnrhkYXDikHDqsKqyrfhgb3fpeGtreGRjeGVs8ap5JSY4ZW34KSb5JWZ4ZOj4amP45-f5JCF4Z2x4a-K4ZW_4LWwxIzgr4_klYzgvrTgvrPgvpzDiOGtpuC-vOGMhUpL257ho5fhg6nhoo7hi5DklbAe2rDhkpfgs7Mc4Y-J5I6m4KK24Y2txoDCkxodI-C2pOSLpeGWkeGQmuGhu-G4jOGLqeGlseGQos-84Kms4aW2YuC2t-GluOC2u8SR4La-xInElw3hpb_GkcSXfOC3h8acwp3hmrDgpLfhjrJSTOKsgUXkj4HklIsH25cEwqHgurLhrL7kk5vhqpDkk57hq4nklIFreuGmlsyhfOSXkOGnk-GSguGhndaP4a6o4YW44ZGyZOGnhca-4YOY4Kyox4bhjrrhgIQG26DgrZLgrLHkkr7hp5HJqeGmtOGDq-CsuOGmtsW_AuGPice74a2K4a6a4LGq4Yy74Z6Y5Jea4Ze84ZWi2L5TzYLYvceq4LmXwq_Ss9KK4L284Lqz4a6F4LyB4ZWL4Ziq4Kas4Zuv4YuH4Zun3oDhr5DGmeGVj8W_4Zux4Y205JGB4K2A4ayI2LPhjLjgv6bkl5bhlY7hp5bWkwbhlbrhpJrkmI50GuC5qeGmhuGrutKvB8icB-CgheGmjNue4aaT4a6N4ae54amI4ayq4YK14ayJ4ZWY4ayM4Y-j2K3hqLPhrJDhqLXjrYY20qbhqJzhg6vhqqvhqIvFgMK90rPhj5zhjIXDueGrrsWV4ZKA5JOe4K654aCVxpEG5JSE4KuD4aal4bCK4Yu_4aSi0q8J3ZwH1rThhLtAUifCjjjDgOC0rCrhlI3klLDhqKrhp5ThpJfhp7_hpr7hp5jhi6ThrI3hiI3hpLvhjJvhp57hjJ7grJnjmLDLg-GTq-GhpuGrp-CuqAsR0rPCmeGdv9KO4YGS5JSA4LOzCeSZkdKm4ZC64aqq4ZOu4LmW4LuQcOGKveGYpeGokeGok-GBveC4jOGVsOGRrOGIgAHkmoXhlILgu7Hhmpzam-GanuGZrcOc5JqN4Zqj4L-A4Zqm5Jmo4LGm4bGe4aK-yYR65JWa4ZKV4LGn0qbhlKDhiYPhpYzkmpzgubEE4a2m5I6a5JSQw4zhroThmqThjLPhla_hpZfhp73egOSWkuSapsWhfOSaqcmp4ZKX0qbkk5LkmojhnbjkmYIIwpjhq73hiafhoJDkmYnHmeSTneSYr9KW4aStxpED5JmR4aaF4Lmr5Je9yYHhoKHhrbzhr4rgo6LgvpwX0rPgrZHkmrXgpI7gubvhrL9y4Za35JeL4LyN4LyI4YuHB-C8jeC8j-GLh-STheC8huChhOGUkOGhnOGVleGikN6DCeGEkOC6mOSVieGUveSWgOGBh-SVjuGgjMKayJrgq5DklZPhgajhjLPhkankmYzkl5PhgLTkm4LklpbgobjMvcKc4YW34YW74YW54Z6x47eF4KmJAOSOgcyf4Ky52LPCluSFg-GHmOGesQThhq3hnqrhnrEF4YaCBeGGueGGs-GeqeGGluGGnAfhnr7hhpwI4Z6q4Z6_4Z6xCeGfh-GGpuGGleGGqeGesXrhnp3hhpx84Z-L4Z6VxZzgtrfhn7jhh5_hh6Hhh6Phh6XhoIHhh6jhh6rhoIXMhMiM4ZmK4YuR4ZG34L-P4LiE4Z26woDgu73hkb3hk4ngtofhkoTbsuGbg-GukWvgu6HhiKzbr-GSiuC_tuGSjeC4nOSHrdyI4ZKZ4ZKg4Li14LaW4ZKX4ZKm4Lis4ZKbyLvguK_WnuC4seGSrOGGhOSdqOC4ruGtmNyz5J2r4LmC4KSbE-C4vuGTp-SduOGSrtyo4LuE5JW24LmG4aOH4Kma4LmL4aOK4Zyq4ZK64Yyo4ZeO4Z2Y4YCh4YCj5JSK4ai_5J2U4L284L-e4L-g4Yyz5JiH5JyK1orkla_hra_gv4PhnangvonPo8KTDQ8q4a204L-15J2QxJThqZTJuMSm5JWf5J6O4ZWm4ZOw4ZeWBOCzseGXmOGqieC8geSZi-SbkuGpp8Wn4a2u5JiYwpHknpzhqYvgpJss4a204aWZ4KKT5J6nxIzgrbPhoYbhrLbhoYjhrbzgu43hlYLYjQbhqYAEfuGmsOGhk-C8geCrkOGhl-CstuGmvMyhLuSbtuGmu-SYluGVl9yoL-GngOC7q-GVnduJ0qbGvOSUuOSZggbhjZUD4ZGE4Yik5JuPcuGPhOSaguGLh8Sb5JWG4YuM4ZSA4KuD4LOx4YG14LiB4Lqd4Lqs5Jqd4Yq94ZO05Jq14a6E5Jum5JOb4KKF4a2C5Jqk4aWa4a2LxpHho6LhoonknqXgtovknZsq2rDSg86k47uQ4ZiyMOGqkuC-j-SfueGwseSYs-GUstyozrbklYbLv-GSsOCzv-GPqeC9meGPrM-94Y-u0Lvhj7DgvaDgtrPhj7Rk4L2k4L2m4ZqT4pep4ZqW4LST5J6EcuGSteGcqeGMpd2L5J6KybjIjuGruOCrh-STleC3lOGZrwTHpeSSvceV4aqL4a6I5Jag06jhpKrknrXkk5_hmLIx4aC34YKHxaHjmbDhgorkk6bhqbDkk6jhjYTft-GXh-GIuuGpt-GXiuGCmAJxyIzJuuGpv96b4ZeS4aqC4Zmt4YGk5KC_4Led4aax5KGC4a6H4Zee5KGFzrnkm6nFm-SglOGSleGqlOCkmeGqltyo4ZCL5JWG3rrgt63gpKPgt7Lhqp_gpKfhqqHfiuGqo-GXtuCksN-S4Ze54aqnybjhjZ3hj5Lhmavhj5ThnbrhnbwE4aCp4Y-Z4L2B5Jun47ij5JWXzKHklp3hpLXgs7fhp5nhqLHgvY_hmb_hi5XhjpJ44Z2J4KqU4Yuv4KqX4Yuy4Kqa0Y7hnZHgqp7gqoviopfhj7HgqqTgp4rkmKTgpLfhmrLhmYXcmeGOusKK4YCFwoDhmrox4KWH4YKs4KWL4KWN4ZuC5KCL5KCGxJUN4LGG4Ymr4ZuI5Jez4ZuWxpEO4ZuNb-Gii-GbueCkluClpuGCkOGbteGhleCmmOClr-CnhOSjieSYkuOhnuGbqXPgpbzkh6Lhm6HgppXhnqfhm6_Fv-GYjuCxjeSjluGcouSjjuCml-SjneGCg-CmkuC4p-Sjo-Gbt-Cxm-GSouCmm-GdpuGrj8SV4aC24Zu-zLPknbbdrOGcg-KhhOSevOGEieGcj-GcieGkscS7CuGToOSjuuGckcKR4Luo4LqYwofgpr3hrLHgp4HhkI_gpbLioYYa5IyD44CV4qGM4r6M44Oi4p-H44CR4qSX4qGZ4qO044Ov44SC4qGg0Jnjg7PiqbLivrvjg7biqaHjg7jkpJzjgZPio6Xjg7ziobHio5DipqjiobXiobPjga3iopTLh-ODqeKhveK-ieKli-SkkOK_s-K-j-K_ouKii-KnqeK-k-SkqeK-luKhueODg-Kil-K-m82z5Ia-4qKc4r6g4KiW4piq4r6j4bqpy5XivqfioqnioqHNs-K-q-C0i-K-reG2juK-r-OBi-Kkl-K-s-KlruK-tuOAveKivuK-ueOEheKluuOBguOBg-K_gOODlOOBrOKmsOOBiOODm-OBiuK_iMuh4r-K4qOb4qOd5KWV4qOh4r-P44OL4r-R5KWf5KWW4r-U4r-G4qaG4oi34r-Y4KiW4r-a4qO14qax4r-e4qST4qO74r-_4qeH4r-r44CB4r-t4qeI44SK4qSB4qSD5KW_4qWI4r-v44CL4qSf4r-z0aLkpJPipKTjgIDiv7jipJvio4DjgIjiv7Piv77kpLTjgIDiv6zipYXRt-CojeOClt6744CH4qSf5KaG4qSz4bSQ44CN4r-f4qS45KaL4qS75KW94qa84bGR4qWB4r-Uzb7jg5TipbLjgJ3jgJvjgr3ipY3jgKLRj-ODj-KkmuKllOKon-KlluOAquKkjuKotuKlm-SkrMuW44Cw4qWg4pOO4qmi4Kqh4qWl44C24qWo4qWk44C544Gj4KenxInjgabjgL7ipbTkpKHiqaTkpZrivr7kpZzkppfjhIvjg5jio6vkpaHiv5bjg7_jgY3ipovioZ_jhITkp4_jg7rio4njgabjgZbippTippnjgZnkpI7ipp7jgZ3ipa7ipqLjgaHjhIjjgo_ipqrio5_ipqziprPQpeSlreKmsuKmruOBrOKhuOOBruKmruOBsOKmu-KnhuOCheKnjeKjuOKng9Gg44G45KW84qa74qK844Gz44KG4om44qeP4r6N4qeS0JHjgoPioLPip5bjgb7jgojOg-Knm-Kng-OCi-SnrOOAuuOBpOSnr-OCkuKlkOODveKnqeGKps2144KY4qOm4r-m4qev44Kc4qey47ya4riR44Kh4riV4piy47yg44Kn44yT4rie44Ks4pi847yo5KaH0Z_iqIrQu-GKpuODk-SnlOOCtuODmeOAo-OCus2_4qW944K84qKB4qia5KaF4qid4qSc0a_jg4LiqLzjg4Xkpavjg4fiqLbkp43jg4rjg5TkppnkqIjkqKDjgYTjg4bipZPkqZTkqLjiqLfdjuSnheKkheKovOODmuKov-KkveKpgeKoqM-10Jfjg6HjgbbiqYnPsuKpj-KkguKpjuKhu-SkteOCjuKpk-KjquKpleODruKhv-ODsOSkmeKpm-Snn-KmkeSknuKhqeKpo-Slm-Sko-KpqOODvuKmmuOEgOSnnOOBkOKmj-SptuSlmeC0keOBouKoueKpueSlnuGdhOCog-OdiuKpv-OPj-OEkuOdjuKgjuKqiOKgkeKqi-KglOOdlOOEm-CokeKqkeKgm-Kqk-OdmeKgoOKgouOdnOKqnOOdn-Kqn-OdoeKqouOdpOOEr-OdpuOQiuGcnHPgqYjkmKgg4KmN4KaJ4Zur4KmS4KmU4KmW4LmI4aOI5J6G4ZK35J6I5KC24Kmj4Zyt4YqR4Zyx4Kmu4YSa4Zy04YWi4YSe4Zy44Km54Zy64Km84Zy84YWs4KqB4YSpy53hnYHgqofhhK7gqovklrrFq-Gnh9ar3pnEieGUh8Kq2qfStuGGgMOKRCbCo8KO5JqB5Jeo5JeN4ZSR5Jmp5Je0yYThkZXkopXhgrvkopfkma7gsI3Cpt2G4qC64KyX5KuV4LqP4YKQ5I-1H-SPuGfkj7rkj7Lkh7TLseSPv-SHnC7kkILkkITho4XkkIbhuI7kkIjijYbKiOKLsuSQjOSQjuKMl-SQkOKEkeSQueSQlOG4iuGzhOG1juCjgeKLsuG4geG8n-SSi-SQneG1peSQn3LkkKHkkKPihrDcpuKGsuKGtOSQqOKEkeKKlcac4oqX4oKg5JCt4oy45JCw4p-vyojhvp7kkLPijJfkrJvkrK7kkLdz5JC55JC7dOSQveSRteKPmeKSquGwieKPnOSRguKPn-KOrOG9teSRvuGLleSSgOG0s-SRquKAoeSRjuG4gOG9teSRmeKSuuKRguSRl-G9ruStiuSRlOKSkuKRguKRk-SRoOSRmeSRo-SRmuG9j-SRnOKSq-KSh-KSvOG9kuStheG7qOSsueKUleKTq-SShOKVhuKUh-KTquSSsuSRq-StoOKWtSDilobilYfkkbvkrJXhu4jkrYHgs7_krYPhso595JKC4LWl5K2j4oyZ5JKI5KyN5JKK5Ia75JKM4p2y5JKO4puR4pqv5JKQ4bys5JKS5JeB4pqG4piG4pqJ5JKZ4piNyofimo3hjbbimo_imJTkkp_impLkkqLimpTkkqXhuKnkkqfilKnkkqrgtaBz5JKt4bip5K2A4o-B5KyJ5K2E4bK15JK04aq44Z6MACfhno8A4YW54Z6S5JyT4Z6W4KaD5Jyd4Yaf4Z6T4YaMBeGFuQbhn7Xhnqjhhojhnqnkj5zko6TMn-GGk-GGmwYG5K665KOq4Z6y4Yah5Jie4YaM5Jy0AOGGm-GfjseZ4Z684YaK4Yal4Z6xC-GFueGfi-GGkgzjt4XhhrbhnrEN4Ya_4YaC4YaSDuGGseGGiuGGkg_hhr_hh4zhhpIQFAXhh5DhnrsR4YaKFeGfneSurhLhhpAV4Z-AExQE4YeU4Z67FOGHkBbkr6zkrrwV4YeX4Z-n4YaMFhgA4YeX4Z-q4YeUGeGfreGHkBrhhpwZIAAb4YacGh4AHeGGnBzksI4e4YW7wpYd5LCRH-GGnB4hAOSwkeGesR_hh5TksIzhnrEg47eFIuGGnCHksJwj4Yac5IinACThhpwj5LCRJeGGnCrhhr8u5K6t5K68LC8ALuGHmeSuvOGypQAy4YeA5JycL-SxhDPhhpzgqJbksL4C4YaM0LEANADDv-Gft-GHneSdg-GfvOSdheSNveSdiOGghOGHrcKa0qbklaXkoofgr7TkoonkmKdO4Yii4Zmy5Jun5JaL5Kui4LaM4YqO5Kup4YiK5Jmt5Ji34LCO5KKa4LO_5KKc4LSD4LSF4LSH4LSJy4jgtIzgtI7QiOCoseC0kuC0lM2-zpfioZnIjHvhr5zkl57gsLbgr6nguZdc4Yq95J6w5JSQ4LC94LC_MeGiheSikOGiiOOfn-GJquCll-GJreSdm-GKgOCluOSqtceZ5KOJ4ZKi4LGX4oSR5KOJ4Y-N4Zu64Kac4Ziy4ZGP4LGl4YGx4bGe5Jic5J2t4Lqb4aOl5LKp4aK_4aOo4LGW4oKh4a6ow4zDv8SZL-GrkeGckOShs-GNsuC6mOCyheGhgOCpqOK4j-Kgr9CC4Kmz0ITkh6Xhi7LipLHjnKLgqYLkqrzhnK_gsonhipPiiJvipIPhipfgqKrLm8275KCqzavgqavLntC0z7jgtI3PveC9pOCyoeG-veGKp-GKqeCprOG7keC9qeC0jeSiquGKsN2Ozpg45KCx4LOK3YPgs4wv4LOO4LOQyYHgs5Lhh6LZg-OYlOCzmOKCoeCzneCzn2_gs6HhhbQARcKWNuSwvS0D4YaM4bSPADHksYDHqsKW45KEAOSxieScmceq5Jyb4Z-PPDECNeGGnD3ktIY25LSHyYHClj82ATjhhpxANgI54YacQeS0nTrktJlnwpZC5LSiOuSwuuS0iEPktKg74YacSDAAPeGGnExDAD7ktK_ktJpNROS0vOS0qcKWTuS0tj7krrbkrq5QRuS0vOSvuuS0iFFH5LS84Z6swpZS5LS9SOGGnFTktYFK5LWDVUoFS-GGg-CtqcKWVuS0vUvktY3ktJpXTABL4Z-AWOS1n03hhpxZTuS0vOGen-GbruSuvFvktLZR5LWDXE8AUuSxheGfj13ktb4-5K-A5LW15LSIXkoEU-S1oOGSoMKWX-S1n1PktabktKpgVABT4Z-AYVUA5LaU4YaMYuS2ilbhhpzgu75cAFvhn4DgpJ1eAOS2ouGGjNeAPgLktanktqrDmjcAZOScmOSXrOGGu-CxneS2s-S0ouGGkuCug-S0nTDktL7ktKrgrozktKIw5LaRwpbDjMOkWwDFm-GeseCxrOS0mGbktqDDri0A5LS25JSe4KK35LWh4KONLeO0pQDhoqTgr5Xgo4nkt4TDsG0AbOS2oMOxbAFu5Lagw7JsAm_ktqDDs3AAc-S2oMO1eAB35Lalw7Z3AHnktqDDt3cCeuS2oMO45Le4e-S1g-Sys3sC4Yq14Yac4aKZcAHDjMKE4YaR4a6vdOGYgQEE5Leu5LiN5La-5LiSBeS3n-S4jeS1g-Ggl-GgnQDDjMKG5LiJ4ZW5w4zCh-S4n8KF4Z-A4Yy-5Lik5LifwojkuKgBDOGNj-S4n8KK5LiiDnzkuJ_CjOS4og_eqADkuIbhhpLho7LDjMKL5Lifwo3kuJwBE-S4vwB05Lii4aCkwoXkuJ_CjuS5gxXDjOS5jcSO5LiiK-S4m-S4nuS3muCjh-S3nOC9uuS4luS5huS3k-Gis-S4ki3kuI3kuIfCiOS3meSQheCvluS4ki575LiMwovkuJfksrXkuIbkuL_ktpHksZThn7nhn7tu4Z-94Z-_5IuG5LGa5J2Kwpo",
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
              setShowVideoLibrary(false);global.showLibrary=false;
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

const toggleDraw = (e)=>{
    let currentDrawing = drawing
    console.log("toggle draw",currentDrawing,drawingColor)
    currentDrawing = !currentDrawing
    if(currentDrawing){
      currentDrawing = drawingColor
      global.graph.canvas.drawing = drawingColor
      global.graph.canvas.selectToolActive = false
      setSelectToolActive(global.graph.canvas.selectToolActive)
    }else{
      global.graph.canvas.drawing = false
    }

    setDrawing(currentDrawing)
    console.log("toggle draw is now",global.graph.canvas.drawing)

}


let spacing = 0

const mouseEnter = (name,e)=>{
  //console.log(e.pageY,height)
  if(e.pageY > 60 && e.pageY < height-60){
    setMenu("")
  }else{
    setMenu(name)
  }
}

const mouseLeave = (e)=>{
  setMenu("")
}

const tabFontSize = 14

let extraTabs = []
//console.log("MENU:",menu)
let customNodes = []

if(!showVideoLibrary){

  for(let n in global.customNodes){
    //console.log("GRID",global.customNodes[n])
    //if(global.customNodes[n].name!="Special" && global.customNodes[n].name!="Modules"){
      if(!drawing && global.customNodes[n].name==menu){
        let positionStyle = {position:"absolute"}
        let style = {borderBottom:'3px solid #888888',whiteSpace:"nowrap",letterSpacing:-1,fontSize:14,margin:4,borderRadius:"8px 8px 8px 8px",padding:6,textAlign:"center",color:"#FFFFFF",backgroundColor:"#"+global.customNodes[n].color}
        if(n < 6 ){
          positionStyle.left = 0
        }else{
          positionStyle.right = 0
        }


        let items = []
        let itemspace = 40
        for(let i in global.customNodeItems[global.customNodes[n].name]){
          let item = global.customNodeItems[global.customNodes[n].name][i]
          //console.log("Add item",item)
          items.push([
            <div style={{...positionStyle,top:50+itemspace*i}}>
            <Dragger key={"dragger"+n+"_"+i} name={item.title} drop={(name,x,y)=>{
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
            </div>
          ])
        }

        if(global.customNodes[n].name=="Modules"){

          /*
          items.push(<div key={"bar4"} style={{padding:4,position:"absolute",bottom:itemspace*4,width:"80%",borderTop:"1px solid #888888"}}></div>)

          let count = 3
          for(let m in global.modules){
            items.push(
              <Dragger key={"draggercustom"+m} name={m}  drop={(name,x,y)=>{
                  //console.log("DO A DROP AT ",name,x,y)
                  setMenu("")

                  localStorage.setItem("litegrapheditor_clipboard",JSON.stringify(global.modules[m]))
                  global.graph.canvas.last_mouse_position[0] = width/2
                  global.graph.canvas.last_mouse_position[1] = height/2
                  global.graph.canvas.pasteFromClipboard()
                  global.graph.canvas.setDirty(true);
                  global.graph.canvas.graph.change();
                }}>
                  <div style={{...style,bottom:itemspace*count++}}>
                    {m}
                  </div>
              </Dragger>
            )
          }

          //items.push(<div key ={"bar3"} style={{padding:10,position:"absolute",bottom:itemspace*3,width:"100%",borderTop:"1px solid #999999"}}></div>)

          items.push(<div key={"bar3"} style={{padding:4,position:"absolute",bottom:itemspace*2,width:"80%",borderTop:"1px solid #888888"}}></div>)

          */



          items.push(
            <div style={{...positionStyle,bottom:itemspace*1}}>
              <div onMouseUp={()=>{
                global.graph.canvas.copyToClipboard()
                let item = localStorage.getItem("litegrapheditor_clipboard")
                console.log(item)

                let webfile = `<?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
  <dict>
    <key>URL</key>
    <string>https://eth.build/`+codec.compress(item)+`</string>
  </dict>
  </plist>
    `

                var file = new Blob([item]);
                var url = URL.createObjectURL( file );
                var element = document.createElement("a");
                element.setAttribute('href', url);
                element.setAttribute('download', "eth.build.module" );
                element.style.display = 'none';
                if(document.body){
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                  setTimeout( function(){ URL.revokeObjectURL( url ); }, 1000*60 );
                  setOpenSaveDialog(false)
                }
              }} style={{...style,bottom:itemspace*1}}>
                Save
              </div>
            </div>
          )
          items.push(
            <div style={{...positionStyle,bottom:itemspace*2}}>
              <div onMouseUp={()=>{
                document.getElementById("moduleloader").click()
              }} style={{...style,bottom:0}}>
                Load
              </div>
            </div>
          )
        }


        if(width < 1000 && global.customNodes[n].name=="Modules"){
          extraTabs.push(
            <div onMouseLeave={mouseLeave} style={{position:"absolute",bottom:0,right:80,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={()=>{setMenu(global.customNodes[n].name)}}>
              <div style={{transform:"rotate(90deg)",transformOrigin:"63% 52%",height:itemspace*items.length+80,position:"relative",borderRadius:"0px 0px 8px 8px",padding:6,textAlign:"center",letterSpacing:-1,color:"#888888",backgroundColor:"#222222",opacity:0.9}}>

                  {global.customNodes[n].name}


                  {items}

              </div>
            </div>
          )

        } else if( global.customNodes[n].name=="Modules"){



            extraTabs.push(
              <div onMouseLeave={mouseLeave} style={{position:"absolute",bottom:0,right:80,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={()=>{setMenu(global.customNodes[n].name)}}>
                <div style={{height:itemspace*items.length+80,position:"relative",borderRadius:"8px 8px 0px 0px",padding:6,textAlign:"center",letterSpacing:-1,color:"#888888",backgroundColor:"#222222",opacity:0.9}}>

                    {global.customNodes[n].name}


                    {items}

                </div>
              </div>
            )

        }else if(width < 1000 && global.customNodes[n].name=="Components"){
          extraTabs.push(
            <div onMouseLeave={mouseLeave} style={{position:"absolute",bottom:0,left:80,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={()=>{setMenu(global.customNodes[n].name)}}>
              <div style={{transform:"rotate(90deg)",transformOrigin:"46% 52%",height:itemspace*items.length+80,position:"relative",borderRadius:"0px 0px 8px 8px",padding:6,textAlign:"center",letterSpacing:-1,color:"#888888",backgroundColor:"#222222",opacity:0.9}}>

                  {global.customNodes[n].name}


                  {items}

              </div>
            </div>
          )


        } else if(global.customNodes[n].name=="Components"){

            extraTabs.push(
              <div onMouseLeave={mouseLeave} style={{position:"absolute",bottom:0,left:80,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={()=>{setMenu(global.customNodes[n].name)}}>
                <div style={{height:itemspace*items.length+80,position:"relative",borderRadius:"8px 8px 0px 0px",padding:6,textAlign:"center",letterSpacing:-1,color:"#888888",backgroundColor:"#222222",opacity:0.9}}>

                    {global.customNodes[n].name}


                    {items}

                </div>
              </div>
            )

        }else{
          customNodes.push(
            <Grid key={"girdder"+n} onMouseLeave={mouseLeave}  item xs={1} style={{zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={()=>{setMenu(global.customNodes[n].name)}}>
              <div style={{height:itemspace*items.length+80,position:"relative",borderRadius:"0px 0px 8px 8px",padding:6,textAlign:"center",letterSpacing:-1,color:"#888888",backgroundColor:"#222222",opacity:0.9}}>

                  {width>800?global.customNodes[n].name:global.customNodes[n].icon}


                  {items}

              </div>
            </Grid>
          )
        }


      }else{
        if(drawing){
          if(global.customNodes[n].name!="Modules" && global.customNodes[n].name!="Special" && global.customNodes[n].name!="Components"){
            customNodes.push(
              <Grid key={"grd"+n} onMouseLeave={mouseLeave}  onMouseEnter={mouseEnter.bind(this,global.customNodes[n].name)} item xs={1} style={{cursor:"pointer",letterSpacing:-3,fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={(e)=>{
                  //console.log("SET COLOR",global.customNodes[n].color)
                  setDrawingColor("#"+global.customNodes[n].color)
                  global.graph.canvas.drawing = "#"+global.customNodes[n].color
                  setDrawing("#"+global.customNodes[n].color)
                  global.graph.canvas.setDirty(true);
                  global.graph.canvas.graph.change();

                }}>
                <div style={{borderRadius:"0px 0px 8px 8px",padding:6,paddingTop:16,paddingBottom:8,textAlign:"center",color:"#222222",height:20,backgroundColor:"#"+global.customNodes[n].color,opacity:0.6}}>

                </div>
              </Grid>
            )

          }

          //setDrawingColor
        }else if(width < 1000 && global.customNodes[n].name=="Modules"){
          extraTabs.push(
            <div  onMouseLeave={mouseLeave}  onMouseEnter={mouseEnter.bind(this,global.customNodes[n].name)}  style={{overflow:"hidden",position:"absolute",bottom:80,height:200,right:0,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={(e)=>{

                //if(e.pageY<height-80){
                //  setMenu("")
                //}else{
                  setMenu(global.customNodes[n].name)
                //}
              }}>
              <div style={{transform:"rotate(-90deg)",transformOrigin:"100px 30px",borderRadius:"8px 8px 0px 0px",padding:6,textAlign:"center",color:"#222222",height:200,backgroundColor:"#"+global.customNodes[n].color,opacity:0.6}}>

                  {global.customNodes[n].name}

              </div>
            </div>
          )
        }else if(global.customNodes[n].name=="Modules"){
          extraTabs.push(
            <div  onMouseLeave={mouseLeave}  onMouseEnter={mouseEnter.bind(this,global.customNodes[n].name)}  style={{position:"absolute",bottom:0,right:80,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={(e)=>{

                if(e.pageY<height-80){
                  setMenu("")
                }else{
                  setMenu(global.customNodes[n].name)
                }
              }}>
              <div style={{borderRadius:"8px 8px 0px 0px",padding:6,textAlign:"center",color:"#222222",height:30,backgroundColor:"#"+global.customNodes[n].color,opacity:0.6}}>

                  {global.customNodes[n].name}

              </div>
            </div>
          )
        }else if(width < 1000 && global.customNodes[n].name=="Components"){
          extraTabs.push(
            <div  onMouseLeave={mouseLeave}  onMouseEnter={mouseEnter.bind(this,global.customNodes[n].name)}  style={{overflow:"hidden",position:"absolute",bottom:80,height:200,left:0,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={(e)=>{

                //if(e.pageY<height-80){
                //  setMenu("")
                //}else{
                  setMenu(global.customNodes[n].name)
                //}
              }}>
              <div style={{transform:"rotate(90deg)",transformOrigin:"22px 30px",borderRadius:"8px 8px 0px 0px",padding:6,textAlign:"center",color:"#222222",height:200,backgroundColor:"#"+global.customNodes[n].color,opacity:0.6}}>

                  {global.customNodes[n].name}

              </div>
            </div>
          )
        }else if(global.customNodes[n].name=="Components"){
          extraTabs.push(
            <div  onMouseLeave={mouseLeave}  onMouseEnter={mouseEnter.bind(this,global.customNodes[n].name)}  style={{position:"absolute",bottom:0,left:80,zIndex:3,cursor:"pointer",fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={(e)=>{

                if(e.pageY<height-80){
                  setMenu("")
                }else{
                  setMenu(global.customNodes[n].name)
                }
              }}>
              <div style={{borderRadius:"8px 8px 0px 0px",padding:6,textAlign:"center",color:"#222222",height:30,backgroundColor:"#"+global.customNodes[n].color,opacity:0.6}}>

                  {global.customNodes[n].name}

              </div>
            </div>
          )
        }else if( global.customNodes[n].name=="Special"){

        }else{
          customNodes.push(
            <Grid key={"grd"+n} onMouseLeave={mouseLeave}  onMouseEnter={mouseEnter.bind(this,global.customNodes[n].name)} item xs={1} style={{cursor:"pointer",letterSpacing:-3,fontSize:tabFontSize, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={(e)=>{

                if(e.pageY>60){
                  setMenu("")
                }else{
                  setMenu(global.customNodes[n].name)
                }
              }}>
              <div style={{borderRadius:"0px 0px 8px 8px",padding:6,paddingTop:16,paddingBottom:8,textAlign:"center",color:"#222222",height:20,backgroundColor:"#"+global.customNodes[n].color,opacity:0.6}}>

                  {width>800?global.customNodes[n].name:global.customNodes[n].icon}

              </div>
            </Grid>
          )
        }
      }

    //}

  }
}




let clickawayscreen = ""
if(!showVideoLibrary && menu){
  clickawayscreen = (
    <div ref={drop}  style={{position:"absolute",left:0,top:0,zIndex:1,width:"100%",height:"100%"}} onClick={()=>{setMenu("");if(global.graph&&global.graph.canvas.search_box)  global.graph.canvas.search_box.close()}}></div>
  )
}

let tools = ""


if(!showVideoLibrary && global.graph&&global.graph.canvas){
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
            //setMenu("search")
            setMenu("")
          }
          global.graph.canvas.last_mouse_position[0] = width/2
          global.graph.canvas.last_mouse_position[1] = height/2
        }}>
        <Tooltip title="Add Item [space bar]" style={{marginLeft:4,cursor:"pointer"}}>
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
          setDrawing("")
          global.graph.canvas.drawing = false
          global.graph.canvas.selectToolActive = false
          setSelectToolActive(global.graph.canvas.selectToolActive)
        }}>
        <Tooltip title="Reorient [esc key]" style={{marginLeft:4,cursor:"pointer"}}>
          <Icon>
            aspect_ratio
          </Icon>
        </Tooltip>
      </div>

      <div style={{margin:5,color:drawing?drawingColor:"#dddddd"}} onClick={toggleDraw}>
        <Tooltip title="Draw" style={{marginLeft:4,cursor:"pointer"}}>
          <Icon>
            create
          </Icon>
        </Tooltip>
      </div>


      <div style={{margin:5,color:selectToolActive?"#03A9F4":"#dddddd"}} onClick={async ()=>{
          //console.log(JSON.stringify(global.graph.canvas.graph))
          global.graph.canvas.selectToolActive = !global.graph.canvas.selectToolActive
          setSelectToolActive(global.graph.canvas.selectToolActive)
          setDrawing("")
          global.graph.canvas.drawing = false
        }}>
        <Tooltip title="Select [hold ctrl]" style={{marginLeft:4,cursor:"pointer"}}>
          <Icon>
            photo_size_select_small
          </Icon>
        </Tooltip>
      </div>



            <div style={{margin:5}} onClick={async ()=>{
                try{
                  global.graph.canvas.copyToClipboard()

                }catch(e){console.log(e)}
              }}>
              <Tooltip title="Copy [ctrl+c]" style={{marginLeft:4,cursor:"pointer"}}>
                <Icon>
                  file_copy
                </Icon>
              </Tooltip>
            </div>

            <div style={{margin:5}} onClick={async ()=>{
              global.graph.canvas.pasteFromClipboard()
              global.graph.canvas.setDirty(true);
              global.graph.canvas.graph.change();
              }}>
              <Tooltip title="Paste [ctrl+v]" style={{marginLeft:4,cursor:"pointer"}}>
                <Icon>
                  dynamic_feed
                </Icon>
              </Tooltip>
            </div>


            <div style={{margin:5,color:moreInfo?"#03A9F4":"#dddddd"}} onClick={async ()=>{
              global.graph.canvas.moreInfo = !global.graph.canvas.moreInfo
              setMoreInfo(global.graph.canvas.moreInfo)
              console.log("global.graph.canvas.moreInfo",global.graph.canvas.moreInfo)
              }}>
              <Tooltip title="Properties" style={{marginLeft:4,cursor:"pointer"}}>
                <Icon>
                  more
                </Icon>
              </Tooltip>
            </div>


      <div style={{margin:5}} onClick={async ()=>{
          //console.log(JSON.stringify(global.graph.canvas.graph))
          global.graph.canvas.selectNodes()
        }}>
        <Tooltip title="Select All [ctrl+a]" style={{marginLeft:4,cursor:"pointer"}}>
          <Icon>
            select_all
          </Icon>
        </Tooltip>
      </div>




      <div style={{margin:5}} onClick={async ()=>{
          //console.log(JSON.stringify(global.graph.canvas.graph))
          global.graph.canvas.deleteSelectedNodes()
          //console.log("global.graph.canvas",global.graph.canvas)
          global.LiteGraphJS.LiteGraph.closeAllContextMenus();
          if(drawing){
            //console.log("CLEAR INK FROM",global.graph.canvas)
            global.graph.canvas.ink = []
            global.graph.canvas.setDirty(true);
            global.graph.canvas.graph.change();
          }
        }}>
        <Tooltip title="Delete Selected [delete key]" style={{marginLeft:4,cursor:"pointer"}}>
          <Icon>
            delete
          </Icon>
        </Tooltip>
      </div>




    </div>

  )
}

let extraMenus = ""

if(!showVideoLibrary){
  extraMenus = (
    <div>
      <div style={{zIndex:8,position:"fixed",right:0,top:"20%",width:50}}>
        <div style={{borderRadius:"8px 0px 0px 8px",textAlign:"left",color:"#dddddd",height:400,right:0,top:0,width:475,backgroundColor:"#333333"}}>
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

      {extraTabs}

      {clickawayscreen}
    </div>
  )
}

let qrReader = ""
if(readQr){
  qrReader = (
    <div style={{zIndex:5,position:"absolute",left:0,top:0,width:"100%",height:"100%",backgroundColor:"#111111",}} onClick={()=>{setReadQr(false)}}>
      <QrReader
        delay={500}
        onError={(e)=>{
          console.log("ERROR",e)
        }}
        onScan={(result)=>{
          console.log("SCAN",result)
          if(result){
            if(result.indexOf("http")>=0){
              window.location = result
            }else{
              window.location = "https://eth.build/"+result
            }
          }
        }}
        style={{ margin:"auto", maxWidth: "80%", maxHeight: "80%"}}
        resolution={1200}
      />
    </div>
  )
}

return (
  <div className="App" style={{color:"#FFFFFF"}}>
    {qrReader}

    {extraMenus}

    <AboutDialog/>
    <SaveDialog liteGraph={liteGraph}/>
    <div style={{zIndex:1,position:"fixed",height:barHeight,left:0,bottom:0,width:"100%"}}>
      <div style={{borderRadius:"8px 8px 0px 0px",paddingLeft:6,margin:"auto",textAlign:"left",color:"#222222",height:barHeight,left:0,bottom:0,width:525,backgroundColor:"#DFDFDF"}}>
        <div style={{cursor:"pointer",letterSpacing:-5,fontSize:32, fontFamily: "'Rubik Mono One', sans-serif"}}>

          <span style={{margin:5,borderRight:"1px solid #cccccc",height:barHeight}} onClick={()=>{
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
          <span style={{margin:5,borderRight:"1px solid #cccccc",height:barHeight}} onClick={()=>{
              //console.log(liteGraph.status,playing)//cccccc.status==2
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

          <span onClick={()=>{setShowVideoLibrary(true);global.showLibrary=true;localStorage.setItem("eth.build.showLibrary",true);}}
            onTouchStart={()=>{setShowVideoLibrary(true);global.showLibrary=true;localStorage.setItem("eth.build.showLibrary",true);}}
          >
            <span style={{color:"#03a9f4"}}>eth</span>
            <span style={{position:'relative',left:-5,bottom:15,color:"#f44336",marginBottom:25}}>.</span>
            <span style={{position:'relative',left:-10,color:"#333"}}>build</span>
          </span>

          <span style={{margin:5,borderLeft:"1px solid #cccccc",height:barHeight}} onClick={()=>{
              setOpenSaveDialog(true)
            }}>
            <Tooltip title="Save" style={{marginLeft:10,cursor:"pointer"}}>
              <Icon>
                save
              </Icon>
            </Tooltip>
          </span>
          <span style={{margin:5,borderLeft:"1px solid #cccccc",height:barHeight}} onClick={async ()=>{
              document.getElementById("loadjsonfile").click()
            }}>
            <Tooltip title="Load" style={{marginLeft:10,cursor:"pointer"}}>
              <Icon>
                open_in_browser
              </Icon>
            </Tooltip>
          </span>
          <span style={{margin:5,borderLeft:"1px solid #cccccc",height:barHeight}} onClick={async ()=>{
              setOpenAboutDialog(true)
            }}>
            <Tooltip title="About" style={{marginLeft:10,cursor:"pointer"}}>
              <Icon>
                info
              </Icon>
            </Tooltip>
          </span>

          <span style={{margin:5,paddingLeft:10,borderLeft:"1px solid #cccccc",height:barHeight}} onClick={async ()=>{
              setReadQr(!readQr)
            }}>
            <Tooltip title="Scan" style={{marginLeft:10,cursor:"pointer"}}>
              <svg style={{width:24,height:24,opacity:0.95}} viewBox="0 0 24 24">
                <path fill="#000000" d="M4,4H10V10H4V4M20,4V10H14V4H20M14,15H16V13H14V11H16V13H18V11H20V13H18V15H20V18H18V20H16V18H13V20H11V16H14V15M16,15V18H18V15H16M4,20V14H10V20H4M6,6V8H8V6H6M16,6V8H18V6H16M6,16V18H8V16H6M4,11H6V13H4V11M9,11H13V15H11V13H9V11M11,6H13V10H11V6M2,2V6H0V2A2,2 0 0,1 2,0H6V2H2M22,0A2,2 0 0,1 24,2V6H22V2H18V0H22M2,18V22H6V24H2A2,2 0 0,1 0,22V18H2M22,22V18H24V22A2,2 0 0,1 22,24H18V22H22Z" />
              </svg>
            </Tooltip>
          </span>

          <span style={{margin:5,borderLeft:"1px solid #cccccc",height:barHeight}} onClick={async ()=>{
              setShowVideoLibrary(true);global.showLibrary=true;localStorage.setItem("eth.build.showLibrary",true)
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

    <div style={{position:'absolute',bottom:-100000,left:-100000}}>
      <span style={{border:'1px solid #777777',color:live?"#00ff00":"#0000ff",padding:5,cursor:"pointer"}}>
        <input id="moduleloader" type="file" name="file" onChange={(e)=>{
            console.log("FILE",e.target.files[0])
            var reader = new FileReader();
            reader.onload = (event) => {
              let compressedString = event.target.result

              /*
              let loc = compressedString.indexOf("<string>")
              if(loc>0){
                loc += 8
                let endloc = compressedString.indexOf("</string>",loc)
                compressedString = compressedString.substr(loc,endloc-loc)
                compressedString = compressedString.substr(compressedString.lastIndexOf("/")+1)
              }
              console.log("decompress:",compressedString)*/


                if(compressedString){
                  let json = compressedString
                  //  codec.decompress(compressedString).then(json => {
                      /////////
                      console.log("CLIP:",json)
                      localStorage.setItem("litegrapheditor_clipboard",json)
                      global.graph.canvas.last_mouse_position[0] = width/2
                      global.graph.canvas.last_mouse_position[1] = height/2
                      global.graph.canvas.pasteFromClipboard()
                      global.graph.canvas.setDirty(true);
                      global.graph.canvas.graph.change();
                  //  })

                }

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
                setShowVideoLibrary(false);global.showLibrary=false;
                localStorage.setItem("eth.build.showLibrary",false)
              }
            }
            onClick={async ()=>{
              setShowVideoLibrary(false);global.showLibrary=false;
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
