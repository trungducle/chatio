const { db, pgp } = require("../config/database");

exports.createConversation = async (req, res) => {
  const { name, participantId } = req.body;
  const userid = req.user.id;

  try {
    console.log("Querying...");
    const insertConversation = await db.query(
      "INSERT INTO conversation (name, creator_id)\
      VALUES ($1, $2) RETURNING conversation_id;",
      [name, userid]
    );

    const { conversation_id } = insertConversation[0];
    const cs = new pgp.helpers.ColumnSet(
      ["conversation_id", "user_id"],
      { table: "participant" }
    );
    const insertValues = participantId.map((user_id) => ({
      conversation_id,
      user_id
    }));

    insertValues.push({
      conversation_id: conversation_id,
      user_id: userid
    });

    await db.none(pgp.helpers.insert(insertValues, cs));

    await db.none(
      "UPDATE conversation\
      SET latest_message = $1, latest_sender = $2\
      WHERE conversation_id = $3",
      ['', userid, conversation_id]
    );

    res.status(200).json({ message: "Conversation created!" });
    console.log("Query done");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getConversations = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await db.any(
      "SELECT\
        c.conversation_id, c.name, c.latest_message, c.latest_sender latest_sender_id,\
        concat_ws(' ', a.first_name, a.last_name) latest_sender_name\
      FROM conversation c\
      JOIN account a ON c.latest_sender = a.user_id\
      JOIN participant p ON p.conversation_id = c.conversation_id\
      WHERE p.user_id = $1;",
      [userId]
    );
    res.status(200).json(result.map((conv) => ({
      id: conv.conversation_id,
      name: conv.name,
      latestMessage: {
        sender: conv.latest_sender_id === userId ? "You" : conv.latest_sender_name,
        body: conv.latest_message
      }
    })));
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.leaveConversation = async (req, res) => {
  const userId = req.user.id;
  const { conversation } = req.body;

  try {
    await db.none(
      "DELETE FROM participant\
      WHERE conversation_id = $1 AND user_id = $2;",
      [conversation, userId]
    );

    res.status(200).json({ message: "Left conversation" });
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.getMessages = async (req, res) => {
  try {
    const messages = await db.any(
      "SELECT\
        m.sender_id,\
        concat_ws(' ', a.first_name, a.last_name) sender_name,\
        m.message_body\
      FROM account a JOIN message m ON a.user_id = m.sender_id\
      WHERE conversation_id = $1 ORDER BY m.created_at;",
      [req.conversationId]
    );

    res.status(200).json(messages.map((msg) => ({
      sender: req.user.id === msg.sender_id ? "You" : msg.sender_name,
      body: msg.message_body,
      isOwn: req.user.id === msg.sender_id
    })));
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.postNewMessage = async (req, res) => {
  const { body } = req.body;
  try {
    await db.none(
      "INSERT INTO message (conversation_id, message_body, sender_id)\
      VALUES ($1, $2, $3);",
      [req.conversationId, body, req.user.id]
    );

    res.status(200).json({ message: "Inserted a new message" });
  } catch (err) {
    res.status(500).json({ error: err });
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
    res.status(500).json({ error: err });
  }
};
