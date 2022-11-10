import React, { Component } from "react";
import axios from "../axiosInstance/AxiosInstance";
import "./css/course-description.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

class EditCourseDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_code: "",
      course_name: "",
      course_description: "",
      faculty: "",
      department: "",
      prerequisites: [],
      corequisites: [],
      exclusions: [],
      dispSpinner: false,
      editDone: false,
    };
  }

  componentDidMount() {
    axios.get(`courses/${this.props.match.params.id}`).then((res) => {
      this.setState({ course_code: res.data.Code });
      this.setState({ course_name: res.data.Name });
      this.setState({ course_description: res.data["Course Description"] });
      this.setState({ faculty: res.data.Faculty });
      this.setState({ department: res.data.Department });
      this.setState({ prerequisites: res.data["Pre-requisites"] });
      this.setState({ corequisites: res.data["Corequisite"] });
      this.setState({ exclusions: res.data["Exclusion"] });
    });
  }

  render() {
    return(
      <div>
        <h1 style={{ marginBottom: "2.5%" }}>
          {this.state.course_code}: {this.state.course_name}
        </h1>
        <form className="form">
          <label className="form-field-label">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Administrator Email"
            className="text-input form-field"
          />
          <label className="form-field-label">Password</label>
          <input
            type="password"
            id="password"
            className="text-input form-field"
          />
          <label className="form-field-label">Course Description</label>
          <textarea
            rows="10"
            cols="100"
            type="text"
            id="description"
            defaultValue={this.state.course_description}
            className="text-input form-field"
          />
          <input type="submit" value="Update" className="syllabus-link" />
        </form>
      </div>
    );
  }
}

export default EditCourseDesc;
