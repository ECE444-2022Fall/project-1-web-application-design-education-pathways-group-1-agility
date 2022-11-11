import React, { useState } from "react";
import "./css/Compare.css";
import SearchBarCompare from "./SearchCompare";
import "./css/Result.css";

const Compare = () => {
  const [course1, setCourse1] = useState([]);
  const [course2, setCourse2] = useState([]);

  const openLink = (course) => {
    const newWindow = window.open(
      syllabus_link(course),
      "_blacnk",
      "noopener,noreferrer"
    );
    console.log(newWindow);
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  const syllabus_link = (course) => {
    if (typeof course !== "string") {
      console.log("not string!");
      return;
    } else if (course.slice(0, 3) !== "ECE") {
      return (
        "https://exams-library-utoronto-ca.myaccess.library.utoronto.ca/simple-search?query=" +
        course
      );
    }

    return "http://courses.skule.ca/search/" + course;
  };

  return (
    <div>

      <div className="compare_container">
        <div className="right_container">
          <button
            className="close"
            onClick={() => {
              setCourse1([]);
            }}
          >
            X
          </button>

          <div className="compare_Code">{course1[1]}</div>
          <div className="compare_line">{course1[2]}</div>
          <div className="compare_line">
            {course1.length === 0 ? <h3>To be added</h3> : course1[3]}
          </div>
          <div className="compare_line">{course1[4]}</div>

          <div className="compare_line">
            {/* prereq */}
            {course1.length === 0 ? null : "Pre-requisites: " + course1[6]}
          </div>

          <div className="description">{course1[5]}</div>

          <div className="compare_line">
            {course1.length === 0 ? null : (
              <button
                style={{ borderRadius: "6px" }}
                onClick={() => {
                  openLink(course1[1]);
                }}
              >
                Past Test
              </button>
            )}
          </div>
        </div>
        <div className="left_container">
          <button
            className="close"
            onClick={() => {
              setCourse2([]);
            }}
          >
            X
          </button>

          <div className="compare_Code">{course2[1]}</div>
          <div className="compare_line">{course2[2]}</div>
          <div className="compare_line">
            {course2.length === 0 ? <h3>To be added</h3> : course2[3]}
          </div>
          <div className="compare_line">{course2[4]}</div>

          <div className="compare_line">
            {/* prereq */}
            {course2.length === 0 ? null : "Pre-requisites: " + course2[6]}
          </div>

          <div className="description">{course2[5]}</div>
          <div className="compare_line">
            {course2.length === 0 ? null : (
              <button
                style={{ borderRadius: "6px" }}
                onClick={() => {
                  openLink(course2[1]);
                }}
              >
                Past Test
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="search_container">
        <SearchBarCompare
          setCourse1={setCourse1}
          setCourse2={setCourse2}
          course1={course1}
          course2={course2}
        />
      </div>
    </div>
  );
};

export default Compare;
