const express = require("express");
const { db } = require("../../database");
const search = require("./search");
const userId = require("./userId");
// const cors = require("cors");

// users.use(cors);
const users = express.Router();

users.use(express.json());
users.use("/search", search);
users.use("/:userId", userId);

users.route("/")
  .get(async (req, res) => {
    try {
      console.log("Connected to database");
      console.log("Querying to database...");
      const result = await db.any("SELECT * FROM account");
      console.log("Query done");
      res.status(200).json(result);
      console.log(JSON.stringify(result));
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .post(async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    try {
      console.log("Querying...");
      await db.none(
        "INSERT INTO account (first_name, last_name, email, password) \
        VALUES ($1, $2, $3, $4) RETURNING *;",
        [firstName, lastName, email, password]
      );
      console.log("Query done");
      res.status(200).send("Done");
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = users;