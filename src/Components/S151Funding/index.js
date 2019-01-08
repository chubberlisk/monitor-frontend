import React from "react";
import "./style.css";

export default class S151Funding extends React.Component {
  constructor(props) {
    super(props);
  }

  renderBaseline = () => {
    return (
      <div className="row" data-test="baseline">
        <div className="col-md-2" data-test="period">
          {this.props.formData.period}
        </div>
        <div className="col-md-2" data-test="baseline1">
          £{this.props.formData.instalment1}
        </div>
        <div className="col-md-2" data-test="baseline2">
          £{this.props.formData.instalment2}
        </div>
        <div className="col-md-2" data-test="baseline3">
          £{this.props.formData.instalment3}
        </div>
        <div className="col-md-2" data-test="baseline4">
          £{this.props.formData.instalment4}
        </div>
        <div className="col-md-2" data-test="total">
          £{this.props.formData.total}
        </div>
      </div>
    );
  };

  renderVariance = () => {
    if (this.isVariance()) {
      return (
        <div className="row" data-test="variance">
          <div className="col-md-2" />
          <div className="col-md-2" data-test="variance1">
            £{this.props.formData.baselineVariance1}
          </div>
          <div className="col-md-2" data-test="variance2">
            £{this.props.formData.baselineVariance2}
          </div>
          <div className="col-md-2" data-test="variance3">
            £{this.props.formData.baselineVariance3}
          </div>
          <div className="col-md-2" data-test="variance4">
            £{this.props.formData.baselineVariance4}
          </div>
          <div className="col-md-2" data-test="varianceTotal">
            £{this.calculateVarianceTotal()}
          </div>
        </div>
      );
    }
  };

  isVariance = () => {
    if (isNaN(this.calculateVarianceTotal())) {
      return false;
    } else {
      return true;
    }
  };

  renderMovement = () => {
    if (this.isMovement()) {
      return (
        <div className="row" data-test="lastMovement">
          <div className="col-md-2" />
          <div className="col-md-2" data-test="movement1">
            £{this.props.formData.lastMovement1}
          </div>
          <div className="col-md-2" data-test="movement2">
            £{this.props.formData.lastMovement2}
          </div>
          <div className="col-md-2" data-test="movement3">
            £{this.props.formData.lastMovement3}
          </div>
          <div className="col-md-2" data-test="movement4">
            £{this.props.formData.lastMovement4}
          </div>
          <div className="col-md-2" data-test="movementTotal">
            £{this.calculateMovementTotal()}
          </div>
        </div>
      );
    }
  };

  isMovement = () => {
    if (isNaN(this.calculateMovementTotal())) {
      return false;
    } else {
      return true;
    }
  };

  renderMovementVariance = () => {
    if (this.isMovementVariance()) {
      return (
        <div className="row" data-test="movementVariance">
          <div className="col-md-2" />
          <div className="col-md-2" data-test="movementVar1">
            £{this.props.formData.movementVariance1}
          </div>
          <div className="col-md-2" data-test="movementVar2">
            £{this.props.formData.movementVariance2}
          </div>
          <div className="col-md-2" data-test="movementVar3">
            £{this.props.formData.movementVariance3}
          </div>
          <div className="col-md-2" data-test="movementVar4">
            £{this.props.formData.movementVariance4}
          </div>
          <div className="col-md-2" data-test="movementVarTotal">
            £{this.calculateMovementVarianceTotal()}
          </div>
        </div>
      );
    }
  };

  isMovementVariance = () => {
    if (isNaN(this.calculateMovementVarianceTotal())) {
      return false;
    } else {
      return true;
    }
  };

  calculateVarianceTotal = () => {
    return (
      parseInt(this.props.formData.baselineVariance1) +
      parseInt(this.props.formData.baselineVariance2) +
      parseInt(this.props.formData.baselineVariance3) +
      parseInt(this.props.formData.baselineVariance4)
    );
  };

  calculateMovementTotal = () => {
    return (
      parseInt(this.props.formData.lastMovement1) +
      parseInt(this.props.formData.lastMovement2) +
      parseInt(this.props.formData.lastMovement3) +
      parseInt(this.props.formData.lastMovement4)
    );
  };

  calculateMovementVarianceTotal = () => {
    return (
      parseInt(this.props.formData.movementVariance1) +
      parseInt(this.props.formData.movementVariance2) +
      parseInt(this.props.formData.movementVariance3) +
      parseInt(this.props.formData.movementVariance4)
    );
  };

  renderHeader = () => {
    return (
      <div className="row header" data-test="header">
        <div className="col-md-2">Period</div>
        <div className="col-md-2">1st Instalment</div>
        <div className="col-md-2">2nd Instalment</div>
        <div className="col-md-2">3rd Instalment</div>
        <div className="col-md-2">4th Instalment</div>
        <div className="col-md-2">Total</div>
      </div>
    );
  };

  render = () => {
    console.log(this.props.formData);
    return (
      <div>
        {this.renderHeader()}
        {this.renderBaseline()}
        {this.renderVariance()}
        {this.renderMovement()}
        {this.renderMovementVariance()}
      </div>
    );
  };
}
