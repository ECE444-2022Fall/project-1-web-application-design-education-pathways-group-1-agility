const jwt = require("jsonwebtoken");
const User = require("../models/users");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const jwtDecode = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET_KEY
    );
    const user = User.findById(jwtDecode._id);
    if (!user) throw new Error();
    next();
  } catch (err) {
    res.status(401).send("Bad auth");
  }
};

module.exports = auth;
