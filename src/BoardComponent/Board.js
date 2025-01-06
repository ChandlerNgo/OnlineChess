import React, { useState } from "react";
import Square from "../SquareComponent/Square";
import PotentialMoves from "./PotentialMoves"

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

  const [potentialSquares, setPotentialSquares] = useState(new Set());
  const [startingSquare, setStartingSquare] = useState(null);
  const potentialMoves = new PotentialMoves(pieces);

  function compareColors(start, end){
    let startColor = pieces[start] === pieces[start].toUpperCase();
    let endColor = pieces[end] === pieces[end].toUpperCase();
    return startColor === endColor;
  }
  
  const toggleMove = (rowIndex, colIndex, piece) => {
    if(startingSquare === null && pieces[rowIndex * 8 + colIndex]){ // selection
      const moves = potentialMoves.calculateMoves(rowIndex, colIndex, piece);
      setPotentialSquares(moves);
      setStartingSquare(rowIndex * 8 + colIndex);
    }else if(startingSquare !== null && startingSquare === rowIndex*8 + colIndex){
      potentialSquares.clear();
      setStartingSquare(null);
    }else if(startingSquare !== null && potentialSquares.has(rowIndex * 8 + colIndex)){ // moving
      makeMove(startingSquare,rowIndex * 8 + colIndex,pieces[startingSquare]);
      setStartingSquare(null);
      potentialSquares.clear();
    }else if(startingSquare !== null && !potentialSquares.has(rowIndex * 8 + colIndex)){
      // switch potential pieces if its same color
      // cancel if null
      if(pieces[rowIndex*8 + colIndex] !== null && compareColors(startingSquare, rowIndex*8 + colIndex)){
        const moves = potentialMoves.calculateMoves(rowIndex, colIndex, piece);
        setPotentialSquares(moves);
        setStartingSquare(rowIndex * 8 + colIndex);
      }else{
        setStartingSquare(null);
        potentialSquares.clear();
      }
    }
  }

  const makeMove = (start, end, piece) => {
    const updatedPieces = [...pieces];
    console.log(start,end,piece);
    updatedPieces[start] = null;
    updatedPieces[end] = piece;
    setPieces(updatedPieces);
    potentialMoves._pieces = updatedPieces;
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
            <Square key={`${rowIndex}-${colIndex}`} backgroundColor={square.backgroundColor} text={square.text} piece={square.piece} rowIndex={rowIndex} colIndex={colIndex} onSquareClick={toggleMove} highlighted={square.highlighted}/>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
