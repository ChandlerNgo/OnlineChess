import "./Piece.css"
function Piece({piece}) {
  if (!piece) {
    return null;
  }
  
  return (
    <div className="Piece">
      <img src={piece.pieceImage} alt={(piece.color === "white" ? "w" : "b") + "-" + piece.pieceType}/>
    </div>
  );
}

export default Piece;