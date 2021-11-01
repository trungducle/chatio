const { Server } = require("socket.io");
const SOCKET_IO_PORT = process.env.SOCKET_IO_PORT || 9000;
const io = new Server(SOCKET_IO_PORT, {
  cors: { origin: "http://localhost:3000" }
});

let users = [];

const addUser = (userId, socketId) => {
  if (userId && socketId && !users.some((user) => user.userId === userId)) {
    users.push({userId, socketId});
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log(`a user connected: ${socket.id}`);
  io.emit("notify", "hello, server here");

  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnected`);
    removeUser(socket.id);
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", `${socket.id}: ${msg}`);
  });

  socket.on("send userId", (userId) => {
    console.log(`${socket.id} ${userId}`);
    addUser(userId, socket.id);
    io.emit("get users", users);
  });
});
