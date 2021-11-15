const express = require("express");
const {
  updateEmail,
  updateUserName,
  updatePassword,
} = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/auth");

const infoRouter = express.Router();

infoRouter.use(express.json());
infoRouter.use(authenticateToken);

infoRouter.put("/email", updateEmail);
infoRouter.put("/fullname", updateUserName);
infoRouter.put("/password", updatePassword);

module.exports = infoRouter;