

const express = require('express');
const app = express();
const http = require("http");
const { Server } = require('socket.io');
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);
let currCircle = null;
let timer = 60;

let score = 0;

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const startTimer = () => {
    const intervalId = setInterval(() => {
        timer--;
        if (timer === 0) {
            clearInterval(intervalId);
        }
        io.emit("timer", timer);
    }, 1000);
}
startTimer();
const generateCircle = () => {
    const newCircle = {
        x: Math.floor(30 + Math.random() * 60),
        y: Math.floor(10 + Math.random() * 80),
        radius: 35,
        clicked: false,
    };
    currCircle = newCircle;
    io.emit("current_circle", currCircle);
}

io.on("connection", (socket) => {

    console.log(`User connected: ${socket.id}`);
    generateCircle();
    if (currCircle) {

        io.emit("current_circle", currCircle);
    }


    socket.on("circle_clicked", () => {
        if (currCircle) {
            currCircle = null;
            io.emit("update_score", score++);
            generateCircle();
        }
    });


    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });

})

server.listen(3001, () => {
    console.log("listening on 3001");
});