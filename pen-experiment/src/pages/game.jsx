import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

const Game = (props) => {
  //const location = useLocation();
  //const { timer, give, take, request } = location.state;
  const [score, setScore] = useState(0);
  const [currentCircle, setCurrentCircle] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  // Generate a new circle when there is no current circle
  useEffect(() => {
    if (!currentCircle && !gameOver) {
      const newCircle = {
        x: Math.floor(Math.random() * window.innerWidth),
        y: Math.floor(Math.random() * window.innerHeight),
        radius: 35,
        clicked: false,
      };
      setCurrentCircle(newCircle);
      socket.emit("new_circle",{newCircle});
    }
  }, [currentCircle, gameOver]);

  // Handle circle clicks
  const handleClick = () => {
    setCurrentCircle(null);
    setScore(score + 1);
    console.log(timeLeft);
    socket.emit("timer",{timeLeft});
    socket.emit("current_circle",{currentCircle});
    socket.emit("score",{score});
  };

  // End the game when the timer runs out
  useEffect(() => {
    if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft]);

  // Decrement the timer every second
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft, gameOver]);

  return (
    <div className="formContainer">
      {gameOver ? (
        <h1>Time is up! Your score is {score}.</h1>
      ) : (
        <div>
          <h1>Score: {score}</h1>
          <h2>Time left: {timeLeft}</h2>
          {<button> Give</button>}
          {<button>take</button>}
          {<button>request</button>}
          {currentCircle && (
            <div
              style={{
                position: 'absolute',
                top: currentCircle.y - currentCircle.radius,
                left: currentCircle.x - currentCircle.radius,
                width: currentCircle.radius * 2,
                height: currentCircle.radius * 2,
                borderRadius: '100%',
                backgroundColor: 'white',
                cursor: 'pointer',
              }}
              onClick={handleClick}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Game;




