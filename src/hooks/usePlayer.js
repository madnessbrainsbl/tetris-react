import { useState, useCallback } from "react";
import { TETROMINOS, randomTetromino } from "../gameHelpers";
import { checkCollision } from "../gameHelpers";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const [nextTetromino, setNextTetromino] = useState(randomTetromino());

  const rotate = (matrix, dir) => {
    // Make the rows become columns (transpose)
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map((col) => col[index])
    );
    // Reverse each row to get a rotated matrix
    if (dir > 0) return rotatedTetro.map((row) => row.reverse());
    return rotatedTetro.reverse();
  };

  const playerRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    // This one is so the player can't rotate into the walls or other tetrominos
    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (
      checkCollision(
        {
          pos: clonedPlayer.pos,
          tetromino: { shape: clonedPlayer.tetromino },
        },
        stage,
        { x: 0, y: 0 }
      )
    ) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: 4, y: 0 },
      tetromino: nextTetromino.shape,
      collided: false,
    });
    setNextTetromino(randomTetromino());
  }, [nextTetromino]);

  return [player, updatePlayerPos, resetPlayer, playerRotate, nextTetromino];
};
