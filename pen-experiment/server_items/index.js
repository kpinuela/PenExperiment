

const express = require('express');
const app = express();
const http = require("http");
const { Server } = require('socket.io');
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);
let currCircle = null;
let timer = 60;


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {

    console.log(`User connected: ${socket.id}`);
    if (currCircle) {
        socket.emit("current_circle", currCircle);
    }
    const generateCircle = () => {
        const newCircle = {
            x: Math.floor(30+Math.random()*60),
            y: Math.floor(10+Math.random()*80),
            radius: 35,
            clicked: false,
        };
        currCircle = newCircle;
        io.emit("current_circle", currCircle);
    };

    socket.on("circle_clicked", ()=>{
        if(currCircle){
            currCircle = null;
            generateCircle();
        }
    });

    while(timer >0){
         io.emit("timer", timer);
         console.log(timer);
         timer --;
    }

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
    

    if(io.engine.clientsCount === 1){
        generateCircle();
    }
})

server.listen(3001, () => {
    console.log("listening on 3001");
});