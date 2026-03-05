import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

let roomUsers = new Map();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("room", ({ roomName, userId, userName }) => {
    console.log(`${userName} join to ${roomName}`);

    socket.join(roomName);

    console.log(roomUsers);

    // users.add({ userId, userName });
    // io.to(userInfo.id).emit("checkRoom", [...users]);

    // 参加者管理
    if (!roomUsers.has(roomName)) roomUsers.set(roomName, new Map());
    roomUsers.get(roomName).set(userId, { id: userId, name: userName });

    // ルーム全員へ参加者一覧を通知
    io.to(roomName).emit(
      "checkRoom",
      Array.from(roomUsers.get(roomName).values())
    );

    socket.on("stop", (msg) => {
      console.log(`recv stop reason ${msg}`);

      io.to(roomName).emit("stop", msg);
    });

    socket.on("disconnect", () => {
      users.delete(userId);
      io.to(roomName).emit("checkRoom", users);
      console.log(`${username} deleted`);
    });
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("server running at http://localhost:3000");
});
