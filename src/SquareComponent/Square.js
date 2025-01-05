import './Square.css'

function Square({backgroundColor, text}) {
  return (
    <div className="Square" style={{backgroundColor:backgroundColor}}>
      {text}
    </div>
  );
}

export default Square;