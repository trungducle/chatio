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
        "SELECT\
          m.sender_id,\
          concat_ws(' ', a.first_name, a.last_name) sender_name,\
          m.message_body\
        FROM account a JOIN message m ON a.user_id = m.sender_id\
        WHERE conversation_id = $1 ORDER BY m.created_at;",
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
        "INSERT INTO message (conversation_id, message_body, sender_id)\
        VALUES ($1, $2, $3);",
        [conversationId, messageBody, senderId]
      );

      await db.none(
        "UPDATE conversation\
        SET latest_message = $1 WHERE conversation_id = $2",
        [messageBody, conversationId]
      );

      res.status(200).send("Inserted a new message");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // .delete(async (req, res) => {
  //   const { conversationId } = req.params;
  //   try {
  //     await db.none(
  //       "DELETE FROM participant WHERE conversation_id = $1",
  //       [conversationId]
  //     );
  //     res.status(200).send("Done");
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });

module.exports = conversationId;