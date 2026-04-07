const { Server } = require("socket.io");

const io = new Server(3000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    io.to(roomId).emit("indicateJoin");
    console.log("user joined room");
  });

  socket.on("sendMessage", ({ roomId, message }) => {
    io.to(roomId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});
