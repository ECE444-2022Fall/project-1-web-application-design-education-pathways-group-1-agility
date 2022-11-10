const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(val) {
      if (!validator.isEmail(val)) throw new Error("Invalid email");
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = User;
