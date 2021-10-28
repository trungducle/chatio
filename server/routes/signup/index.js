const express = require("express");
const { db, pgp } = require("../../database");
const signup = express.Router();

signup.use(express.json());

signup.post("/", async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phonePattern = /^0[0-9]{9}/;

  const accountColSet = new pgp.helpers.ColumnSet(
    ["first_name", "last_name", "email", "phone", "password"],
    { table: "account" }
  );

  try {
    if (emailPattern.test(username)) {
      await db.none(pgp.helpers.insert({
        password,
        first_name: firstName,
        last_name: lastName,
        email: username,
        phone: null
      }, accountColSet));
    } else if (phonePattern.test(username)) {
      await db.none(pgp.helpers.insert({
        password,
        first_name: firstName,
        last_name: lastName,
        phone: username,
        email: null
      }, accountColSet));
    } else {
      throw "Invalid";
    }

    res.status(200).send("Inserted new user");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = signup;