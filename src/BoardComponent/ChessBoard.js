class ChessBoard{
  constructor(pieces){
    this.pieces = pieces;
  }

  convertSquareToRowColumn(square){
    return [(square-(square%8))/8, square%8];
  }

  convertRowColumnToSquare(row, column){
    return row*8 + column;
  }

  isWhite(square){
    if(this.pieces[square] === this.pieces[square].toUpperCase()){
      return true;
    }else{
      return false;
    }
  }

  findMoves(square, piece){
    let moves = new Set();
    if(piece === "K"){
      moves = this.findKingMoves(square);
    }
    return moves;
  }

  makeMove(startSquare, endSquare){
    this.pieces[endSquare] = this.pieces[startSquare];
    this.pieces[startSquare] = null;
  }

  removePiece(square){
    this.pieces[square] = null;
  }

  isInBounds(row, column){
    return (row >= 0 && row < 8 && column >= 0 && column < 8);
  }
  
  findKingMoves(square){
    const moves = new Set();
    const [kingRow,kingColumn] = this.convertSquareToRowColumn(square);
    for(let i = -1; i <= 1; i++){
      for(let j = -1; j <= 1; j++){
        if(i !== 0 || j !== 0){
          moves.add(this.convertRowColumnToSquare(kingRow+i,kingColumn+j));
        }
      }
    }
    return moves;
  }
}

export default ChessBoard;