const express = require("express");
const {
  getMessages,
  postNewMessage,
  searchMessage
} = require("../../controllers/messageController");

const messageRouter = express.Router();
messageRouter.use(express.json());

messageRouter.route("/:conversationId")
  .get(getMessages)
  .post(postNewMessage);

messageRouter.get("/:conversationId/search", searchMessage);

module.exports = messageRouter;