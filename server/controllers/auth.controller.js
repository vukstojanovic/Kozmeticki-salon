const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = User.findOne({ username: username });
    if (!user) {
      res.status(401).json({ error: "Invalid username or password." });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid username or password." });
    }

    const token = jwt.sign(
      { userId: user.userId, username: user.username },
      "batman",
      {
        expiresIn: "5m",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal server errror." });
  }
}

module.exports = {
  loginUser,
};
