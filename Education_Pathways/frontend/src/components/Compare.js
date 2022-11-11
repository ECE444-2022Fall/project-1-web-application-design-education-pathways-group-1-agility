import React, { useEffect, useState } from "react";
import { Component } from "react";
import "./css/Compare.css"
import Result from "./Results";
import CourseDescriptionPage from "./CourseDescription";
import SearchResultDisplay from "./ResultDisplay";
import EditCourseDescription from "./EditCourseDescription";
import SearchBarCompare from "./SearchCompare";



import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './css/Result.css'

  


const Compare = () => {
    const [course1, setCourse1] = useState([]);

    const [course2, setCourse2] = useState([]);

    const  openLink = (course) => {
        const newWindow = window.open(
            syllabus_link(course),
          "_blacnk",
          "noopener,noreferrer"
        );
        console.log(newWindow)
        if (newWindow) {
          newWindow.opener = null;
        }
      };

      const syllabus_link = ((course) => {
        if (typeof course !== "string"){
            console.log("not string!")
            return
        }
        else if (course.slice(0, 3) !== "ECE") {
          return (
            "https://exams-library-utoronto-ca.myaccess.library.utoronto.ca/simple-search?query=" +
            course
          );
        }

        return "http://courses.skule.ca/search/" + course;
      });

      
    


    return (
        <div>
            <div>
            {/* <CourseDescriptionPage {...props} /> */}
            </div>

            <div className="compare_container">
            <div className="right_container">
                <button className="close" onClick = {() =>{setCourse1([])}}>X</button>
               
                <div className="compare_line">
                     {course1[1]}
                </div>
                <div className="compare_line"> 
                    {course1[2]}
                </div>
                <div className="compare_line">
                {course1.length===0 ? <h3>To be added</h3>: course1[3]}
                </div>
                <div className="compare_line">
                    {course1[4]}
                </div>

                <div className="compare_line">
                    {course1[0]}
                </div>

                <div className="compare_line">
                    {course1.length === 0? null : <button  onClick ={() => {openLink(course1[1])}}>Passed Test</button>}
                </div>
                
            </div>
            <div className="left_container">
                <button className="close" onClick = {() =>{setCourse2([])}}>X</button>
                
                <div className="compare_line">
                 {course2[1]}
                </div>
                <div className="compare_line">
                {course2[2]}
                </div>
                <div className="compare_line">
                {course2.length===0 ? <h3>To be added</h3>: course2[3]}
                </div>
                <div className="compare_line">
                {course2[4]}
                </div>

                <div className="compare_line">

                 {course2[0]}
                </div>
                
                <div  className="compare_line">
                    {course2.length === 0? null : <button   onClick ={() => {openLink(course2[1])}}>Passed Test</button>}
                </div>

                </div>
                
            </div>

            <div className="search_container">
                <SearchBarCompare 
                setCourse1 = {setCourse1}
                setCourse2 = {setCourse2}
                course1 = {course1}
                course2 = {course2}
                

                />
            </div>

            
            </div>
            

       

    )
}

export default Compare