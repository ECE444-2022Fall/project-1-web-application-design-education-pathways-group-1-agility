import React, { Component } from "react";
import axios from "../axiosInstance/AxiosInstance";
import Spinner from "./Spinner";
import "./css/course-description.css";
import "bootstrap/dist/css/bootstrap.css";
import { Redirect } from "react-router-dom";

// Dummy Master Administrator Credentials: master.admin@mail.utoronto.ca \ password

class EditCourseDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_code: "",
      course_name: "",
      course_description: "",
      dispSpinner: false,
      editDone: false,
    };
  }

  componentDidMount() {
    axios.get(`courses/${this.props.match.params.id}`).then((res) => {
      this.setState({ course_code: res.data.Code });
      this.setState({ course_name: res.data.Name });
      this.setState({ course_description: res.data["Course Description"] });
    });
  }

  onSubmit = (event) => {
    if (
      event.target.username.value === "master.admin@mail.utoronto.ca" &&
      event.target.password.value === "password"
    ) {
      // dummy credentials
      let newDescription = event.target.description.value;
      this.setState({ dispSpinner: true });
      axios
        .patch(`courses/${this.props.match.params.id}`, {
          "Course Description": newDescription,
        })
        .then((res) => {
          this.setState({ dispSpinner: false });
          this.setState({ editDone: true });
        });
    } else {
      event.preventDefault();
      event.target.password.value = "";
      alert("Credentials Invalid");
    }
  };

  render() {
    return this.state.editDone ? (
      <Redirect to={`/courseDetails/${this.props.match.params.id}`} />
    ) : this.state.dispSpinner ? (
      <Spinner />
    ) : (
      <div>
        <h1 style={{ marginBottom: "2.5%" }}>
          {this.state.course_code}: {this.state.course_name}
        </h1>
        <form className="form" onSubmit={this.onSubmit}>
          <label className="form-field-label">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Administrator Email"
            className="text-input form-field"
          />
          <label className="form-field-label">Password:</label>
          <input
            type="password"
            id="password"
            className="text-input form-field"
          />
          <label className="form-field-label">Course Description:</label>
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
