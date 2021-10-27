const { Server } = require("socket.io");
const SOCKET_IO_PORT = process.env.SOCKET_IO_PORT || 9000;
const io = new Server(SOCKET_IO_PORT, {
  cors: { origin: "http://localhost:3000" }
});


io.on("connection", (socket) => {
  console.log(`a user connected: ${socket.id}`);
  io.emit("notify", "hello, server here");

  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnected`);
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", `${socket.id}: ${msg}`);
  })
});
