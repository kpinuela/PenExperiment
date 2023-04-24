

const express = require('express');
const app = express();
const http = require("http");
const { Server } = require('socket.io');
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);
let currCircle = null;
let timer = 60;
let rooms= {};

let score = 0;
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const generateCircle = (room) => {
    const newCircle = {
        x: Math.floor(30 + Math.random() * 60),
        y: Math.floor(10 + Math.random() * 80),
        radius: 35,
        clicked: false,
    };
    currCircle = newCircle;
    io.to(room).emit("current_circle", currCircle);

};

const startTimer = () => {
    const intervalId = setInterval(() => {
        timer--;
        if (timer === 0) {
            clearInterval(intervalId);
        }
    }, 1000);
}


io.on("connection", (socket) => {
    //make a player object for each users
    const player = {
      id: socket.id,
      score: 0,
    };

    let availablerooms = null;
    io.sockets.adapter.rooms.forEach((room, roomId) => {
      if (roomId.startsWith("room-") && room.size < 2) {
        availablerooms = roomId;
      }
    });


    io.to(availablerooms).emit("initial_score", score);
  
    if (!availablerooms) {
      availablerooms = `room-${Date.now()}`;
      socket.join(availablerooms);
  
      const room = {
        players: [],
        timerStarted: false,
      };
      room.players.push(player);
      rooms[availablerooms] = room;
    } else {
      socket.join(availablerooms);
      rooms[availablerooms].players.push(player);
      // set opponent
      rooms[availablerooms].players.forEach((p) => {
        if (p.id !== player.id) {
          player.opponent = p.id;
          p.opponent = player.id;
        }
      });
      io.to(availablerooms).emit("start_game", true);
    }
  
    socket.emit("room_id", availablerooms, socket.id);
  
    const clients = io.sockets.adapter.rooms.get(availablerooms);
    const numClients = clients ? clients.size : 0;

    if(numClients === 2){
        generateCircle(availablerooms);
        socket.to(availablerooms).emit("start_game", true);
    }

  
    socket.on("circle_clicked", () => {
        player.score++;
      if (currCircle) {
        currCircle = null;
        // update score
        io.to(player.id).emit("update_score",player.id,player.score);
        // update opponent's score
        const opponent = rooms[availablerooms].players.find(
          (p) => p.id === player.opponent
        );
          io.to(opponent.id).emit("update_opp_score",player.id,player.score);
        generateCircle(availablerooms);
      }
    });
  
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      if (io.sockets.adapter.rooms.get(availablerooms) == null) {
        console.log(`Room ${availablerooms} is empty`);
        io.of("/").adapter.rooms.delete(availablerooms);
        clearInterval(timer);
      }
    });
    console.log("Rooms:");
    console.log(rooms[availablerooms]);

    if (numClients === 2 && !rooms[availablerooms].timerStarted) {
        rooms[availablerooms].timerStarted = true;
    }
  });
  
  server.listen(3001, () => {
    console.log("listening on 3001");
});
