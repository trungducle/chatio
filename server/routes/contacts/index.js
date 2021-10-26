const express = require("express");
const contacts = express.Router();
const { db } = require("../../database");
// const cors = require("cors");

// contacts.use(cors);
contacts.use(express.json());

contacts.route("/")
  .get(async (req, res) => {
    try {
      console.log("Connected to database");
      console.log("Querying to database...");
      const result = await db.any("SELECT * FROM contact");
      console.log("Query done");
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .post(async (req, res) => {
    const { userId, friendId } = req.body;

    try {
      console.log("Querying...");
      const result = await db.none(
        "CALL insert_contact($1, $2);",
        [userId, friendId]
      );
      console.log("Query done");
      res.status(200).send("Done");
    } catch (err) {
      res.status(500).json(err);
    }
  })

contacts.route("/:userId")
  .get(async (req, res) => {
    const { userId } = req.params;
    try {
      console.log(`Searching for user ${userId}...`);
      const result = await db.any(
        "SELECT full_name FROM list_friends($1)",
        [userId]
      );
      console.log("Done");
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .delete(async (req, res) => {
    const { userId } = req.params;
    try {
      console.log(`Searching for user ${userId}...`);
      await db.none(
        "CALL delete_contact($1, 0)",
        [userId]
      );
      console.log("Done");
      res.status(200).send("Done");
    } catch (err) {
      res.status(500).json(err);
    }
  });

contacts.route("/:userId/:friendId")
  .get(async (req, res) => {
    const { userId, friendId } = req.params;
    try {
      console.log(`Searching for friend ${friendId} of user ${userId}...`);
      const result = await db.query(
        "SELECT * FROM list_friends($1) where friend_id = $2",
        [userId, friendId]
      );
      console.log("Done");
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .delete(async (req, res) => {
    const { userId, friendId } = req.params;
    try {
      console.log(`Searching for user ${userId}...`);
      await db.none(
        "CALL delete_contact($1, $2)",
        [userId, friendId]
      );
      console.log("Done");
      res.status(200).send("Done");
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = contacts;