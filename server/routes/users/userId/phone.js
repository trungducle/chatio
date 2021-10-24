const express = require("express");
const  { db } = require("../../../database");
const phone = express.Router({ mergeParams: true });

phone.use(express.json());

phone.put("/", async (req, res) => {
  const { userId } = req.params;
  const { phone } = req.body;
  try {
    await db.none(
      "UPDATE account SET phone = $1 WHERE user_id = $2",
      [phone, userId]
    );
    console.log("Query done");
    res.send("Query done");
  } catch (err) {
    console.log(err);
  }
})

module.exports = phone;