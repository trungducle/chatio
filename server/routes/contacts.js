const express = require("express");
const contactRouter = express.Router();
const { db } = require("../config/database");
const { getFriends } = require("../controllers/contactController");
const { authenticateToken } = require("../middlewares/auth");

contactRouter.use(express.json());
contactRouter.use(authenticateToken);

contactRouter.get("/", getFriends);

contactRouter.route("/:friendId")
  .delete(async (req, res) => {
    const { friendId } = req.params;
    const userId = req.user.id;
    try {
      await db.none(
        "CALL delete_contact($1, $2)",
        [userId, friendId]
      );
      console.log("Done");
      res.status(200).send("Done");
    } catch (err) {
      res.status(500).json(err);
    }
  });

// contactRouter.route("/:userId/:friendId")
//   .get(async (req, res) => {
//     const { userId, friendId } = req.params;
//     try {
//       console.log(`Searching for friend ${friendId} of user ${userId}...`);
//       const result = await db.query(
//         "SELECT * FROM list_friends($1) where friend_id = $2",
//         [userId, friendId]
//       );
//       console.log("Done");
//       res.status(200).json(result);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   })
//   .delete(async (req, res) => {
//     const { userId, friendId } = req.params;
//     try {
//       console.log(`Searching for user ${userId}...`);
//       await db.none(
//         "CALL delete_contact($1, $2)",
//         [userId, friendId]
//       );
//       console.log("Done");
//       res.status(200).send("Done");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

module.exports = contactRouter;