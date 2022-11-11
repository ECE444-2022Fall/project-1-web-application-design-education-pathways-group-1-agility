import React, { Component } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './css/Result.css'

class ResultCompare extends Component{

  constructor(props) {
    super(props);
    this.state = {
      course_id: this.props.course_id,
      course_code : this.props.course_code,
      course_name: this.props.course_name,
      department: this.props.course_department,
      faculty: this.props.course_faculty,
      description: this.props.course_description,
      pre: this.props.course_pre
    };
  }

  redirectCourse = () => {
    this.props.history.push(`/course/details/${this.props.course_code}`, {course_code: this.props.course_code})
  }

  addCourse = () => {
    
    if (this.props.course1.length === 0){
      const newCourse1 = [this.state.course_id, this.state.course_code, this.state.course_name, this.state.department
        ,this.state.faculty, this.state.description, this.state.pre]
      this.props.setCourse1(newCourse1)


        
        
    }
    else{
      const newCourse2 = [this.state.course_id, this.state.course_code, this.state.course_name, this.state.department
        ,this.state.faculty, this.state.description, this.state.pre]
      this.props.setCourse2(newCourse2)
    }
  }
  
  render(){
    return (
      <Container>
        {/* <a href={`courseDetails/${this.state.course_id}`} onClick={this.redirectCourse} className={"search-result-item"} style={{textDecoration: "none"}}> */}
        <a href={`courseDetails/${this.state.course_id}`} onClick={this.redirectCourse} className={"search-result-item"} style={{textDecoration: "none"}}></a>
        <div  className={"search-result-item"} style={{textDecoration: "none"}}>
        <Row className={"result-display"}>
            <Col>
                <h5>{this.state.course_code}</h5>  
            </Col>
            <Col>
                <h5>{this.state.course_name}</h5>
            </Col>
            <Col>{this.state.department}</Col>
            <Col>{this.state.faculty}</Col>
            <Col><button style={{borderRadius: "6px"}} onClick={this.addCourse}>Add</button></Col>
        </Row>
        </div>
      </Container>
    );
  }
}

export default ResultCompare;


