const express = require("express");
const {
  createConversation,
  getConversations,
  getMessages,
  postNewMessage
} = require("../controllers/conversationController");
const { authenticateToken } = require("../middlewares/auth");
const conversationRouter = express.Router();

conversationRouter.use(express.json());
conversationRouter.use(authenticateToken);

conversationRouter.route("/")
  .get(getConversations)
  .post(createConversation);

conversationRouter.route("/:id")
  .all((req, res, next) => {
    req.conversationId = req.params.id;
    next();
  })
  .get(getMessages)
  .post(postNewMessage);

module.exports = conversationRouter;