import React, { Component } from "react";
import "./css/course-description.css";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import ReactStars from "react-rating-stars-component";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "../axiosInstance/AxiosInstance";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

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
      rating: 0,
      userRating: 0,
      dispSpinner: false,
      dispRating: false,
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
      this.setState({ rating: res.data.Rating });
      this.setState({
        dispRating: !localStorage.getItem(
          `rating-${this.props.match.params.id}`
        ),
      });

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

  saveToTimetableCSV = () => {
    let timetable = JSON.parse(localStorage.getItem("timetable"));

    var course = {
      course_code: this.state.course_code,
      semester: this.selectSemester.value,
      year: this.selectYear.value,
    };
    
    timetable.push(course);

    localStorage.setItem("timetable", JSON.stringify(timetable));

    window.location.reload();
  };

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

  onRatingChange = (rating) => {
    this.setState({ userRating: rating });
  };

  submitUserRating = () => {
    if (!this.state.userRating) return null;
    this.setState({ dispSpinner: true });
    const id = this.props.match.params.id;
    axios
      .patch(`/courses/ratings/${id}`, {
        Rating: this.state.userRating,
      })
      .then((res) => {
        this.setState({ rating: res.data.Rating });
        localStorage.setItem(`rating-${id}`, "true");
        this.setState({ dispRating: false });
        this.setState({ dispSpinner: false });
      })
      .catch(() => {
        this.setState({ dispSpinner: false });
      });
  };

  render() {
    return this.state.dispSpinner ? (
      <Spinner />
    ) : (
      <div className="page-content">
        <Container className="course-template">
          <Row float="center" className="course-title">
            <Col xs={8}>
              <h1>
                {this.state.course_code} : {this.state.course_name}
                <Link
                  to={`/edit/${this.props.match.params.id}`}
                  state={{ id: this.props.match.params.id }}
                >
                  <img
                    src={require("./img/edit_icon.png").default}
                    alt="Edit"
                    className="edit-button"
                  />
                </Link>
              </h1>
            </Col>
            {this.state.rating ? (
              <Col>
                <ReactStars
                  edit={false}
                  classNames={"col-name-course-rating"}
                  count={5}
                  activeColor={"#1C3E6E"}
                  size={30}
                  value={this.state.rating}
                />
              </Col>
            ) : null}
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
          <Row>
            <Col className="col-item">
              <h3>Semester</h3>
              <div className="select-wrapper">
                <select
                  ref={(input) => (this.selectSemester = input)}
                  className="select-box"
                >
                  <option value="Fall">Fall</option>
                  <option value="Winter">Winter</option>
                </select>
              </div>
            </Col>
            <Col className="col-item">
              <h3>Year</h3>
              <div className="select-wrapper">
                <select
                  ref={(input) => (this.selectYear = input)}
                  className="select-box"
                >
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
            </Col>
            <Col className="col-item">
              <h3>Save Course</h3>
              <button
                className={"add-course-to-timetable-link"}
                onClick={this.saveToTimetableCSV}
              >
                Add to Timetable
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
          {this.state.dispRating ? (
            <Row className="col-item course-requisite">
              <h3>Course Rating</h3>

              <ReactStars
                classNames={"col-ratings"}
                edit={true}
                count={5}
                onChange={this.onRatingChange}
                activeColor={"#1C3E6E"}
                size={40}
                value={this.state.userRating}
              />
              <button className="rate-button" onClick={this.submitUserRating}>
                Submit
              </button>
            </Row>
          ) : null}
        </Container>
      </div>
    );
  }
}

export default CourseDescriptionPage;
