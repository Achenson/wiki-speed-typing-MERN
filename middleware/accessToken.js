const jwt = require("jsonwebtoken");

module.exports = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    "somesupersecretkey",
    {
      expiresIn: "10s",
    }
  );
};
