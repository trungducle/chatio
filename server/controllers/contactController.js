const { db } = require("../config/database");

exports.getFriends = async (req, res) => {
  try {
    const result = await db.any(
      "SELECT full_name FROM list_friends($1)",
      [req.user.id]
    );
    res.status(200).json(result.map((friend) => ({
      friendName: friend.full_name
    })));
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getPendingRequests = async (req, res) => {
  try {
    const result = await db.any(
      "SELECT\
        pr.recipient_id,\
        concat_ws(' ', a.first_name, a.last_name) full_name\
      FROM pending_request pr\
      JOIN account a ON pr.recipient_id = a.user_id\
      WHERE pr.sender_id = $1",
      [req.user.id]
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.checkIsFriend = async (req, res) => {
  const { contact } = req.query;
  try {
    const result = await db.one(
      "SELECT check_friend($1, $2) as is_friend",
      [req.user.id, contact]
    );

    res.status(200).json({ isFriend: result.is_friend });
  } catch (err) {
    res.status(500).json(err);
  }
};