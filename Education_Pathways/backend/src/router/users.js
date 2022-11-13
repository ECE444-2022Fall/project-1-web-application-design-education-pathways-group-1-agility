/*
 * Define routes on user endpoint
 */

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users.js");

const router = new express.Router();

// Authenticate admin user
// The provided jwt token will allow
// admins to access protected course routes

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!(await bcrypt.compare(req.body.password, user.password)))
      throw new Error("Bad auth");
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1 day",
    });
    res.send({ token });
  } catch (err) {
    res.status(401).send("Bad auth");
  }
});

module.exports = router;
