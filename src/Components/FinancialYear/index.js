import React from 'react';

export default class FinancialYear extends React.Component {
  getDisplayYear = () => {
    if (this.props.value) {
      if (this.props.value[4] === "/") {
        return this.props.value.split("/")[0];
      } else {
        return this.props.value.split("-")[0]-1;
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
      return "/"+this.props.value.substring(2, 4);
    }
  }

  render = () =>
    <div className="input-group FinancialYear">
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
