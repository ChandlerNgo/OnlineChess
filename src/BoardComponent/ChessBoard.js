import Piece from "./Piece";

class ChessBoard{
  constructor(){
      this.grid = Array(64).fill(null);
      this.initializeBoard();
  }

  initializeBoard(){
    const pieceOrder = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

    // Place pawns
    for (let col = 0; col < 8; col++) {
        this.addPiece(new Piece('black', 'pawn', [1, col]));
        this.addPiece(new Piece('white', 'pawn', [6, col]));
    }

    // Place other grid
    for (let col = 0; col < 8; col++) {
      this.addPiece(new Piece('white', pieceOrder[col], [7, col]));
        this.addPiece(new Piece('black', pieceOrder[col], [0, col]));
    }
  }

  addPiece(piece){
      const index = piece.getPieceIndex();
      this.grid[index] = piece;
  }

  convertSquareToRowColumn(square){
    return [(square-(square%8))/8, square%8];
  }

  convertRowColumnToSquare(row, column){
    return row*8 + column;
  }

  isWhite(square){
    if(this.grid[square].color === "white"){
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
    if(piece.pieceType === "king"){
      moves = this.findKingMoves(square, moveLog);
    }
    if(piece.pieceType === "rook"){
    moves = this.findRookMoves(square);
    }
    if(piece.pieceType === "knight"){
      moves = this.findKnightMoves(square);
    }
    if(piece.pieceType === "bishop"){
      moves = this.findBishopMoves(square);
    }
    if(piece.pieceType === "queen"){
      moves = this.findQueenMoves(square);
    }
    if(piece.pieceType === "pawn"){
      moves = this.findPawnMoves(square, lastMove);
    }
    return moves;
  }

  makeMove(piece, endSquare){
    const [oldRow, oldCol] = piece.position;
    const [newRow, newCol] = this.convertSquareToRowColumn(endSquare);
    const startSquare = oldRow * 8 + oldCol;

    // Validate move and update board state
    if(this.grid[endSquare]){
      this.grid[endSquare].capture(piece);
    }
    console.log("this is startSquare ", startSquare);
    console.log(newRow, newCol);
    this.grid[startSquare] = null;
    this.grid[endSquare] = piece;
    piece.position = [newRow, newCol];
    console.log("this is endSquare ", endSquare);
    console.log(piece);
    piece.move(newRow, newCol);
  }

  removePiece(square){
    this.grid[square] = null;
  }

  isInBounds(row, column){
    return (row >= 0 && row < 8 && column >= 0 && column < 8);
  }
  
  findKingMoves(square, moveLog){
    // moveLog = [startSquare, endSquare, pieceTaken, pieceLocation, pieceMoved]
    const moves = new Set();
    const [kingRow,kingColumn] = this.convertSquareToRowColumn(square);
    for(let i = -1; i <= 1; i++){
      for(let j = -1; j <= 1; j++){
        if((i !== 0 || j !== 0) && this.isInBounds(kingRow+i,kingColumn+j) && (this.grid[this.convertRowColumnToSquare(kingRow+i,kingColumn+j)] === null || this.isWhite(square) !== this.isWhite(this.convertRowColumnToSquare(kingRow+i,kingColumn+j)))){
          moves.add(this.convertRowColumnToSquare(kingRow+i,kingColumn+j));
        }
      }
    }
    
    if(this.grid[square].pieceType === "king" && this.grid[square].color === "white"){
      console.log("here");
      // return true if piece not there
      var hasLongRookMoved = this.grid[56] === null || !(this.grid[56].position[0] === this.grid[56].startPosition[0] && this.grid[56].position[1] === this.grid[56].startPosition[1] && !this.grid[56].hasMoved);
      var hasKingMoved = this.grid[60] === null || !(this.grid[60].position[0] === this.grid[60].startPosition[0] && this.grid[60].position[1] === this.grid[60].startPosition[1] && !this.grid[60].hasMoved);
      var hasShortRookMoved = this.grid[63] === null || !(this.grid[63].position[0] === this.grid[63].startPosition[0] && this.grid[63].position[1] === this.grid[63].startPosition[1] && !this.grid[63].hasMoved);
      var isLongSideClear = !this.grid[57] && !this.grid[58] && !this.grid[59];
      var isShortSideClear = !this.grid[61] && !this.grid[62];
      // short castle
      console.log(hasLongRookMoved,hasKingMoved,hasShortRookMoved,isLongSideClear,isShortSideClear)
      if(!hasKingMoved && !hasShortRookMoved && isShortSideClear){
        console.log("short");
        moves.add(62);
      }
      
      // long castle
      if(!hasKingMoved && !hasLongRookMoved && isLongSideClear){
        console.log("long");
        moves.add(58);
      }
    }else{
      hasLongRookMoved = this.grid[0] === null || !(this.grid[0].position[0] === this.grid[0].startPosition[0] && this.grid[0].position[1] === this.grid[0].startPosition[1] && !this.grid[0].hasMoved);
      hasKingMoved = this.grid[4] === null || !(this.grid[4].position[0] === this.grid[4].startPosition[0] && this.grid[4].position[1] === this.grid[4].startPosition[1] && !this.grid[4].hasMoved);
      hasShortRookMoved = this.grid[7] === null || !(this.grid[7].position[0] === this.grid[7].startPosition[0] && this.grid[7].position[1] === this.grid[7].startPosition[1] && !this.grid[7].hasMoved);
      isLongSideClear = !this.grid[1] && !this.grid[2] && !this.grid[3];
      isShortSideClear = !this.grid[5] && !this.grid[6];
      // short castle
      if(!hasKingMoved && !hasShortRookMoved && isShortSideClear){
        moves.add(6);
      }
      
      // long castle
      if(!hasKingMoved && !hasLongRookMoved && isLongSideClear){
        moves.add(2);
      }
    }
    return moves;
  }

  moveDirection(r, c, rDirection, cDirection){
    const moves = new Set();
    let stop = false;
    let rowIndex = r;
    let colIndex = c;
    const piece = this.grid[this.convertRowColumnToSquare(rowIndex,colIndex)];
    while (r >= 0 && c >= 0 && r < 8 && c < 8 && !stop){
      const currentPiece = this.grid[r * 8 + c];
      if(currentPiece !== null && (r !== rowIndex || c !== colIndex) && (piece.color === currentPiece.color)){
        break;
      }else if(currentPiece !== null && (r !== rowIndex || c !== colIndex) && (piece.color !== currentPiece.color)){
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
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, 0, 1));
    
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, 0, -1));
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, 1, 0));
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, -1, 0));
    return moves;
  }

  findKnightMoves(square){
    const moves = new Set();
    const knight = [-2, -1, 1, 2];
    for(let i = 0; i < knight.length; i++){
      for(let j = 0; j < knight.length; j++){
        const [rowIndex, colIndex] = this.convertSquareToRowColumn(square);
        if(Math.abs(knight[i]) !== Math.abs(knight[j]) && this.isInBounds(rowIndex+knight[i],colIndex+knight[j]) && (this.grid[this.convertRowColumnToSquare(rowIndex+knight[i],colIndex+knight[j])] === null || this.isWhite(this.convertRowColumnToSquare(rowIndex+knight[i],colIndex+knight[j])) !== this.isWhite(square))){
          moves.add(this.convertRowColumnToSquare(rowIndex+knight[i],colIndex+knight[j]));
        }
      }
    }
    return moves;
  }
  
  findBishopMoves(square){
    var moves = new Set();
    const [rowIndex, colIndex] = this.convertSquareToRowColumn(square);
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, 1, 1));
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, -1, 1));
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, 1, -1));
    moves = this.unionSet(moves,this.moveDirection(rowIndex, colIndex, -1, -1));
    return moves;
  }

  findQueenMoves(square){
    var moves = new Set();
    moves = this.unionSet(moves,this.findBishopMoves(square));
    moves = this.unionSet(moves,this.findRookMoves(square));
    return moves;
  }

  findPawnMoves(square, lastMove){
    var moves = new Set();
    console.log(lastMove);
    const [rowIndex, colIndex] = this.convertSquareToRowColumn(square);
    const difference = this.isWhite(square) ? -1 : 1;
    // one or two moves if it hasnt moved
    if(this.isInBounds(rowIndex+difference,colIndex) && this.grid[this.convertRowColumnToSquare(rowIndex+difference,colIndex)] === null){
      moves.add(this.convertRowColumnToSquare(rowIndex+difference,colIndex));
      // one moves for the rest
      if((rowIndex === 6 || rowIndex === 1) && this.isInBounds(rowIndex+(2*difference),colIndex) && !this.grid[this.convertRowColumnToSquare(rowIndex+(2*difference),colIndex)]){
        moves.add(this.convertRowColumnToSquare(rowIndex+(2*difference),colIndex));
      }
    }
    // diagonal captures
    if(this.isInBounds(rowIndex+difference,colIndex+1) && this.grid[this.convertRowColumnToSquare(rowIndex+difference,colIndex+1)] !== null && (this.isWhite(square) !== this.isWhite(this.convertRowColumnToSquare(rowIndex+difference,colIndex+1)))){
      moves.add(this.convertRowColumnToSquare(rowIndex+difference,colIndex+1));
    }
    if(this.isInBounds(rowIndex+difference,colIndex-1) && this.grid[this.convertRowColumnToSquare(rowIndex+difference,colIndex-1)] !== null && (this.isWhite(square) !== this.isWhite(this.convertRowColumnToSquare(rowIndex+difference,colIndex-1)))){
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
        if((this.grid[square].pieceType === "pawn") && (this.grid[endSquare].pieceType === "pawn")){ // both grid are pawns
          if(attackingPawnRow === defendingPawnRow && (attackingPawnColumn === defendingPawnColumn+1 || attackingPawnColumn === defendingPawnColumn-1)){
            moves.add(this.convertRowColumnToSquare(attackingPawnRow+difference,defendingPawnColumn));
          }
        }
      }
    }
    return moves;
  }

  toString(){
      let display = '';
      for (let row = 0; row < 8; row++) {
          display += this.grid.slice(row * 8, (row + 1) * 8).map(cell => (cell ? cell.pieceType[0].toUpperCase() : '.')).join(' ') + '\n';
      }
      return display;
  }
}

export default ChessBoard;