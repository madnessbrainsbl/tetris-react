import React from "react";
import styled from "styled-components";

const StyledDisplay = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 5px 0;
  padding: 10px;
  border: 2px solid #333;
  height: 40px;
  width: 100%;
  border-radius: 5px;
  color: ${(props) => (props.gameOver ? "#ff0000" : "#ddd")};
  background: #000;
  font-family: "Courier New", monospace;
  font-size: 0.8rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    margin-bottom: 5px;
    padding: 5px;
    font-size: 0.7rem;
    height: 35px;
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

const Display = ({ gameOver, text }) => (
  <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
);

export default Display;
