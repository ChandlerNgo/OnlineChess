import "./Piece.css"
function Piece({piece}) {
  const pieceImages = {
    "WKG": "w-king.png",
    "WQN": "w-queen.png",
    "WRK": "w-rook.png",
    "WBP": "w-bishop.png",
    "WKT": "w-knight.png",
    "WPN": "w-pawn.png",
    "BKG": "b-king.png",
    "BQN": "b-queen.png",
    "BRK": "b-rook.png",
    "BBP": "b-bishop.png",
    "BKT": "b-knight.png",
    "BPN": "b-pawn.png",
  };

  function getPieceImage(pieceCode) {
    const imageFile = pieceImages[pieceCode];
    return imageFile ? `/images/${imageFile}` : null;
  }
  
  return (
    <div className="Piece">
      <img src={getPieceImage(piece)} alt={piece}/>
    </div>
  );
}

export default Piece;