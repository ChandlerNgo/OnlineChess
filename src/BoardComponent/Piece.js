class Piece{
  constructor(color, pieceType, position) {
      const validColors = ['white', 'black'];
      if(!validColors.includes(color)){
        throw new Error("Invalid color. Use 'white' or 'black'.");
      }

      const validPieceTypes = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];
      if(!validPieceTypes.includes(pieceType)){
        throw new Error(`Invalid piece type. Use one of ${validPieceTypes.join(', ')}.`);
      }

      if(!Array.isArray(position) || position.length !== 2 || !position.every(num => Number.isInteger(num))){
        throw new Error("Invalid position. Must be an array with two integers [row, column].");
      }

      this.color = color;
      this.pieceType = pieceType;
      this.position = position;
      this.startPosition = position;
      this.isAlive = true;
      this.hasMoved = false;
      this.capturedBy = null;
      this.isPromoted = false;
      this.promotedTo = null;
      this.value = { pawn: 1, knight: 3, bishop: 3, rook: 5, queen: 9, king: Infinity }[pieceType];
      var imageFile = (color === "white" ? "w" : "b") + "-" + pieceType + ".png";
      imageFile = this.isAlive ? `/images/${imageFile}` : null;
      this.pieceImage = imageFile;
    }
  
  move(row, column){
    this.position = [row, column];
    this.hasMoved = true;
  }

  capture(byPiece){
    this.isAlive = false;
    this.capturedBy = byPiece;
  }

  promote(newType){
    if(this.pieceType === 'pawn'){
      this.isPromoted = true;
      this.promotedTo = newType;
      this.pieceType = newType;
    }
  }

  getPieceIndex(){
    return this.position[0] * 8 + this.position[1];
  }

  toString(){
      return `${this.color.charAt(0).toUpperCase() + this.color.slice(1)} ${this.pieceType.charAt(0).toUpperCase() + this.pieceType.slice(1)} at [${this.position.join(', ')}]`;
  }
}

export default Piece;