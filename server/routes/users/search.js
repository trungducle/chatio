const express = require("express");
const { db } = require("../../database");

const search = express.Router();

// Search by name
search.get("/", async (req, res) => {
  const { value } = req.query;
  try {
    if (typeof value === "string") {
      const namePatterns = value.split(" ").map(n => `%${n}%`);
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