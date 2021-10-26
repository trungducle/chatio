require("dotenv").config();
const pgp = require("pg-promise")({
  capSQL: true,
  query(q) {
    console.log(q.query);
  }
});

const db = pgp({
  connectionString: process.env.DB_URL || "postgres://qiwzbfqejlyotz:49c8e9a1bee96382ee65b59ae9676857b2ecd54f32cc66b860cb6e4e440ce908@ec2-54-228-162-209.eu-west-1.compute.amazonaws.com:5432/dcrrmd0jdo9hdg",
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = {
  db, pgp
};
