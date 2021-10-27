const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
// const cors = require("cors");

const users = require("./routes/users");
const contacts = require("./routes/contacts");
const conversations = require("./routes/conversations");
const messages = require("./routes/messages");

const app = express();
const server = http.createServer(app);
const API_PORT = process.env.API_PORT || 8000;

dotenv.config();

// app.use(cors);
app.use("/users", users);
app.use("/contacts", contacts);
app.use("/conversations", conversations);
app.use("/messages", messages);

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

server.listen(API_PORT, () => {
  console.log(`Server is running at port ${API_PORT}`);
});