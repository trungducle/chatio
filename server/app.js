require("dotenv").config();
const express = require("express");
const http = require("http");
// const cors = require("cors");
const { Server } = require("socket.io");

const users = require("./routes/users");
const contacts = require("./routes/contacts");
const conversations = require("./routes/conversations");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 8000;

// app.use(cors);
app.use("/users", users);
app.use("/contacts", contacts);
app.use("/conversations", conversations);

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