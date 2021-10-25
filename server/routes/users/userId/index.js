const express = require("express");

const { db } = require("../../../database");
const email = require("./email");
const fullName = require("./fullName");
const password = require("./password");
const phone = require("./phone");

const userId = express.Router({ mergeParams: true });

userId.use("/email", email);
userId.use("/fullname", fullName);
userId.use("/password", password);
userId.use("/phone", phone);

userId.route("/")
.get(async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`Searching for user ${id}...`);
    const result = await db.one(
      "SELECT * FROM account WHERE user_id = $1",
      [id]
    );
    console.log("Done");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
})
.delete(async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`Deleting user ${id}...`);
    await db.none(
      "DELETE FROM account WHERE user_id = $1",
      [id]
    );
    console.log("Done");
    res.status(200).send("Done");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = userId;