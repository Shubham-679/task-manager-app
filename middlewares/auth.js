const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

module.exports = async function (req, res, next) {

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied : No Token Provided");
  try {
    const decoded = jwt.verify(token, "hellohowareyou");
    // req.user = decoded;
    const user = await User.findOne({_id: decoded._id,"tokens.token": token});
    if (!user) {
      throw new Error('User Not Found');
    }
    req.token = token;
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token");
  }
};