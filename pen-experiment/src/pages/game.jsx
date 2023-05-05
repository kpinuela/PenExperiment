import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import "../style.scss";
import "./game_style.css";

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
  const [surveyID, setSurveyID] = useState("");
  const [endMessage, setEndMessage] = useState(false);
  const [disabled, setDisabled] = useState(false);

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
  }, [currentCircle, gameOver, enabled]);

  // Handle circle clicks
  const handleClick = () => {
    if (enabled) {
      setCurrentCircle(null);
      socket.emit("circle_clicked", timeLeft);
      socket.on("update_score", (data, score) => {
        setScore(score);
      })
      console.log(timeLeft);
    }
  }

  const handleGive = () => {
    setClickEnabled(false);
    setRequest(false);
    socket.emit("give");
  }

  const handleTake = () => {
    setClickEnabled(true);
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 2000)
    socket.emit("take");
  }

  const handleRequest = () => {
    socket.emit("receive_request");
  };

  const handleNo = () => {
    setRequest(false);
  }

  const handleSubmit = () => {
    socket.emit("submit_survey", surveyID);
    setEndMessage(true);
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px', flexDirection: 'column' }}>
          <h1>Game Over</h1>
          {score > oppScore ? (
            <div>
              <h2>You win with a score of {score}</h2>
              <span className="logo">Survey ID Login</span>
              <input type="text"
                id="surveyID"
                placeholder="Survey ID"
              />
              <button onClick={handleSubmit}>Enter</button>
            </div>
          ) : oppScore > score ? (
            <div>
              <h2>Opponent won with a score of {oppScore}</h2>
              <span className="logo">Survey ID Login</span>
              <input type="text"
                id="surveyID"
                placeholder="Survey ID"
              />
              <button>Enter</button>
            </div>
          ) : (
            <div>
              <h2>It's a tie!</h2>
              <span className="logo">Survey ID Login</span>
              <input type="text"
                id="surveyID"
                placeholder="Survey ID"
              />
              <button>Enter</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1 style={{ color: 'white', padding: "10px" }}>You: {score}</h1>
          <h1 style={{ color: 'white', padding: "10px" }}>Opponent: {oppScore}</h1>
          <h2 style={{ color: 'white', padding: "10px" }}>Time left: {timeLeft}</h2>
          <h2 style={{ color: 'white', padding: "10px" }}>Room ID: {roomId}</h2>
          <div />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-200px' }}>
            {<button onClick={handleGive}> Give</button>}
            {<button className={disabled ? "gray-out" : ""} onClick={handleTake}>Take</button>}
            {<button onClick={handleRequest}>Request</button>}
          </div >
          {request && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px', flexDirection: 'column' }}>
              <h1 style={{ color: 'white', padding: "10px" }}>Opponent wants control. Give?</h1>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <button style={{ padding: '15px 30px' }} onClick={handleGive}>Yes</button>
                <button style={{ padding: '15px 30px' }} onClick={handleNo}>No</button>
              </div>
            </div>
          )}
          {currentCircle ? (
            <div
              className={`circle ${enabled ? 'enabled' : 'disabled'}`}
              style={{
                position: 'absolute',
                top: currentCircle.y + `%`,
                left: currentCircle.x + `%`,
                width: currentCircle.radius * 2,
                height: currentCircle.radius * 2,
                borderRadius: '100%',
              }}
              onClick={handleClick}
            />
          ):null}
        </div>
      )}
    </div>
  );
};

export default Game;




