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
    res.send("Query done");
  } catch (err) {
    console.log(err);
  }
})

module.exports = password;