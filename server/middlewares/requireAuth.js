const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function requireAuth(req, res, next) {
  const token =
    req.header("Authorization") && req.header("Authorization").split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Unauthorized - Missing token" });
  }

  try {
    const decoded = jwt.verify(token, "batman");
    if (!decoded.userId) {
      res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(401).json({ error: "Unauthorized - User not found" });
    }

    req.userId = decoded.userId;
    req.username = decoded.username;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
}

module.exports = requireAuth;
