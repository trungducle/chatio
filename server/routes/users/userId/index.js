const express = require("express");
const { db } = require("../../../database");
const email = require("./email");
const fullName = require("./fullName");
const password = require("./password");

const router = express.Router({ mergeParams: true });

router.use("/email", email);
router.use("/fullname", fullName);
router.use("/password", password);

router.route("/")
.get(async (req, res) => {
  const { userId } = req.params;
  try {
    console.log(`Searching for user ${userId}...`);
    const result = await db.one(
      "SELECT * FROM account WHERE user_id = $1",
      [userId]
    );
    console.log("Done");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
})
.delete(async (req, res) => {
  const { userId } = req.params;
  try {
    console.log(`Deleting user ${userId}...`);
    await db.none(
      "DELETE FROM account WHERE user_id = $1",
      [userId]
    );
    console.log("Done");
    res.status(200).send("Done");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;