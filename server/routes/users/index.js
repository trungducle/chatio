const express = require("express");
const { searchUserByName } = require("../../controllers/userController");
const userId = require("./userId");

const userRouter = express.Router();

userRouter.use(express.json());
userRouter.get("/search", searchUserByName);
userRouter.use("/:userId", userId);

module.exports = userRouter;