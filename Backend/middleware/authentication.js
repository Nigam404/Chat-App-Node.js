const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const Token = req.header("Authorization");
  const user = jwt.verify(Token, "jayshreeram");
  console.log("User authentication called");
  console.log("Token->", Token);
  req.USERID = user.id; //passing user info to next middleware.
  next();
};
