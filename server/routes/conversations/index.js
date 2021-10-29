const express = require("express");
const { db, pgp } = require("../../database");
const conversations = express.Router();

conversations.use(express.json());

conversations.route("/")
  .get(async (req, res) => {
    try {
      console.log("Connected to database");
      console.log("Querying to database...");
      const result = await db.query("SELECT * FROM conversation");
      console.log("Query done");
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .post(async (req, res) => {
    const { name, creatorId, participantId } = req.body;

    try {
      console.log("Querying...");
      const insertConversation = await db.query(
        "INSERT INTO conversation (name, creator_id) \
        VALUES ($1, $2) RETURNING conversation_id AS conv_id;",
        [name, creatorId]
      );

      const { conv_id } = insertConversation[0];
      const cs = new pgp.helpers.ColumnSet(
        ["conversation_id", "user_id"],
        { table: "participant" }
      );
      const insertValues = participantId.map((id) => ({
        conversation_id: conv_id,
        user_id: id
      }));
      await db.none(pgp.helpers.insert(insertValues, cs));
      res.status(200).send("Done");
      console.log("Query done");
    } catch (err) {
      res.status(500).json(err);
    }
  });

conversations.get("/:userId", async (req, res) => {
  const {userId} = req.params;
  try {
    const result = await db.any(
      "SELECT c.conversation_id, c.name, m.last_message FROM conversation c\
      JOIN (\
        SELECT DISTINCT ON (conversation_id) conversation_id, message_body AS last_message\
        FROM message ORDER BY conversation_id, created_at desc\
      ) m ON c.conversation_id = m.conversation_id\
      JOIN participant p on p.conversation_id = m.conversation_id\
      WHERE p.user_id = $1;",
      [userId]
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = conversations;