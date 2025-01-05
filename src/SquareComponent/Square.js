import './Square.css';
import Piece from '../PieceComponent/Piece';

function Square({backgroundColor, text, piece}) {
  return (
    <div className="Square" style={{backgroundColor:backgroundColor}}>
      <Piece piece={piece}/>
    </div>
  );
}

export default Square;