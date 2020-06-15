


module.exports = (res, token) => {
  res.cookie("jid", token), {
    httpOnly: true,
    // to prevent sending cookie in every request
    path: "/refresh_token"
  };
}