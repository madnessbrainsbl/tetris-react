import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// Keyframes for the shards flying off
const shardFlyAnimation = keyframes`
  0% { transform: translate(0, 0) rotate(0); opacity: 1; }
  100% { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)); opacity: 0; }
`;

// Main container shake
const shakeAnimation = keyframes`
  0% { transform: translate(0, 0) rotate(0); }
  20% { transform: translate(-10px, 0) rotate(-2deg); }
  40% { transform: translate(10px, 0) rotate(2deg); }
  60% { transform: translate(-8px, 0) rotate(-1deg); }
  80% { transform: translate(8px, 0) rotate(1deg); }
  100% { transform: translate(0, 0) rotate(0); }
`;

// Flicker animation
const flickerAnimation = keyframes`
  0%, 100% { opacity: 1; }
  10%, 90% { opacity: 0.9; }
  20%, 80% { opacity: 1; }
  30%, 50%, 70% { opacity: 0.3; }
  40%, 60% { opacity: 0.8; }
  45%, 55% { opacity: 0.1; }
`;

// Glitch blocks animation
const glitchBlocksAnimation = keyframes`
  0%, 100% { clip-path: none; }
  10% { clip-path: polygon(0 5%, 100% 5%, 100% 6%, 0 6%); }
  20% { clip-path: polygon(0 15%, 100% 15%, 100% 16%, 0 16%); }
  30% { clip-path: polygon(0 25%, 100% 25%, 100% 26%, 0 26%); }
  40% { clip-path: polygon(0 35%, 100% 35%, 100% 36%, 0 36%); }
  50% { clip-path: polygon(0 45%, 100% 45%, 100% 46%, 0 46%); }
  60% { clip-path: polygon(0 55%, 100% 55%, 100% 56%, 0 56%); }
  70% { clip-path: polygon(0 65%, 100% 65%, 100% 66%, 0 66%); }
  80% { clip-path: polygon(0 75%, 100% 75%, 100% 76%, 0 76%); }
  90% { clip-path: polygon(0 85%, 100% 85%, 100% 86%, 0 86%); }
`;

// Усиленный глитч для фона
const backgroundGlitchAnimation = keyframes`
  0%, 100% { background-position: 0 0; filter: hue-rotate(0deg); }
  10% { background-position: -5px 0; filter: hue-rotate(45deg); }
  20% { background-position: 5px 0; filter: hue-rotate(90deg); }
  30% { background-position: -3px 0; filter: hue-rotate(135deg); }
  40% { background-position: 3px 0; filter: hue-rotate(180deg); }
  50% { background-position: -1px 0; filter: hue-rotate(225deg); }
  60% { background-position: 1px 0; filter: hue-rotate(270deg); }
  70% { background-position: -2px 0; filter: hue-rotate(315deg); }
  80% { background-position: 2px 0; filter: hue-rotate(360deg); }
  90% { background-position: -4px 0; filter: hue-rotate(405deg); }
`;

const StyledGameOver = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  animation: ${shakeAnimation} 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.3) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
    animation: ${backgroundGlitchAnimation} 2s infinite;
  }
`;

const GlitchOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 103;
  pointer-events: none;
  background-color: transparent;
  mix-blend-mode: overlay;
  opacity: 0.4;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 0, 0, 0.3),
      rgba(0, 255, 0, 0.3),
      rgba(0, 0, 255, 0.3)
    );
    mix-blend-mode: screen;
    animation: ${flickerAnimation} 0.3s linear infinite;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        0deg,
        transparent 0%,
        rgba(32, 128, 32, 0.2) 2%,
        transparent 3%
      ),
      linear-gradient(
        0deg,
        transparent 30%,
        rgba(32, 128, 32, 0.1) 31%,
        transparent 33%
      ),
      linear-gradient(
        0deg,
        transparent 70%,
        rgba(32, 128, 32, 0.3) 71%,
        transparent 73%
      );
    background-size: 100% 100%;
    animation: ${glitchBlocksAnimation} 0.2s infinite alternate-reverse;
  }
`;

const ShardContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 101;
  pointer-events: none;
`;

const Shard = styled.div`
  position: absolute;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  background: linear-gradient(
    ${(props) => props.angle}deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(200, 200, 200, 0.7) 50%,
    rgba(100, 100, 100, 0.5) 100%
  );
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  clip-path: polygon(
    ${(props) => props.points.map((p) => `${p.x}% ${p.y}%`).join(", ")}
  );
  animation: ${shardFlyAnimation} 1.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)
    forwards;
  animation-delay: ${(props) => props.delay}s;
  --tx: ${(props) => props.tx}vw;
  --ty: ${(props) => props.ty}vh;
  --rot: ${(props) => props.rotate}deg;
  transform-origin: center;
  z-index: 102;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 104;
  background: rgba(0, 0, 0, 0.8);
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.4);
  max-width: 400px;
  width: 80%;
  margin: 0 auto;
