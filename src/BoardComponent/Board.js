import React, { useState } from "react";
import Square from "../SquareComponent/Square";

const Board = () => {
  const [pieces, setPieces] = useState([
    "r", "n", "b", "q", "k", "b", "n", "r",
    "p", "p", "p", "p", "p", "p", "p", "p",
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    "P", "P", "P", "P", "P", "P", "P", "P",
    "R", "N", "B", "Q", "K", "B", "N", "R",
  ]);

  const handleSquareClick = (rowIndex, colIndex, piece) => {
    const squareIndex = rowIndex * 8 + colIndex;
    console.log(squareIndex+1);
    const updatedPieces = [...pieces];
    updatedPieces[squareIndex] = null;
    setPieces(updatedPieces);
  };

  const [potentialSquares, setPotentialSquares] = useState(new Set());

  const toggleMove = (rowIndex, colIndex, piece) => {
    const squareIndex = rowIndex * 8 + colIndex;
    console.log(squareIndex);
    setPotentialSquares((prev) => {
      const newSet = new Set(prev);
      
      function moveDirection(r,c,rDirection,cDirection,color){
        let stop = false;
        while(r >= 0 && c >= 0 && r < 8 && c < 8 && !stop){
          const currentPiece = pieces[r * 8 + c];
          
          if((currentPiece && (r !== rowIndex || c !== colIndex)) && ((color === true && currentPiece.toUpperCase() === currentPiece) || (color === false && currentPiece.toLowerCase() === currentPiece))){
            // theres a piece thats not in the original spot && the color of the new piece matches the original piece
            break;
          }else if((currentPiece && (r !== rowIndex || c !== colIndex)) && ((color === false && currentPiece.toUpperCase() === currentPiece) || (color === true && currentPiece.toLowerCase() === currentPiece))){
            stop = true;
          }
          
          newSet.add(r * 8 + c);
      
          r += rDirection;
          c += cDirection;
        }
      }

      function surroundingDirection(r,c,size){
        for(let x = -1 * size; x <= size; x++){
          for(let y = -1 * size; y <= size; y++){
            if(r+x >= 0 && c+y >= 0 && r+x < 8 && c+y < 8 && (pieces[(r+x)*8 + c+y] === null || (r+x === rowIndex && c+y === colIndex))){
              newSet.add((r+x)*8 + c+y);
            }
          }
        }
      }

      function pawnMoves(r,c,color){
        // two spaces if on second row
        if(r === 6 || r === 1){
          console.log("pawn move");
          let i = 0;
          while((r+i) >= 0 && c >= 0 && (r+i) < 8 && c < 8 && i >= -2 && i <= 2 && (pieces[(r+i) * 8 + c] === null || ((r+i) === rowIndex && c === colIndex))){
            if((r+i) !== rowIndex){
              newSet.add((r+i)*8 + c);
            }
            if(color){
              i -= 1;
            }else{
              i += 1;
            }
          }
        }
        // one space otherwise
        // diagonal if en passant or piece there
      }

      if(piece === "B" || piece === "b"){
        moveDirection(rowIndex, colIndex, 1, 1, piece === piece.toUpperCase());
        moveDirection(rowIndex, colIndex, -1, 1, piece === piece.toUpperCase());
        moveDirection(rowIndex, colIndex, 1, -1, piece === piece.toUpperCase());
        moveDirection(rowIndex, colIndex, -1, -1, piece === piece.toUpperCase());
      }
      if(piece === "R" || piece === "r"){
        moveDirection(rowIndex, colIndex, 0, 1, piece === piece.toUpperCase());
        moveDirection(rowIndex, colIndex, 0, -1, piece === piece.toUpperCase());
        moveDirection(rowIndex, colIndex, 1, 0, piece === piece.toUpperCase());
        moveDirection(rowIndex, colIndex, -1, 0, piece === piece.toUpperCase());
      }
      if(piece === "K" || piece === "k"){
        surroundingDirection(rowIndex, colIndex, 1);
      }
      if(piece === "Q" || piece === "q"){
        moveDirection(rowIndex, colIndex, 1, 1, piece === piece.toUpperCase());
        moveDirection(rowIndex, colIndex, -1, 1, piece === piece.toUpperCase());
        moveDirection(rowIndex, colIndex, 1, -1, piece === piece.toUpperCase());
        moveDirection(rowIndex, colIndex, -1, -1, piece === piece.toUpperCase());
        moveDirection(rowIndex, colIndex, 0, 1, piece === piece.toUpperCase());
        moveDirection(rowIndex, colIndex, 0, -1, piece === piece.toUpperCase());
        moveDirection(rowIndex, colIndex, 1, 0, piece === piece.toUpperCase());
        moveDirection(rowIndex, colIndex, -1, 0, piece === piece.toUpperCase());
        surroundingDirection(rowIndex, colIndex, 1);
      }
      if(piece === "P" || piece === "p"){
        pawnMoves(rowIndex, colIndex, piece === piece.toUpperCase());
      }
      return newSet;
    });
  };

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
      {pieces}
    </div>
  );
};

export default Board;
