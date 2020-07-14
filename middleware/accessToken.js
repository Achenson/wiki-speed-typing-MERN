const jwt = require("jsonwebtoken");




module.exports = (user) => {
  return jwt.sign(
    { userId: user.id },
    // "somesupersecretkey",,
    process.env.ACCESS,
    {
      expiresIn: "15m",
    }
  );
};
