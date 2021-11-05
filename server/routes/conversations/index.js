const express = require("express");
const {
  createConversation,
  getConversations
} = require("../../controllers/conversationController");
const conversationRouter = express.Router();

conversationRouter.use(express.json());

conversationRouter.post("/", createConversation);
conversationRouter.get("/:userId", getConversations);

module.exports = conversationRouter;