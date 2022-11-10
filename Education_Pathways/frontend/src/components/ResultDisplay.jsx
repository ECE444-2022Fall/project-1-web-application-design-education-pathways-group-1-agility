import React, { Component } from "react";
import axios from "../axiosInstance/AxiosInstance";
import Result from "./Results";
import Spinner from "./Spinner";
import "./css/Result.css";
import Label from "./Label";
import "./css/styles.css";

async function getDropdownValues(s) {
  let dropdownValues = []
  try{
    let res = await axios.get('/courses/'.concat(s));
    dropdownValues = res.data;
  }catch(error){
    dropdownValues = ["Error. Failed to retrieve dropdown values"];
  }
  return dropdownValues;
};

function arrayDictNumbers(minVal, maxVal){
  let arr_dict = [];
  for (var i=minVal; i<=maxVal; i++){
    arr_dict.push({value: i.toString(), text: i.toString()})
  };
  return arr_dict;
}

class SearchResultDisplay extends Component {
  constructor() {
    super();
    this.state = {
      campuses: [],
      faculties: [],
      departments: [],
      input: "",
      faculty: "",
      department: "",
      minLevel: -1,
      maxLevel: -1,
      dispSpinner: false,
      results: [],
    };
  }

  async componentDidMount(){
    this.setState({ dispSpinner: true});

    let arr = await getDropdownValues('faculties')
    let arr_dict = []
    for (var i=0; i<arr.length; i++){
      arr_dict.push({value: arr[i], text: arr[i]})
    }
    this.setState({ faculties: arr_dict})

    arr = await getDropdownValues('departments')
    arr_dict = []
    for (i=0; i<arr.length; i++){
      arr_dict.push({value: arr[i], text: arr[i]})
    }
    this.setState({ departments: arr_dict})

    this.setState({ dispSpinner: false});
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({[event.target.name] : value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.getData(this.state.input);
  };

  getData = (input) => {
    this.setState({ dispSpinner: true});
    //Construct the API Get Request
    let getRequestURL = "/courses?search="//${input}`
    if (this.state.input !== ""){
      getRequestURL = getRequestURL.concat(this.state.input.replace(/&/g, "%26"));
    }
    if (this.state.faculty !== ""){
      getRequestURL = getRequestURL.concat("&faculty=").concat(this.state.faculty.replace(/&/g, "%26"));
    }
    if (this.state.department !== ""){
      getRequestURL = getRequestURL.concat("&department=").concat(this.state.department.replace(/&/g, "%26"));
    }
    if (this.state.minLevel !== ""){
      getRequestURL = getRequestURL.concat("&minLevel=").concat(this.state.minLevel);
    }
    if (this.state.maxLevel !== ""){
      getRequestURL = getRequestURL.concat("&maxLevel=").concat(this.state.maxLevel);
    }
    
    console.log(getRequestURL)
    //Call the API
    axios.get(getRequestURL).then((res) => {
      if (res.status === 200) {
        this.setState({ results: [] });
        console.log(res.data);
        if (res.data.length > 0) {
          let len = res.data.length;
          let result_temp = [];
          result_temp.push(<Label></Label>);
          for (let i = 0; i < len; i++) {
            result_temp.push(
              <Result
                key={res.data[i]._id}
                course_id={res.data[i]._id}
                course_code={res.data[i].Code}
                course_name={res.data[i].Name}
                course_faculty={res.data[i].Faculty}
                course_department={res.data[i].Department}
              ></Result>
            );
          }
          this.setState({ results: result_temp });
        } else {
          alert("Course not found");
        }
      } else if (res.status === 500) {
        alert("System Error. Please refresh");
      }
      this.setState({dispSpinner: false});
    });
  };
  
  render() {
    return this.state.dispSpinner ? (
      <Spinner />
    ) : (
      <div className="SearchQuery">
        <div style={{ marginTop: "10%" }}>
          <h1> Education Pathways</h1>
          <br></br>
          <form onSubmit={this.handleSubmit} className={"search"}>
            <input
              placeholder={"Search for courses by code, title, keyword..."}
              className={"text-input"}
              type="text"
              name="input"
              value={this.state.input}
              onChange={this.handleChange}
            />
            <input type="submit" value="Search" className={"submit-button"} />
            <br></br><br></br>            
            <label for="faculty">Faculty:</label>
            <select name="faculty" onChange={this.handleChange} value={this.state.faculty} className={"dropdown"} id="faculty">
              <option value="" className={"dropdown"} selected="selected">any</option>
              {this.state.faculties.map((option, index) => (
                <option key={index} value={option.value} className={"dropdown"}>
                  {option.text}
                </option>
              ))}
            </select>
            <br></br><br></br>
            <label for="department">Department:</label>
            <select name="department" onChange={this.handleChange} value={this.state.department} className={"dropdown"} id="department">
              <option value="" className={"dropdown"} selected="selected">any</option>
              {this.state.departments.map((option, index) => (
                <option key={index} value={option.value} className={"dropdown"}>
                  {option.text}
                </option>
              ))}
            </select>
            <br></br><br></br>
            <label for="minLevel">Min. Level:</label>
            <select name="minLevel" onChange={this.handleChange} value={this.state.minLevel} className={"dropdown"} id="minLevel">
              <option value="" className={"dropdown"} selected="selected">none</option>
              {arrayDictNumbers(0, 7).map((option, index) => (
                <option key={index} value={option.value} className={"dropdown"}>
                  {option.text}
                </option>
              ))}
            </select>
            <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
            <label for="maxLevel">Max. Level:</label>
            <select name="maxLevel" onChange={this.handleChange} value={this.state.maxLevel} className={"dropdown"} id="maxLevel">
              <option value="" className={"dropdown"} selected="selected">none</option>
              {arrayDictNumbers(0, 7).map((option, index) => (
                <option key={index} value={option.value} className={"dropdown"}>
                  {option.text}
                </option>
              ))}
            </select>
          </form>
        </div>
        <div className={"search-result-display"}>{this.state.results}</div>
      </div>
    );
  }
}

export default SearchResultDisplay;