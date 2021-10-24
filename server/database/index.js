require("dotenv").config();
const pgp = require("pg-promise")({
  capSQL: true,
  query(q) {
    console.log(q.query);
  }
});

const db = pgp({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = {
  db, pgp
};
