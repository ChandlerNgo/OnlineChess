import React, { useRef } from "react";
import Board from './BoardComponent/Board'

function App() {
  const boardRef = useRef();

  const moveBackward = () => {
    boardRef.current?.moveBackward();
  };

  const moveForward = () => {
    boardRef.current?.moveForward();
  };
  return (
    <div className="App">
      <Board ref={boardRef}/>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={moveBackward}>Backward</button>
        <button onClick={moveForward}>Forward</button>
      </div>
    </div>
  );
}

export default App;
