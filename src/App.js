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

function App() {

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
      <Dialog onClose={()=>{setOpenSaveDialog(false)}} open={openSaveDialog} maxWidth={dynamicWidth*1.1}>
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
          Special thanks to <a target="_blank" href="https://github.com/jagenjo">Javi Agenjo</a> for <a target="_blank" href="https://github.com/jagenjo/litegraph.js">liteGraph</a>
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
      graph.start()
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
      graph.start()
      graph.canvas = canvas
      setLiteGraph(graph)
      setLiteGraphCanvas(canvas)
    } else {
      let defaultData = "wofCrGxhc3Rfbm9kZV9pZC7EgcSDxIVsaW5rxItkIsKlxIfEiXPCmMKJwqLEjCTCpHR5cGXCrURpc3DEgnkvV2F0Y2jCo3Bvc8KSMjLCpHNpemXCksONA8KpPcKlZsSCZ3PCgMKlb3LEiXIDwqRtxIhlAMKmxJNwdXRzwpHChMKkbmFtZcKgxKLEpMWUwqTEksSUGMKlxIJiZWzCoMKqcHJvxKVydGllxYnCisSfZCbFpMSlwq9DcsSkdG8vS2V5IFBhaXLEtMS2xYABwqTDjMWjxLzEvsKCwqEww4pDU8KZwprCoTFCxYXFh8WJxYvFjWVyAsWRxZPFlcWXxZnEt8KDxZ7FoMSmW8WyaXbEsGUga8aJXcW_ZcKmxIRyxJNnxafEk2saxrLFn8WhwqhnZW7Gqca6x4DDv8eHxJTDgMKnb8WZxZjFmsKTx4vGtMKrxrfGuXTGu8a9eceAx4J0x4RuZ8Wrx4hzw4DHn8WhxbF1YsSSY8a8xonHqMeDx4XHrsSUx7DHsmXCp2FkZHLFuXPHu8eqx73FqGvEtxscxbHFs8W1xbfFucKByJLGuMa6xoh5w5lCMHgwZTQwZGIzY8iFyKc5MGY1OWIyODA4Zjc0YmE0MTE1ZTZjMWE3OGI4M8mHZjYyyKswNGZhMmPIpDQyNzU2YTU0xbvEjC3HgMKuVcW3bHMvRsWzbSBXZWnGkMS3w40Cw6TDjQFexLvEvWXGmTB6xqEhxqRhxYjCgcKpY29sxIJwc2Vkw4PGp8WOBsasxInGrm7HnMWbyIHCpcavdMeobnVtxa1yx5ZrIceZx5vGsMKRyIHCpseadMecypjKmsqcx77IjsKRIsiSxbTGqciVc8KBwqjEiWNpbWHJoxLJnMSNx4DCr8SoxKrErC9EyoPEgnJzya3FgAN6ybI2ybXEvsKSw4zCvjfJvcWIxYrFjMWOB8qOxZTFlsqRyqPIgcWjxKPEpQDKniLKocqoy6LGs8Why6TFpcKmypnKm8apyq3HsMqxyJTFuHPChMKrx7ZvY2vFuFPJtjLHocSCY2VoyoPFjsKvx5DHpHIgx6R4dCBoxqllwqXFt3RsyILLh8qEYcuKwqXGuWx1xZTEnsSMJ8uBy4PEq2HErUHIhciHc8uLxLXJrgLDuMOMwrTLksS_ybJZVcuYxqbLm8apBMueypDKksqky63FoseAy6fIjRvLt8qzy7nLu8u9y7_MgcyDzIVhzIfMiWzFjsKgzJhpzJrIgsyuyIbIiMyhyrzMpMOZKsifOTnJg8qIOGXFrWTIrcirZTg0OcmVZcmRNTFkyYs4za0xNM2uN2EzNsq_KMeAwqzJqsimL0LKvGFuzIfLjMmyw4zJsizMucm4w4zDksahxqPFhsm-zL_GqHIFzYPLoMqSx57Nh8iDzK_IiMiKx6vHhsiNHMiBwqxbzZFrxLLGjW7Gv8ulx4HHvMesyp7Hsc2HwqXEsmXLv8eUzr7Lqs2FxZ3HjMiCyLjEgs6RZcqqy7Nyy7XCkcm8xazFrsaazY3Ftsu5woLOqc2hzLHNps2ozarNrWTNrc2vzbHIoc20zbY3zbhjzbrNvDnNvmXOgM6CzoQ2wqjFsm92xIzGqcOZPWh0yqhzOi8vyrvEk8eRdC7Ek2Z1cmHQisaGdjMvZciuYzQ2NGMzxLlmNM-ryYs2M8itZjAw0KLJhM24ZjjKvyPOiUnLoXTOjcWZxoVuy4w8zpbMucuUw4gyzL7Lms6hy6fFksqPzqXLrM-Ky6_EpceVyI3HmMqnzYXLo8eUz5MXz5nKtMKCzaPMo2XCqEfHkMeSx6TNnM2ewqZC0LRvbsq_IsuBxoLGhMaGTceRxZJuaWPLjMuVzLfOmMaaxpw6ZmbOnNC-yovGqcaT0YLLn8qWc86nz4rCqltt0avRotGuzrnLsM68zq7HiM6_z4rCp1vEk8SJeNKKxKXLscqrxqnOvsiBx47RmtCOx6TPhciNF8-HxrDCksiBx6HHhMejx6XHus66x6nOrc-Tx4rNh8Ko0oZl0azRrs6syIzHr8KRGNGSz5vSs9KH0a1jw5lSZsaOxIQgzKvEhNGuIG3EqXRhxr3TjMSpcyDEvMSExqnTiMWzas-DzJPEiWLHhNOUxLzMm27Mk9ONyofGg8yQ0aLGu2V4zIfMsSDEh9OPx7bMl9KT06wAy7XCl8KWFyMAIgLDv8KWGCIBJAAAwpYaIgAmxZXSjMKWGyYCJ9SGwpYc1JEo1I3Ii8eswpYh1JgtxZXLssqcwpYi1J8u1IbCpmfFs3XKhsKQwqbKgm7ThWfCgMKndsapxLzRosOKPsOMzpU"
      codec.decompress(defaultData).then(json => {
        global.graph.configure( json )
        graph.start()
        graph.canvas = canvas
        setLiteGraph(graph)
        setLiteGraphCanvas(canvas)
      })
    }
  }
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
  name: "Hash Function",
  image: "thumbs/hashfunction.png",
  desc: "A hash function is like a deterministic fingerprint of a piece of arbitrary data. It is very easy to compute but very hard to reverse.",
  video: "https://youtu.be/QJ010l-pBpE",
  save: "wofCrGxhc3Rfbm9kZV9pZCLEgcSDxIVsaW5rxItkFsKlxIfEiXPClMKKwqLEjCDCpHR5cGXCqklucHV0L1RleHTCo3Bvc8KSWsOMwqDCpHNpemXCksONASwywqVmxIJnc8KAwqVvcsSJcgDCpG3EiGUAwqbEk8SqdHPCkcKDwqRuYW1lxLnEo8SlxY_EksSUw4DCp2_Eq8WXxZnFm8WdxZ_FocSkZcKmxIRyxJNnwqXFpWvFmRXCqnByb8SlcnRpZXPChMKrYmxvY2vGhFPEvGUywqtwxIJjZWhvbMWNwq9lbnRlciDGn8SwIGjGoGXCpcaDdGxlwqTErsSwwqV2YWx1xq3Gn8SExJ7EjB_EosWxwqtDcsSkdG8vSMSDaMSyxLTEvwHDjMS4xLrGkMKSeB7FhMWGxYjFisWMxqACxZDFksWUxZbEq8WsxZzFnsaox510xrzEpcKtxbTFtixudW1ixqDCpMW5FcWoxarHnsWax6DFn8KkaMeGx6XFsseobsW3xbnFmRbFvcW_xoHGg8aFwoDCicSfZCHHvMKtRGlzxpRheS9XYXRjx4fEs8S1w40CwqjDjMKWx47EvcS_AzE8x5NhxYfFicWLxY0Dx5rEicecxKnHtcKEx7fFoMe8xaTEk2vEmMSCx65swqDIhMaAxqDIh8WIwojIiyLIjsiQyJLEgsiVVGnGq2XHiMS1FCjIo8S-xYDDtADIqcirx5bFjQHIsMWTyYHIhsaEc8KFwqhmb8aexo_EvSzGiMaKxozGjsaQxpLIk8aWxpjGmsagwqDGqcmPxqzCpcmOyZDGscazxrXCrceFc2ggRnVuY8aDyanFuMi6xLXClhUgAB8Ax6d0xbXHv8eqx6zHrnLClhbKlSEAxZRnxb91cHPCkMKmY8mpZmlnwoDCp3bGoMS7yanDij7HjMON",
},{
  name: "Key Pair",
  image: "thumbs/keypair.png",
  desc: "A private key is used to derive a public key which acts as your public address. Then, you can sign messages with your private key and anyone else can cryptographically prove that your key pair signed the message.",
  video: "https://youtu.be/9LtBDy67Tho",
  save: "wofCrGxhc3Rfbm9kZV9pZMONAQvEgcSDxIVsaW5rxItkw4zDqcKlxIfEiXPCmsKKwqLEjMOMw73CpHR5cGXCrElucHV0L0LEr3RvbsKjcG9zwpJ1xI4NwqRzaXplwpLDjMOIMsKlZsSCZ3PCgMKlb3LEiXIAwqRtxIhlAMKmxJXErnRzwpHCg8KkbmFtZcKgxKbEqGXDv8KkxJTElsOAwqdvxK_Fm8WdxZ_FocWjxaXEp8Spw7_CpcWra8Wdw4zDmsKqcHJvxKlydGllc8KCwqV2YWx1ZcKoY8SUY2sgxaPCpcaGdGxlwqbEsnTEtG7EocSjw7zFpsSpwq9DcsSoxLQvS2V5IFBhaXLEt8S5wpLEjsKDw4zDm8S_xYFlwoLCoTDDikNTwpnCmsKhMULFiMWKxYzFjsWQZXICxZTFlsWYxZrEr8S6xbPFomXCrVvGgWnGjHRlIGvGrl3GpcacxIRyxJVnxarElWvDgMeYxaPCqGdlbsePYcegx6bFqcW7xb7FrsWwx5bCk8ewZcKrx53Hn8ehx6N5x6bCpseox6rFusetxb3DoMiBxoB1YsaTx6LGrsiJyItuZ8iNxJZzwpDIgcKnYWRkcsaIc8iYdMepyJrInMW8xYTDnsOMw5_GgMaCxoTGhsaIwoHIsseex7dlxq15w5lCMHg4Nzg0ZTgwZjJhODVmZGIzYjA0Y2NiZDI5NTEyMGUwYzcyZTJjOTQ3NTgyYmXJkjPJhsmpyZQxNTlkN2XJtWM4wonEosSNAQHHpsKtRGlzcMSCeS9Xx7djaMa1xLrDjQLCnsOMwrTGvMWCxrcCETzHimHFi8WNxY_FkQTHksSJx5TErceWwpHChMWgx5nFtsWnxZPHu8Oexbphya1swqDIssaDx4_ItcWMyb3EjMSOx5HFt2XCr8qEyobKiC9ByKPIpXNzyo_GtwUKw4zCqsqWxYPEjlZPypzKnseNxZEFyqPFl8WZyqbFnMWeyqrFtcemyq7HrciwyrbItMaHc8KEwqvIlG_GlMaHU8a9MsiDxIJjZWhvbMWRwqDGmGnGmmXCp8uGyKTIpsaLxo3Gj8OZKsmAM8mKOWU5MTljZsmrZMySOGQ1MDLJhTFlMTBhNcmRMDM1NcyOZTRmYsq7yb8GyoLLgsqHYcqJyot0yo3Li8qRwpTEjsOgy5HGtwZJypvFicqdx4zKoMePzK_Flcqky53Fscqoy6HFpMujx6zElsOMw6PKscqzyrXGgcq3xoXLqcKAxqLJvwfHpsKuxqjGqm8vUmVjb3bHj8y4AgjKkcO4y5HGv8eBQyEzM8eHLsuWzYTHjnLNns2Iy5zHlcWcwpLIgcKpW8Wjy4nKnWXHpcq_yIrIqceqzZBrxJrIgcKrW8WAZ8WhdHXIpc6KxafOjMiqx6vHu8Oox710zYvIoMiizIPLiciozp7IrMS6w4zDpsOMw6fLp8q4y6nCgsKnzoZzzojCvcmtYXIgdGjHocqFIMSEacaUxq93y75oIMu4x7V5wqnOlc6Xzpllw5nChMmAMWI0zKUwNTLMojVkOTLJnDDMjzVjzKdhyYU1ybjJpTfMkjDJjzZiNjA4ZTY3NmZhyaIzZsmkNjXMoTY2YcyhyadjYcmWz5rMj8yfyarQiMSJM8mCzI_QkdCUyZE5ZtCBMc-9Mjg5YWbPt9ChOGEyz6vQpcylNMymMDcwNsyeYs2cxI4Dx6bCq82hcMary7HOlsy4AcKuzLvNsMeAx4I6ZmbHh1bNucqfzbvQs82-yqXFscKUyIHCrMecx6nIhciHzpvEqc6dzo7Hu8iQzY3CqtGRzajEjMeP0ZXHp86NyJrOj8evzY3OhM62zojRodGX0aTHu8OhyIHGvM6Wx7nRpc6i0Y3OpcuHyKbOqciMxbtz0abFtMyA0anHs9G6yKvRvNG-x5nPjmnOlse3z5HSg8ib0bzFhMOjw4zDqMiByIrSice1ZMe5zqvDgM6xzZnGiMKFzrXIps64zrrOvM6-z4Bzz4LGhs-FIM-Hzr7PisS1xq7IuMiFyLzIvsmAyYLJhMmGyYjJismMyY7JkMmSyZTJlsmYyZrPosmfyaHJo8mlyafJqcmrya3Jr8mxNcmzybXJt8m5zJE4wqjNl3bRn3LCumjGn3BzOi8vYXXPg8iax6nRg8-ILs2nbdKI0orOmMilw4DCqNOixLTQuW7Dg9CxAcqiyr_CqsSsxZsvVGV4dMuLUMSOw6rMvcSOLMWHzYLLl82FcsqB0YvNisqnyIHKrMSpy6TFrNG11JLNjdSU0aLOqtKPw4zDocSa0pzKucury63Lr2XLscWCy7PMssu2y7jLusePwq_HtMeg0qTUgHTPisePZcu9y7_CpNO_1IHMhcaOZc65Zc67zr3OvyDPgc-D0qrSrM-Jz4vGrsytxI4KzLDKhcyyzLTKjMqOxLjKkAMgypHCntSHypnNgceL0YjFkQjLm9GMyqfKqdG_1JvUls6Qw6bNlGXKtNSizZrVjsSPx6bLgdWSy4TMgsuIy4rVl8a3AyrDjQM01IcBQFDRh8uYx48J1aTUkcuf1JPNj8e7zrDNl8uoxojUpGzLrmvLsMuyy7TQicu3y7nLu9S5xpvMgdG4y4nUvsyHzIl4zIthzI3Mj8yRzJMyzJXMk8yYzJrMnMyezKDMosmvzKbMqMyqYs6rwprClsW-xKQAw4zDvAHDv9a-yK_DvALEjgEAANa-w5_XgteJAQLXjNa-w6DXggDQssWYyJln1r7DocSOBNeYAQMC0azXnM2S0LLXkQbXlM6txI4H16EK16vDp9et16EL16vDqNeo160B16XWvsOp15_Xodeu16XCpmfGgnXTncKQwqbNp25m0onCgMKnzalyxYDEtcOKPsOMw4zDjQ",
}]




allCards = lessons.map(lesson => {
  return (
    <Card className={classes.card}>
      <CardActionArea>
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
        <Button size="small" variant="contained" onClick={()=>{
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
                liteGraph.stop()
                setPlaying(false)
              }else{
                liteGraph.start()
                setPlaying(true)
              }
            }}>
            <Tooltip title={playing?"Pause":"Run"} style={{marginRight:10,cursor:"pointer"}}>
              <Icon>
                {playing ? "pause_circle_outline":"play_circle_outline"}
              </Icon>
            </Tooltip>
          </span>

          <span onClick={()=>{setShowVideoLibrary(true);localStorage.setItem("eth.build.showLibrary",true);}}>
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
            reader.readAsText(e.target.files[0])
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
          <div style={{cursor:"pointer",letterSpacing:-5,borderBottom:"1px solid #999999",borderLeft:"1px solid #999999",borderRight:"1px solid #999999",fontSize:32, fontFamily: "'Rubik Mono One', sans-serif"}} onClick={async ()=>{
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
