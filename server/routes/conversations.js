const express = require("express");
const { db, pgp } = require("../database");
// const pgp = require("pg-promise");
// const {ColumnSet} = pgp.helpers;
const conversations = express.Router();

conversations.use(express.json());

conversations.route("/")
  .get(async (req, res) => {
    try {
      console.log("Connected to database");
      console.log("Querying to database...");
      const result = await db.query("SELECT * FROM conversation");
      console.log("Query done");
      res.json(result.rows);
    } catch (err) {
      console.log(err.stack);
    }
  })
  .post(async (req, res) => {
    const { name, creatorId, participantId } = req.body;

    try {
      console.log("Querying...");
      const insertConversation = await db.query(
        "INSERT INTO conversation (name, creator_id) \
        VALUES ($1, $2) RETURNING conversation_id AS conversationId;",
        [name, creatorId]
      );

      const { conversationId } = insertConversation.rows[0];
      const cs = new pgp.helpers.ColumnSet(
        ["conversation_id", "user_id"],
        { table: "participant" }
      );
      const insertValues = participantId.map((id) => ({
        conversation_id: conversationId,
        user_id: id
      }));
      await db.none(pgp.helpers.insert(insertValues, cs));
      console.log("Query done 1");
    } catch (err) {
      console.log(err);
    }
  });

module.exports = conversations;