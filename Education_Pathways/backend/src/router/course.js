const express = require("express");
const Course = require("../models/courses.js");

const router = new express.Router();

router.post("/courses", async (req, res) => {
  const course = new Course(req.body);
  try {
    await course.save();
    res.status(201).send(course);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/courses", async (req, res) => {
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
    return courses.length ? res.send(courses) : res.send(404).send();
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/courses/departments", async (req, res) => {
  try {
    const departments = await Course.find().distinct("Department");
    res.send(departments);
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/courses/faculties", async (req, res) => {
  try {
    const faculties = await Course.find().distinct("Faculty");
    res.send(faculties);
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/courses/campuses", async (req, res) => {
  try {
    const campuses = await Course.find().distinct("Campus");
    res.send(campuses);
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send();
    res.send(course);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.patch("/courses/ratings/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course || !req.body.Rating) return res.status(404).send();
    course.Rating =
      (course.RatingNum * course.Rating + req.body.Rating) /
      (course.RatingNum + 1);
    course.RatingNum = course.RatingNum + 1;
    await course.save();
    res.send(course);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.patch("/courses/:id", async (req, res) => {
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

router.delete("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).send();
    res.send(course);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
