const express = require("express");
const {
  updateEmail,
  updateUserName,
  updatePassword
} = require("../../controllers/userController");

const userIdRouter = express.Router({ mergeParams: true });

userIdRouter.put("/email", updateEmail);
userIdRouter.put("/fullname", updateUserName);
userIdRouter.put("/password", updatePassword);

module.exports = userIdRouter;