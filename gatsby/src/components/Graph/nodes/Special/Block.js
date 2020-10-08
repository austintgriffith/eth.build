import React from 'react';
import ReactDOM from 'react-dom'
import { withStyles } from '@material-ui/core/styles';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Blockies from 'react-blockies';
const keccak256 = require('keccak256')


const topPadding = 70
const rowStyle = {fontSize:20,letterSpacing:-1}

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: "#dddddd",
    },
  },
}))(TableRow);

function Block() {
  //this.addInput("[network]",0)
  this.addInput("parent",0)
  this.addInput("transactions","object")
  this.addInput("nonce","number")
  //this.addOutput("[network]",0)
  this.addOutput("","array,object")
  this.addOutput("hash","string")
  this.addOutput("valid",-1)


  this.balances = {}
  this.prev = {}
  this.nonces = {}
  this.txns = []
  this.nonce = 0
  this.parent = 0
  console.log("CLEARED:",this.txns)

  this.properties =  {
    title:"Block",
    number: 0,
    difficulty: 1,
    lockOnValidBlock: true,
    requireMiner: false,
    blockReward: 10,
  }
  this.size = [640, 360];
  this.showingTo = true


}

Block.prototype.processTx = function(tx) {
  console.log("process",tx)
  try{
    if((!this.properties.requireTo || tx.to)&&tx.from&&tx.value){
      let thisNonce = this.nonces[tx.from]
      if(!thisNonce) thisNonce=0
      if(this.properties.requireNonce && parseInt(tx.nonce) != thisNonce){
        console.log("ILLEGAL NONCE ")
      }else{
        //let work = tx.work
        //delete tx.work
        //
        let stringified = JSON.stringify(tx)

        if(this.nonces[tx.from]){
          this.nonces[tx.from]++
        }else{
          this.nonces[tx.from]=1
        }

        //this.showingTo
        if(tx.to&&!this.showingTo){
          this.showingTo = true
        }

        if(tx.input && !this.showingData){
          this.showingData = true
        }

        this.txns.push(JSON.parse(stringified))
      }
    }
  }catch(e){console.log(e)}
}

Block.title = "Block";


Block.prototype.getTitle = function() {
  return this.properties.title;
};


Block.prototype.onExecute = function() {
  if(this.properties.lockOnValidBlock /*&& this.properties.validTxns*/ && this.properties.validNonce && this.properties.validHash) {
    this.title_color = "#22aa66";
    this.properties.title = "#"+this.properties.number


    this.blockToDoublecheckHash = {"transactions":JSON.parse(this.properties.validTxns),"nonce":this.properties.validNonce,"parent":this.parent?this.parent.hash:0}

    if(this.properties.validMiner){
      this.blockToDoublecheckHash.miner = this.properties.validMiner
    }

    let stringified = JSON.stringify(this.blockToDoublecheckHash)
    //console.log("block #"+this.properties.number+" to double check hash stringified",stringified)

    this.hash = "0x"+keccak256(stringified).toString('hex')
    this.setOutputData(1,this.hash)

    let valid = this.validHash(this.hash)
    this.setOutputData(2,valid)

    if(!valid){
      console.log("NOT VALID")
      this.properties.validHash = null
    }else{
      this.txns = JSON.parse(this.properties.validTxns)
      this.parent = this.getInputData(0)

      this.block = {"transactions":this.txns,"nonce":this.properties.validNonce,"parent":this.parent?this.parent:0}

      if(this.properties.validMiner){
        this.block.miner = this.properties.validMiner
      }

      this.block.hash = this.properties.validHash

      this.setOutputData(0,this.block)
    }



  }else{
    let txns = this.getInputData(1)

    if(txns && txns.length>0){
      this.txns = txns
    }else{
      this.txns = []
      if(this.properties.validTxns){
        this.txns = JSON.parse(this.properties.validTxns)
      }
    }

    let number = 1
    let parent = this.getInputData(0)
    if(parent){

      this.parent = parent
      //console.log("parent is ",parent )
      let current = this.parent
      while(current){
        current = current.parent
        //console.log("going depper")
        number++
      }
    }else{
      this.parent = 0
    }



      //console.log("THIS NUMBER IS NOW ",number)
      this.properties.number = number



    if(this.properties.validNonce){
      this.properties.title = "#"+number
    }else{
      if(this.parent && this.parent.hash){
        this.properties.title = "#"+number
      }else{
        this.properties.title = "Block"
      }
    }


    let nonce = this.getInputData(2)
    if(nonce==nonce && (typeof nonce == "number" || typeof nonce == "string")){
      this.nonce = parseInt(nonce)
      //console.log("setting nonce because type is ",typeof nonce,nonce)
      //this.outputs[2].label = this.nonce
    }else{
      this.nonce = 0
      if(this.properties.validNonce){
        this.nonce = this.properties.validNonce
      }
    }

    let miner = ""
    if(this.block && this.block.miner && miner != this.block.miner){
      miner = this.block.miner
    }

    //console.log("this.txns",this.txns)
    this.block = {"transactions":this.txns,"nonce":this.nonce,"parent":this.parent?this.parent.hash:0}

    if(miner && this.properties.requireMiner){
      this.block.miner = miner
    }

    let stringified = JSON.stringify(this.block)
    //console.log("block #"+number+" stringified",stringified)

    this.hash = "0x"+keccak256(stringified).toString('hex')
    this.setOutputData(1,this.hash)

    //console.log("resulting hash: ",this.hash)

    this.block.hash = this.hash
    this.block.parent = this.parent

    let valid = this.validHash(this.hash)
    this.setOutputData(2,valid)
    if(valid){
      this.title_color = "#22aa66";
      this.properties.validTxns = JSON.stringify(this.txns)
      if(this.properties.validNonce != this.nonce){

        this.trigger("valid",this.properties.validNonce)
      }
      this.properties.validNonce = this.nonce
      //console.log("SETTING this.properties.validHash to this.hash",this.hash,stringified)
      this.properties.validHash = this.hash
      this.properties.validParent = this.parent.hash
      if(miner && this.properties.requireMiner){
         //console.log("VALID MINER IS NOW",miner)
         this.properties.validMiner = miner
      }
    }else{
      this.title_color = "#4488bb";
    }

    this.setOutputData(0,this.block)
  }



  /*this.setOutputData(1,{
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
  this.setOutputData(3,this.properties.difficulty)*/
}


