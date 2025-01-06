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
    if(piece === "K" || piece === "k"){
      moves = this.findKingMoves(square);
    }
    if(piece === "R" || piece === "r"){
      moves = this.findRookMoves(square);
    }
    if(piece === "N" || piece === "n"){
      moves = this.findKnightMoves(square);
    }
    if(piece === "B" || piece === "b"){
      moves = this.findBishopMoves(square);
    }
    if(piece === "Q" || piece === "q"){
      moves = this.findQueenMoves(square);
    }
    if(piece === "P" || piece === "p"){
      moves = this.findPawnMoves(square);
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
        if((i !== 0 || j !== 0) && (!this.pieces[this.convertRowColumnToSquare(kingRow+i,kingColumn+j)] || this.isWhite(square) !== this.isWhite(this.convertRowColumnToSquare(kingRow+i,kingColumn+j)))){
          moves.add(this.convertRowColumnToSquare(kingRow+i,kingColumn+j));
        }
      }
    }
    return moves;
  }

  moveDirection(r, c, rDirection, cDirection, isWhite){
    const moves = new Set();
    let stop = false;
    let rowIndex = r;
    let colIndex = c;
    while (r >= 0 && c >= 0 && r < 8 && c < 8 && !stop){
      const currentPiece = this.pieces[r * 8 + c];

      if(currentPiece && (r !== rowIndex || c !== colIndex) && ((isWhite && currentPiece.toUpperCase() === currentPiece) || (!isWhite && currentPiece.toLowerCase() === currentPiece))){
        break;
      }else if(currentPiece && (r !== rowIndex || c !== colIndex) && ((!isWhite && currentPiece.toUpperCase() === currentPiece) || (isWhite && currentPiece.toLowerCase() === currentPiece))){
        stop = true;
      }
      if(r !== rowIndex || c !== colIndex){
        moves.add(r * 8 + c);
      }
      r += rDirection;
      c += cDirection;
    }
    return moves;
  }

  unionSet(set1,set2){
    return new Set([...set1, ...set2]);
  }

  findRookMoves(square){
    var moves = new Set();
    const [rowIndex, colIndex] = this.convertSquareToRowColumn(square);
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, 0, 1, this.isWhite(square)));
    
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, 0, -1, this.isWhite(square)));
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, 1, 0, this.isWhite(square)));
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, -1, 0, this.isWhite(square)));
    return moves;
  }

  findKnightMoves(square){
    const moves = new Set();
    return moves;
  }
  
  findBishopMoves(square){
    var moves = new Set();
    const [rowIndex, colIndex] = this.convertSquareToRowColumn(square);
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, 1, 1, this.isWhite(square)));
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, -1, 1, this.isWhite(square)));
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, 1, -1, this.isWhite(square)));
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, -1, -1, this.isWhite(square)));
    console.log(moves);
    return moves;
  }

  findQueenMoves(square){
    var moves = new Set();
    const [rowIndex, colIndex] = this.convertSquareToRowColumn(square);
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, 1, 1, this.isWhite(square)));
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, -1, 1, this.isWhite(square)));
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, 1, -1, this.isWhite(square)));
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, -1, -1, this.isWhite(square)));
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, 0, 1, this.isWhite(square)));
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, 0, -1, this.isWhite(square)));
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, 1, 0, this.isWhite(square)));
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, -1, 0, this.isWhite(square)));
    return moves;
  }

  findPawnMoves(square){
    var moves = new Set();
    const [rowIndex, colIndex] = this.convertSquareToRowColumn(square);
    // one or two moves if it hasnt moved
    
    // one moves for the rest
    // diagonal captures
    // en passant
    return moves;
  }
}

export default ChessBoard;