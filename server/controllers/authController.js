const { db, pgp } = require("../config/database");

exports.handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.one(
      "SELECT * FROM account\
      WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (!result) {
      res.status(401).json({ error: "wrong email or password" });
    }

    await db.none(
      "UPDATE account SET is_active = TRUE\
      WHERE user_id = $1",
      [result.user_id]
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.handleSignup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const result = await db.any(
      "SELECT * FROM account WHERE email = $1",
      [email]
    );

    if (result.length === 0) {
      const accountColSet = new pgp.helpers.ColumnSet(
        ["first_name", "last_name", "email", "password"],
        { table: "account" }
      );

      await db.none(pgp.helpers.insert({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      }, accountColSet));

      res.status(200).send("Inserted new user");
    } else {
      res.status(403).send("Email already exists");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.handleLogout = async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    await db.none(
      "UPDATE account SET is_active = FALSE\
      WHERE user_id = $1",
      [userId]
    );
    res.status(200).send("Logged out");
  } catch (err) {
    res.status(500).json(err);
  }
};