const { db, pgp } = require("../config/database");

exports.createConversation = async (req, res) => {
  const { name, creatorId, participantId } = req.body;
  try {
    console.log("Querying...");
    const insertConversation = await db.query(
      "INSERT INTO conversation (name, creator_id)\
      VALUES ($1, $2) RETURNING conversation_id;",
      [name, creatorId]
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

    await db.none(pgp.helpers.insert(insertValues, cs));
    res.status(200).send("Done");
    console.log("Query done");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getConversations = async (req, res) => {
  const { userId } = req.params;
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
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
