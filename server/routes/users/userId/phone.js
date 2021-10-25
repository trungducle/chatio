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
    res.status(200).send("Query done");
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = phone;