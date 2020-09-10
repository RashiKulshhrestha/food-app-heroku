const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get the token from the header
  const token = req.header("x-authOwner-token");

  // Check if no token

  if (!token) {
    return res.status(401).json({ msg: "No Owner Token, Authorization Denied" });
  }

  // Verify Token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.owner = decoded.owner;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Owner Token is not Valid" });
  }
};
