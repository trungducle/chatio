const { db, pgp } = require("../config/database");
const bcrypt = require("bcrypt");
const { getAccessToken } = require("../config/auth");

exports.handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.one(
      "SELECT * FROM account WHERE email = $1",
      [email]
    );

    if (!result) {
      return res.status(401).json({ error: "wrong email or password" });
    }

    const isMatchPassword = await bcrypt.compare(password, result.password);
    if (!isMatchPassword) {
      return res.status(401).json({ error: "wrong email or password" });
    }

    await db.none(
      "UPDATE account SET is_active = TRUE\
      WHERE user_id = $1",
      [result.user_id]
    );

    const accessToken = getAccessToken({
      id: result.user_id,
      email: result.email,
      firstName: result.first_name,
      lastName: result.last_name
    });
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.handleSignup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const result = await db.any(
      "SELECT * FROM account WHERE email = $1",
      [email]
    );

    if (result.length > 0) {
      return res.status(400).send("Email already exists");
    }

    const accountColSet = new pgp.helpers.ColumnSet(
      ["first_name", "last_name", "email", "password"],
      { table: "account" }
    );

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.none(pgp.helpers.insert(
      {
        email,
        password: hashedPassword,
        first_name: firstName,
        last_name: lastName,
      },
      accountColSet
    ));

    res.status(200).json({ message: "New user created" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.handleLogout = async (req, res) => {
  try {
    await db.none(
      "UPDATE account SET is_active = FALSE\
      WHERE user_id = $1",
      [req.user.id]
    );
    res.status(200).json({ message: "Logged out" });
  } catch (err) {
    res.status(500).json(err);
  }
};