const express = require("express");
const { handleLogin, handleLogout, handleSignup } = require("../controllers/authController");
const authRouter = express.Router();

authRouter.use(express.json());

authRouter.post("/login", handleLogin);
authRouter.post("/logout", handleLogout);
authRouter.post("/signup", handleSignup);

module.exports = authRouter;