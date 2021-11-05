const { db } = require("../config/database");

exports.getMessages = async (req, res) => {
  const { conversationId } = req.params;
  try {
    const messages = await db.any(
      "SELECT\
        m.sender_id,\
        concat_ws(' ', a.first_name, a.last_name) sender_name,\
        m.message_body\
      FROM account a JOIN message m ON a.user_id = m.sender_id\
      WHERE conversation_id = $1 ORDER BY m.created_at;",
      [conversationId]
    );

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.postNewMessage = async (req, res) => {
  const { conversationId } = req.params;
  const { messageBody, senderId } = req.body;
  try {
    await db.none(
      "INSERT INTO message (conversation_id, message_body, sender_id)\
      VALUES ($1, $2, $3);",
      [conversationId, messageBody, senderId]
    );

    await db.none(
      "UPDATE conversation\
      SET latest_message = $1, latest_sender = $2\
      WHERE conversation_id = $3",
      [messageBody, senderId, conversationId]
    );

    res.status(200).send("Inserted a new message");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.searchMessage = async (req, res) => {
  const { value } = req.query;
  const searchPattern = `%${value}%`
  try {
    const result = await db.any(
      "SELECT message_id, message_body, sender_id\
      FROM message\
      WHERE message_body LIKE $1",
      [searchPattern]
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};