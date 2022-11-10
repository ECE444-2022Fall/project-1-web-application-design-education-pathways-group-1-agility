const jwt = require("jsonwebtoken");
const User = require("../models/users");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = User.findOne({ _id: decode._id });
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("Bad authentication");
  }
};

module.exports = auth;
