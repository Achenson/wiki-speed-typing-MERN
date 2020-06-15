const jwt = require("jsonwebtoken");




module.exports = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email, tokenVersion: user.tokenVersion },
    // "secretKeyForRefreshToken",
    process.env.REFRESH,
    {
      expiresIn: "7d",
    }
  );
};
