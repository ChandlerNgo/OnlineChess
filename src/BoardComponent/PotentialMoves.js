class PotentialMoves{
  constructor(pieces){
    this._pieces = pieces;
  }

  get pieces(){
    return this._pieces;
  }

  set pieces(newPieces){
    this._pieces = newPieces;
  }

  moveDirection(r, c, rDirection, cDirection, isWhite, newSet, originRow, originCol){
    let stop = false;
    let rowIndex = r;
    let colIndex = c;
    while (r >= 0 && c >= 0 && r < 8 && c < 8 && !stop){
      const currentPiece = this._pieces[r * 8 + c];

      if(currentPiece && (r !== originRow || c !== originCol) && ((isWhite && currentPiece.toUpperCase() === currentPiece) || (!isWhite && currentPiece.toLowerCase() === currentPiece))){
        break;
      }else if(currentPiece && (r !== originRow || c !== originCol) && ((!isWhite && currentPiece.toUpperCase() === currentPiece) || (isWhite && currentPiece.toLowerCase() === currentPiece))){
        stop = true;
      }
      if(r !== rowIndex || c !== colIndex){
        newSet.add(r * 8 + c);
      }
      r += rDirection;
      c += cDirection;
    }
  }

  surroundingDirection(r, c, size, newSet, originRow, originCol){
    for(let x = -size; x <= size; x++){
      for(let y = -size; y <= size; y++){
        if(r + x >= 0 && c + y >= 0 && r + x < 8 && c + y < 8 && (this._pieces[(r + x) * 8 + c + y] === null || (r + x === originRow && c + y === originCol))){
          if(r+x !== originRow || c + y !== originCol){
            newSet.add((r + x) * 8 + c + y);
          }
        }
      }
    }
  }

  pawnMoves(r, c, isWhite, newSet, originRow, originCol){
    const direction = isWhite ? -1 : 1;
    const startRow = isWhite ? 6 : 1;

    if(r === startRow){
      for(let i = 1; i <= 2; i++){
        const newRow = r + i * direction;
        if(newRow >= 0 && newRow < 8 && this._pieces[newRow * 8 + c] === null){
          newSet.add(newRow * 8 + c);
        }else{
          break;
        }
      }
    }else{
      const newRow = r + direction;
      if(newRow >= 0 && newRow < 8 && this._pieces[newRow * 8 + c] === null){
        newSet.add(newRow * 8 + c);
      }
    }
  }

  calculateMoves(rowIndex, colIndex, piece){
    const newSet = new Set();
    console.log(piece)
    const isWhite = (piece === piece.toUpperCase());

    if(piece === "B" || piece === "b"){
      this.moveDirection(rowIndex, colIndex, 1, 1, isWhite, newSet, rowIndex, colIndex);
      this.moveDirection(rowIndex, colIndex, -1, 1, isWhite, newSet, rowIndex, colIndex);
      this.moveDirection(rowIndex, colIndex, 1, -1, isWhite, newSet, rowIndex, colIndex);
      this.moveDirection(rowIndex, colIndex, -1, -1, isWhite, newSet, rowIndex, colIndex);
    }
    if(piece === "R" || piece === "r"){
      this.moveDirection(rowIndex, colIndex, 0, 1, isWhite, newSet, rowIndex, colIndex);
      this.moveDirection(rowIndex, colIndex, 0, -1, isWhite, newSet, rowIndex, colIndex);
      this.moveDirection(rowIndex, colIndex, 1, 0, isWhite, newSet, rowIndex, colIndex);
      this.moveDirection(rowIndex, colIndex, -1, 0, isWhite, newSet, rowIndex, colIndex);
    }
    if(piece === "K" || piece === "k"){
      this.surroundingDirection(rowIndex, colIndex, 1, newSet, rowIndex, colIndex);
    }
    if(piece === "Q" || piece === "q"){
      this.moveDirection(rowIndex, colIndex, 1, 1, isWhite, newSet, rowIndex, colIndex);
      this.moveDirection(rowIndex, colIndex, -1, 1, isWhite, newSet, rowIndex, colIndex);
      this.moveDirection(rowIndex, colIndex, 1, -1, isWhite, newSet, rowIndex, colIndex);
      this.moveDirection(rowIndex, colIndex, -1, -1, isWhite, newSet, rowIndex, colIndex);
      this.moveDirection(rowIndex, colIndex, 0, 1, isWhite, newSet, rowIndex, colIndex);
      this.moveDirection(rowIndex, colIndex, 0, -1, isWhite, newSet, rowIndex, colIndex);
      this.moveDirection(rowIndex, colIndex, 1, 0, isWhite, newSet, rowIndex, colIndex);
      this.moveDirection(rowIndex, colIndex, -1, 0, isWhite, newSet, rowIndex, colIndex);
    }
    if(piece === "P" || piece === "p"){
      this.pawnMoves(rowIndex, colIndex, isWhite, newSet, rowIndex, colIndex);
    }

    return newSet;
  }
}

export default PotentialMoves;