const express = require("express");
const { searchUserByName } = require("../controllers/userController");
const { areFriends } = require("../controllers/contactController");

const userRouter = express.Router();

userRouter.use(express.json());
userRouter.get("/search", searchUserByName);
userRouter.get("/friends", areFriends);

module.exports = userRouter;