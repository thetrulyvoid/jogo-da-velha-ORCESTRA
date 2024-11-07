import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Multiplayer.module.css';

function Multiplayer() {
  const location = useLocation();
  const { playerOneName, playerTwoName } = location.state || {};

  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [winner, setWinner] = useState(null);
  const [playerOneSymbol, setPlayerOneSymbol] = useState(null);
  const [playerOneWins, setPlayerOneWins] = useState(0);
  const [playerTwoWins, setPlayerTwoWins] = useState(0);

  const handleCellClick = (index) => {
    if (winner) return null;
    if (board[index] !== "") return null;

    setBoard(board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item));
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkWinner = () => {
    const possibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    possibleWaysToWin.forEach(cells => {
      if (cells.every(cell => cell === "O")) {
        setWinner("O");
        if (playerOneSymbol === "O") setPlayerOneWins(playerOneWins + 1);
        else setPlayerTwoWins(playerTwoWins + 1);
      }
      if (cells.every(cell => cell === "X")) {
        setWinner("X");
        if (playerOneSymbol === "X") setPlayerOneWins(playerOneWins + 1);
        else setPlayerTwoWins(playerTwoWins + 1);
      }
    });
  };

  const checkDraw = () => {
    if (board.every(item => item !== "") && winner === null) {
      setWinner("E");
    }
  };

  useEffect(() => {
    checkDraw();
  }, [board]);

  useEffect(checkWinner, [board]);

  const resetGame = () => {
    if (winner !== "E") {
      setCurrentPlayer(winner === "X" ? "O" : "X");
    }
    setBoard(emptyBoard);
    setWinner(null);
  };

  const resetRank = () => {
    setPlayerOneWins(0);
    setPlayerTwoWins(0);
  };

  const handleSymbolChoice = (symbol) => {
    setPlayerOneSymbol(symbol);
    setCurrentPlayer(symbol);
  };

  const playerTwoSymbol = playerOneSymbol === "X" ? "O" : "X";

  return (
    <main>
      <h1 className={styles.title}>Jogo da Velha - {playerOneName} vs {playerTwoName}</h1>

      {playerOneSymbol === null && (
        <div className={styles.symbolChoice}>
          <h2>Antes de jogar: Escolha o símbolo do {playerOneName}</h2>
          <button onClick={() => handleSymbolChoice("X")}>X</button>
          <button onClick={() => handleSymbolChoice("O")}>O</button>
        </div>
      )}

      <div className={`${styles.board} ${winner ? styles.gameOver : ""}`}>
        {board.map((item, index) => (
          <div
            key={index}
            className={`${styles.cell} ${item ? styles[item] : ""}`}
            onClick={() => handleCellClick(index)}
          >
            {item}
          </div>
        ))}
      </div>

      {winner && (
        <footer>
          {winner === "E" ? (
            <h2 className={styles.winnerMessage}>
              <span className={styles[winner]}>Empatou!</span>
            </h2>
          ) : (
            <h2 className={styles.winnerMessage}>
              <span className={styles[winner]}>{winner}</span> venceu!
            </h2>
          )}
        </footer>
      )}

      <div>
        <button className={styles.resetButton} onClick={resetGame}>Recomeçar Jogo!</button>
      </div>

      <div>
        <button className={styles.resetRankButton} onClick={resetRank}>Resetar Pontos!</button>
      </div>

      <div className={styles.scoreboard}>
        <h3>{playerOneName} ({playerOneSymbol}): {playerOneWins} vitórias</h3>
        <h3>{playerTwoName} ({playerTwoSymbol}): {playerTwoWins} vitórias</h3>
      </div>
    </main>
  );
}

export default Multiplayer;
