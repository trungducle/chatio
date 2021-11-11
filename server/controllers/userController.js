const { db } = require("../config/database");

exports.searchUserByName = async (req, res) => {
  const { value } = req.query;
  try {
    if (typeof value === "string") {
      const namePatterns = value.split(" ").map(n => `%${n}%`);
      const result = await db.any(
        "SELECT concat_ws(' ', first_name, last_name) full_name, email \
        FROM account \
        WHERE (concat(first_name, last_name)) LIKE ALL (ARRAY[$1:csv]);",
        [namePatterns]
      );
  
      res.status(200).json(result);
    } 
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateEmail = async (req, res) => {
  const { userId } = req.params;
  const { email } = req.body;
  try {
    await db.none(
      "UPDATE account SET email = $1 WHERE user_id = $2",
      [email, userId]
    );
    console.log("Query done");
    res.status(200).send("Query done");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateUserName = async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName } = req.body;
  try {
    await db.none(
      "UPDATE account SET first_name = $1, last_name = $2 WHERE user_id = $3",
      [firstName, lastName, userId]
    );
    console.log("Query done");
    res.status(200).send("Query done");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updatePassword = async (req, res) => {
  const { userId } = req.params;
  const { password } = req.body;
  try {
    await db.none(
      "UPDATE account SET password = $1 WHERE user_id = $2",
      [password, userId]
    );
    console.log("Query done");
    res.status(200).send("Query done");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getPendingRequests = async (req, res) => {
  const {userId} = req.params;
  try {
    const result = await db.any(
      "SELECT\
        pr.recipient_id,\
        concat_ws(' ', a.first_name, a.last_name) full_name\
      FROM pending_request pr\
      JOIN account a ON pr.recipient_id = a.user_id\
      WHERE pr.sender_id = $1",
      [userId]
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};