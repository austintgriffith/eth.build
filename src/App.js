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

import lessons from './data/lessons';

import SaveDialog from "./dialogs/SaveDialog";
import LoadDialog from "./dialogs/LoadDialog";
import html2canvas from 'html2canvas';

var codec = require('json-url')('lzw');
var QRCode = require('qrcode.react')
const axios = require('axios');


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

  const [snackbar, setSnackbar] = React.useState({msg:"",color:""});
  global.setSnackbar = setSnackbar

  const [readQr, setReadQr] = React.useState(false);

  const [live, setLive] = React.useState();
  const [liteGraph, setLiteGraph] = React.useState();
  const [liteGraphCanvas, setLiteGraphCanvas] = React.useState();
  const [playing, setPlaying] = React.useState(true);

  const [openSaveDialog, setOpenSaveDialog] = React.useState(false);
  const [openLoadDialog, setOpenLoadDialog] = React.useState(false);
  const [currentScreenShot, setCurrentScreenShot] = React.useState(null);

  const handleOpenSaveDialog = async () => {
    let canvas = await html2canvas(document.body);
    let canvasImg = canvas.toDataURL("image/png", 0.35);
    console.log({canvasImg});
    setCurrentScreenShot(canvasImg);
    setOpenSaveDialog(true);
  }

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

  window.onpagehide = function(){
    var data = JSON.stringify( graph.serialize() );
    localStorage.setItem("litegraph", data );
  }

  CustomNodes(LiteGraphJS)

  let url = window.location.pathname
  console.log("URL",url)
  if(url&&url.length>1){
    url = url.substring(1)

    if(url.indexOf("wof")==0){
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
    }else if(url.indexOf("build")==0){
      console.log("THIS IS A BUILD")
      let key = window.location.hash.replace("#","")

      //let result = await axios.get("https://network.eth.build:44386/build",{})
      axios.get('https://network.eth.build:44386/build', {
        params: {
          key
        }
      }).then((result)=>{
        console.log("GET BUILD RESULT",result)
        let compressed = result.data.compressed
        codec.decompress(compressed).then(json => {
          console.log("configure graph with:",json)
          graph.configure( json );
          //graph.start()
          graph.canvas = canvas

          setLiteGraph(graph)
          setLiteGraphCanvas(canvas)

          window.history.pushState("", "", '/');

          setShowVideoLibrary(false);global.showLibrary=false;
        })
      })

    }


  }else{
    var viewedNewFrontPage = localStorage.getItem("viewedNewNewFrontPage");
    var data = localStorage.getItem("litegraph");

    if(viewedNewFrontPage && data) {
      graph.configure( JSON.parse( data ) );
      //graph.start()
      graph.canvas = canvas
      setLiteGraph(graph)
      setLiteGraphCanvas(canvas)
    } else {
      if(!viewedNewFrontPage) localStorage.setItem("viewedNewNewFrontPage","true")

              //THIS IS THE DEFAULT FIRST TIME LANDING CASE

      let defaultData = "wofCrGxhc3Rfbm9kZV9pZMONASbEgcSDxIVsaW5rxIvEjQI7wqXEh8SJc8OcABLCisKixIzEjhLCpHR5cGXCrElucHV0L051bWJlcsKjcG9zwpLDjQJ2w4zCqsKkc2l6ZcKSw4zCgjTCpWbEgmdzwoDCpW9yxIlyAMKkbcSIZQDCpsSVxLB0c8KRwoPCpG5hbWXCoMSoxKrFnMKkxJTElsOAwqdvxLHFoMWixaTFpsWoxarEqcSrwqZuxLXEt3LCpcWva8WixL8vwqpwcm_Eq3J0aWVzwoPCq3DEgmNlaG9sxZbCoSPCpcaOdGxlwqbEtMS2xLjCpXZhbHVlwqQxMzM3xKPEpQEUxavEq8KrTWF0aC9SYW5kb23EusS8xL4CbMSOIsWExYbFiMOMw4gexY3Fj8WRxZPFlcS4AcWZxZvFncWfxLHFtsWlxafFqca2ZcO_xa7ElWvFscWzdMW1wpHChMeexajGp8apxqvHocW9xb_GpsaDxoUCMMaCYcS3bMOLQ8Kkw4Y9w4DDvivDi8aIxorGjMaOxpDCg8KpYcSxx4LGumljw4PCo23ElQDIlWF4x77Cq8OBbWdOw4gAxrLEjQETx6HCrca5xrsvTXVsxo7GlHnHhMS9w40DeseOx4vFh8KSeDzHkWHFkMWSxZTFlgjHmMSJx5rEr8ecwpLFt8efwqFBx7LFvsalcsekxJbGhsmLxajCoULJj8e0yZLGg8S_MMWyxbTHnMWjx61lwqE9yZrJkcaCx6XHtzHIh8aLxLjIisaRyY3DjQU5yZjHvsiAyILIhMOLwqJPUMKhKsKJxKTIpRbHocKvRGlzxpRheS9CbG9ja8aPyLPEvgRMxI5AyLnFiEbIvcWOyL_Hk8mCxLgOyYXFnMWeyYjFocmjxbjHoMW7xa3JnQIyya7IicaPc8KEwqtiypDKksaPU8eMMsaTxpXGl8aZxZbCoMaeacagxanHr8aqZcOZQjB4OTNhMDRhN2E0NjkyZjHLkDJhODVjy5M2ZTAzy5o1ZTk4y605NWFhNjYyNTk3ODljy7DLrThkODJjMsuoy7s2McikxI4YyoZDcsSqdG8vS2V5IFBhacS5xLvItAHDiMS_w7jKm8KCwqEww4pDU8KZwprCoTFCyL7JgMeUxZYMyqXJh8W1yYrJpMKtW8aJacaodGUga8yTXceyxIRyxJVnyZNrxL82yZZlwqhnZW7EuMa6xqzKrcejxoPHp8mhxaHCk82KxpPNg8y6zLzMvnnNgXTNg25nyarElse3OM2Kxoh1yrjIksy9zJPNoc2jzaXHtsOAzYrCp2FkZHLGkHPNsc2EzabGhMKRxL85yrLJsMq0woDMiAEVx6HCq8yMzI7MkEjEg2jKlci1wqLEjkrKm8i7x5DKn8ytyqJyC8yxyqfHqs2KwqXHm3TIqM2CzYQsyZDGgM2GxL8xyaDHqcmizYrCpGjOks2-zaTOgMi0yrDEvzrOhcaNzofOiSDIqMqIyorEgsqNV8a6Y86TzJrKliTDjMK0zpnItTHKnseSyYHHlXIPzqHOpsWix6zKq8W6xazFmMqvOse6x7zCoM6xx6rPnsefz6DEqwDOusOAz6VlbMKgzr_JscKBy4XLh8Klz4l0z4vOiSHHocKqxK7FoC9UZXh0zpQCwpTEjsOCz5ICfzLMrMqhz5gCz5vKqMedz5_Hoc-ix6XNls6yyqnNis-sxqLOqc65x7bOgsSaz7XKtMq2yrjKkcqTZcq8xYfKvsqLxpbGmMaaxLjCr82OzLtyIMy70IcgaMS4Zc-4xqHCq0xlYXJuIE3FlGXPpMaoy4rDmUhodMepczovL3fRmi55x6jNrGUuY8eCL8qLecSUxIQ_0ad0PVBMSnoxSHJ1Rc2PbkNYSDdLVzd3QkNFQm5CTE9WypNxSWnOiR7PhMqJ0aUvz7vPi86UAcO-xL92z5IDz5TQks-XxZYQ0JbPqcmk0KHQm8mUAjjPsc-zz6jJos-qxbnQms-v0qnPtMaJya_PgMaQz7fGn8ahz7rPimjKgsazx4rKrcKqz4XSkVFSzpQFwpbEjlTPkgHCkMSOwpDSncyuxLgJ0qHSrNKj0JrOrsSa0qnRkdGT0ZXRl9GZ0ZvRncSx0Z_RodGj0aXRqtGpyonRq9Gt0a_RsdGz0bXNjtG40brRvNG-0oDSgtKE0obSiGnSimnQqMaQwoLCpnFy0K9lzInJqmfRk8OCwojKg8SOI9KPz4bKjNCEy4bGocqVRsWK04vDtM-uzpzQk8WWA8yx071zwofCqGZvbnTUgyzKt8q50K3Ug9Cxy4DQtMuD0YLRgVTUktGB0Y_Gq8KpZca7LmJ1acaawqrUo9SlRsWn1L55wrwnUs2saWvRitSkbyBPzY8nLCBzxr9zLXPEuGlmwqXRosqQcsKnI8251aRk1IrGsybKhtOCz4cvQ8eCxajUpcqVKMSOyqTFhci6xI7UmNOQzp4E1J7Ss8qzxpDChNSi1KTUpseMEsq_YdCzy4LEuMKu0Zgg0aJt1bDFoS7Wk9SxwqfVrtaQ0LjLicarw5nMgcSUypLQu9C_IGJv0ZTHgtC7csqMINSj0LplcMqJxZtzIMa_ZNWVxIzMvHHGq8SEc9WnyKUk1arSkNWs1pfWkdWyxI7ChtSX1JnPltORcgXVvciIzobWgNaC1KXUg9aG0LLLgdC1ctaML9aO1a_QuHPWky7WldeC1pnUtsuLPUNSRUFURSBBIE5FVyBCVUlMRDoKaMuG1o7NomwrYdC71Y_VmsahY3TWsmxs1qDNjtC-17zEicahzLsg1rzEjiXWv9SPyo3XotWxz40yxL_JhNW2xYjVuNeIyqDSnsS4BteN0rTJsdaB1YHWhMWH15TUrtaK15jWjdaP1pHXntaU0rhl1pbXnNSl1pplwrtmZWVkYtaIazogQMiOxITNhM2DZmbLhmggIM6JG8ehxK3KqMqOxLHMj27KlTzEv8KezpnHjtCR1JrCgcKp1Z_EgnDVmmTDgteKB9OU0J_Tls2TzYbQncyz0KDHocO_zrrQpjXZtcqtwq7OrMS4LNajxpnRhm7Pr9SfwoPYvMKoY9ae1YzHrti3wqZC2ZnUpNWexbPUpQzOiRnMi8yNcMyPyKzNj8WabsiSypXDjNOIA0jMoMyizKQ62Y3Mqcyr1JrYpHIK2a5zzZnJpMKqW23antSkyJLNgMqtwqbQo82FzZXNtlvElcSJeNq8xazHs8mR2bLNis2MzY7NkMy72bbTmDXSq8WhzLTKq82bzLnNkc2vzaDavdq_2bjNiNuM2rhl2p_Iks64zbPJq9CmN9Sfz7fbhNCGANK9yKUf2JbSkUHNuc27c3POlAMMyLXQldifxL4BVFDVus-YEdqyyqrPq9OXyq_OhNW-14_GkdSp0KzKu8q91ofWideXy4TYt8Kn27XNus28zokd1I7SkdKTz4zHhcSOwqTItces27_ItcONz5XYo9eKDdyH0q3KrM-h05g30rHblM-d2bDPodKwxILPptur1LHSus-8aM66wpvTiAIvxKYAxI4TxZ3ZvnLdhDDEjhTdiMimAduJxoDdhDHdid2SFQDCrdq_zqvJm92E2JzOit2SFgAA3YQ1xI4b3ZIZAsO_3YQ2xI4Z3ZIYxZ3av92EN92yAcSOHd2m3YQ4zIndkh7dvs6DzIkCxI4f3oQCOsSO3ZvEjiDeijvEjiHdkiLdpsKmZ8aKddmowpDCptGibtmOZ8KAwqd2xLjFhdSkw4s_w5nCmd6s3qzCmg"
      codec.decompress(defaultData).then(json => {
        global.graph.configure( json )
        //graph.start()
        graph.canvas = canvas
        setLiteGraph(graph)
        setLiteGraphCanvas(canvas)

        setShowVideoLibrary(false);global.showLibrary=false; //lets try starting down with the video up
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
                  console.log("copying global to canvas")
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
    <SaveDialog liteGraph={liteGraph} setOpenSaveDialog={setOpenSaveDialog} openSaveDialog={openSaveDialog} dynamicWidth={dynamicWidth} screenshot={currentScreenShot} />
    <LoadDialog liteGraph={liteGraph} setOpenLoadDialog={setOpenLoadDialog} openLoadDialog={openLoadDialog} dynamicWidth={dynamicWidth} live={live} />
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
              handleOpenSaveDialog()
            }}>
            <Tooltip title="Save" style={{marginLeft:10,cursor:"pointer"}}>
              <Icon>
                save
              </Icon>
            </Tooltip>
          </span>
          <span style={{margin:5,borderLeft:"1px solid #cccccc",height:barHeight}} onClick={async ()=>{
              // document.getElementById("loadjsonfile").click()
              setOpenLoadDialog(true);
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





    {/* <div style={{position:'absolute',bottom:-100000,left:-100000}}>
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
    </div> */}

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
        open={snackbar && snackbar.msg && snackbar.msg!=""}
        onClose={()=>{setSnackbar({msg:"",color:""})}}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        style={{marginBottom:100}}
        message={<span id="message-id" style={{fontFamily: "monospace",color:snackbar.color?snackbar.color:"#d33535",fontSize:22}}>{snackbar.msg}</span>}
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
