import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

const Game = (props) => {
  let initialScore = 0;
  socket.on("initial_score", (data) => {
    initialScore = data;
  });
  //const location = useLocation();
  //const { timer, give, take, request } = location.state;
  const [score, setScore] = useState(initialScore);
  const [oppScore, setOppScore] = useState(initialScore);
  const [currentCircle, setCurrentCircle] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [ready, setReady] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [roomId, setRoomId] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [oppId, setOppId] = useState("");
  const [enabled,setClickEnabled] = useState(true);

  socket.on("room_id", (data, player) => {
    console.log(`player id ${player}`);
    setRoomId(data);
    setPlayerId(player);
  });

  // Generate a new circle when there is no current circle
  useEffect(() => {
    if (!currentCircle && !gameOver) {
      socket.on("current_circle", (data) => {
        setCurrentCircle(data);
      }
      );
    }
  }, [currentCircle, gameOver]);

  const handleClick = () => {
    setCurrentCircle(null);
    socket.emit("circle_clicked", currentCircle);
    socket.on("update_score", (data, score) => {
      setScore(score);
    })
    console.log(timeLeft);
  }

  useEffect(() => {
    socket.on("update_opp_score", (data, score) => {
      if (data !== playerId) {
        console.log(`opp id ${data}}`);
        console.log(score);
        setOppScore(score);
      }
    })
  });
  /* Handle circle clicks
  const handleClick = () => {
    setCurrentCircle(null);
    socket.on("update_score", (score) => {
      setScore(score);
    });
    socket.emit("circle_clicked",currentCircle);
    console.log(timeLeft);
  };
  */

  // End the game when the timer runs out
  useEffect(() => {
    if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft]);

  // Decrement the timer every second
  useEffect(() => {
    socket.on("start_game", (start) => {
      setReady(start);
    })
    if (ready) {
      if (timeLeft > 0 && !gameOver) {
        const timerId = setTimeout(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearTimeout(timerId);
      }
    }
  }, [timeLeft, gameOver,ready]);

  return (
    <div className="formContainer">
      {gameOver ? (
        <h1>Time is up! Your score is {score}.</h1>
      ) : (
        <div>
          <h1>You: {score}</h1>
          <h1>Opponent: {oppScore}</h1>
          <h2>Time left: {timeLeft}</h2>
          <h2>Room ID: {roomId}</h2>
          {<button> Give</button>}
          {<button>take</button>}
          {<button>request</button>}
          {currentCircle && (
            <div
              style={{
                position: 'absolute',
                top: currentCircle.y + `%`,
                left: currentCircle.x + `%`,
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




