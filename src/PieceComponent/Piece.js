import "./Piece.css"
function Piece({piece}) {
  const pieceImages = {
    "K": "w-king.png",
    "Q": "w-queen.png",
    "R": "w-rook.png",
    "B": "w-bishop.png",
    "N": "w-knight.png",
    "P": "w-pawn.png",
    "k": "b-king.png",
    "q": "b-queen.png",
    "r": "b-rook.png",
    "b": "b-bishop.png",
    "n": "b-knight.png",
    "p": "b-pawn.png",
  };

  function getPieceImage(pieceCode) {
    const imageFile = pieceImages[pieceCode];
    return imageFile ? `/images/${imageFile}` : null;
  }

  if (!piece) {
    return null;
  }
  
  return (
    <div className="Piece">
      <img src={getPieceImage(piece)} alt={piece}/>
    </div>
  );
}

export default Piece;