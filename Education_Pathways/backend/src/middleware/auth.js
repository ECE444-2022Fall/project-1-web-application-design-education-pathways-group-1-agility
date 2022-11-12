/*
 * Middleware function used to authenticate incoming protected requests
 */

const jwt = require("jsonwebtoken");
const User = require("../models/users");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const jwtDecode = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET_KEY
    );
    const user = await User.findById(jwtDecode._id);
    if (!user) throw new Error("Bad auth");
    next();
  } catch (err) {
    res.status(401).send("Bad auth");
  }
};

module.exports = auth;
