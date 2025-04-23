import React, { useRef } from "react";
import styled from "styled-components";
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import NextPiece from "./NextPiece";
import GameOver from "./GameOver";

const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
  background-size: cover;
  overflow: hidden;
  position: relative;

  /* @media (max-width: 769px) {
    overflow: visible;
    height: auto;
    min-height: 100vh;
  } - reverted */

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
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      transparent 0%,
      rgba(0, 0, 0, 0.8) 100%
    );
    pointer-events: none;
    z-index: 2;
  }
`;

const StyledTetris = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 120px);
  padding: 40px;
  margin: 0 auto;
  width: 80vw;
  position: relative;
  z-index: 3;

  /* МОБИЛЬНАЯ ВЕРСИЯ - основной контейнер */
  @media (max-width: 769px) {
    padding: 10px;
    width: 100vw;
    min-height: 100vh;
    overflow-y: visible;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  gap: 0;
  justify-content: center;

  /* МОБИЛЬНАЯ ВЕРСИЯ - контейнер контента */
  @media (max-width: 769px) {
    flex-direction: column;
    gap: 0;
  }
`;

const StageContainer = styled.div`
  flex: 6;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 30px;
  height: auto;
  position: relative;
  z-index: 4;

  /* Стили для десктопной версии - reverted */
  /* @media (min-width: 1201px) {
    padding-bottom: 0;
    margin-bottom: 0;
    justify-content: center;
    align-items: center;
    height: auto;
    overflow: visible;
  } */

  /* МОБИЛЬНАЯ ВЕРСИЯ - контейнер игрового поля */
  @media (max-width: 769px) {
    justify-content: stretch;
    margin-right: -100px;
    position: relative;
    top: 0;
    margin-bottom: 120px;
    /* padding-bottom: 150px; - reverted */
  }
`;

const AsideContainer = styled.div`
  flex: 4;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
  margin-left: -20px;

  /* МОБИЛЬНАЯ ВЕРСИЯ - контейнер панели управления */
  @media (max-width: 769px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    margin: 0;
    padding: 20px 5px;
    z-index: 10;
    justify-content: center;
    /* border-top: 2px solid #333; - reverted */
    /* box-shadow: 0 -5px 20px rgba(0, 255, 0, 0.3); - reverted */
  }
`;

const StyledAside = styled.aside`
  width: 100%;
  max-width: 250px;
  margin: 0;
  padding: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  /* МОБИЛЬНАЯ ВЕРСИЯ - панель с кнопками */
  @media (max-width: 769px) {
    max-width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
`;

const StyledTitle = styled.h1`
  font-family: "Courier New", monospace;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 30px;
  text-align: center;
  font-size: 2.5rem;
  position: relative;
  text-shadow: 0 0 5px rgba(255, 0, 0, 0.7), 0 0 10px rgba(0, 255, 0, 0.5),
    0 0 15px rgba(0, 0, 255, 0.3);

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

const StyledDisplay = styled.div`
  margin: 0 0 10px 0;
  padding: 0;
  width: 100%;
  box-sizing: border-box;

  /* МОБИЛЬНАЯ ВЕРСИЯ - отображение информации (очки, уровень и т.д.) */
  @media (max-width: 768px) {
    width: auto;
    min-width: 60px;
    margin: 0;
    padding: 0 5px;
    display: flex;
    align-items: center;
    height: 70px;
    font-size: 0.7rem;
  }
`;

const StyledContainer = styled.div`
  margin: 0 0 5px 0;
  padding: 0;
  width: 100%;
  box-sizing: border-box;

  /* МОБИЛЬНАЯ ВЕРСИЯ - контейнер для Next блока */
  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Tetris = ({
  score,
  rows,
  level,
  nextTetromino,
  gameOver,
  stage,
  startGame,
  movePlayer,
  dropPlayer,
  hardDrop,
  rotatePlayer,
  pauseGame,
  isPaused,
}) => {
  const initialTouch = useRef({ x: 0, y: 0 });

  // Handle keypress events
  const handleKeyDown = (e) => {
    // Prevent default behavior for space key in any case
    if (e.keyCode === 32) {
      e.preventDefault();
    }

    if (gameOver) return;

    if (e.keyCode === 80) {
      pauseGame();
      return;
    }

    if (isPaused) return;

    // Prevent default behavior for other keys during gameplay
    e.preventDefault();

    if (e.keyCode === 37) {
      // Left arrow
      movePlayer(-1);
    } else if (e.keyCode === 39) {
      // Right arrow
      movePlayer(1);
    } else if (e.keyCode === 40) {
      // Down arrow
      dropPlayer();
    } else if (e.keyCode === 38) {
      // Up arrow
      rotatePlayer();
    } else if (e.keyCode === 32) {
      // Space - Hard drop only if game is active
      if (!gameOver) {
        hardDrop();
      }
    }
  };

  // Add touch event handlers for sensor interactions
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    initialTouch.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - initialTouch.current.x;
    const deltaY = touch.clientY - initialTouch.current.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // If swipe down is significant, trigger hard drop
    if (absDeltaY > 50 && absDeltaY > absDeltaX && deltaY > 0) {
      hardDrop();
      return;
    }

    // Otherwise, treat as a tap
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    // If tap is on the top 10% of the screen, toggle pause
    if (y < height * 0.1) {
      pauseGame();
      return;
    }

    // Divide the screen horizontally into three regions
    if (x < width / 3) {
      movePlayer(-1);
    } else if (x > (width * 2) / 3) {
      movePlayer(1);
    } else {
      // In center region, if tap in upper half, rotate; else, normal drop
      if (y < height / 2) {
        rotatePlayer();
      } else {
        dropPlayer();
      }
    }
  };

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <StyledTitle data-text="MADNESSBRAINS">MADNESSBRAINS</StyledTitle>

      <StyledTetris>
        <ContentContainer>
          <StageContainer>
            <Stage stage={stage} />
          </StageContainer>
          <AsideContainer>
            <StyledAside>
              <StyledContainer>
                <NextPiece tetromino={nextTetromino} />
              </StyledContainer>
              <StyledDisplay>
                <Display text={`SCORE: ${score}`} />
              </StyledDisplay>
              <StyledDisplay>
                <Display text={`LINES: ${rows}`} />
              </StyledDisplay>
              <StyledDisplay>
                <Display text={`LEVEL: ${level}`} />
              </StyledDisplay>
              <StyledDisplay>
                <StartButton callback={startGame} />
              </StyledDisplay>
              {isPaused && !gameOver ? (
                <StyledDisplay>
                  <Display text="PAUSE" gameOver={false} />
                </StyledDisplay>
              ) : null}
            </StyledAside>
          </AsideContainer>
        </ContentContainer>
      </StyledTetris>

      {gameOver ? <GameOver score={score} restartGame={startGame} /> : null}
    </StyledTetrisWrapper>
  );
};

export default Tetris;
