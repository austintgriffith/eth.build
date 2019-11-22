import React from 'react';
import ReactDOM from 'react-dom'
import { withStyles } from '@material-ui/core/styles';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Blockies from 'react-blockies';


const topPadding = 90
const rowStyle = {fontSize:20,letterSpacing:-1}

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: "#dddddd",
    },
  },
}))(TableRow);

function Ledger() {
  //this.addInput("[network]",0)
  this.addInput("tx","object")
  this.addInput("add",-1)
  this.addInput("genesis","object")
  this.addInput("reset",-1)
  //this.addOutput("[network]",0)
  this.addOutput("","array,object")
  this.addOutput("balance()","function")
  this.addOutput("nonce()","function")

  this.balances = {}
  this.nonces = {}
  this.txns = []
  console.log("CLEARED:",this.txns)

  this.properties =  {
    title:"Ledger",
    requireNonce: false
  }
  this.size = [640, 360];

}

Ledger.prototype.processTx = function(tx) {
  console.log("process",tx)
  try{
    if(tx.to&&tx.from&&tx.value){
      tx.value = parseFloat(tx.value)
      this.balances[tx.from] = this.balances[tx.from]?this.balances[tx.from]-tx.value:-tx.value
      let thisNonce = this.nonces[tx.from]
      if(!thisNonce) thisNonce=0
      if(this.properties.requireNonce && parseInt(tx.nonce) != thisNonce){
        console.log("ILLEGAL NONCE ")
      }else{
        if(this.nonces[tx.from]){
          this.nonces[tx.from]++
        }else{
          this.nonces[tx.from]=1
        }
        this.balances[tx.to] = this.balances[tx.to]?this.balances[tx.to]+tx.value:tx.value
        console.log("PUSGHIN",tx)
        this.txns.push(JSON.parse(JSON.stringify(tx)))
      }
    }
  }catch(e){console.log(e)}
}

Ledger.title = "Ledger";
Ledger.prototype.getTitle = function() {
  return this.properties.title;
};


Ledger.prototype.onExecute = function() {
  //console.log("this.txns",this.txns)
  this.setOutputData(0,this.txns)
  this.setOutputData(1,{
    name:"balance",
    args:[{name:"address",type:"string"}],
    function:(args)=>{
      console.log("RUN A FUNCTION BUT IN THIS CONTEXT!",args)
      return this.balances[args.address]
    }
  })
  this.setOutputData(2,{
    name:"nonce",
    args:[{name:"address",type:"string"}],
    function:(args)=>{
      console.log("RUN A FUNCTION BUT IN THIS CONTEXT!",args)
      if(!this.nonces[args.address]){
        return 0
      }
      return parseInt(this.nonces[args.address])
    }
  })
}

Ledger.prototype.onAction = function(name) {
  if(name=="reset"){
    console.log("RESET ")
      this.balances = {}
      this.nonces = {}
      this.txns = []
      let genesis = this.getInputData(2)
      if(genesis){
          console.log("GENESIS:",genesis)
        for(let k in genesis){
          this.processTx(genesis[k])
        }
      }
  }else{
    let tx = this.getInputData(0)
    console.log("INPUT 0 is",tx)
    this.processTx(tx)
  }

}


Ledger.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR
  }else{

    const itemStyle = {padding:5,borderBottom:"1px solid #969cca"}

    let rows = []

    //console.log("this.txns",this.txns)

    for(let t in this.txns){
      let tx = this.txns[t]

      let nonceDisplay = ""
      if(typeof tx.nonce !="undefined"){
        nonceDisplay = (
          "["+tx.nonce+"]"
        )
      }
      rows.push(
        <StyledTableRow>
          <TableCell style={rowStyle}>
            <Blockies
              seed={tx.from?tx.from.toLowerCase():""}
              size={8}
              scale={2}
            /><span style={{marginLeft:4}}>{tx.from?tx.from.substr(0,8):""} {nonceDisplay}</span>
          </TableCell>
          <TableCell style={rowStyle}>
            {parseFloat(tx.value).toFixed(2)}
          </TableCell>
          <TableCell style={rowStyle}>
          <Blockies
            seed={tx.to?tx.to.toLowerCase():""}
            size={8}
            scale={2}

          /><span style={{marginLeft:4}}>{tx.to?tx.to.substr(0,8):""}</span>
          </TableCell>
        </StyledTableRow>
      )
    }
    rows.reverse()

    //transformOrigin:"3% -7%"
    this.render(
      <div style={{overflow:"auto",color:"#444444",transformOrigin:"10px -20px",transform:"scale("+(this.graph.canvas?this.graph.canvas.ds.scale:0)+")",borderRadius:"0px 0px 8px 8px",background:"#CCCCCC",marginLeft:-19,marginTop:topPadding,width:this.size[0],height:this.size[1]-topPadding-1}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                From
              </TableCell>
              <TableCell>
                Value
              </TableCell>
              <TableCell>
                To
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
      </div>
    )
  }
};




export default Ledger
