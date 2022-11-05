const mongoose = require("mongoose");

const Course = mongoose.model("Course", {
  Code: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  Faculty: {
    type: String,
    required: true,
    trim: true,
  },
  Department: {
    type: String,
    required: true,
    trim: true,
  },
  "Course Description": {
    type: String,
    required: true,
    trim: true,
  },
  "Pre-requisites": {
    type: Array,
    default: [],
  },
  "Course Level": {
    type: Number,
    required: true,
    min: 1,
  },
  Campus: {
    type: String,
    required: true,
  },
  Term: {
    type: Array,
    required: true,
    validate(data) {
      if (data.length < 1) {
        throw new Error("Course must be offered in atleast one term");
      }
    },
  },
  Exclusion: {
    type: Array,
    default: [],
  },
  Corequisite: {
    type: Array,
    default: [],
  },
  "Recommended Preparation": {
    type: Array,
    default: [],
  },
  MajorOutcomes: {
    type: Array,
    default: [],
  },
  MinorOutcomes: {
    type: Array,
    default: [],
  },
});

module.exports = Course;
