const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer();

const io = new Server(server);

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("message", (msg) => {

        socket.emit("message", msg);
    });

    socket.on("disconnect", () => {
        console.log("disconnected");
    });
});

server.listen(8000, () => {
    console.log("server opened");
});