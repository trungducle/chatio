const express = require("express");
const { db } = require("../config/database");
const {
  createConversation,
  getConversations,
  leaveConversation,
  getMessages,
  postNewMessage
} = require("../controllers/conversationController");
const { authenticateToken } = require("../middlewares/auth");
const conversationRouter = express.Router();

conversationRouter.use(express.json());
conversationRouter.use(authenticateToken);

conversationRouter.route("/")
  .get(getConversations)
  .post(createConversation)
  .put(leaveConversation);

conversationRouter.route("/:id")
  .all((req, res, next) => {
    req.conversationId = req.params.id;
    next();
  })
  .get(getMessages)
  .post(postNewMessage);

conversationRouter.get("/:id/parts", (req, res, next) => {
  req.conversationId = req.params.id;
  next();
}, async (req, res) => {
  const { offset, count } = req.query;
  try {
    const messages = await db.any(
      "SELECT\
        m.message_id,\
        m.sender_id,\
        concat_ws(' ', a.first_name, a.last_name) sender_name,\
        m.message_body\
      FROM account a JOIN message m ON a.user_id = m.sender_id\
      WHERE conversation_id = $1 ORDER BY m.created_at DESC\
      OFFSET $2 FETCH FIRST $3 ROWS ONLY;",
      [req.conversationId, offset, count]
    );

    res.status(200).json(messages.map((msg) => ({
      id: msg.message_id,
      sender: req.user.id === msg.sender_id ? "You" : msg.sender_name,
      body: msg.message_body,
      isOwn: req.user.id === msg.sender_id
    })));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = conversationRouter;