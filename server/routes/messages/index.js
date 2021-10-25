const express = require("express");
const conversationId = require("./conversationId");

const messages = express.Router();

messages.use("/:conversationId", conversationId);

module.exports = messages;