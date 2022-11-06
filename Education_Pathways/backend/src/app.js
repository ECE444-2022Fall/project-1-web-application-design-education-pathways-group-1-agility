const express = require("express");
require("./db/mongoose.js");
const courseRouter = require("./router/course");

const app = express();
app.use(express.json());
app.use(courseRouter);

module.exports = app;
