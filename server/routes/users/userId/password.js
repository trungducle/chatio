const express = require("express");
const  { db } = require("../../../database");
const password = express.Router({ mergeParams: true });

password.use(express.json());

password.put("/", async (req, res) => {
  const { userId } = req.params;
  const { password } = req.body;
  try {
    await db.none(
      "UPDATE account SET password = $1 WHERE user_id = $2",
      [password, userId]
    );
    console.log("Query done");
    res.status(200).send("Query done");
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = password;