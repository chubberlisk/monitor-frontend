import React from 'react';

export default class FinancialYearWidget extends React.Component {
  getDisplayYear = () => {
    if (this.props.value) {
      if (this.props.value[4] === "/") {
        return this.props.value.split("/")[0];
      } else {
        return (new Date(this.props.value)).getFullYear()-1;
      }
    }

    return "";
  }

  getFinancialYearEnd = (startYear) =>
    `${Number(startYear)+1}-03-31`

  onChange = (e) => {
    this.props.onChange(this.getFinancialYearEnd(e.target.value));
  }

  getShortEndDate = () => {
    if (this.props.value) {
      return "/"+(String((new Date(this.props.value)).getFullYear()).substr(-2));
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
