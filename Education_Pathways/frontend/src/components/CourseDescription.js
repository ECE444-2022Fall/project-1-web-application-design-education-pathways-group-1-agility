import React, { Component } from "react";
import "./css/course-description.css";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "../axiosInstance/AxiosInstance";

class CourseDescriptionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course_code: "",
      course_name: "",
      faculty: "",
      department: "",
      course_description: "",
      syllabus: "",
      prerequisites: "",
      corequisites: "",
      exclusions: "",
    };
  }

  componentDidMount() {
    axios.get(`/courses/${this.props.match.params.id}`).then((res) => {
      this.setState({ course_code: res.data.Code });
      this.setState({ course_name: res.data.Name });
      this.setState({ course_description: res.data["Course Description"] });
      this.setState({ faculty: res.data.Faculty });
      this.setState({ department: res.data.Department });
      this.setState({ prerequisites: res.data["Pre-requisites"].join(", ") });
      this.setState({ corequisites: res.data["Corequisite"].join(", ") });
      this.setState({ exclusions: res.data["Exclusion"].join(", ") });

      const syllabus_link = (() => {
        if (this.state.course_code.slice(0, 3) !== "ECE") {
          return (
            "https://exams-library-utoronto-ca.myaccess.library.utoronto.ca/simple-search?query=" +
            this.state.course_code
          );
        }

        return "http://courses.skule.ca/search/" + this.state.course_code;
      })();

      this.setState({ syllabus: syllabus_link });
    });
  }

  openLink = () => {
    const newWindow = window.open(
      this.state.syllabus,
      "_blacnk",
      "noopener,noreferrer"
    );
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  render() {
    return (
      <div className="page-content">
        <Container className="course-template">
          <Row float="center" className="course-title">
            <Col xs={8}>
              <h1>
                {this.state.course_code} : {this.state.course_name}
              </h1>
            </Col>
          </Row>
          <Row>
            <Col className="col-item">
              <h3>Faculty</h3>
              <p>{this.state.faculty}</p>
            </Col>
            <Col className="col-item">
              <h3>Department</h3>
              <p>{this.state.department}</p>
            </Col>
            <Col className="col-item">
              <h3>Past Tests</h3>
              <button className={"syllabus-link"} onClick={this.openLink}>
                View
              </button>
            </Col>
          </Row>
          <Row className="col-item course-description">
            <h3>Course Description</h3>
            <p>{this.state.course_description}</p>
          </Row>
          <Row className="col-item course-requisite">
            <Row>
              <h3>Course Requisites</h3>
            </Row>
            <Row>
              <Col className="requisites-display">
                <h4>Pre-Requisites</h4>
                <p>{this.state.prerequisites}</p>
              </Col>
              <Col className="requisites-display">
                <h4>Co-Requisites</h4>
                <p>{this.state.corequisites}</p>
              </Col>
              <Col className="requisites-display">
                <h4>Exclusion</h4>
                <p>{this.state.exclusions}</p>
              </Col>
            </Row>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CourseDescriptionPage;
