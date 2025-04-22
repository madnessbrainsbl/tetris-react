import React from "react";
import styled from "styled-components";

const StyledStartButton = styled.button`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 5px 0;
  padding: 10px;
  height: 40px; /* Фиксированная высота */
  width: 100%;
  border-radius: 5px;
  border: 2px solid #333;
  color: white;
  background: #000;
  font-family: "Courier New", monospace;
  font-size: 0.8rem;
  outline: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);

  @media (max-width: 768px) {
    padding: 5px;
    font-size: 0.7rem;
    height: 35px; /* Меньшая высота для мобильных */
  }

  &:hover {
    background: #222;
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
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

const StartButton = ({ callback }) => (
  <StyledStartButton onClick={callback}>START GAME</StyledStartButton>
);

export default StartButton;
