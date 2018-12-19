import React from "react";

export default class MilestoneField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: this.props.formData.description,
      milestoneBaselineCompletion: this.props.formData
        .milestoneBaselineCompletion,
      milestoneSummaryOfCriticalPath: this.props.formData
        .milestoneSummaryOfCriticalPath,

      statusAgainstLastReturn:
        this.props.formData.statusAgainstLastReturn || "On schedule",
      milestoneCompletedDate: this.props.formData.milestoneCompletedDate,
      currentReturn: this.props.formData.currentReturn,
      milestoneLastReturnDate: this.props.formData.milestoneLastReturnDate,
      milestoneVarianceAgainstBaseline: null,
      milestoneVarianceAgainstLastReturn: null,
      reasonForVariance: this.props.formData.reasonForVariance,
      milestonePercentCompleted: this.props.formData.milestonePercentCompleted
    };
  }

  onFieldChange = (name, newValue) => {
    this.setState({ [name]: newValue });
    this.setState({
      [name]: newValue,
      milestoneVarianceAgainstBaseline: this.calculateVarianceAgainstBaseline(),
      milestoneVarianceAgainstLastReturn: this.calculateVarianceAgainstLastReturn()
    }, () => {
      this.props.onChange(this.state);
    })

  };

  renderMilestoneDescription() {
    return (
      <div>
        <label htmlFor="milestoneDescription">Description</label>
        <p data-test="milestone-description" id="milestoneDescription">
          {this.state.description}
        </p>
      </div>
    );
  }


  calculateVarianceAgainstLastReturn = () => {
    if (!this.state.milestoneLastReturnDate || this.state.milestoneLastReturnDate === "") return null;
    return this.calculateVarianceWeeks(this.state.milestoneLastReturnDate, this.state.currentReturn)
  }
  
  calculateVarianceAgainstBaseline = () => {
    if (!this.state.milestoneBaselineCompletion || this.state.milestoneBaselineCompletion === "") return null;
    return this.calculateVarianceWeeks(this.state.milestoneBaselineCompletion, this.state.currentReturn)
  }

  calculateVarianceWeeks = (originalDate, newDate) => {
      let originalDateDatified = new Date(originalDate);
      let newDateDatified = new Date(newDate);

      if(newDateDatified == 'Invalid Date' || originalDateDatified == 'Inavlid Date') return ""
      return Math.round((newDateDatified - originalDateDatified)/(7 * 60 * 60 * 24 * 1000));
  }

  renderMilestoneTargetDate() {
    return (
      <div>
        <label htmlFor="milestoneBaselineCompletion">Baseline Completion Date</label>
        <p
          data-test="milestone-milestoneBaselineCompletion"
          id="milestoneBaselineCompletion"
        >
          {this.state.milestoneBaselineCompletion}
        </p>
      </div>
    );
  }

  renderMilestoneSummary() {
    return (
      <div>
        <label htmlFor="milestoneSummary">
          Summary of Baseline Critical Path
        </label>
        <p data-test="milestone-summary" id="milestoneSummary">
          {this.state.milestoneSummaryOfCriticalPath}
        </p>
      </div>
    );
  }

  renderStatusAgainstLastReturn() {
    return (
      <div>
        <label htmlFor="statusAgainstLastReturn">
          Status against last return?
        </label>
        <select
          onChange={e => this.onFieldChange("statusAgainstLastReturn", e.target.value)}
          data-test="milestone-status-against-last-return"
          value={this.state.statusAgainstLastReturn}
          className="form-control"
          id="statusAgainstLastReturn"
        >
          <option>Completed</option>
          <option>On schedule</option>
          <option>Delayed - minimal impact</option>
          <option>Delayed - moderate impact</option>
          <option>Delayed - critcal</option>

        </select>
      </div>
    );
  }

  renderCurrentReturn() {
    return (
      <div>
        <label htmlFor="currentReturn">Current Return Date</label>
        <input
          className="form-control"
          onChange={e => this.onFieldChange("currentReturn", e.target.value)}
          data-test="milestone-current-return"
          value={this.state.currentReturn || ""}
          type="date"
          id="currentReturn"
        />
      </div>
    );
  }

  renderCompletedDate = () => {
    return (
      <div>
        <label htmlFor="milestoneBaselineCompletedDate">Completion Date</label>
        <input
          className="form-control"
          onChange={e => this.onFieldChange("milestoneCompletedDate", e.target.value)}
          data-test="milestone-completed-date"
          value={this.state.milestoneCompletedDate || ""}
          type="date"
          id="milestoneCompletedDate"
        />
      </div>
    );
  }

  isDelayed = (status) => {
    return status && status.substring(0, 7) === "Delayed"
  }

  renderDate = () => {
    if(this.state.statusAgainstLastReturn === "Completed") return this.renderCompletedDate();
    if(this.isDelayed(this.state.statusAgainstLastReturn)) return this.renderCurrentReturn();
    return;
  }

  renderLastReturnVariance = () => {
    if(!this.state.milestoneLastReturnDate) return null;
    return (
      <div className="col-sm-6">
        <span>Last Return: </span>
        <span
          data-test="milestone-lastReturnVariance"
        >
          {this.state.milestoneVarianceAgainstLastReturn}
        </span>
      </div>
    )
  }

  renderVariances = () => {
    if(this.isDelayed(this.state.statusAgainstLastReturn)) {
      return (
        <div>
          <b>Variance (Weeks)</b>
          <div className="row">
            <div className="col-sm-6">
              <span>Baseline: </span>
              <span
                data-test="milestone-baselineVariance"
              >
                {this.state.milestoneVarianceAgainstBaseline}
              </span>
            </div>
            {this.renderLastReturnVariance()}
          </div>
        </div>
      );
    } else {
      return;
    }
  }

  renderReasonForVariance() {
    if(this.isDelayed(this.state.statusAgainstLastReturn)) {
      return (
        <div>
          <label htmlFor="reasonForVariance">Reason for Variance</label>
          <textarea
            className="form-control"
            onChange={e => this.onFieldChange("reasonForVariance", e.target.value)}
            data-test="milestone-reason-for-variance"
            value={this.state.reasonForVariance }
            id="reasonForVariance"
          />
        </div>
      );
    }
    else {
      return;
    }
  }

  renderMilestonePercentCompleted() {
    return (
      <div>
        <label htmlFor="milestonePercentCompleted">Percent Complete</label>
        <this.props.registry.widgets.percentage
          className="form-control"
          onChange={e => this.onFieldChange("milestonePercentCompleted", e)}
          data-test="milestone-percent-completed"
          value={this.state.milestonePercentCompleted}
          id="milestonePercentCompleted"
        />
      </div>
    );
  }

  renderBody() {
    return (
      <div className="panel-body">
        <div className="row">
          <div className="col-md-6">
            {this.renderMilestoneDescription()}
            {this.renderMilestoneTargetDate()}
          </div>
          <div className="col-md-6">
          {this.renderMilestoneSummary()}
            {this.renderMilestonePercentCompleted()}
            </div>
        </div>
        <div className="row">
          <div className="col-md-6">{this.renderStatusAgainstLastReturn()}</div>
          <div className="col-md-6">
          {this.renderVariances()}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">{this.renderDate()}</div>
          <div className="col-md-6">{this.renderReasonForVariance()}</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="panel panel-default">
        {this.renderBody()}
      </div>
    );
  }
}
