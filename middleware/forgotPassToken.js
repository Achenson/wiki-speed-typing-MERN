const jwt = require("jsonwebtoken");




module.exports = (user) => {
  return jwt.sign(
    { userId: user.id },
    // "somesupersecretkey",,
    process.env.FORGOT_PASSWORD,
    {
      expiresIn: "30m",
    }
  );
};
