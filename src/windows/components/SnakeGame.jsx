import React, { useState, useEffect, useRef } from 'react';

const GRID_SIZE = 15;
const CELL_SIZE = 20;

const SnakeGame = ({ onExit }) => {
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState([1, 0]); // [dx, dy]
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gameRef = useRef(null);

  // Focus the game container to capture keyboard events immediately
  useEffect(() => {
    if (gameRef.current) {
        gameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      setSnake((prev) => {
        const head = prev[0];
        const newHead = [head[0] + direction[0], head[1] + direction[1]];

        // Wall collision
        if (
          newHead[0] < 0 ||
          newHead[0] >= GRID_SIZE ||
          newHead[1] < 0 ||
          newHead[1] >= GRID_SIZE
        ) {
          setGameOver(true);
          return prev;
        }

        // Self collision
        if (prev.some((segment) => segment[0] === newHead[0] && segment[1] === newHead[1])) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [newHead, ...prev];

        // Food collision
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore((s) => s + 10);
          // Generate new food avoiding snake body
          let newFood;
          while (true) {
            newFood = [
              Math.floor(Math.random() * GRID_SIZE),
              Math.floor(Math.random() * GRID_SIZE),
            ];
            if (!newSnake.some((seg) => seg[0] === newFood[0] && seg[1] === newFood[1])) {
              break;
            }
          }
          setFood(newFood);
        } else {
          newSnake.pop(); // Remove tail if no food eaten
        }

        return newSnake;
      });
    };

    const intervalId = setInterval(moveSnake, 150);
    return () => clearInterval(intervalId);
  }, [direction, food, gameOver]);

  const handleKeyDown = (e) => {
    if (['ArrowUp', 'w', 'W'].includes(e.key) && direction[1] === 0) {
      setDirection([0, -1]);
      e.preventDefault();
    } else if (['ArrowDown', 's', 'S'].includes(e.key) && direction[1] === 0) {
      setDirection([0, 1]);
      e.preventDefault();
    } else if (['ArrowLeft', 'a', 'A'].includes(e.key) && direction[0] === 0) {
      setDirection([-1, 0]);
      e.preventDefault();
    } else if (['ArrowRight', 'd', 'D'].includes(e.key) && direction[0] === 0) {
      setDirection([1, 0]);
      e.preventDefault();
    }
  };

  return (
    <div 
      className="flex flex-col items-center outline-none mt-4 font-mono text-green-400"
      onKeyDown={handleKeyDown} 
      tabIndex={0}
      ref={gameRef}
    >
      <div className="flex justify-between w-[300px] mb-2 font-bold">
        <span>Score: {score}</span>
        <button onClick={onExit} className="hover:text-green-300 underline">[Exit]</button>
      </div>

      <div 
        className="relative bg-black border-2 border-green-500 shadow-[0_0_10px_#22c55e]"
        style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
      >
        {/* Food */}
        <div
          className="absolute bg-red-500 rounded-sm"
          style={{
            left: food[0] * CELL_SIZE,
            top: food[1] * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
        />

        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute bg-green-500 border border-black"
            style={{
              left: segment[0] * CELL_SIZE,
              top: segment[1] * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              opacity: index === 0 ? 1 : 0.8 // Head is brighter
            }}
          />
        ))}

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-red-500 font-bold">
            <p className="text-xl mb-2">GAME OVER</p>
            <p className="text-sm mb-4">Final Score: {score}</p>
            <button 
              className="px-3 py-1 border border-green-500 text-green-400 hover:bg-green-900/50"
              onClick={() => {
                setSnake([[5, 5]]);
                setDirection([1, 0]);
                setScore(0);
                setGameOver(false);
                gameRef.current?.focus();
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
      <p className="text-xs text-green-600 mt-3">Use WASD or Arrow Keys to move.</p>
    </div>
  );
};

export default SnakeGame;
