const { db } = require("../config/database");

exports.getFriendRequests = async (req, res) => {
  const { id } = req.query;
  try {
    const userId = parseInt(id);
    if (!isNaN(userId)) {
      console.log(id);
      const result = await db.any(
        "SELECT concat_ws(' ', a.first_name, a.last_name) full_name, a.email, pd.sender_id\
        FROM pending_request pd JOIN account a\
        ON pd.sender_id = a.user_id\
        WHERE pd.recipient_id=$1;",
        [userId]
      );
  
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.rejectFriendRequest = async (req, res) => {
  const { sender, recipient } = req.query;
  try {
    const senderId = parseInt(sender);
    const recipientId = parseInt(recipient);

    if (!isNaN(senderId) && !isNaN(recipientId)) {
      await db.none(
        "DELETE FROM pending_request\
        WHERE sender_id=$1 AND recipient_id=$2",
        [senderId, recipientId]
      );
  
      res.status(200).send("Request rejected");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.acceptFriendRequest = async (req, res) => {
  const { sender, recipient } = req.query;
  try {
    const senderId = parseInt(sender);
    const recipientId = parseInt(recipient);

    if (!isNaN(senderId) && !isNaN(recipientId)) {
      await db.none(
        "DELETE FROM pending_request\
        WHERE sender_id=$1 AND recipient_id=$2",
        [senderId, recipientId]
      );

      await db.none(
        "CALL insert_contact($1, $2)",
        [senderId, recipientId]
      );
  
      res.status(200).send("Request accepted");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};