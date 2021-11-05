const express = require("express");
const { handleLogout } = require("../../controllers/authController");
const logoutRouter = express.Router();

logoutRouter.use(express.json());

logoutRouter.post("/", handleLogout);

module.exports = logoutRouter;