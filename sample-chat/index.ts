import axios from "axios";
import { Server } from "socket.io";

const express = require("express");
const { createServer } = require("node:http");
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server)



app.get("/", (req, res) => {
  res.sendFile(join(__dirname, 'index.html'))
});

io.on('connection', (socket) => {

    // 人が繋いできたらallocateにする
    axios.get("http://localhost:1323/allocate").catch((error) => {
      if (error.response) {
        console.log(error.response);
      }
    });
    console.log(`a user ${socket.id} is connect`)
    io.emit("chat message", `${socket.id.slice(0, 5)} > come this room`);
    socket.on('disconnect', () => {
        console.log('user disconnected')
        io.emit("chat message", `${socket.id.slice(0, 5)} > left this room`);
        // 0人になった場合は終了
        if (!io.engine.clientsCount) {
            axios.get("http://localhost:1323/shutdown").catch((error) => {
              if (error.response) {
                console.log(error.response);
              }
            });
            console.log("no user in this room")
            process.exit(0);
        }
    });

    socket.on("chat message", (msg) => {
      console.log("message: " + msg);
      io.emit('chat message', `${socket.id.slice(0, 5)} > ${msg}`)
    });
})


server.listen(3000, () => {
  // mark Ready
  axios.get("http://localhost:1323/ready").catch((error) => {
    if (error.response) {
      console.log(error.response);
    }
  });
  console.log("server running at http://localhost:3000");
});
