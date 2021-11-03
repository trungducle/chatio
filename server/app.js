const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const Cursor = require("pg-cursor");
// const {Pool} = require("pg");

// const cors = require("cors");

const users = require("./routes/users");
const contacts = require("./routes/contacts");
const conversations = require("./routes/conversations");
const messages = require("./routes/messages");
const login = require("./routes/login");
const signup = require("./routes/signup");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" }
});
const API_PORT = process.env.API_PORT || 8000;

dotenv.config();

// app.use(cors);
app.use("/users", users);
app.use("/contacts", contacts);
app.use("/conversations", conversations);
app.use("/messages", messages);
app.use("/login", login);
app.use("/signup", signup);

io.use((socket, next) => {
  const { userInfo } = socket.handshake.auth;
  if (!userInfo.userId) {
    return next(new Error("Invalid userId"));
  }
  socket.userInfo = userInfo;
  next();
});

io.on("connection", (socket) => {
  console.log(`a user connected: ${socket.id}`);
  io.emit("notify", "hello, server here");

  const users = [];
  for (const [id, socket] of io.of("/").sockets) {
    users.push({
      socketId: id,
      userInfo: socket.userInfo,
    });
  }

  socket.emit("get users", users);

  socket.on("join rooms", (rooms) => {
    console.log(rooms);
    console.log(`Rooms: ${rooms}`);
    socket.join(rooms);
  })

  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnected`);
  });

  socket.on("send message", (msg) => {
    console.log(`Received message from user ${msg.senderId} to room ${msg.conversationId}`);
    socket.to(msg.conversationId).emit("send message", msg);
  });
});

server.listen(API_PORT, () => {
  console.log(`Server is running at port ${API_PORT}`);
});