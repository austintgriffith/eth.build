import React from 'react';
import './App.css';
import LiteGraphJS from 'litegraph.js/build/litegraph.js'
import 'litegraph.js/css/litegraph.css'
import CustomNodes from './CustomNodes'
import ICON from './icon.png'

function App() {

  const [live, setLive] = React.useState();
  const [liteGraph, setLiteGraph] = React.useState();
  const [liteGraphCanvas, setLiteGraphCanvas] = React.useState();

  React.useEffect(()=>{
    console.log("MOUNT",LiteGraphJS)

    global.LGraph = LiteGraphJS.LGraph
    var graph = new LiteGraphJS.LGraph();
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

    var data = localStorage.getItem("litegraph");
    if(data) graph.configure( JSON.parse( data ) );

    graph.start()
    graph.canvas = canvas

    setLiteGraph(graph)
    setLiteGraphCanvas(canvas)
  },[])




  let [width, height] = useWindowSize();
  return (
    <div className="App" style={{color:"#FFFFFF",background:"#000000"}}>

      <div style={{position:'fixed',top:0,right:0,letterSpacing:-5,padding:5,fontSize:32, fontFamily: "'Rubik Mono One', sans-serif"}}>
        <span style={{color:"#3275e8"}}>eth</span>
        <span style={{position:'relative',left:-5,bottom:15,color:"#ce383f",marginBottom:25}}>.</span>
        <span style={{position:'relative',left:-10,color:"#e2e2e2"}}>build</span>
      </div>

      <div style={{position:'fixed',bottom:0,right:0,letterSpacing:-5,padding:5,fontSize:28, fontFamily: "'Rubik Mono One', sans-serif"}}>
        <span style={{border:'1px solid #777777',color:live?"#00ff00":"#0000ff",padding:5,cursor:"pointer"}} onClick={()=>{
            liteGraphCanvas.switchLiveMode(true);
            setLive(!live)
            liteGraphCanvas.draw();
          }}>
          live
        </span>
        <span style={{border:'1px solid #777777',color:live?"#00ff00":"#0000ff",padding:5,cursor:"pointer"}} onClick={()=>{
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
          download
        </span>

        <span style={{border:'1px solid #777777',color:live?"#00ff00":"#0000ff",padding:5,cursor:"pointer"}}>
          <input type="file" name="file" onChange={(e)=>{
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

      <div id="mainCanvas" style={{overflow:'hidden',background:"#222",width:Math.max(100,width),height:Math.max(100,height)}}>
        <canvas id='main' width={Math.max(100,width)} height={Math.max(100,height)} tabIndex={10} style={{background:"#111111",outline: 'none',borderBottom:'1px solid #666666'}}></canvas>
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
      setSize([(window.clientWidth||window.scrollWidth||window.innerWidth)-15,(window.clientHeight||window.scrollHeight||window.innerHeight)-20]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}


export default App;
