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
export const randomTetromino = () => {
  const tetrominos = "IJLOSTZ";
  const randTetromino =
    tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
};

// Create empty stage
export const createStage = (width = 10, height = 20) =>
  Array.from(Array(height), () => new Array(width).fill([0, "clear"]));

// Check collision
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.shape.length; y++) {
    for (let x = 0; x < player.tetromino.shape[y].length; x++) {
      if (player.tetromino.shape[y][x] !== 0) {
        // Проверяем только непустые клетки тетромино
        const stageY = y + player.pos.y + moveY;
        const stageX = x + player.pos.x + moveX;

        // Проверяем границы поля и занятость клеток
        if (
          stageY >= stage.length || // Выход за нижнюю границу
          stageX < 0 || // Выход за левую границу
          stageX >= stage[0].length || // Выход за правую границу
          (stageY >= 0 &&
            stage[stageY][stageX] &&
            stage[stageY][stageX][0] !== 0 &&
            stage[stageY][stageX][1] === "merged") // Столкновение с занятой клеткой
        ) {
          return true; // Есть столкновение
        }
      }
    }
  }
  return false; // Нет столкновения
};
