const { db } = require("../config/database");

exports.getFriendRequests = async (req, res) => {
  try {
    const result = await db.any(
      "SELECT concat_ws(' ', a.first_name, a.last_name) full_name, a.email, pd.sender_id\
        FROM pending_request pd JOIN account a\
        ON pd.sender_id = a.user_id\
        WHERE pd.recipient_id = $1;",
      [req.user.id]
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.rejectFriendRequest = async (req, res) => {
  const { sender } = req.body;
  try {
    await db.none(
      "DELETE FROM pending_request\
      WHERE sender_id = $1 AND recipient_id = $2;",
      [sender, req.user.id]
    );

    res.status(200).send("Request rejected");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.acceptFriendRequest = async (req, res) => {
  const { sender } = req.body;
  try {
    await db.none(
      "DELETE FROM pending_request\
      WHERE sender_id = $1 AND recipient_id = $2;",
      [sender, req.user.id]
    );

    await db.none(
      "CALL insert_contact($1, $2);",
      [sender, req.user.id]
    );

    res.status(200).send("Request accepted");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.sendFriendRequest = async (req, res) => {
  const { recipient } = req.body;
  try {
    await db.none(
      "INSERT INTO pending_request (sender_id, recipient_id)\
      VALUES ($1, $2);",
      [req.user.id, recipient]
    );

    res.status(200).send("Requests sent!");
  } catch (err) {
    res.status(500).json(err);
  }
}