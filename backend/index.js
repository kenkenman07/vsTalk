import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

let users = new Set();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("room", ({ roomName, username }) => {
    console.log(`${username} join to ${roomName}`);
    users.add(username);

    socket.join(roomName);

    console.log(users);
    io.to(roomName).emit("checkRoom", [...users]);

    socket.on("stop", (msg) => {
      console.log(`recv stop reason ${msg}`);

      io.to(roomName).emit("stop", msg);
    });

    socket.on("disconnect", () => {
      users.delete(username);
      io.to(roomName).emit("checkRoom", users);
      console.log(`${username} deleted`);
    });
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
