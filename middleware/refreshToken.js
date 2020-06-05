const jwt = require("jsonwebtoken");

module.exports = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    "secretKeyForRefreshToken",
    {
      expiresIn: "7d",
    }
  );
};
