import { useState, useEffect } from "react";
import Board from "./components/Board";
import "./App.css";



function calculateWinner(squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for(let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];

    if(
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return {
        winner: squares[a],
        line: lines[i]
      };
    }
  }

  return {
    winner: null,
    line: null
  };
}

function App() {
  const [darkMode, setDarkMode] = useState(
  JSON.parse(localStorage.getItem("theme")) ?? true
);

  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [player1, setPlayer1] = useState("Player 1");
const [player2, setPlayer2] = useState("Player 2");

const [score1, setScore1] = useState(0);
const [score2, setScore2] = useState(0);
const [draws, setDraws] = useState(0);
  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo.winner;
  const player1Name = player1.trim() || "Player 1";
  const player2Name = player2.trim() || "Player 2";
  const currentPlayerName =
    isXTurn
      ? player1Name
      : player2Name;
  const winnerName =
    winner === "X"
      ? player1Name
      : player2Name;

useEffect(() => {

  if (winner === "X") {
    setScore1(prev => prev + 1);
  }

  if (winner === "O") {
    setScore2(prev => prev + 1);
  }

}, [winner]);


useEffect(() => {
  localStorage.setItem(
    "theme",
    JSON.stringify(darkMode)
  );

  document.body.className =
    darkMode
      ? "dark-body"
      : "light-body";

}, [darkMode]);

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = [...squares];
    newSquares[index] = isXTurn ? "X" : "O";

    setSquares(newSquares);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(""));
    setIsXTurn(true);
  };

  const newGame = () => {
    setSquares(Array(9).fill(""));
    setIsXTurn(true);
    setPlayer1("Player 1");
    setPlayer2("Player 2");
    setScore1(0);
    setScore2(0);
    setDraws(0);
  };

  const isDraw =
    !winner &&
    squares.every((square) => square !== "");

  useEffect(() => {

  if (isDraw) {
    setDraws(prev => prev + 1);
  }

}, [isDraw]);

  return (
    <div className={darkMode ? "container dark" : "container light"}>

    <h1 className="title">
        Tic Tac Toe
      </h1>

    <div className="scoreboard">

  <div className="score-card">
    <h3>{player1Name}</h3>
    <p>{score1}</p>
  </div>

  <div className="score-card">
    <h3>Draws</h3>
    <p>{draws}</p>
  </div>

  <div className="score-card">
    <h3>{player2Name}</h3>
    <p>{score2}</p>
  </div>

</div>

    <button
  className="theme-btn"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode
    ? "Light Mode"
    : "Dark Mode"}
</button>
    <div className="player-inputs">
  <input
    type="text"
    value={player1}
    onChange={(e) => setPlayer1(e.target.value)}
    placeholder="Player 1 Name"
  />

  <input
    type="text"
    value={player2}
    onChange={(e) => setPlayer2(e.target.value)}
    placeholder="Player 2 Name"
  />
</div>

      <div className="status">
        {winner
          ? `Winner: ${winnerName}`
          : isDraw
          ? "It's a Draw!"
          : `Turn: ${currentPlayerName}`
        }
      </div>

      <Board
        squares={squares}
        handleClick={handleClick}
        winningLine={winnerInfo.line}
      />

      <button
        className="restart-btn"
        onClick={resetGame}
      >
        Restart Game
      </button>

      <button
        className="new-game-btn"
        onClick={newGame}
      >
        New Game
      </button>

    </div>
  );
}

export default App;
