import React from "react";
import styled from "styled-components";
import Cell from "./Cell";

const StyledContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 0 5px 0;
  padding: 10px;
  border: 2px solid #333;
  height: 140px;
  width: 100%;
  border-radius: 5px;
  background: #000;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);

  @media (max-width: 768px) {
    padding: 5px;
    height: 120px;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.2) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
  }
`;

const StyledTitle = styled.h3`
  font-family: "Courier New", monospace;
  color: #ddd;
  text-align: center;
  margin: 0 0 5px 0;
  padding: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.8rem;
  position: relative;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    margin-bottom: 3px;
  }
`;

const StyledNextPiece = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  width: 80px;
  height: 80px;
  background: #111;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
  padding: 3px;
  position: relative;

  @media (max-width: 768px) {
    width: 65px;
    height: 65px;
    padding: 2px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.15) 2px,
      transparent 2px,
      transparent 4px
    );
    pointer-events: none;
    z-index: 10;
  }
`;

const NextPiece = ({ tetromino }) => {
  const grid = Array.from(Array(4), () =>
    Array(4).fill([0, "clear", "0, 0, 0", null])
  );

  // Place the tetromino in the grid
  if (tetromino) {
    tetromino.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell !== 0) {
          grid[y][x] = [
            cell,
            "clear",
            tetromino.color,
            require(`../assets/images/${tetromino.image}`),
          ];
        }
      });
    });
  }

  return (
    <StyledContainer>
      <StyledTitle>NEXT</StyledTitle>
      <StyledNextPiece>
        {grid.map((row, y) =>
          row.map((cell, x) => (
            <Cell
              key={`${y}-${x}`}
              type={cell[0]}
              color={cell[2]}
              image={cell[3]}
            />
          ))
        )}
      </StyledNextPiece>
    </StyledContainer>
  );
};

export default NextPiece;
