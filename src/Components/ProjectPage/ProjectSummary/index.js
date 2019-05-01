import React from "react";
import "./style.css";

export default class ProjectSummary extends React.Component {
  render() {
    return (
      <div data-test="summary" className="summary-field">
        <div className="">
          <h3 className="" data-test="project_name">
            {this.props.data.summary.projectName}
          </h3>
        </div>
        <div className="" data-test="project_description">
          <p className="">{this.props.data.summary.projectDescription}</p>
        </div>
      </div>
    );
  }
}
