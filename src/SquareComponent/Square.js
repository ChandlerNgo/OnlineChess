import './Square.css';
import Piece from '../PieceComponent/Piece';

function Square({backgroundColor, text, piece, rowIndex, colIndex}) {
  return (
    <div className="Square" style={{backgroundColor:backgroundColor}} onClick={() => console.log(`Square ${rowIndex*8 + colIndex + 1}`)}>
      <Piece piece={piece}/>
    </div>
  );
}

export default Square;