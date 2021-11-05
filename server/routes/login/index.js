const express = require("express");
const { handleLogin } = require("../../controllers/authController");
const loginRouter = express.Router();

loginRouter.use(express.json());

loginRouter.post("/", handleLogin);

module.exports = loginRouter;