Block.prototype.validHash = function(hash) {
  //console.log("testing if ",hash,"is valid...")
  let valid = false
  if(!hash) return false
  let sub = hash.substr(2,this.properties.difficulty)
  //console.log("sub",sub)
  //console.log("length",sub.length)
  if(sub.length > 0){
    let i = parseInt(sub,16)
    //console.log("i",i)
    valid = (0==parseInt(sub,16))
  }
  return valid
}



Block.prototype.onDrawBackground = function(ctx) {
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
            seed={tx.to&&typeof tx.to.toLowerCase =="function"?tx.to.toLowerCase():""}
            size={8}
            scale={2}

          /><span style={{marginLeft:4}}>{tx.to?tx.to.substr(0,8):""}</span>
          </TableCell>
        )
      }


      let valueCell = ""
      valueCell = (
        <TableCell style={rowStyle}>
          {tx.value}
        </TableCell>
      )


      rows.push(
        <StyledTableRow>
          <TableCell style={rowStyle}>
            <Blockies
              seed={tx.from&&typeof tx.from.toLowerCase == "function"?tx.from.toLowerCase():""}
              size={8}
              scale={2}
            /><span style={{marginLeft:4}}>{tx.from&&typeof tx.from.substr == "function"?tx.from.substr(0,8):""} {nonceDisplay}</span>
          </TableCell>
          {valueCell}
          {toCell}
          {tableCell}
        </StyledTableRow>
      )
    }

    if(this.properties.validHash && this.properties.requireMiner){
      rows.push(
        <StyledTableRow>
          <TableCell style={rowStyle}>
            ⚒
          </TableCell>
          <TableCell style={rowStyle}>
            {this.properties.blockReward}
          </TableCell>
          <TableCell style={rowStyle}>
          <Blockies
            seed={this.properties.validMiner}
            size={8}
            scale={2}

          /><span style={{marginLeft:4}}>{this.properties.validMiner}</span>
          </TableCell>
        </StyledTableRow>
      )
    }

    rows.reverse()



    let toCell = ""
    if(this.showingTo){
      toCell = (
        <TableCell>
          To
        </TableCell>
      )
    }

    let minedBlockDisplay = ""

    //console.log("this.properties.validHash",this.properties.validHash)

    if(this.properties.validNonce){
      minedBlockDisplay = (
        <div style={{fontSize:28,position:'absolute',left:80,top:30,width:this.size[0]/1.7}}>
          {this.properties.validHash?this.properties.validHash.substr(0,8):""} {!this.properties.validHash && this.hash?this.hash.substr(0,8):""} <span style={{opacity:0.5,fontSize:16}}>{this.properties.validNonce}</span>
        </div>
      )
    }



    //transformOrigin:"3% -7%"
    this.render(
      <div>
        <div style={{position:"absolute",top:0,left:0}}>
          {minedBlockDisplay}
        </div>
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
                {toCell}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
};




export default Block
