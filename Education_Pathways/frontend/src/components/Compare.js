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

    
    


    return (
        <div>
            <div>
            {/* <CourseDescriptionPage {...props} /> */}
            </div>
            <div className="search_container">
                <SearchBarCompare 
                setCourse1 = {setCourse1}
                setCourse2 = {setCourse2}
                course1 = {course1}
                course2 = {course2}
                

                />
            </div>
            <div className="left_container">
                {course1 === []? "None" : course1 }
                <button onClick = {() =>{setCourse1([])}}>X</button>
            </div>
            <div className="right_container">
            {course2 === []? "None" : course2 }
            <button onClick = {() =>{setCourse2([])}}>X</button>
            </div>
            

        </div>

    )
}

export default Compare