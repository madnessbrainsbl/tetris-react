// Tetrominos shapes
export const TETROMINOS = {
  0: { shape: [[0]], color: "0, 0, 0" },
  I: {
    shape: [
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
      [0, "I", 0, 0],
    ],
    color: "0, 255, 249",
    image: "art_ocean.png",
  },
  J: {
    shape: [
      [0, "J", 0],
      [0, "J", 0],
      ["J", "J", 0],
    ],
    color: "0, 38, 255",
    image: "art_ear.jpeg",
  },
  L: {
    shape: [
      [0, "L", 0],
      [0, "L", 0],
      [0, "L", "L"],
    ],
    color: "255, 128, 0",
    image: "fashion_neon.jpeg",
  },
  O: {
    shape: [
      ["O", "O"],
      ["O", "O"],
    ],
    color: "255, 255, 0",
    image: "art_flowers.jpeg",
  },
  S: {
    shape: [
      [0, "S", "S"],
      ["S", "S", 0],
      [0, 0, 0],
    ],
    color: "0, 255, 0",
    image: "fashion_winter.jpeg",
  },
  T: {
    shape: [
      [0, 0, 0],
      ["T", "T", "T"],
      [0, "T", 0],
    ],
    color: "153, 0, 255",
    image: "art_surreal.jpeg",
  },
  Z: {
    shape: [
      ["Z", "Z", 0],
      [0, "Z", "Z"],
      [0, 0, 0],
    ],
    color: "255, 0, 0",
    image: "art_flowers.jpeg",
  },
};

// Random tetromino generator
// Selects a random tetromino shape from the TETROMINOS object.
export const randomTetromino = () => {
  const tetrominos = "IJLOSTZ"; // String containing all tetromino types
  const randTetromino =
    tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino]; // Return the randomly selected tetromino object
};

// Create empty stage
// Initializes an empty game stage (grid) of specified width and height.
// Each cell is an array: [0 (empty), 'clear' (state)].
export const createStage = (width = 10, height = 20) =>
  Array.from(Array(height), () => new Array(width).fill([0, "clear"]));

// Check collision
// Determines if the player's current tetromino collides with stage boundaries
// or already merged cells on the stage, given a potential move (moveX, moveY).
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  // Iterate through each cell of the tetromino's shape.
  for (let y = 0; y < player.tetromino.shape.length; y++) {
    for (let x = 0; x < player.tetromino.shape[y].length; x++) {
      // Check only non-empty cells of the tetromino.
      if (player.tetromino.shape[y][x] !== 0) {
        // Calculate the cell's future position on the stage.
        const stageY = y + player.pos.y + moveY;
        const stageX = x + player.pos.x + moveX;

        // Check for collision conditions.
        if (
          // 1. Check if the cell is outside the bottom boundary of the stage.
          stageY >= stage.length ||
          // 2. Check if the cell is outside the left boundary of the stage.
          stageX < 0 ||
          // 3. Check if the cell is outside the right boundary of the stage.
          stageX >= stage[0].length ||
          // 4. Check if the cell is on the stage and collides with an existing merged cell.
          (stageY >= 0 && // Ensure the cell is within the stage's vertical bounds (not above)
            stage[stageY] && // Ensure the row exists
            stage[stageY][stageX] && // Ensure the cell exists
            stage[stageY][stageX][0] !== 0 && // Check if the cell value indicates it's not empty
            stage[stageY][stageX][1] === "merged") // Check if the cell state is 'merged'
        ) {
          return true; // Collision detected.
        }
      }
    }
  }
  return false; // No collision detected.
};
