const { verifyAccessToken } = require("../config/auth");

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.sendStatus(401);
  }

  try {
    const user = verifyAccessToken(token);
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json(err);
  }
};