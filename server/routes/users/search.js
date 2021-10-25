const express = require("express");
const { db } = require("../../database");

const search = express.Router();

// Search by phone number or by name only
search.get("/", async (req, res) => {
  const { value } = req.query;
  const phonePattern = /^0[0-9]{9}/;
  try {
    if (phonePattern.test(value)) {
      const result = await db.one(
        "SELECT phone FROM account WHERE phone = $1",
        [value]
      );

      res.status(200).json(result);
    } else {
      let namePatterns;
      if (typeof value === "string") {
        namePatterns = value.split(" ").map(n => `%${n}%`);
      }

      const result = await db.any(
        "SELECT concat_ws(' ', first_name, last_name) full_name \
        FROM account \
        WHERE (concat(first_name, last_name)) LIKE ALL (ARRAY[$1:csv]);",
        [namePatterns]
      );

      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = search;