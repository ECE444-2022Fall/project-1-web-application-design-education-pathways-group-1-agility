import React, { Component, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./css/Result.css";

//this class renders a unique result page for compare course section. 
class ResultCompare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_id: this.props.course_id,
      course_code: this.props.course_code,
      course_name: this.props.course_name,
      department: this.props.course_department,
      faculty: this.props.course_faculty,
      description: this.props.course_description,
      pre: this.props.course_pre,
    };
  }

  redirectCourse = () => {
    this.props.history.push(`/course/details/${this.props.course_code}`, {
      course_code: this.props.course_code,
    });
  };


  // add course to the compare card. 
  addCourse = () => {
       
    const newCourse = [
      this.state.course_id,
      this.state.course_code,
      this.state.course_name,
      this.state.department,
      this.state.faculty,
      this.state.description,
      this.state.pre,
    ];
    
    if (this.props.course1.length === 0 ) {
      
      this.props.setCourse1(newCourse);
      
  
    } 

    else {
      this.props.setCourse2(newCourse);
      
    }
  
    
    
    
    
  };

  render() {
    if (this.state.course_code === "NO_PARAMS_ENTERED"){
      return(
        <Container>
          <a href={`courseDetails/${this.state.course_id}`} onClick={this.redirectCourse} className={"search-result-item"} style={{textDecoration: "none"}}>
          <Row className={"result-display"}>
              <Col>
                  <h5>Try entering a search term or applying filter.</h5>  
              </Col>
          </Row>
          </a>
        </Container>
      )
    } else if (this.state.course_code === "NO_RESULTS_FOUND") {
      return(
        <Container>
          <a href={`courseDetails/${this.state.course_id}`} onClick={this.redirectCourse} className={"search-result-item"} style={{textDecoration: "none"}}>
          <Row className={"result-display"}>
              <Col>
                  <h5>No courses found.</h5>  
              </Col>
          </Row>
          </a>
        </Container>
      )

    } else {
    return (
      <Container>
        <a
          href={`courseDetails/${this.state.course_id}`}
          onClick={this.redirectCourse}
          className={"search-result-item"}
          style={{ textDecoration: "none" }}
        >
          {" "}
        </a>
        <div
          className={"search-result-item"}
          style={{ textDecoration: "none" }}
        >
          <Row className={"result-display"}>
            <Col>
              <h5>{this.state.course_code}</h5>
            </Col>
            <Col>
              <h5>{this.state.course_name}</h5>
            </Col>
            <Col>{this.state.department}</Col>
            <Col>{this.state.faculty}</Col>
            <Col>
              <button style={{ borderRadius: "6px" }} onClick={this.addCourse}>
                Add
              </button>
            </Col>
          </Row>
        </div>
      </Container>
    );
    }
  }
}

export default ResultCompare;