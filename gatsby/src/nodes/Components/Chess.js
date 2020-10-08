import React from 'react';
import ReactDOM from 'react-dom'

const chess = require('chess');

const ReactChess = require('react-chess')


function ChessBoard() {
  //this.addInput("[network]",0)
  this.addInput("move","string")
  this.addInput("",-1)
  this.addInput("moves","array,object")
  this.addInput("load",-1)

  this.addOutput("status","object")
  this.addOutput("moves","array,object")
  this.addOutput("move",-1)
  this.properties =  {
    title:"Chess"
  }
  this.size = [440, 532];
  this.moves = []
  this.pieces = []

  this.gameClient = chess.create();

  // capture check and checkmate events
  this.gameClient.on('check', (attack) => {
    // get more details about the attack on the King
    console.log("CHESS, CHECK:",attack);
  });
/*
  // look at the status and valid moves
  this.status = this.gameClient.getStatus();
  console.log("status",this.status)

  // make a move
  this.move = this.gameClient.move('a4');
  console.log("move (a4)",this.move)*/

  // look at the status again after the move to see
  // the opposing side's available moves
  //
  //
  //
}
ChessBoard.prototype.onAction = function(name) {
  if(name=="load"){
    this.moves = []
    this.pieces = []

    console.log("LOAD")
    let newState = this.getInputData(2)
    console.log(newState)

    this.gameClient = chess.create();

    //let move, status;

    // capture check and checkmate events
    //gameClient.on('check', (attack) => {
    //  // get more details about the attack on the King
    //  console.log(attack);
    //});

    // look at the status and valid moves
    //status = gameClient.getStatus();

    // make a move
    //move = gameClient.move('a4');
    //
    //

    for(let move in newState){
      if(newState[move]){
        console.log("making move ",newState[move])
        this.moves.push(newState[move])
        this.gameClient.move(newState[move])
      }
    }
  }else{
    //ADD MOVE
    let nextMove = this.getInputData(0)
    try{
      console.log("making move ",nextMove)
      this.moves.push(nextMove)
      this.gameClient.move(nextMove)
    }catch(e){console.log(e)}
  }
     this.loadPieces()
}

ChessBoard.prototype.onExecute = function() {
  this.setOutputData(0,this.status)
  this.setOutputData(1,this.moves)

}
ChessBoard.prototype.onAdded = function() {
  //this.pieces = ReactChess.getDefaultLineup()
  this.loadPieces()
  //console.log("  this.pieces",  this.pieces)
}

ChessBoard.prototype.loadPieces = function() {
  this.pieces = []
  this.status = this.gameClient.getStatus();
  //console.log("LOADING PIECES",this.status )

  for(let s in this.status.board.squares){
    let piece = this.status.board.squares[s].piece
    //console.log("this.status.board.squares[s]",s,this.status.board.squares[s])
    if(piece){
      //console.log("piece",piece)
      let notation = piece.notation
      if(piece.type=="pawn"){
        notation = "P"
      }
      if(piece.side.name=="black"){
        notation = (""+notation).toLowerCase()
      }

      let pieceAndLocation = notation+"@"+this.status.board.squares[s].file+""+this.status.board.squares[s].rank
      //console.log(pieceAndLocation)
      this.pieces.push(pieceAndLocation)
    }
  }
  this.onDrawBackground()
}

ChessBoard.title = "Chess";


ChessBoard.prototype.onDrawBackground = function(ctx) {
  if (this.flags.collapsed) {
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR JUST NOT SHOW IT?! THIS SEEMS WEIRD
  }else{
    console.log(this.status)
    this.render(
      <div style={{marginLeft:-20,marginTop:90,width:this.size[0],height:this.size[1]-120}}>
        <div style={{position:"absolute",left:50,top:20}}>
          turn: {((this.moves.length%2)==0)?"White":"Black"}
          <div>
            {this.status.isCheck?"CHECK":""}{this.status.isCheckmate?"MATE!":""}
          </div>
          <div>
            {this.status.isRepetition?"REPETITION":""} {this.status.isStalemate?"STALEMATE":""}
          </div>
        </div>
        <ReactChess
          pieces={this.pieces}
          onMovePiece={(piece,from,to)=>{
            console.log("MOVE",piece,from,to)
            let foundMove = false
            for(let m in this.status.notatedMoves){
              //console.log("avail",this.status.notatedMoves[m])
              let dest = this.status.notatedMoves[m].dest.file + this.status.notatedMoves[m].dest.rank
              let src = this.status.notatedMoves[m].src.file + this.status.notatedMoves[m].src.rank
              //console.log("DEST",dest)
              //console.log("SRC",src)
              if(from == src && to == dest){
                //console.log("FOUND MOVE",m)
                foundMove = m
                break
              }
            }

            this.pieces = this.pieces
               .map((curr, index) => {
                 if (piece.index === index) {
                   return `${piece.name}@${to}`
                 } else if (curr.indexOf(to) === 2) {
                   return false // To be removed from the board
                 }
                 return curr
               })
               .filter(Boolean)
              this.onDrawBackground()

            if(foundMove){
              console.log("MOVE",foundMove)
              this.moves.push(foundMove)
              this.move = this.gameClient.move(foundMove)
              console.log(this.move)
              this.loadPieces()
              this.trigger("move",foundMove)
            }else{
              console.log("UNDO~!")
              //WTF AM I DOING
              setTimeout(()=>{
                this.loadPieces()
              },250)
            }
            //console.log("piece.notation",piece.notation)
          }}
          lightSquareColor={"#6d899a"}
          darkSquareColor={"#4a5a64"}
        />
      </div>
    )
  }
};



export default ChessBoard
