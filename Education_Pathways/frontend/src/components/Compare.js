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
            <div className="compare_container">
            <div className="right_container">
                <button className="close" onClick = {() =>{setCourse1([])}}>X</button>
               
                <div>
                     {course1[1]}
                </div>
                <div>
                    {course1[2]}
                </div>
                <div>
                    {course1[3]}
                </div>
                <div>
                    {course1[4]}
                </div>

                <div>
                    {course1[0]}
                </div>
                
            </div>
            <div className="left_container">
                <button className="close" onClick = {() =>{setCourse2([])}}>X</button>
                
                <div>
                     {course2[1]}
                </div>
                <div>
                    {course2[2]}
                </div>
                <div>
                    {course2[3]}
                </div>
                <div>
                    {course2[4]}
                </div>

                <div>

                    {course2[0]}
                </div>

                </div>
                
            </div>
            </div>
            

       

    )
}

export default Compare