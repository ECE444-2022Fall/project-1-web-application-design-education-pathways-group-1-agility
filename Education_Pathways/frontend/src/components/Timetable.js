import React, { Component } from "react";
import "./css/navbar.css";
import "bootstrap/dist/css/bootstrap.css";
import logo from "./img/logo.png";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import LogIn from "./LogIn.jsx";
import CourseDescriptionPage from "./CourseDescription";
// import Wishlist from './Wishlist';
// import SignUp from './SignUp'
import SearchResultDisplay from "./ResultDisplay";
import EditCourseDescription from "./EditCourseDescription";

export default class Timetable extends Component {
  getTimeTable = () => {
    return JSON.parse(localStorage.getItem("timetable"));
  };

  render() {
    return (
      <div className="body_text">
        <div className="timetable-page">
          <table className="styled-table">
            <tr>
              <th>Course Code</th>
              <th>Semester</th>
              <th>Year</th>
            </tr>
            {this.getTimeTable().map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.course_code}</td>
                  <td>{val.semester}</td>
                  <td>{val.year}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    );
  }
}