`;

const StyledTitle = styled.h2`
  font-family: "Courier New", monospace;
  color: #ff0000;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 20px;
  text-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000,
    -2px 2px 0 #000, 0 0 8px rgba(255, 0, 0, 0.7);
  position: relative;
  text-align: center;

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &::before {
    left: 2px;
    text-shadow: -1px 0 #00ffff;
    animation: glitch-anim-1 2s infinite linear alternate-reverse;
  }

  &::after {
    left: -2px;
    text-shadow: 1px 0 #ff00ff;
    animation: glitch-anim-2 3s infinite linear alternate-reverse;
  }

  @keyframes glitch-anim-1 {
    0% {
      clip-path: inset(20% 0 80% 0);
    }
    20% {
      clip-path: inset(60% 0 40% 0);
    }
    40% {
      clip-path: inset(40% 0 60% 0);
    }
    60% {
      clip-path: inset(80% 0 20% 0);
    }
    80% {
      clip-path: inset(10% 0 90% 0);
    }
    100% {
      clip-path: inset(30% 0 70% 0);
    }
  }

  @keyframes glitch-anim-2 {
    0% {
      clip-path: inset(10% 0 90% 0);
    }
    20% {
      clip-path: inset(30% 0 70% 0);
    }
    40% {
      clip-path: inset(50% 0 50% 0);
    }
    60% {
      clip-path: inset(70% 0 30% 0);
    }
    80% {
      clip-path: inset(90% 0 10% 0);
    }
    100% {
      clip-path: inset(5% 0 95% 0);
    }
  }
`;

const StyledScore = styled.p`
  font-family: "Courier New", monospace;
  color: #ddd;
  font-size: 1.2rem;
  margin-bottom: 30px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledButton = styled.button`
  display: block;
  box-sizing: border-box;
  padding: 15px 30px;
  background: #111;
  color: #fff;
  border: 2px solid #333;
  font-family: "Courier New", monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  margin-bottom: 15px;
  width: 250px;

  &:hover {
    background: #222;
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: all 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const StyledLink = styled.a`
  display: block;
  box-sizing: border-box;
  padding: 15px 30px;
  background: #111;
  color: #fff;
  border: 2px solid #333;
  font-family: "Courier New", monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  text-align: center;
  width: 250px;
  margin-bottom: 15px;

  &:hover {
    background: #222;
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: all 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

// Function to generate random polygon points
const generateShardPoints = () => {
  // Generate 4-7 points for an irregular polygon
  const numPoints = Math.floor(Math.random() * 4) + 4;
  const points = [];

  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
    });
  }

  return points;
};

// Function to generate random shards
const generateShards = (count) => {
  const shards = [];

  for (let i = 0; i < count; i++) {
    shards.push({
      id: i,
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
      top: Math.random() * 100,
      left: Math.random() * 100,
      angle: Math.random() * 360,
      points: generateShardPoints(),
      delay: Math.random() * 0.5,
      tx: (Math.random() - 0.5) * 200,
      ty: (Math.random() - 0.5) * 200,
      rotate: (Math.random() - 0.5) * 720,
    });
  }

  return shards;
};

const GameOver = ({ score, restartGame }) => {
  const [shards, setShards] = useState([]);

  useEffect(() => {
    // Generate 20-30 glass shards
    setShards(generateShards(25));
  }, []);

  return (
    <StyledGameOver>
      <ShardContainer>
        {shards.map((shard) => (
          <Shard
            key={shard.id}
            width={shard.width}
            height={shard.height}
            top={shard.top}
            left={shard.left}
            angle={shard.angle}
            points={shard.points}
            delay={shard.delay}
            tx={shard.tx}
            ty={shard.ty}
            rotate={shard.rotate}
          />
        ))}
      </ShardContainer>

      <GlitchOverlay />

      <ContentContainer>
        <StyledTitle data-text="GAME OVER">GAME OVER</StyledTitle>
        <StyledScore>Score: {score}</StyledScore>
        <ButtonContainer>
          <StyledButton onClick={restartGame}>Again</StyledButton>
          <StyledLink href="https://madnessbrains.tilda.ws/" target="_blank">
            Photo
          </StyledLink>
        </ButtonContainer>
      </ContentContainer>
    </StyledGameOver>
  );
};

export default GameOver;
