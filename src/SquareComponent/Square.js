import './Square.css';
import Piece from '../PieceComponent/Piece';

function Square({backgroundColor, text, piece, rowIndex, colIndex, onSquareClick, highlighted}) {
  const squareStyle = {
    backgroundColor: highlighted ? '#FFD700' : backgroundColor,
  };

  return (
    <div className="Square" style={squareStyle} onClick={() => onSquareClick(rowIndex, colIndex, piece)}>
      <Piece piece={piece}/>
    </div>
  );
}

export default Square;