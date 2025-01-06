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

  findMoves(square, piece, moveLog){
    let lastMove = null;
    if(moveLog.length !== 0){
      lastMove = moveLog[moveLog.length-1];
    }
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
      moves = this.findPawnMoves(square, lastMove);
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
        if((i !== 0 || j !== 0) && (this.pieces[this.convertRowColumnToSquare(kingRow+i,kingColumn+j)] === null || this.isWhite(square) !== this.isWhite(this.convertRowColumnToSquare(kingRow+i,kingColumn+j)))){
          moves.add(this.convertRowColumnToSquare(kingRow+i,kingColumn+j));
        }
      }
    }
    
    // short castle

    // long castle
    
    return moves;
  }

  moveDirection(r, c, rDirection, cDirection, isWhite){
    const moves = new Set();
    let stop = false;
    let rowIndex = r;
    let colIndex = c;
    while (r >= 0 && c >= 0 && r < 8 && c < 8 && !stop){
      const currentPiece = this.pieces[r * 8 + c];

      if(currentPiece !== null && (r !== rowIndex || c !== colIndex) && ((isWhite && currentPiece.toUpperCase() === currentPiece) || (!isWhite && currentPiece.toLowerCase() === currentPiece))){
        break;
      }else if(currentPiece !== null && (r !== rowIndex || c !== colIndex) && ((!isWhite && currentPiece.toUpperCase() === currentPiece) || (isWhite && currentPiece.toLowerCase() === currentPiece))){
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
    const knight = [-2, -1, 1, 2];
    for(let i = 0; i < knight.length; i++){
      for(let j = 0; j < knight.length; j++){
        const [rowIndex, colIndex] = this.convertSquareToRowColumn(square);
        if(Math.abs(knight[i]) !== Math.abs(knight[j]) && this.isInBounds(rowIndex+knight[i],colIndex+knight[j]) && (this.pieces[this.convertRowColumnToSquare(rowIndex+knight[i],colIndex+knight[j])] === null || this.isWhite(this.convertRowColumnToSquare(rowIndex+knight[i],colIndex+knight[j])) !== this.isWhite(square))){
          moves.add(this.convertRowColumnToSquare(rowIndex+knight[i],colIndex+knight[j]));
        }
      }
    }
    return moves;
  }
  
  findBishopMoves(square){
    var moves = new Set();
    const [rowIndex, colIndex] = this.convertSquareToRowColumn(square);
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, 1, 1, this.isWhite(square)));
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, -1, 1, this.isWhite(square)));
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, 1, -1, this.isWhite(square)));
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, -1, -1, this.isWhite(square)));
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

  findPawnMoves(square, lastMove){
    var moves = new Set();
    console.log(lastMove);
    const [rowIndex, colIndex] = this.convertSquareToRowColumn(square);
    const difference = this.isWhite(square) ? -1 : 1;
    // one or two moves if it hasnt moved
    if(this.isInBounds(rowIndex+difference,colIndex) && this.pieces[this.convertRowColumnToSquare(rowIndex+difference,colIndex)] === null){
      moves.add(this.convertRowColumnToSquare(rowIndex+difference,colIndex));
      // one moves for the rest
      if((rowIndex === 6 || rowIndex === 1) && this.isInBounds(rowIndex+(2*difference),colIndex) && !this.pieces[this.convertRowColumnToSquare(rowIndex+(2*difference),colIndex)]){
        moves.add(this.convertRowColumnToSquare(rowIndex+(2*difference),colIndex));
      }
    }
    // diagonal captures
    if(this.isInBounds(rowIndex+difference,colIndex+1) && this.pieces[this.convertRowColumnToSquare(rowIndex+difference,colIndex+1)] !== null && (this.isWhite(square) !== this.isWhite(this.convertRowColumnToSquare(rowIndex+difference,colIndex+1)))){
      moves.add(this.convertRowColumnToSquare(rowIndex+difference,colIndex+1));
    }
    if(this.isInBounds(rowIndex+difference,colIndex-1) && this.pieces[this.convertRowColumnToSquare(rowIndex+difference,colIndex-1)] !== null && (this.isWhite(square) !== this.isWhite(this.convertRowColumnToSquare(rowIndex+difference,colIndex-1)))){
      moves.add(this.convertRowColumnToSquare(rowIndex+difference,colIndex-1));
    }
    // en passant (must happen after first move)
    // last move should be (row 2 row 4 null null)
    if(lastMove !== null){
      const [startSquare,endSquare,pieceTaken,pieceLocation] = lastMove;
      // opposite pawn must move from 2nd rank to 4th rank
      const [attackingPawnRow,attackingPawnColumn] = this.convertSquareToRowColumn(square);
      const [defendingPawnRow,defendingPawnColumn] = this.convertSquareToRowColumn(endSquare);
      console.log(endSquare,startSquare)
      if(this.isWhite(square) !== this.isWhite(endSquare) && endSquare+(difference*16) === startSquare){ // opposite colors and two row move
        if((this.pieces[square] === "P" || this.pieces[square] === "p") && (this.pieces[endSquare] === "P" || this.pieces[endSquare] === "p")){ // both pieces are pawns
          if(attackingPawnRow === defendingPawnRow && (attackingPawnColumn === defendingPawnColumn+1 || attackingPawnColumn === defendingPawnColumn-1)){
            moves.add(this.convertRowColumnToSquare(attackingPawnRow+difference,defendingPawnColumn));
          }
        }
      }
    }
    return moves;
  }
}

export default ChessBoard;