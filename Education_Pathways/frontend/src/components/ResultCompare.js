import React, { Component } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './css/Result.css'
const print = console.log

class ResultCompare extends Component{

  constructor(props) {
    super(props);
    this.state = {
      course_id: this.props.course_id,
      course_code : this.props.course_code,
      course_name: this.props.course_name,
      department: this.props.course_department,
      faculty: this.props.course_faculty,
      description: this.props.description
    };
  }

  redirectCourse = () => {
    this.props.history.push(`/course/details/${this.props.course_code}`, {course_code: this.props.course_code})
  }

  addCourse = () => {
    
    print(this.state.department)
    print(this.state.description)
    if (this.props.course1 === {}){
      const newCourse1 = [this.state.course_id, this.state.course_code, this.state.course_name, this.state.course_department
        ,this.state.course_faculty]
      this.props.setCourse1(newCourse1)
      // const newCourse1 = {
      //   "course_id": this.state.course_id,
      //   "coourse_code": this.state.course_code,
      //   "course_name": this.state.course_name,
      //   "course_department": this.state.course_department,
      //   "course_faculty": this.state.course_faculty

      // }

      //   this.props.setCourse1(newCourse1)

        
        
    }
    else{
      const newCourse2 = [this.state.course_id, this.state.course_code, this.state.course_name, this.state.course_department
        ,this.state.course_faculty]
      this.props.setCourse2(newCourse2)
      // const newCourse2 = {
      //   "course_id": this.state.course_id,
      //   "coourse_code": this.state.course_code,
      //   "course_name": this.state.course_name,
      //   "course_department": this.state.course_department,
      //   "course_faculty": this.state.course_faculty

      // }
      // this.props.setCourse1(newCourse2)
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
            <Col><button onClick={this.addCourse}>Add</button></Col>
        </Row>
        </div>
      </Container>
    );
  }
}

export default ResultCompare;


