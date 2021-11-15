const express = require("express");
const {
  getFriendRequests,
  sendFriendRequest,
  rejectFriendRequest,
  acceptFriendRequest
} = require("../controllers/requestController");
const { authenticateToken } = require("../middlewares/auth");

const requestsRouter = express.Router({ mergeParams: true });

requestsRouter.use(express.json());
requestsRouter.use(authenticateToken);
requestsRouter.get("/", getFriendRequests);
requestsRouter.post("/", sendFriendRequest);
requestsRouter.put("/reject", rejectFriendRequest);
requestsRouter.put("/accept", acceptFriendRequest);

module.exports = requestsRouter;