import React from 'react';

export default class FinancialYearWidget extends React.Component {
  cleanValueString = (value) =>
    value.replace(/[^0-9/-]/g, "");

  getDisplayYear = () => {
    if (this.props.value) {
      let value = this.cleanValueString(this.props.value);
      if (value[4] === "/") {
        return value.split("/")[0];
      } else if (value[2] === "/") {
        return "20"+value.split("/")[0];
      } else {
        return value.split("-")[0]-1;
      }
    }

    return "";
  }

  cleanInputString = (value) =>
    value.replace(/[^0-9]/g, "");

  getFinancialYearEnd = (startYear) =>
    `${Number(this.cleanInputString(startYear))+1}-03-31`

  onChange = (e) => {
    this.props.onChange(this.getFinancialYearEnd(e.target.value));
  }

  getShortEndDate = () => {
    if (this.props.value) {
      return "/"+(this.props.value.split("-")[0].substr(-2));
    } else {
      return "/yy";
    }
  }

  render = () =>
    <div className="input-group FinancialYearWidget">
      <input
        type="text"
        className="form-control"
        placeholder="yyyy"
        data-test="start-year"
        value={String(this.getDisplayYear())}
        onChange={this.onChange}
      />
      <div className="input-group-addon">
        <span data-test="end-year" className="input-group-text">
          {this.getShortEndDate()}
        </span>
      </div>
    </div>
}
