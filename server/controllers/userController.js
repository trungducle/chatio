const { db } = require("../config/database");
const bcrypt = require("bcrypt");

exports.searchUserByName = async (req, res) => {
  const { value } = req.query;
  try {
    if (typeof value === "string") {
      const namePatterns = value.split(" ").map(n => `%${n}%`);
      const result = await db.any(
        "(SELECT * FROM search_users(\
          _searcher_id := $1,\
          _pattern := ARRAY[$2:csv],\
          _is_friend := TRUE\
        ) LIMIT 10)\
        UNION\
        (SELECT * FROM search_users(\
          _searcher_id := $1,\
          _pattern := ARRAY[$2:csv],\
          _is_friend := FALSE\
        ) LIMIT 20)\
        ORDER BY is_friend DESC, is_pending DESC;",
        [req.user.id, namePatterns]
      );

      const friends = result.filter((user) => user.is_friend);
      const strangers = result.filter((user) => !user.is_friend);

      res.status(200).json({ friends, strangers });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await db.any(
      "SELECT * FROM account WHERE email = $1",
      [email]
    );

    if (result.length > 0) {
      return res.status(401).json({ error: "Email already exists" });
    }

    await db.none(
      "UPDATE account SET email = $1 WHERE user_id = $2",
      [email, req.user.id]
    );
    res.status(200).json({ message: "Information updated!" });
  } catch (err) {
    res.status(500).json({ error: err });
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

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.none(
      "UPDATE account SET password = $1 WHERE user_id = $2",
      [hashedPassword, req.user.id]
    );
    res.status(200).send("Query done");
  } catch (err) {
    res.status(500).json(err);
  }
};
