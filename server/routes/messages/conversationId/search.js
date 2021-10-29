const express = require("express");
const { db } = require("../../../database");

const search = express.Router();

search.get("/", async (req, res) => {
  const { value } = req.query;
  const searchPattern = `%${value}%`
  try {
    const result = await db.any(
      "SELECT message_id, message_body, sender_id\
      FROM message\
      WHERE message_body LIKE $1",
      [searchPattern]
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = search;