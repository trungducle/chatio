const express = require("express");
const { handleLogin, handleLogout, handleSignup } = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/auth");
const authRouter = express.Router();

authRouter.use(express.json());

authRouter.post("/signup", handleSignup);
authRouter.post("/login", handleLogin);
authRouter.post("/logout", authenticateToken, handleLogout);

module.exports = authRouter;