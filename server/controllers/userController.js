const { db } = require("../config/database");

exports.searchUserByName = async (req, res) => {
  const { value } = req.query;
  try {
    if (typeof value === "string") {
      const namePatterns = value.split(" ").map(n => `%${n}%`);
      const result = await db.any(
        "SELECT user_id, concat_ws(' ', first_name, last_name) full_name, email\
        FROM account\
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
  const { email } = req.body;
  try {
    await db.none(
      "UPDATE account SET email = $1 WHERE user_id = $2",
      [email, req.user.id]
    );
    res.status(200).send("Query done");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateUserName = async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    await db.none(
      "UPDATE account SET first_name = $1, last_name = $2 WHERE user_id = $3",
      [firstName, lastName, req.user.id]
    );
    res.status(200).send("Query done");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updatePassword = async (req, res) => {
  const { password } = req.body;
  try {
    await db.none(
      "UPDATE account SET password = $1 WHERE user_id = $2",
      [password, req.user.id]
    );
    res.status(200).send("Query done");
  } catch (err) {
    res.status(500).json(err);
  }
};
