const express = require("express");
const { db, pgp } = require("../../database");
const signup = express.Router();

signup.use(express.json());

signup.post("/", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const result = await db.any(
      "SELECT * FROM account WHERE email = $1",
      [email]
    );

    if (result.length === 0) {
      const accountColSet = new pgp.helpers.ColumnSet(
        ["first_name", "last_name", "email", "password"],
        { table: "account" }
      );

      await db.none(pgp.helpers.insert({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      }, accountColSet));
  
      res.status(200).send("Inserted new user");
    } else {
      res.status(403).send("Email already exists");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = signup;