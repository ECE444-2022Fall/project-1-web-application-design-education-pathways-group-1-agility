/*
 * Middleware function used to authenticate incoming protected requests
 */

const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);
    next();
  } catch (err) {
    res.status(401).send("Bad auth");
  }
};

module.exports = auth;
