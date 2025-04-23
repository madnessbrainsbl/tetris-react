import React from "react";
import styled from "styled-components";
import Cell from "./Cell";

const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(${(props) => props.height}, 1fr);
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333; /* Restore original border */
  width: 100%;
  height: 100%;
  aspect-ratio: ${(props) => props.width} / ${(props) => props.height};
  background: #111;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.2),
    0 0 30px rgba(255, 0, 255, 0.2) inset;
  position: relative;
  box-sizing: border-box; /* Add box-sizing */

  // Для больших экранов ограничиваем максимальный размер
  @media (min-width: 1201px) {
    /* grid-template-rows: repeat(
      ${(props) => props.height},
      calc(70vh / ${(props) => props.height})
    ); - Removed specific calculation */
    /* max-width: calc(
      70vh / ${(props) => props.height} * ${(props) => props.width}
    ); - Removed max-width */
    height: 70vh; /* Set explicit height */
    width: auto; /* Let width be determined by aspect ratio and height */
    /* border: none; */
    border: 4px solid #999; /* Use border */
    outline: none;
    /* box-shadow: 0 0 30px rgba(0, 255, 0, 0.3),
      0 0 40px rgba(255, 0, 255, 0.3) inset; - Keep only inset shadow */
    box-shadow: 0 0 40px rgba(255, 0, 255, 0.3) inset; /* Simpler shadow */
    margin-top: -50px; /* Add negative margin to move up */

    /* Remove ::after styles */
    /* &::after { ... } */
  }

  @media (max-width: 768px) {
    grid-template-rows: ${(props) =>
      `repeat(${props.height}, ${680 / props.height}px)`};
    grid-template-columns: ${(props) => `repeat(${props.width}, 1fr)`};
    max-width: 95vw;
    height: 680px !important;
    margin-bottom: 120px !important;
    overflow: hidden;
    grid-gap: 0 !important;
  }
  }

  @media (min-width: 769px) and (max-width: 1200px) {
    // Для планшетов: используем 90vw
    /* grid-template-rows: repeat(
      ${(props) => props.height},
      calc(90vw / ${(props) => props.width})
    ); - Removed calculation */
    max-width: 90vw;
    height: calc(
      90vw / (${(props) => props.width} / ${(props) => props.height})
    ); /* Calculate height from width and aspect ratio */
    border: 3px solid #777; /* Use border */
    outline: none;
    /* box-shadow: 0 0 20px rgba(0, 255, 0, 0.3),
      0 0 30px rgba(255, 0, 255, 0.3) inset; */
    box-shadow: 0 0 30px rgba(255, 0, 255, 0.3) inset;

    /* Remove ::after styles */
    /* &::after { ... } */
  }

  /* Remove ::before */
  /* &::before { ... } */

  /* Remove base ::after */
`;

const Stage = ({ stage }) => (
  <StyledStage width={stage[0].length} height={stage.length}>
    {stage.map((row) =>
      row.map((cell, x) => (
        <Cell
          key={x}
          type={cell[0]}
          color={cell[0] !== 0 ? cell[2] : "0, 0, 0"}
          image={cell[0] !== 0 ? cell[3] : null}
          cellState={cell[1]}
        />
      ))
    )}
  </StyledStage>
);

export default Stage;
