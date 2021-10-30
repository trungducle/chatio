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
        "INSERT INTO conversation (name, creator_id)\
        VALUES ($1, $2) RETURNING conversation_id;",
        [name, creatorId]
      );

      const { conversation_id } = insertConversation[0];
      const cs = new pgp.helpers.ColumnSet(
        ["conversation_id", "user_id"],
        { table: "participant" }
      );
      const insertValues = participantId.map((user_id) => ({
        conversation_id,
        user_id
      }));

      await db.none(pgp.helpers.insert(insertValues, cs));
      res.status(200).send("Done");
      console.log("Query done");
    } catch (err) {
      res.status(500).json(err);
    }
  });

conversations.route("/:userId")
  .get(async (req, res) => {
    const { userId } = req.params;
    try {
      // const result = await db.any(
      //   "SELECT c.conversation_id, c.name, c.latest_message FROM conversation\
      //   JOIN participant p on p.conversation_id = c.conversation_id\
      //   WHERE p.user_id = $1;",
      //   [userId]
      // );
      // const result = await db.any(
      //   "SELECT c.conversation_id, c.name, m.message_body FROM conversation c\
      //   JOIN message m on m.conversation_id = c.conversation_id\
      //   JOIN participant p on p.conversation_id = m.conversation_id\
      //   WHERE p.user_id = $1;",
      //   [userId]
      // );
      const result = await db.any(
        "SELECT c.conversation_id, c.name, c.latest_message FROM conversation c\
        JOIN participant p on p.conversation_id = c.conversation_id\
        WHERE p.user_id = $1;",
        [userId]
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = conversations;