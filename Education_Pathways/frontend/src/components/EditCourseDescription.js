import React, { useState, useEffect } from 'react';
import './css/course-description.css'
import 'bootstrap/dist/css/bootstrap.css';

export default function EditCourseDesc(props) {
    const [data, setdata] = useState([]);
    const apiEndPoint = `http://localhost:3000/courses/${props.match.params.id}`;

    useEffect(() => {
        fetch(apiEndPoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json()).then((data) => {
            setdata(data)
        })
     }, [apiEndPoint]);

    return(<div>
        <h1 style={{ marginTop: "5%", marginBottom: "3%" }}>Edit {data["Code"]}: {data["Name"]}</h1>
        <form className="form" onSubmit={(event) => {
            event.preventDefault()
            let newDescription = event.target.description.value
            fetch(apiEndPoint, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"Course Description" : newDescription}),
            }).then((res) => res.json())
        }}>
            <label className='form-field-label'>
            Username: 
            </label>
            <input type="text" id="username" placeholder="Enter Administrator Username" className="text-input form-field" />
            <label className='form-field-label'>
            Password: 
            </label>
            <input type="password" id="password" className="text-input form-field" />
            <label className='form-field-label'>
            Course Description: 
            </label>
            <textarea rows="20" cols="100" type="text" id="description" defaultValue={data["Course Description"]} className="text-input form-field" />
            <input type="submit" value="Change" className='syllabus-link' />
        </form>

    </div>)
}