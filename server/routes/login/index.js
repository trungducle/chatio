const express = require("express");
const { db } = require("../../database");
const login = express.Router();

login.use(express.json());

login.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await db.one(
      "SELECT user_id FROM account \
      WHERE (email = $1 OR phone = $1) AND password = $2",
      [username, password]
    );

    if (result) {
      res.status(200);
      res.send("Login succesfully!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = login;