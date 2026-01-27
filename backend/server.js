const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer();

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("message", (msg) => {
        console.log(msg);
        io.emit("message", msg);
    });

    socket.on("disconnect", () => {
        console.log("disconnected");
    });
});

server.listen(8000, "0.0.0.0", () => {
    console.log("server opened");
});