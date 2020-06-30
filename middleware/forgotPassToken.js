const jwt = require("jsonwebtoken");




module.exports = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    // "somesupersecretkey",,
    process.env.FORGOT_PASSWORD,
    {
      expiresIn: "10min",
    }
  );
};
