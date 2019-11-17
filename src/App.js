import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import './App.css';
import LiteGraphJS from 'litegraph.js/build/litegraph.js'
import 'litegraph.js/css/litegraph.css'
import CustomNodes from './CustomNodes'
import ICON from './icon.png'
import StackGrid from "react-stack-grid";

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
});

function touchHandler(event)
{
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
    switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type = "mousemove"; break;
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
    //event.preventDefault();
}

function App() {

  document.addEventListener("touchstart", touchHandler, true);
  document.addEventListener("touchmove", touchHandler, true);
  document.addEventListener("touchend", touchHandler, true);
  document.addEventListener("touchcancel", touchHandler, true);

  const classes = useStyles();

  const [live, setLive] = React.useState();
  const [liteGraph, setLiteGraph] = React.useState();
  const [liteGraphCanvas, setLiteGraphCanvas] = React.useState();
  const [playing, setPlaying] = React.useState(true);

  const [openSaveDialog, setOpenSaveDialog] = React.useState(false);

  let showLibrary = localStorage.getItem("eth.build.showLibrary");
  console.log("showLibrary",showLibrary)
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
              var file = new Blob([compressed]);
              var url = URL.createObjectURL( file );
              var element = document.createElement("a");
              element.setAttribute('href', url);
              element.setAttribute('download', global.title+".json" );
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
      let defaultData = "wofCrGxhc3Rfbm9kZV9pZC7EgcSDxIVsaW5rxItkIsKlxIfEiXPCmMKJwqLEjCTCpHR5cGXCrURpc3DEgnkvV2F0Y2jCo3Bvc8KSMjLCpHNpemXCksONA8KpPcKlZsSCZ3PCgMKlb3LEiXIDwqRtxIhlAMKmxJNwdXRzwpHChMKkbmFtZcKgxKLEpMWUwqTEksSUGMKlxIJiZWzCoMKqcHJvxKVydGllxYnCisSfZCbFpMSlwq9DcsSkdG8vS2V5IFBhaXLEtMS2xYABwqTDjMWjxLzEvsKCwqEww4pDU8KZwprCoTFCxYXFh8WJxYvFjWVyAsWRxZPFlcWXxZnEt8KDxZ7FoMSmW8WyaXbEsGUga8aJXcW_ZcKmxIRyxJNnxafEk2saxrLFn8WhwqhnZW7Gqca6x4DDv8eHxJTDgMKnb8WZxZjFmsKTx4vGtMKrxrfGuXTGu8a9eceAx4J0x4RuZ8Wrx4hzw4DHn8WhxbF1YsSSY8a8xonHqMeDx4XHrsSUx7DHsmXCp2FkZHLFuXPHu8eqx73FqGvEtxscxbHFs8W1xbfFucKByJLGuMa6xoh5w5lCMHgwZTQwZGIzY8iFyKc5MGY1OWIyODA4Zjc0YmE0MTE1ZTZjMWE3OGI4M8mHZjYyyKswNGZhMmPIpDQyNzU2YTU0xbvEjC3HgMKuVcW3bHMvRsWzbSBXZWnGkMS3w40Cw6TDjQFexLvEvWXGmTB6xqEhxqRhxYjCgcKpY29sxIJwc2Vkw4PGp8WOBsasxInGrm7HnMWbyIHCpcavdMeobnVtxa1yx5ZrIceZx5vGsMKRyIHCpseadMecypjKmsqcx77IjsKRIsiSxbTGqciVc8KBwqjEiWNpbWHJoxLJnMSNx4DCr8SoxKrErC9EyoPEgnJzya3FgAN6ybI2ybXEvsKSw4zCvjfJvcWIxYrFjMWOB8qOxZTFlsqRyqPIgcWjxKPEpQDKniLKocqoy6LGs8Why6TFpcKmypnKm8apyq3HsMqxyJTFuHPChMKrx7ZvY2vFuFPJtjLHocSCY2VoyoPFjsKvx5DHpHIgx6R4dCBoxqllwqXFt3RsyILLh8qEYcuKwqXGuWx1xZTEnsSMJ8uBy4PEq2HErUHIhciHc8uLxLXJrgLDuMOMwrTLksS_ybJZVcuYxqbLm8apBMueypDKksqky63FoseAy6fIjRvLt8qzy7nLu8u9y7_MgcyDzIVhzIfMiWzFjsKgzJhpzJrIgsyuyIbIiMyhyrzMpMOZKsifOTnJg8qIOGXFrWTIrcirZTg0OcmVZcmRNTFkyYs4za0xNM2uN2EzNsq_KMeAwqzJqsimL0LKvGFuzIfLjMmyw4zJsizMucm4w4zDksahxqPFhsm-zL_GqHIFzYPLoMqSx57Nh8iDzK_IiMiKx6vHhsiNHMiBwqxbzZFrxLLGjW7Gv8ulx4HHvMesyp7Hsc2HwqXEsmXLv8eUzr7Lqs2FxZ3HjMiCyLjEgs6RZcqqy7Nyy7XCkcm8xazFrsaazY3Ftsu5woLOqc2hzLHNps2ozarNrWTNrc2vzbHIoc20zbY3zbhjzbrNvDnNvmXOgM6CzoQ2wqjFsm92xIzGqcOZPWh0yqhzOi8vyrvEk8eRdC7Ek2Z1cmHQisaGdjMvZciuYzQ2NGMzxLlmNM-ryYs2M8itZjAw0KLJhM24ZjjKvyPOiUnLoXTOjcWZxoVuy4w8zpbMucuUw4gyzL7Lms6hy6fFksqPzqXLrM-Ky6_EpceVyI3HmMqnzYXLo8eUz5MXz5nKtMKCzaPMo2XCqEfHkMeSx6TNnM2ewqZC0LRvbsq_IsuBxoLGhMaGTceRxZJuaWPLjMuVzLfOmMaaxpw6ZmbOnNC-yovGqcaT0YLLn8qWc86nz4rCqltt0avRotGuzrnLsM68zq7HiM6_z4rCp1vEk8SJeNKKxKXLscqrxqnOvsiBx47RmtCOx6TPhciNF8-HxrDCksiBx6HHhMejx6XHus66x6nOrc-Tx4rNh8Ko0oZl0azRrs6syIzHr8KRGNGSz5vSs9KH0a1jw5lSZsaOxIQgzKvEhNGuIG3EqXRhxr3TjMSpcyDEvMSExqnTiMWzas-DzJPEiWLHhNOUxLzMm27Mk9ONyofGg8yQ0aLGu2V4zIfMsSDEh9OPx7bMl9KT06wAy7XCl8KWFyMAIgLDv8KWGCIBJAAAwpYaIgAmxZXSjMKWGyYCJ9SGwpYc1JEo1I3Ii8eswpYh1JgtxZXLssqcwpYi1J8u1IbCpmfFs3XKhsKQwqbKgm7ThWfCgMKndsapxLzRosOKPsOMzpU"
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


const unusedTopFloaterTitle = (
  <div style={{position:'fixed',top:0,right:0,letterSpacing:-5,padding:5,fontSize:32, fontFamily: "'Rubik Mono One', sans-serif"}}>
    <span style={{color:"#03a9f4"}}>eth</span>
    <span style={{position:'relative',left:-5,bottom:15,color:"#f44336",marginBottom:25}}>.</span>
    <span style={{position:'relative',left:-10,color:"#dddddd"}}>build</span>
  </div>
)

const barHeight = 38

//let compressed = await codec.compress(liteGraph.serialize())
//liteGraph?JSON.stringify( liteGraph.serialize(), null, 2 ):""
//

let allCards = []

let lessons = [{
  header: "Lesson 1",
  color: "#2196f3",
  name: "Hash Function",
  image: "thumbs/hashfunction.png",
  desc: "A hash function is like a deterministic fingerprint of a piece of arbitrary data. It is very easy to compute but very hard to reverse.",
  video: "https://youtu.be/QJ010l-pBpE",
  save: "wofCrGxhc3Rfbm9kZV9pZCLEgcSDxIVsaW5rxItkFsKlxIfEiXPClMKKwqLEjCDCpHR5cGXCqklucHV0L1RleHTCo3Bvc8KSWsOMwqDCpHNpemXCksONASwywqVmxIJnc8KAwqVvcsSJcgDCpG3EiGUAwqbEk8SqdHPCkcKDwqRuYW1lxLnEo8SlxY_EksSUw4DCp2_Eq8WXxZnFm8WdxZ_FocSkZcKmxIRyxJNnwqXFpWvFmRXCqnByb8SlcnRpZXPChMKrYmxvY2vGhFPEvGUywqtwxIJjZWhvbMWNwq9lbnRlciDGn8SwIGjGoGXCpcaDdGxlwqTErsSwwqV2YWx1xq3Gn8SExJ7EjB_EosWxwqtDcsSkdG8vSMSDaMSyxLTEvwHDjMS4xLrGkMKSeB7FhMWGxYjFisWMxqACxZDFksWUxZbEq8WsxZzFnsaox510xrzEpcKtxbTFtixudW1ixqDCpMW5FcWoxarHnsWax6DFn8KkaMeGx6XFsseobsW3xbnFmRbFvcW_xoHGg8aFwoDCicSfZCHHvMKtRGlzxpRheS9XYXRjx4fEs8S1w40CwqjDjMKWx47EvcS_AzE8x5NhxYfFicWLxY0Dx5rEicecxKnHtcKEx7fFoMe8xaTEk2vEmMSCx65swqDIhMaAxqDIh8WIwojIiyLIjsiQyJLEgsiVVGnGq2XHiMS1FCjIo8S-xYDDtADIqcirx5bFjQHIsMWTyYHIhsaEc8KFwqhmb8aexo_EvSzGiMaKxozGjsaQxpLIk8aWxpjGmsagwqDGqcmPxqzCpcmOyZDGscazxrXCrceFc2ggRnVuY8aDyanFuMi6xLXClhUgAB8Ax6d0xbXHv8eqx6zHrnLClhbKlSEAxZRnxb91cHPCkMKmY8mpZmlnwoDCp3bGoMS7yanDij7HjMON",
},{
  header: "Lesson 2",
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

let [width, height] = useWindowSize();
return (
  <div className="App" style={{color:"#FFFFFF"}}>

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
              console.log(liteGraph.status,playing)//liteGraph.status==2
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
              console.log(event.target.result)
              codec.decompress(event.target.result).then(json => {
                console.log("configure graph with:",json)
                if(event.target.result){
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

    <canvas id="chart" style={{outline: 'none', position:'absolute',left:-10000,top:-10000,zIndex:-1,width:320,height:240}}></canvas>

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
