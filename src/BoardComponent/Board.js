import React, { useState } from "react";
import Square from "../SquareComponent/Square";
import ChessBoard from "./ChessBoard"

const Board = () => {
  const [pieces, setPieces] = useState([
    "r", "n", "b", "q", "k", "b", "n", "r",
    "p", "p", "p", "p", "p", "p", "p", "p",
    null, null, null, null, null, null, null, null,
    null, null, null, "K", null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    "P", "P", "P", "P", "P", "P", "P", "P",
    "R", "N", "B", "Q", "K", "B", "N", "R",
  ]);

  function convertRowColumnToSquare(row, column){
    return row*8 + column;
  }

  const [potentialSquares, setPotentialSquares] = useState(new Set());
  const [startSquare, setStartSquare] = useState(null);
  const chessboard = new ChessBoard(pieces);
  function makeMove(row, column, piece){
    if(!startSquare){
      // select
      setStartSquare(convertRowColumnToSquare(row,column));
      setPotentialSquares(chessboard.findMoves(convertRowColumnToSquare(row,column), piece));
    }else{
      let endSquare = convertRowColumnToSquare(row,column);
      // move
      // same color
      if(pieces[endSquare] && (chessboard.isWhite(endSquare) ^ chessboard.isWhite(startSquare))){
        setPotentialSquares(chessboard.findMoves((endSquare), piece));
      }else if(potentialSquares.has(endSquare)){
        chessboard.makeMove(startSquare, endSquare);
        setPotentialSquares(new Set());
        setStartSquare(null);
      }else{
        setPotentialSquares(new Set());
        setStartSquare(null);
      }
    }
  }

  const squares = Array.from({ length: 64 }, (_, i) => {
    const row = Math.floor(i / 8);
    const col = i % 8;
    const backgroundColor = (row + col) % 2 === 0 ? "#f0d9b5" : "#b58863";
    return {backgroundColor, text: `${row},${col}`, piece:pieces[i], highlighted: potentialSquares.has(i)};
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
            <Square key={`${rowIndex}-${colIndex}`} backgroundColor={square.backgroundColor} text={square.text} piece={square.piece} rowIndex={rowIndex} colIndex={colIndex} onSquareClick={makeMove} highlighted={square.highlighted}/>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
