import React, { useState } from "react";
import Square from "../SquareComponent/Square";
import ChessBoard from "./ChessBoard"

function Board(){
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
  
  // [startSquare, endSquare, pieceTaken, pieceLocation, pieceMoved]
  const [moveLog, setMoveLog] = useState([]);
  const [potentialSquares, setPotentialSquares] = useState(new Set());
  const [startSquare, setStartSquare] = useState(null);
  const [chessboard, setChessboard] = useState(new ChessBoard());
  const [currentTurn, setCurrentTurn] = useState("white");

  function flipCurrentTurn(){
    if(currentTurn === "white"){
      setCurrentTurn("black");
    }else{
      setCurrentTurn("white");
    }
  }

  function makeMove(row, column, piece){
    // select a start square
    console.log(row,column, piece, startSquare);
    if(startSquare === null && chessboard.grid[convertRowColumnToSquare(row,column)] && currentTurn === piece.color){
      const moves = chessboard.findMoves(convertRowColumnToSquare(row,column), piece, moveLog);
      if(moves.size !== 0){
        setStartSquare(convertRowColumnToSquare(row,column));
        setPotentialSquares(chessboard.findMoves(convertRowColumnToSquare(row,column), piece, moveLog));
      }
    }else if(startSquare !== null){
      let endSquare = convertRowColumnToSquare(row,column);
      if(startSquare === endSquare || (!chessboard.grid[endSquare] && !potentialSquares.has(endSquare))){
        // cancel move
        setStartSquare(null);
        setPotentialSquares(new Set());
      }else if(startSquare !== null && chessboard.grid[endSquare] && chessboard.isWhite(startSquare) === chessboard.isWhite(endSquare)){
        // pick another piece
        const moves = chessboard.findMoves(convertRowColumnToSquare(row,column), piece, moveLog);
        if(moves.size !== 0){
          setStartSquare(convertRowColumnToSquare(row,column));
          setPotentialSquares(chessboard.findMoves(convertRowColumnToSquare(row,column), piece, moveLog));
        }
      }else if(chessboard.grid[endSquare] && chessboard.isWhite(startSquare) !== chessboard.isWhite(endSquare) && potentialSquares.has(endSquare)){
        // pick a opponent piece
        const move = [startSquare, endSquare, chessboard.grid[endSquare] ? chessboard.grid[endSquare] : null, chessboard.grid[endSquare] ? endSquare : null, chessboard.grid[startSquare]];
        setMoveLog((prevMoveLog) => [...prevMoveLog, move]);
        chessboard.makeMove(chessboard.grid[startSquare], endSquare);
        setStartSquare(null);
        setPotentialSquares(new Set());
        flipCurrentTurn();
      }else if(potentialSquares.has(endSquare)){
        // pick a potential square
        var move = [startSquare, endSquare, chessboard.grid[endSquare] ? chessboard.grid[endSquare] : null, chessboard.grid[endSquare] ? endSquare : null, chessboard.grid[startSquare]];
        if(moveLog.length !== 0){
          const difference = chessboard.isWhite(startSquare) ? -1 : 1;
          const [defendingStartSquare,defendingSquare,pieceTaken,pieceLocation] = moveLog[moveLog.length-1];
          const [attackingPawnRow,attackingPawnColumn] = convertSquareToRowColumn(startSquare);
          const [defendingPawnRow,defendingPawnColumn] = convertSquareToRowColumn(defendingSquare);
          if(chessboard.isWhite(startSquare) !== chessboard.isWhite(defendingSquare) && defendingSquare+(difference*16) === defendingStartSquare){ // opposite colors and two row move
            if((chessboard.grid[startSquare].pieceType === "pawn") && (chessboard.grid[defendingSquare].pieceType === "pawn")){ // both chessboard.grid are pawns
              if(attackingPawnRow === defendingPawnRow && (attackingPawnColumn === defendingPawnColumn+1 || attackingPawnColumn === defendingPawnColumn-1)){
                // delete piece 
                // change move array
                move = [startSquare, endSquare, chessboard.grid[defendingSquare], defendingSquare, chessboard.grid[startSquare]];
                chessboard.removePiece(defendingSquare);
              }
            }
          }
        }

        if(chessboard.grid[startSquare].pieceType === "king"){
          if(chessboard.grid[startSquare].color === "white" && startSquare === 60){
            if(endSquare === 62){
              chessboard.makeMove(chessboard.grid[63], 61);
            }else if(endSquare === 58){
              chessboard.makeMove(chessboard.grid[56], 59);
            }
          }else if(chessboard.grid[startSquare].color === "black" && startSquare === 4){
            if(endSquare === 6){
              chessboard.makeMove(chessboard.grid[7], 5);
            }else if(endSquare === 2){
              chessboard.makeMove(chessboard.grid[0], 3);
            }
          }
        }

        setMoveLog((prevMoveLog) => [...prevMoveLog, move]);
        chessboard.makeMove(chessboard.grid[startSquare], endSquare);
        setStartSquare(null);
        setPotentialSquares(new Set());
        flipCurrentTurn();
      }
    }
  }

  const squares = Array.from({ length: 64 }, (_, i) => {
    const row = Math.floor(i / 8);
    const col = i % 8;
    const backgroundColor = (row + col) % 2 === 0 ? "#f0d9b5" : "#b58863";
    return {backgroundColor, text: `${row},${col}`, piece: chessboard.grid[i], highlighted: potentialSquares.has(i)};
  });

  const rows = [];
  for (let i = 0; i < squares.length; i += 8) {
    rows.push(squares.slice(i, i + 8));
  }

  const turnStyle = {
    display: "grid",
    placeItems: "center",
    width:"1200px",
    margin: "0 auto",
    backgroundColor: currentTurn === "white" ? "white" : "black",
    color: currentTurn === "white" ? "black" : "white",
  }

  return (
    <>
      <div class="board" style={{display: "grid", gridTemplateRows: "repeat(8, 1fr)", justifyContent:"center"}}>
        {rows.map((row, rowIndex) => (
          <div class="boardRow" key={rowIndex} style={{display: "grid", gridTemplateColumns: "repeat(8, 1fr)", width:"1200px"}}>
            {row.map((square, colIndex) => (
              <Square key={`${rowIndex}-${colIndex}`} backgroundColor={square.backgroundColor} text={square.text} piece={square.piece} rowIndex={rowIndex} colIndex={colIndex} onSquareClick={makeMove} highlighted={square.highlighted}/>
            ))}
          </div>
        ))}
      </div>
      <div style={turnStyle}>
        <h1>{currentTurn === "white" ? "White's Turn" : "Black's Turn"}</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={moveBackward}>Backward</button>
        <button onClick={moveForward}>Forward</button>
      </div>
    </>
  );
};

export default Board;
