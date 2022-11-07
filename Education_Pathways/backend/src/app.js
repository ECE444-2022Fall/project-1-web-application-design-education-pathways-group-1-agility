const express = require("express");
require("./db/mongoose.js");
const courseRouter = require("./router/course");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(courseRouter);

module.exports = app;