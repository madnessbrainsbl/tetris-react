import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);
  const [explodingRows, setExplodingRows] = useState([]);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (newStage) => {
      const rowsToExplode = [];

      // First check all rows that should be cleared
      newStage.forEach((row, index) => {
        // If we don't find a 0 it means that the row is full
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          rowsToExplode.push(index);
        }
      });

      // If we have rows to explode, set them and add explosion effect
      if (rowsToExplode.length > 0) {
        setRowsCleared(rowsToExplode.length);
        setExplodingRows(rowsToExplode);

        // Apply explosion effect to rows
        rowsToExplode.forEach((rowIndex) => {
          newStage[rowIndex] = newStage[rowIndex].map((cell) => [
            cell[0],
            "exploding",
            "255, 255, 255",
            null,
          ]);
        });

        // Set timeout to actually clear the rows after explosion animation
        setTimeout(() => {
          setExplodingRows([]);

          // Now actually clear the rows
          const clearedStage = newStage.reduce((acc, row, index) => {
            // If this row was marked for explosion, don't include it
            if (rowsToExplode.includes(index)) {
              // Create an empty row at the beginning
              acc.unshift(
                new Array(newStage[0].length).fill([
                  0,
                  "clear",
                  "0, 0, 0",
                  null,
                ])
              );
              return acc;
            }
            acc.push(row);
            return acc;
          }, []);

          setStage(clearedStage);
        }, 400); // Delay before sweeping rows - longer to make explosion more visible

        return newStage; // Return with explosion effect first
      }

      return newStage;
    };

    const updateStage = (prevStage) => {
      // First flush the stage
      // If it says "clear" but doesn't have a 0 it means that it's the players move and should be cleared
      const newStage = prevStage.map((row) =>
        row.map((cell) => {
          // Keep exploding cells as is for animation
          if (cell[1] === "exploding") return cell;
          // Clear normal cells
          return cell[1] === "clear" ? [0, "clear", "0, 0, 0", null] : cell;
        })
      );

      // Then draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            const tetrominoType = value;
            const tetrominoColor = getTetrominoColor(tetrominoType);
            const tetrominoImage = getTetrominoImage(tetrominoType);

            // Check if we're within the stage boundaries before updating
            const newY = y + player.pos.y;
            const newX = x + player.pos.x;

            if (
              newY >= 0 &&
              newY < newStage.length &&
              newX >= 0 &&
              newX < newStage[0].length
            ) {
              newStage[newY][newX] = [
                value,
                `${player.collided ? "merged" : "clear"}`,
                tetrominoColor,
                tetrominoImage,
              ];
            }
          }
        });
      });

      // Then check if we collided
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }

      return newStage;
    };

    // Helper function to get tetromino color based on type
    const getTetrominoColor = (type) => {
      const tetrominos = {
        I: "0, 255, 249",
        J: "0, 38, 255",
        L: "255, 128, 0",
        O: "255, 255, 0",
        S: "0, 255, 0",
        T: "153, 0, 255",
        Z: "255, 0, 0",
      };
      return tetrominos[type] || "255, 255, 255";
    };

    // Helper function to get tetromino image based on type
    const getTetrominoImage = (type) => {
      const images = {
        I: require("../assets/images/art_ocean.png"),
        J: require("../assets/images/art_ear.jpeg"),
        L: require("../assets/images/fashion_neon.jpeg"),
        O: require("../assets/images/art_flowers.jpeg"),
        S: require("../assets/images/fashion_winter.jpeg"),
        T: require("../assets/images/art_surreal.jpeg"),
        Z: require("../assets/images/art_flowers.jpeg"),
      };
      return images[type] || null;
    };

    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};
