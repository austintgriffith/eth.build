import React from 'react';
import ReactDOM from 'react-dom'
import { withStyles } from '@material-ui/core/styles';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Blockies from 'react-blockies';
const keccak256 = require('keccak256')


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
  this.addOutput("difficulty","number")

  this.balances = {}
  this.prev = {}
  this.nonces = {}
  this.txns = []
  //console.log("CLEARED:",this.txns)

  this.properties =  {
    title:"Ledger",
    requireNonce: false,
    difficulty: 0,
    requireTo: true,
    valueType: "float",
    decimals: 0,
    showGas: false,
    limit: 25,
  }
  this.size = [640, 360];
  this.showingTo = this.properties.requireTo
  this.showingData = false
}

Ledger.prototype.processTx = function(tx) {
  //console.log("process",tx)
  let txHash = ""
  if(tx && tx.hash){
    txHash = tx.hash
    delete tx.hash
    //console.log("txHash",txHash)
  }


  try{
    if((!this.properties.requireTo || tx.to)&&tx.from&&typeof tx.value !="undefined"){
      if(this.properties.valueType=="float"){
        tx.value = parseFloat(tx.value)
        this.balances[tx.from] = this.balances[tx.from]?this.balances[tx.from]-tx.value:-tx.value
      }
      let thisNonce = this.nonces[tx.from]
      if(!thisNonce) thisNonce=0
      if(this.properties.requireNonce && parseInt(tx.nonce) != thisNonce){
        console.log("ILLEGAL NONCE ")
      }else{
        //let work = tx.work
        //delete tx.work
        //
        let stringified = JSON.stringify(tx)


        let valid = false

        if(this.properties.difficulty>0 ){
          //this.prev

          //console.log("difficulty",this.properties)
          //console.log("stringified",stringified)
          let hash = keccak256(stringified).toString('hex')
          //console.log("hash",hash)

          //console.log("work",work)
          let sub = hash.substr(0,this.properties.difficulty)
          //console.log("sub",sub)
          let int = parseInt(sub,16)
          //console.log("int",int)


          if(int===0){
            valid = true
            this.prev[tx.from] = hash
            let oTx = JSON.parse(stringified)
            oTx.hash = "0x"+hash
            stringified = JSON.stringify(oTx)
          }
        }else{
            valid = true
        }

        //console.log("stringify",JSON.stringify(tx))


        if(valid){
          if(this.nonces[tx.from]){
            this.nonces[tx.from]++
          }else{
            this.nonces[tx.from]=1
          }
          if(this.properties.valueType=="float"){
            this.balances[tx.to] = this.balances[tx.to]?this.balances[tx.to]+tx.value:tx.value
          }

          //this.showingTo
          if(tx.to&&!this.showingTo){
            this.showingTo = true
          }

          if(tx.input && !this.showingData){
            this.showingData = true
          }

          //console.log("PUSGHIN",tx)
          this.txns.push(JSON.parse(stringified))
        }else{
          console.log("INVALID WORK or TX?")
        }

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
      //console.log("RUN A FUNCTION BUT IN THIS CONTEXT!",args)
      return this.balances[args.address]
    }
  })
  this.setOutputData(2,{
    name:"nonce",
    args:[{name:"address",type:"string"}],
    function:(args)=>{
      //console.log("RUN A FUNCTION BUT IN THIS CONTEXT!",args)
      if(!this.nonces[args.address]){
        return 0
      }
      return parseInt(this.nonces[args.address])
    }
  })
  this.setOutputData(3,this.properties.difficulty)
}

Ledger.prototype.onAction = function(name) {
  if(name=="reset"){
    //console.log("RESET ")
      this.balances = {}
      this.nonces = {}
      this.prev = {}
      this.txns = []
      let genesis = this.getInputData(2)
      if(genesis){
          //console.log("GENESIS:",genesis)
        for(let k in genesis){
          this.processTx(genesis[k])
        }
      }
  }else{
    let tx = this.getInputData(0)
    //console.log("INPUT 0 is",tx)
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
    //


    for(let t in this.txns){
      let tx = this.txns[t]

      let nonceDisplay = ""
      if(typeof tx.nonce !="undefined"){
        nonceDisplay = (
          "["+tx.nonce+"]"
        )
      }
      let tableCell = ""
      if(tx.hash){
        tableCell = (
          <TableCell style={rowStyle}>
            <Blockies
              seed={tx.hash}
              size={8}
              scale={2}
            />
          <span style={{marginLeft:6}}>
            {tx.hash.substr(0,8)}
          </span>
          </TableCell>
        )
      }

      let toCell =""
      if(this.showingTo){
        toCell = (
          <TableCell style={rowStyle}>
          <Blockies
            seed={tx.to?tx.to.toLowerCase():""}
            size={8}
            scale={2}

          /><span style={{marginLeft:4}}>{tx.to?tx.to.substr(0,8):""}</span>
          </TableCell>
        )
      }
      //this.showingData
      let dataCell =""
      if(this.showingData){
        dataCell = (
          <TableCell style={rowStyle}>
            {tx.input?tx.input.substr(0,8):""}
          </TableCell>
        )
      }

      let gasCell =""
      if(this.properties.showGas){
        gasCell = (
          <TableCell style={rowStyle}>
            {tx.gasPrice?(tx.gasPrice/10**9):""}
          </TableCell>
        )
      }

      let valueCell = ""
      if(this.properties.valueType=="float"){
        let value = parseFloat(tx.value)
        if(this.properties.decimals){
          value/=10**this.properties.decimals
        }
        valueCell = (
          <TableCell style={rowStyle}>
            {value.toFixed(2)}
          </TableCell>
        )
      }else{
        valueCell = (
          <TableCell style={rowStyle}>
            {tx.value}
          </TableCell>
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
          {valueCell}
          {toCell}
          {tableCell}
          {dataCell}
          {gasCell}
        </StyledTableRow>
      )
    }
    if(this.properties.showGas){
      rows.sort((a,b)=>{
        return (a.gasPrice>b.gasPrice)
      })
    }else{
      rows.reverse()
    }


    if(rows.length>this.properties.limit){
      //console.log("limiting to ",this.properties.limit)
      rows = rows.slice(0,this.properties.limit)
    }



    let hashCell = ""

    if(this.properties.difficulty>0){
      hashCell = (
        <TableCell>
          Hash
        </TableCell>
      )
    }


    let toCell = ""
    if(this.showingTo){
      toCell = (
        <TableCell>
          To
        </TableCell>
      )
    }

    let dataCell = ""
    if(this.showingData){
      dataCell = (
        <TableCell>
          Data
        </TableCell>
      )
    }

    let gasCell = ""
    if(this.properties.showGas){
      gasCell = (
        <TableCell>
          Gas
        </TableCell>
      )
    }

    //transformOrigin:"3% -7%"
    this.render(
      <div style={{overflow:"auto",color:"#444444",transformOrigin:"10px -20px",transform:"scale("+(this.graph.canvas?this.graph.canvas.ds.scale:0)+")",borderRadius:"0px 0px 8px 8px",background:"#CCCCCC",marginLeft:-19,marginTop:topPadding,width:this.size[0]-5,height:this.size[1]-topPadding-1-5}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                From
              </TableCell>
              <TableCell>
                Value
              </TableCell>
              {toCell}
              {hashCell}
              {dataCell}
              {gasCell}
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
