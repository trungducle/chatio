const express = require("express");
const { searchUserByName } = require("../controllers/userController");
const { checkIsFriend } = require("../controllers/contactController");
const { authenticateToken } = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.use(express.json());
userRouter.use(authenticateToken);

userRouter.get("/search", searchUserByName);
userRouter.get("/friends", authenticateToken, checkIsFriend);

module.exports = userRouter;