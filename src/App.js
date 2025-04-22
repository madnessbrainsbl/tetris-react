import React, { useState, useEffect } from "react";
import Tetris from "./components/Tetris";
import { createStage, checkCollision } from "./gameHelpers";
import { usePlayer } from "./hooks/usePlayer";
import { useStage } from "./hooks/useStage";
import { useGameStatus } from "./hooks/useGameStatus";

const App = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate, nextTetromino] =
    usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);

  // Start game
  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000 / level);
    resetPlayer();
    setGameOver(false);
    setIsPaused(false);
    setScore(0);
    setRows(0);
    setLevel(1);

    // Show camera flash effect
    setShowFlash(true);
    setTimeout(() => {
      setShowFlash(false);
    }, 150);
  };

  // Pause game
  const pauseGame = () => {
    if (!gameOver) {
      if (isPaused) {
        setDropTime(1000 / level);
      } else {
        setDropTime(null);
      }
      setIsPaused(!isPaused);
    }
  };

  // Move tetromino left or right
  const movePlayer = (dir) => {
    if (
      !checkCollision(
        {
          pos: player.pos,
          tetromino: { shape: player.tetromino },
        },
        stage,
        { x: dir, y: 0 }
      )
    ) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  };

  // Drop tetromino one row
  const dropPlayer = () => {
    if (
      !checkCollision(
        {
          pos: player.pos,
          tetromino: { shape: player.tetromino },
        },
        stage,
        { x: 0, y: 1 }
      )
    ) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over check
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  // Hard drop - drop tetromino to the bottom
  const hardDrop = () => {
    let newY = player.pos.y;
    while (
      !checkCollision(
        {
          pos: { ...player.pos, y: newY },
          tetromino: { shape: player.tetromino },
        },
        stage,
        { x: 0, y: 1 }
      )
    ) {
      newY++;
    }
    updatePlayerPos({ x: 0, y: newY - player.pos.y, collided: true });
  };

  // Handle automatic dropping
  useEffect(() => {
    let timer;
    if (dropTime && !gameOver && !isPaused) {
      timer = setInterval(() => {
        dropPlayer();
      }, dropTime);
    }
    return () => clearInterval(timer);
  }, [dropTime, gameOver, isPaused, player, stage]);

  // Adjust drop speed based on level
  useEffect(() => {
    if (level > 1 && !gameOver && !isPaused) {
      setDropTime(1000 / level);
    }
  }, [level, gameOver, isPaused]);

  // Rotate tetromino
  const rotate = () => {
    playerRotate(stage, 1);
  };

  return (
    <>
      <Tetris
        score={score}
        rows={rows}
        level={level}
        nextTetromino={nextTetromino}
        gameOver={gameOver}
        stage={stage}
        startGame={startGame}
        movePlayer={movePlayer}
        dropPlayer={dropPlayer}
        hardDrop={hardDrop}
        rotatePlayer={rotate}
        pauseGame={pauseGame}
        isPaused={isPaused}
      />
      {showFlash && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            zIndex: 1000,
            opacity: 0.8,
          }}
        />
      )}
    </>
  );
};

export default App;
