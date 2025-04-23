import { useState, useEffect, useCallback } from "react";

export const useGameStatus = (rowsCleared) => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(1);

  const calcScore = useCallback(() => {
    // Points awarded for clearing lines
    const linePoints = [40, 100, 300, 1200];

    // Check if we have score
    if (rowsCleared > 0) {
      // This is how original Tetris score is calculated
      setScore((prev) => prev + linePoints[rowsCleared - 1] * level);
      setRows((prev) => prev + rowsCleared);
    }
  }, [level, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared]);

  useEffect(() => {
    // Increase level when player has cleared 3 rows
    if (rows > level * 3) {
      setLevel((prev) => prev + 1);
    }
  }, [level, rows]);

  return [score, setScore, rows, setRows, level, setLevel];
};
