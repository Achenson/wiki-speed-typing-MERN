const jwt = require("jsonwebtoken");




module.exports = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    // "somesupersecretkey",,
    process.env.ACCESS,
    {
      expiresIn: "8s",
    }
  );
};
