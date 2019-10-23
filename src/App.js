import React from 'react';
import './App.css';
import LiteGraphJS from 'litegraph.js/build/litegraph.js'
import 'litegraph.js/css/litegraph.css'
import CustomNodes from './CustomNodes'
import ICON from './icon.png'

import { Icon, Tooltip } from '@material-ui/core';

var codec = require('json-url')('lzw');



function App() {

  const [live, setLive] = React.useState();
  const [liteGraph, setLiteGraph] = React.useState();
  const [liteGraphCanvas, setLiteGraphCanvas] = React.useState();
  const [playing, setPlaying] = React.useState(true);

  React.useEffect(()=>{
    console.log("MOUNT",LiteGraphJS)

    global.LiteGraphJS = LiteGraphJS
    var graph = new LiteGraphJS.LGraph();

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
       })
    }else{
      var data = localStorage.getItem("litegraph");
      if(data) graph.configure( JSON.parse( data ) );
      graph.start()
      graph.canvas = canvas

      setLiteGraph(graph)
      setLiteGraphCanvas(canvas)
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

  let [width, height] = useWindowSize();
  return (
    <div className="App" style={{color:"#FFFFFF"}}>
      <div style={{zIndex:1,position:"fixed",height:barHeight,left:0,bottom:0,width:"100%"}}>
        <div style={{borderRadius:"8px 8px 0px 0px",paddingLeft:6,margin:"auto",textAlign:"left",color:"#222222",height:barHeight,left:0,bottom:0,width:430,backgroundColor:"#DFDFDF"}}>
          <div style={{letterSpacing:-5,fontSize:32, fontFamily: "'Rubik Mono One', sans-serif"}}>
            <span style={{color:"#03a9f4"}}>eth</span>
            <span style={{position:'relative',left:-5,bottom:15,color:"#f44336",marginBottom:25}}>.</span>
            <span style={{position:'relative',left:-10,color:"#333"}}>build</span>

            <span style={{margin:5,borderLeft:"1px solid #888888",height:barHeight}} onClick={()=>{
                var data = JSON.stringify( liteGraph.serialize(), null, 2 );
                var file = new Blob([data]);
                var url = URL.createObjectURL( file );
                var element = document.createElement("a");
                element.setAttribute('href', url);
                element.setAttribute('download', "download.json" );
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
                setTimeout( function(){ URL.revokeObjectURL( url ); }, 1000*60 );
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
              let compressed = await codec.compress(liteGraph.serialize())
              window.location = "/"+compressed
            }}>
              <Tooltip title="Link" style={{marginLeft:10,cursor:"pointer"}}>
                <Icon>
                  link
                </Icon>
              </Tooltip>
            </span>
            <span style={{margin:5,borderLeft:"1px solid #888888",height:barHeight}} onClick={()=>{
                liteGraphCanvas.switchLiveMode(true);
                setLive(!live)
                liteGraphCanvas.draw();
              }}>
              <Tooltip title={live?"Edit":"View"} style={{marginLeft:10,cursor:"pointer"}}>
                <Icon>
                  {live?"build":"visibility"}
                </Icon>
              </Tooltip>
            </span>
            <span style={{margin:5,borderLeft:"1px solid #888888",height:barHeight}} onClick={()=>{
                console.log(liteGraph.status,playing)//liteGraph.status==2
                if(playing){
                  liteGraph.stop()
                  setPlaying(false)
                }else{
                  liteGraph.start()
                  setPlaying(true)
                }

              }}>
              <Tooltip title={playing?"Pause":"Run"} style={{marginLeft:10,cursor:"pointer"}}>
                <Icon>
                  {playing ? "pause_circle_outline":"play_circle_outline"}
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
                if(event.target.result){
                  localStorage.setItem("litegraph",event.target.result);
                  liteGraph.configure( JSON.parse( event.target.result ) );
                }
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


    </div>
  );
}


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
