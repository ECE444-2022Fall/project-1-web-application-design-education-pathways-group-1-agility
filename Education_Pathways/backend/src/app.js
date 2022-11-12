/*
 * Setup express application
 */

const express = require("express");
require("./db/mongoose.js");
const courseRouter = require("./router/courses");
const userRouter = require("./router/users");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(courseRouter);
app.use(userRouter);

module.exports = app;
