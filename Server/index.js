const express = require("express");
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io')
const { instrument } = require("@socket.io/admin-ui");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: ["http://localhost:3000", "https://admin.socket.io/"],
        methods: ["GET", "POST"],
    }
});
/* const io = new Server(3000) */

io.on("connection", (socket)=>{
    console.log("User connected " + socket.id);
    
    socket.on("send_message", (data) =>{
         console.log("Datas recived: ", data) 
         console.log(data.room)
         socket.broadcast.emit("recive_message", data)
    })
     
    
    socket.on("disconnect", () =>{
        console.log("User disconnected " + socket.id)
    })
    socket.on("join-room", (room) =>{
        socket.join(room);
        console.log("join room:", room)
    });
})

server.listen(3001, () =>{
    console.log("SERVER RUNNIG")
})

instrument(io, {auth: false})