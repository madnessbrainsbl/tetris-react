import React from "react";
import styled from "styled-components";
import Cell from "./Cell";

const StyledStage = styled.div`
  // Основной размер игрового поля для ПК: используем 80vw
  display: grid;
  grid-template-rows: repeat(
    ${(props) => props.height},
    calc(80vw / ${(props) => props.width})
  );
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  width: 100%;
  max-width: 80vw;
  background: #111;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.2),
    0 0 30px rgba(255, 0, 255, 0.2) inset;
  position: relative;

  // Для больших экранов ограничиваем максимальный размер
  @media (min-width: 1201px) {
    grid-template-rows: repeat(
      ${(props) => props.height},
      calc(70vh / ${(props) => props.height})
    );
    max-width: calc(
      70vh / ${(props) => props.height} * ${(props) => props.width}
    );
  }

  @media (max-width: 768px) {
    // Динамический расчёт высоты строки
    grid-template-rows:
      repeat(
        ${(props) => props.height - 1},
        calc(95vw / ${(props) => props.width})
      )
      50px;
    ${(props) => props.height},
    calc(95vw / ${(props) => props.width})
    );
    grid-template-columns: repeat(${(props) => props.width}, 1fr);
    max-width: 95vw;
    height: auto;
  }

  @media (min-width: 769px) and (max-width: 1200px) {
    // Для планшетов: используем 90vw
    grid-template-rows: repeat(
      ${(props) => props.height},
      calc(90vw / ${(props) => props.width})
    );
    max-width: 90vw;
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
