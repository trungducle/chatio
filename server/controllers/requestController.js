const { db } = require("../config/database");

exports.getFriendRequests = async (req, res) => {
  const { id } = req.query;
  try {
    const userId = parseInt(id);
    if (!isNaN(userId)) {
      console.log(id);
      const result = await db.any(
        "SELECT concat_ws(' ', a.first_name, a.last_name) full_name, a.email\
        FROM pending_request pd JOIN account a\
        ON pd.sender_id = a.user_id\
        WHERE receiver_id=$1;",
        [userId]
      );
  
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};