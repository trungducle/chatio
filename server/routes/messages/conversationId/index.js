const express = require("express");
const search = require("./search");
const { db } = require("../../../database");

const conversationId = express.Router({ mergeParams: true });

conversationId.use(express.json());
conversationId.use("/search", search);

conversationId.route("/")
  .get(async (req, res) => {
    const { conversationId } = req.params;
    try {
      const messages = await db.any(
        "SELECT message_body, sender_id FROM message WHERE conversation_id = $1",
        [conversationId]
      );
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .post(async (req, res) => {
    const { conversationId } = req.params;
    const { messageBody, senderId } = req.body;
    try {
      await db.none(
        "INSERT INTO message (conversation_id, message_body, sender_id) \
        VALUES ($1, $2, $3)",
        [conversationId, messageBody, senderId]
      );
      res.status(200).send("Done");
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .delete(async (req, res) => {
    const { conversationId } = req.params;
    try {
      const messages = await db.any(
        "DELETE FROM message WHERE conversation_id = $1",
        [conversationId]
      );
      res.status(200).send("Done");
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = conversationId;