const config = require("dotenv").config();
if (config.error) {
  throw config.error;
}

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on("connection", (socket) => {
  io.emit("notify", `a user connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnected`);
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", `${socket.id}: ${msg}`);
  })
});

server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});