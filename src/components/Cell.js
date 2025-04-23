import React from "react";
import styled, { keyframes } from "styled-components";

const explodeAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; filter: brightness(1); }
  25% { transform: scale(1.3); opacity: 0.9; filter: brightness(2); }
  50% { transform: scale(1.5); opacity: 0.8; filter: brightness(2.5); box-shadow: 0 0 20px rgba(255, 255, 255, 0.8); }
  75% { transform: scale(1.2); opacity: 0.9; filter: brightness(2); }
  100% { transform: scale(1); opacity: 1; filter: brightness(1); }
`;

const StyledCell = styled.div`
  width: auto;
  aspect-ratio: 1 / 1;
  background: rgba(${(props) => props.color}, 0.8);
  border: ${(props) =>
    props.type === 0 ? "none" : "1px solid rgba(" + props.color + ", 1)"};
  box-shadow: ${(props) =>
    props.type === 0
      ? "none"
      : `inset 3px 3px 0 rgba(${props.color}, 1), 
         inset -3px -3px 0 rgba(${props.color}, 0.2)`};
  position: relative;
  overflow: visible;
  animation: ${(props) => (props.exploding ? explodeAnimation : "none")} 0.2s
    infinite;
  z-index: ${(props) => (props.exploding ? 20 : 1)};
  box-sizing: border-box;
  margin: 1px;

  /* Стили для десктопной версии - reverted */
  /* @media (min-width: 1201px) {
    margin: 1px;
    border: ${(props) =>
    props.type === 0 ? "none" : "1px solid rgba(255, 255, 255, 0.1)"};
    box-shadow: ${(props) =>
    props.type === 0
      ? "none"
      : `inset 4px 4px 0 rgba(${props.color}, 1), 
           inset -4px -4px 0 rgba(${props.color}, 0.3)`};
  } */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${(props) =>
      props.image ? `url(${props.image})` : "none"};
    background-size: cover;
    background-position: center;
    opacity: ${(props) => (props.exploding ? 0 : props.type === 0 ? 0 : 1)};
    mix-blend-mode: normal;
    filter: none;
    z-index: 2;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${(props) =>
      props.exploding
        ? `radial-gradient(circle at center, rgba(255,140,0,0.9) 0%, rgba(255,69,0,0.8) 50%, rgba(255,0,0,0.3) 100%)`
        : `linear-gradient(135deg, rgba(${props.color}, 0.3) 0%, rgba(${props.color}, 0) 50%, rgba(${props.color}, 0.3) 100%)`};
    opacity: ${(props) => (props.type === 0 ? 0 : props.exploding ? 1 : 0.5)};
    mix-blend-mode: overlay;
    z-index: 3;
  }
`;

const Cell = ({ type, color, image, cellState }) => (
  <StyledCell
    type={type}
    color={color}
    image={image}
    exploding={cellState === "exploding"}
  />
);

export default React.memo(Cell);
