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
    if (!user) throw new Error("Bad auth");
    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isCorrectPassword) throw new Error("Bad auth");
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1 day",
    });
    res.send({ token });
  } catch (err) {
    res.status(401).send("Bad auth");
  }
});

module.exports = router;
