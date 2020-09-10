const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get the token from the header
  const token = req.header("x-authUser-token");

  // Check if no token

  if (!token) {
    return res.status(401).json({ msg: "No User Token, Authorization Denied" });
  }

  // Verify Token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "User Token is not Valid" });
  }
};
