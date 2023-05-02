import { useState, useEffect } from 'react';
import io from 'socket.io-client';
const port = process.env.PORT || "8080";
const socket = io.connect("https://evening-ridge-47791.herokuapp.com");

const Game = (props) => {
  let initialScore = 0;
  socket.on("initial_score", (data) => {
    initialScore = data;
  });

  const [score, setScore] = useState(initialScore);
  const [oppScore, setOppScore] = useState(initialScore);
  const [currentCircle, setCurrentCircle] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [ready, setReady] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [roomId, setRoomId] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [enabled, setClickEnabled] = useState(false);
  const [request, setRequest] = useState(false);

  socket.on("room_id", (data, player) => {
    console.log(`player id ${player}`);
    setRoomId(data);
    setPlayerId(player);
  });
  socket.on("can_click", (data) => {
    setClickEnabled(data);
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

  // Handle circle clicks
  const handleClick = () => {
    if (enabled) {
      setCurrentCircle(null);
      socket.emit("circle_clicked",timeLeft);
      socket.on("update_score", (data, score) => {
        setScore(score);
      })
      console.log(timeLeft);
    }
  }

  const handleGive = () => {
    setClickEnabled(false);
    socket.emit("give");
  }

  const handleTake = () => {
    setClickEnabled(true);
    socket.emit("take");
  }

  const handleRequest = () => {
    socket.emit("receive_request");
  };

  const handleNo = () =>{
    setRequest(false);
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

  useEffect(() => {
    socket.on("receive_request", (data) => {
      setRequest(true);
      setTimeout(() => {
        setRequest(false);
      }, 10000); // 10 seconds
    })
  })

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
  }, [timeLeft, gameOver, ready]);

  return (
    <div>
      {gameOver ? (
        <h1>Time is up! Your score is {score}.</h1>
      ) : (
        <div>
          <h1>You: {score}</h1>
          <h1>Opponent: {oppScore}</h1>
          <h2>Time left: {timeLeft}</h2>
          <h2>Room ID: {roomId}</h2>
          {<button onClick={handleGive}> Give</button>}
          {<button onClick={handleTake}>take</button>}
          {<button onClick={handleRequest}>request</button>}
          {request && (
            <div>
              <h1>Opponent wants control. Give?</h1>
              <button onClick ={handleGive}>Yes</button>
              <button onClick = {handleNo}>No</button>
            </div>
          )}
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




