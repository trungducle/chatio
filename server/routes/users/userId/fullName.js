const express = require("express");
const  { db } = require("../../../database");
const fullName = express.Router({ mergeParams: true });

fullName.use(express.json());

fullName.put("/", async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName } = req.body;
  try {
    await db.none(
      "UPDATE account SET first_fullName = $1, last_fullName = $2 WHERE user_id = $3",
      [firstName, lastName, userId]
    );
    console.log("Query done");
    res.status(200).send("Query done");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = fullName;