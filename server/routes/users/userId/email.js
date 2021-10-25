const express = require("express");
const { db } = require("../../../database");
const email = express.Router({ mergeParams: true });

email.use(express.json());

email.put("/", async (req, res) => {
  const { userId } = req.params;
  const { email } = req.body;
  try {
    await db.none(
      "UPDATE account SET email = $1 WHERE user_id = $2",
      [email, userId]
    );
    console.log("Query done");
    res.status(200).send("Query done");
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = email;