const express = require("express");
const { handleSignup } = require("../../controllers/authController");
const signupRouter = express.Router();

signupRouter.use(express.json());

signupRouter.post("/", handleSignup);

module.exports = signupRouter;