const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const auth = require("./routes/auth");
const users = require("./routes/users");
const contacts = require("./routes/contacts");
const conversations = require("./routes/conversations");
const userInfo = require("./routes/info");
const requests = require("./routes/requests");
const { verifyAccessToken } = require("./config/auth");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" }
});
const API_PORT = process.env.API_PORT || 8000;

dotenv.config();

app.use("/auth", auth);
app.use("/users", users);
app.use("/contacts", contacts);
app.use("/conversations", conversations);
app.use("/requests", requests);
app.use("/info", userInfo);

io.use((socket, next) => {
  const { accessToken } = socket.handshake.auth;
  if (!accessToken) {
    next(new Error("Invalid user"));
  }

  const userInfo = verifyAccessToken(accessToken);
  socket.userInfo = userInfo && {
    userId: userInfo.id,
    name: `${userInfo.firstName} ${userInfo.lastName}`
  };
  next();
});

io.on("connection", (socket) => {
  console.log(`a user connected: ${socket.id}`);

  socket.on("join rooms", (rooms) => {
    console.log(rooms);
    console.log(`Rooms: ${rooms}`);
    socket.join(rooms);
  })

  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnected`);
  });

  socket.on("send message", (msg) => {
    console.log(`Received message from user ${socket.userInfo.userId} to room ${msg.conversationId}`);
    socket.to(msg.conversationId).emit("send message", {
      conversationId: msg.conversationId,
      sender: socket.userInfo.name,
      body: msg.body,
      isOwn: false
    });
  });
});

server.listen(API_PORT, () => {
  console.log(`Server is running at port ${API_PORT}`);
});