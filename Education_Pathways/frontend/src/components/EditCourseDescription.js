import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/course-description.css';
import 'bootstrap/dist/css/bootstrap.css';

// Dummy Master Administrator Credentials: master.admin@mail.utoronto.ca \ password

export default function EditCourseDesc(props) {
    const id = props.match.params.id
    const apiEndPoint = `http://localhost:3000/courses/${id}`;
    const [data, setdata] = useState([]);

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
        <Link to={`/courseDetails/${id}`}><button id={'form-back-button'} className={'syllabus-link'}>Back</button></Link>
        <h1 style={{ marginBottom: "2.5%" }}>{data["Code"]}: {data["Name"]}</h1>
        <form className="form" onSubmit={(event) => {
            if(event.target.username.value === "master.admin@mail.utoronto.ca" && event.target.password.value === "password") { // dummy credentials
                let newDescription = event.target.description.value;
                fetch(apiEndPoint, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({"Course Description" : newDescription}),
                }).then((res) => res.json())
                alert('Course Description Updated');
            }else {
                event.preventDefault()
                event.target.password.value = '';
                alert('Credentials Invalid');
            }
        }}>
            <label className='form-field-label'>
            Username: 
            </label>
            <input type="text" id="username" placeholder="Administrator Email" className="text-input form-field" />
            <label className='form-field-label'>
            Password: 
            </label>
            <input type="password" id="password" className="text-input form-field" />
            <label className='form-field-label'>
            Course Description: 
            </label>
            <textarea rows="10" cols="100" type="text" id="description" defaultValue={data["Course Description"]} className="text-input form-field" />
            <input type="submit" value="Update" className='syllabus-link' />
        </form>

    </div>)
}