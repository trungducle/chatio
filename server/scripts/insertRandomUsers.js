/* Generate credentials from randomEmail.txt,
then insert them into table "account".

Object structure:
{
  email address,
  firstName, lastName: extracted from the address,
  password: lowercase name, space removed
}

e.g.
{
  email: 'Hayden_Watson4194@bulaffy.com',
  firstName: 'Hayden',
  lastName: 'Watson',
  password: 'haydenwatson'
}
*/

const fs = require("fs");
const path = require("path");
const { db, pgp } = require("../config/database");
const bcrypt = require("bcrypt");

const emails = fs.readFileSync(path.join(__dirname, "randomEmail.txt"))
  .toString().split("\n");
const credentialsFromEmail = emails.map((email) => {
  let name = "", password = "";
  for (const char of email) {
    if (char === '@') break;
    if (/[_.]/.test(char)) {
      name += " ";
      continue;
    }

    password += char;

    if (/[0-9]/.test(char)) continue;
    name += char;
  }

  let [firstName, lastName] = name.split(" ").map((n) => {
    if (!n) return "";
    return n.charAt(0).toUpperCase() + n.slice(1);
  });

  if (!lastName) {
    lastName = firstName;
  }
  return { email, password, firstName, lastName };
});

(async () => {
  try {
    const accountColSet = new pgp.helpers.ColumnSet(
      ["first_name", "last_name", "email", "password"],
      { table: "account" }
    );

    const insertValues = await Promise.all(
      credentialsFromEmail.map(async (obj) => ({
        email: obj.email,
        password: await bcrypt.hash(obj.password, 10),
        first_name: obj.firstName,
        last_name: obj.lastName
      }))
    );

    await db.none(pgp.helpers.insert(
      insertValues,
      accountColSet
    ));

    console.log("Inserted new users");
  } catch (err) {
    console.log(err);
  }
})();
