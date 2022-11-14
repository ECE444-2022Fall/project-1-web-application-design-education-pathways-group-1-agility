import React, { Component } from "react";
import axios from "../axiosInstance/AxiosInstance";
import Spinner from "./Spinner";
import "./css/course-description.css";
import "bootstrap/dist/css/bootstrap.css";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

/*
Edit Course Description Page to change any sections about the course info if you have an admin's credentials that is authorized to do so
*/

const parseArr = (value) => {
  let arr =
    value.replace(/\s/g, "") === "" ? [] : value.replace(/\s/g, "").split(",");
  if (arr.length > 0) {
    while (arr[arr.length - 1] === "") arr.pop();
  }
  return arr;
};

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

  onSubmit = async (event) => {
    this.setState({ dispSpinner: true });
    try {
      const res = await axios.post("/users/login", {
        email: event.target.username.value,
        password: event.target.password.value,
      });
      const { token } = res.data;
      localStorage.setItem("access_token", token);
      const pre_requisite = parseArr(event.target.prerequisites.value);
      const co_requisite = parseArr(event.target.corequisites.value);
      const exclusion = parseArr(event.target.exclusions.value);

      await axios.patch(`courses/${this.props.match.params.id}`, {
        "Course Description": event.target.description.value,
        Code: event.target.code.value,
        Name: event.target.name.value,
        Faculty: event.target.faculty.value,
        Department: event.target.department.value,
        "Pre-requisites": pre_requisite,
        Corequisite: co_requisite,
        Exclusion: exclusion,
      });
      this.setState({ editDone: true });
    } catch (err) {
      event.preventDefault();
      event.target.password.value = "";
      alert("Unable to update course");
    }
    this.setState({ dispSpinner: false });
  };

  render() {
    return this.state.editDone ? (
      <Redirect to={`/courseDetails/${this.props.match.params.id}`} />
    ) : this.state.dispSpinner ? (
      <Spinner />
    ) : (
      <div>
        <Link to={`/courseDetails/${this.props.match.params.id}`}>
          <button id={"form-back-button"} className={"syllabus-link"}>
            Back
          </button>
        </Link>
        <h1 style={{ marginBottom: "2.5%" }}>
          {this.state.course_code}: {this.state.course_name}
        </h1>
        <form className="form" onSubmit={this.onSubmit}>
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
          <label className="form-field-label">Course Code</label>
          <input
            type="text"
            id="code"
            defaultValue={this.state.course_code}
            className="text-input form-field"
          />
          <label className="form-field-label">Course Name</label>
          <input
            type="text"
            id="name"
            defaultValue={this.state.course_name}
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
          <label className="form-field-label">Faculty</label>
          <input
            type="text"
            id="faculty"
            defaultValue={this.state.faculty}
            className="text-input form-field"
          />
          <label className="form-field-label">Department</label>
          <input
            type="text"
            id="department"
            defaultValue={this.state.department}
            className="text-input form-field"
          />
          <h1 style={{ margin: "2%" }} className="form-field-label">
            Course Requisites (Separate With Commas)
          </h1>
          <label className="form-field-label">Pre-Requisites</label>
          <input
            type="text"
            id="prerequisites"
            defaultValue={this.state.prerequisites}
            className="text-input form-field"
          />
          <label className="form-field-label">Co-Requisites</label>
          <input
            type="text"
            id="corequisites"
            defaultValue={this.state.corequisites}
            className="text-input form-field"
          />
          <label className="form-field-label">Exclusions</label>
          <input
            type="text"
            id="exclusions"
            defaultValue={this.state.exclusions}
            className="text-input form-field"
          />
          <input type="submit" value="Update" className="syllabus-link" />
        </form>
      </div>
    );
  }
}

export default EditCourseDesc;
