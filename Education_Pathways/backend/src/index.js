const express = require("express");
require("./db/mongoose.js");
const Course = require("./models/courses.js");

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.post("/courses", async (req, res) => {
  const course = new Course(req.body);
  try {
    await course.save();
    res.status(201).send(course);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/courses", async (req, res) => {
  try {
    const { search, department, faculty, campus, minLevel, maxLevel } =
      req.query;
    const matches = [];
    if (search) {
      matches.push({
        $or: [
          { Code: { $regex: search.toUpperCase() } },
          { "Course Description": { $regex: search } },
        ],
      });
    }
    if (department) {
      matches.push({ Department: department });
    }
    if (faculty) {
      matches.push({ Faculty: faculty });
    }
    if (campus) {
      matches.push({ Campus: campus });
    }
    if (minLevel) {
      matches.push({ "Course Level": { $gte: Number(minLevel) } });
    }
    if (maxLevel) {
      matches.push({ "Course Level": { $lte: Number(maxLevel) } });
    }
    const courses = matches.length
      ? await Course.find({ $and: matches })
      : await Course.find({});
    console.log(matches);
    return courses.length ? res.send(courses) : res.send(404).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

app.get("/courses/departments", async (req, res) => {
  try {
    const departments = await Course.find().distinct("Department");
    res.send(departments);
  } catch (err) {
    res.status(500).send();
  }
});

app.get("/courses/faculties", async (req, res) => {
  try {
    const faculties = await Course.find().distinct("Faculty");
    res.send(faculties);
  } catch (err) {
    res.status(500).send();
  }
});

app.get("/courses/campuses", async (req, res) => {
  try {
    const campuses = await Course.find().distinct("Campus");
    res.send(campuses);
  } catch (err) {
    res.status(500).send();
  }
});

app.patch("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) return res.status(404).send();
    res.send(course);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).send();
    res.send(course);
  } catch (err) {
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log("Server is up and running on port " + port);
});
