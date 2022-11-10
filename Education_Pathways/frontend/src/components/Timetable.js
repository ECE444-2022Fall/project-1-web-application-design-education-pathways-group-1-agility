import React, { Component } from "react";
import "./css/navbar.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

export default class Timetable extends Component {
  getTimeTable = () => {
    return JSON.parse(localStorage.getItem("timetable"));
  };

  deleteTimeTableEntry = (removeIdx) => {
    let tempTimetable = JSON.parse(localStorage.getItem("timetable"));
    console.log(removeIdx);
    tempTimetable.splice(removeIdx, 1);
    localStorage.setItem("timetable", JSON.stringify(tempTimetable));
    window.location.reload();
  };

  render() {
    return (
      <div className="body_text">
        <div className="timetable-page">
          <table className="styled-table">
            <tr>
              <th>Course Code</th>
              <th>Name</th>
              <th>Semester</th>
              <th>Year</th>
            </tr>
            {this.getTimeTable().map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.course_code}</td>
                  <td>{val.course_name}</td>
                  <td>{val.semester}</td>
                  <td>{val.year}</td>
                  <td>
                    <Link>
                      <img
                        src={require("./img/remove_icon.png").default}
                        alt="Edit"
                        style={{ height: "25px", width: "25px" }}
                        onClick={() => this.deleteTimeTableEntry(key)}
                      />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    );
  }
}
