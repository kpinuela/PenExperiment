

const express = require('express');
const app = express();
const http = require("http");
const { Server } = require('socket.io');
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);
let currCircle = null;
let timer = 60;
let players= {};

let score = 0;
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const startTimer = (room) => {
    const intervalId = setInterval(() => {
        timer--;
        if (timer === 0) {
            clearInterval(intervalId);
        }
        io.emit("timer", timer);
    }, 1000);
}
startTimer();
const generateCircle = (room) => {
    const newCircle = {
        x: Math.floor(30 + Math.random() * 60),
        y: Math.floor(10 + Math.random() * 80),
        radius: 35,
        clicked: false,
    };
    currCircle = newCircle;
    io.to(room).emit("current_circle", currCircle);
}

io.on("connection", (socket) => {

    //make a player object for each users
    const player ={
        id: socket.id,
        score: 0,
    };
    players[socket.id] = player;
    let availablerooms = null;
    io.sockets.adapter.rooms.forEach((room, roomId) => {
        if (roomId.startsWith('room-') && room.size < 2) {
            availablerooms = roomId;
        }
    });

    if (!availablerooms) {
        availablerooms = `room-${Date.now()}`;
        socket.join(availablerooms);
    }else{
        socket.join(availablerooms);
        io.to(availablerooms).emit("start_game", true);
    }

    socket.emit("room_id", availablerooms);

    generateCircle(availablerooms);

    socket.on("circle_clicked", () => {
        if (currCircle) {
            currCircle = null;
            io.emit("update_score", score++);
            generateCircle(availablerooms);
        }
    }
    );

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        if(io.sockets.adapter.rooms.get(availablerooms) == null){
            console.log(`Room ${availablerooms} is empty`);
            io.of('/').adapter.rooms.delete(availablerooms);
        }
    });
    console.log("Players:")
    for(const player in players){
        console.log(players[player]);
    }
})

server.listen(3001, () => {
    console.log("listening on 3001");
});