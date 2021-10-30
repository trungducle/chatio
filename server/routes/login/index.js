const express = require("express");
const { db } = require("../../database");
const login = express.Router();

login.use(express.json());

login.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.one(
      "SELECT * FROM account\
      WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (!result) {
      res.status(401).json({ error: "wrong email or password" });
    }

    await db.none(
      "UPDATE account SET is_active = TRUE WHERE user_id = $1",
      [result.user_id]
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = login;