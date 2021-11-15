const jwt = require("jsonwebtoken");

exports.getAccessToken = (user) => jwt.sign(
  user,
  process.env.JWT_ACCESS_SECRET
);

exports.verifyAccessToken = (token) => jwt.verify(
  token,
  process.env.JWT_ACCESS_SECRET
);
