require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.getAccessToken = (user) => jwt.sign(
  user,
  process.env.JWT_ACCESS_SECRET || "b3d96a4ff29bd67ff79bd9fe46393697"
);

exports.verifyAccessToken = (token) => jwt.verify(
  token,
  process.env.JWT_ACCESS_SECRET || "b3d96a4ff29bd67ff79bd9fe46393697"
);
