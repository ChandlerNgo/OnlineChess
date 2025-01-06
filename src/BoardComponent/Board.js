import React, { useImperativeHandle, forwardRef, useState } from "react";
import Square from "../SquareComponent/Square";
import ChessBoard from "./ChessBoard"

const Board = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    moveBackward,
    moveForward,
  }));

  
  const [pieces, setPieces] = useState([
    "r", "n", "b", "q", "k", "b", "n", "r",
    "p", "p", "p", "p", "p", "p", "p", "p",
    null, null, null, null, null, null, null, null,
    null, null, null, "K", null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    "P", "P", "P", null, "P", "P", "P", "P",
    "R", "N", "B", "Q", "K", "B", "N", "R",
  ]);

  function convertRowColumnToSquare(row, column){
    return row*8 + column;
  }

  function convertSquareToRowColumn(square){
    return [(square-(square%8))/8, square%8];
  }
  
  
  const moveBackward = () => {
    console.log("Moving backward");
    // Add your logic here
  };

  const moveForward = () => {
    console.log("Moving forward");
    // Add your logic here
  };
  
  const [moveLog, setMoveLog] = useState([]);
  const [potentialSquares, setPotentialSquares] = useState(new Set());
  const [startSquare, setStartSquare] = useState(null);
  const chessboard = new ChessBoard(pieces);
  function makeMove(row, column, piece){
    // select a start square
    if(!startSquare && pieces[convertRowColumnToSquare(row,column)]){
      setStartSquare(convertRowColumnToSquare(row,column));
      setPotentialSquares(chessboard.findMoves(convertRowColumnToSquare(row,column), piece, moveLog));
    }else{
      let endSquare = convertRowColumnToSquare(row,column);
      if(startSquare === endSquare || (!pieces[endSquare] && !potentialSquares.has(endSquare))){
        // cancel move
        setStartSquare(null);
        setPotentialSquares(new Set());
      }else if(pieces[endSquare] && chessboard.isWhite(startSquare) === chessboard.isWhite(endSquare)){
        // pick another piece
        setStartSquare(convertRowColumnToSquare(row,column));
        setPotentialSquares(chessboard.findMoves(convertRowColumnToSquare(row,column), piece, moveLog));
      }else if(pieces[endSquare] && chessboard.isWhite(startSquare) !== chessboard.isWhite(endSquare) && potentialSquares.has(endSquare)){
        // pick a opponent piece
        console.log("pick a opponent piece");
        // ! check for king checks
        // ! castles

        const move = [startSquare, endSquare, pieces[endSquare] ? pieces[endSquare] : null, pieces[endSquare] ? endSquare : null];
        setMoveLog((prevMoveLog) => [...prevMoveLog, move]);
        chessboard.makeMove(startSquare, endSquare);
        setStartSquare(null);
        setPotentialSquares(new Set());
      }else if(potentialSquares.has(endSquare)){
        // pick a potential square
        // ! en passant
        console.log("pick a potential square");
        // moveLog startSquare, endSquare, pieceTaken, pieceSquare
        const move = [startSquare, endSquare, pieces[endSquare] ? pieces[endSquare] : null, pieces[endSquare] ? endSquare : null];
        setMoveLog((prevMoveLog) => [...prevMoveLog, move]);
        chessboard.makeMove(startSquare, endSquare);
        setStartSquare(null);
        setPotentialSquares(new Set());
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
});

export default Board;
