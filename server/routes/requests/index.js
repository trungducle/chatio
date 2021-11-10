const express = require("express");
const { getFriendRequests }= require("../../controllers/requestController");

const requestsRouter = express.Router({ mergeParams: true });

requestsRouter.use(express.json());
requestsRouter.get("/", getFriendRequests);

module.exports = requestsRouter;