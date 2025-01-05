import React from "react";
import Square from "../SquareComponent/Square";

const Board = () => {
  const pieces = [
    "BRK", "BKT", "BBP", "BQN", "BKG", "BBP", "BKT", "BRK",
    "BPN", "BPN", "BPN", "BPN", "BPN", "BPN", "BPN", "BPN",
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    "WPN", "WPN", "WPN", "WPN", "WPN", "WPN", "WPN", "WPN",
    "WRK", "WKT", "WBP", "WQN", "WKG", "WBP", "WKT", "WRK",
  ];
  const squares = Array.from({ length: 64 }, (_, i) => {
    const row = Math.floor(i / 8);
    const col = i % 8;
    const backgroundColor = (row + col) % 2 === 0 ? "#f0d9b5" : "#b58863";
    return {backgroundColor, text: `${row},${col}`, piece:pieces[i]};
  });

  const rows = [];
  for (let i = 0; i < squares.length; i += 8) {
    rows.push(squares.slice(i, i + 8));
  }

  return (
    <div class="board" style={{display: "grid", gridTemplateRows: "repeat(8, 1fr)", justifyContent:"center"}}>
      {rows.map((row, rowIndex) => (
        <div class="boardRow" key={rowIndex} style={{display: "grid", gridTemplateColumns: "repeat(8, 1fr)", width:"1200px"}}>
          {row.map((square, colIndex) => (
            <Square key={`${rowIndex}-${colIndex}`} backgroundColor={square.backgroundColor} text={square.text} piece={square.piece}/>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
