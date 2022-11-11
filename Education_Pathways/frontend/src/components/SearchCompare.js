import React, { Component } from "react";
import axios from "../axiosInstance/AxiosInstance";
import Result from "./Results";
import Spinner from "./Spinner";
import "./css/Result.css";
import Label from "./Label";
import "./css/styles.css";
import ResultCompare from "./ResultCompare";
class SearchBarCompare extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      dispSpinner: false,
      results: [],
    };
  }

  handleChange = (event) => {
    this.setState({ input: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.getData(this.state.input);
  };

  getData = (input) => {
    this.setState({ dispSpinner: true });
    axios
      .get(`/courses?search=${input}`)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ results: [] });
          console.log(res.data);
          if (res.data.length > 0) {
            let len = res.data.length;
            let result_temp = [];
            result_temp.push(<Label></Label>);
            for (let i = 0; i < len; i++) {
              result_temp.push(
                <ResultCompare
                  key={res.data[i]._id}
                  course_id={res.data[i]._id}
                  course_code={res.data[i].Code}
                  course_name={res.data[i].Name}
                  course_faculty={res.data[i].Faculty}
                  course_department={res.data[i].Department}
                  course_description={res.data[i]["Course Description"]}
                  course_pre={res.data[i]["Pre-requisites"]}
                  setCourse1={this.props.setCourse1}
                  setCourse2={this.props.setCourse2}
                  course1={this.props.course1}
                  course2={this.props.course2}
                ></ResultCompare>
              );
            }
            this.setState({ results: result_temp });
          } else {
            alert("Course not found");
          }
        } else if (res.status === 500) {
          alert("System Error. Please refresh");
        }
        this.setState({ dispSpinner: false });
      })
      .catch(() => {
        let result_temp = [];
        result_temp.push(
          <Result
            key={""}
            course_id={""}
            course_code={"No results found."}
            course_name={""}
            course_faculty={""}
            course_department={""}
          ></Result>
        );
        this.setState({ results: result_temp });
        this.setState({ dispSpinner: false });
      });
  };

  render() {
    return this.state.dispSpinner ? (
      <Spinner />
    ) : (
      <div className="SearchQuery">
        <div>
          <form onSubmit={this.handleSubmit} className={"search"}>
            <input
              key={"qiao"}
              placeholder={"Search for course code, course name, keyword ..."}
              className={"text-input"}
              type="text"
              value={this.state.input}
              onChange={this.handleChange}
            />
            <input type="submit" value="Search" className={"submit-button"} />
          </form>
        </div>
        <div className={"search-result-display"}>{this.state.results}</div>
      </div>
    );
  }
}

export default SearchBarCompare;
