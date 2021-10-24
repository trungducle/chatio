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
      res.json(result);
      console.log(JSON.stringify(result));
    } catch (err) {
      console.log(err.stack);
    }
  })
  .post(async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
    } = req.body;

    try {
      console.log("Querying...");
      const result = await db.one(
        "INSERT INTO account (first_name, last_name, email, phone, password) \
        VALUES ($1, $2, $3, $4, $5) RETURNING *;",
        [firstName, lastName, email, phone, password]
      );
      console.log("Query done");
      res.json(result);
    } catch (err) {
      console.log(err);
    }
  });

module.exports = users;