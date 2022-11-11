import React, { Component } from "react";
import "./css/timetable.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

export default class Timetable extends Component {
  getTimeTable = () => {
    return JSON.parse(localStorage.getItem("timetable"));
  };

  deleteTimeTableEntry = (removeIdx) => {
    let tempTimetable = JSON.parse(localStorage.getItem("timetable"));
    tempTimetable.splice(removeIdx, 1);
    localStorage.setItem("timetable", JSON.stringify(tempTimetable));
    window.location.reload();
  };

  downloadCSV = () => {
    let data = JSON.parse(localStorage.getItem("timetable"));
    const csvRows = [];
    const headers = Object.keys(data[0]);

    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map((header) => {
        const val = row[header];
        return `"${val}"`;
      });

      csvRows.push(values.join(","));
    }

    let csv = csvRows.join("\n");

    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", csv]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "data.csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  render() {
    return (
      <div className="body_text">
        <h1>Your Saved Courses</h1>
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
          <button
            onClick={this.downloadCSV}
            className="download-timetable-button"
          >
            Download CSV
          </button>
        </div>
      </div>
    );
  }
}
