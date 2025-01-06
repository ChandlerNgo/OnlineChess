import './Square.css';
import Piece from '../PieceComponent/Piece';

function Square({backgroundColor, text, piece, rowIndex, colIndex, onSquareClick, highlighted}) {
  const squareStyle = {
    backgroundColor: backgroundColor,
    borderColor: highlighted ? '#FFD700' : 'none',
    borderWidth: highlighted ? '10px' : '0',
    borderStyle: highlighted ? 'solid' : 'none',
    boxSizing: 'border-box',
  };

  return (
    <div className="Square" style={squareStyle} onClick={() => onSquareClick(rowIndex, colIndex, piece)}>
      <Piece piece={piece}/>
    </div>
  );
}

export default Square;