import React from "react";
import "./style.css";

export default class S151Funding extends React.Component {
  renderBaseline = () => {
    return (
      <div className="row" data-test="baseline">
        <div className="col-md-2" data-test="period">
          {this.props.formData.period}
        </div>
        <div className="col-md-2" data-test="baseline1">
          £{this.insertCommas(this.props.formData.instalment01)}
        </div>
        <div className="col-md-2" data-test="baseline2">
          £{this.insertCommas(this.props.formData.instalment02)}
        </div>
        <div className="col-md-2" data-test="baseline3">
          £{this.insertCommas(this.props.formData.instalment03)}
        </div>
        <div className="col-md-2" data-test="baseline4">
          £{this.insertCommas(this.props.formData.instalment04)}
        </div>
        <div className="col-md-2" data-test="total">
          £{this.insertCommas(this.props.formData.total)}
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
            £{this.insertCommas(this.props.formData.instalment1)}
          </div>
          <div className="col-md-2" data-test="variance2">
            £{this.insertCommas(this.props.formData.instalment2)}
          </div>
          <div className="col-md-2" data-test="variance3">
            £{this.insertCommas(this.props.formData.instalment3)}
          </div>
          <div className="col-md-2" data-test="variance4">
            £{this.insertCommas(this.props.formData.instalment4)}
          </div>
          <div className="col-md-2" data-test="varianceTotal">
            £{this.insertCommas(this.calculateVarianceTotal())}
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
            £{this.insertCommas(this.props.formData.lastMovement1)}
          </div>
          <div className="col-md-2" data-test="movement2">
            £{this.insertCommas(this.props.formData.lastMovement2)}
          </div>
          <div className="col-md-2" data-test="movement3">
            £{this.insertCommas(this.props.formData.lastMovement3)}
          </div>
          <div className="col-md-2" data-test="movement4">
            £{this.insertCommas(this.props.formData.lastMovement4)}
          </div>
          <div className="col-md-2" data-test="movementTotal">
            £{this.insertCommas(this.calculateMovementTotal())}
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
            £{this.insertCommas(this.props.formData.movementVariance1)}
          </div>
          <div className="col-md-2" data-test="movementVar2">
            £{this.insertCommas(this.props.formData.movementVariance2)}
          </div>
          <div className="col-md-2" data-test="movementVar3">
            £{this.insertCommas(this.props.formData.movementVariance3)}
          </div>
          <div className="col-md-2" data-test="movementVar4">
            £{this.insertCommas(this.props.formData.movementVariance4)}
          </div>
          <div className="col-md-2" data-test="movementVarTotal">
            £{this.insertCommas(this.calculateMovementVarianceTotal())}
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
    let total =
      parseInt(this.props.formData.instalment1, 10) +
      parseInt(this.props.formData.instalment2, 10) +
      parseInt(this.props.formData.instalment3, 10) +
      parseInt(this.props.formData.instalment4, 10);
    return total.toString();
  };

  calculateMovementTotal = () => {
    let total =
      parseInt(this.props.formData.lastMovement1, 10) +
      parseInt(this.props.formData.lastMovement2, 10) +
      parseInt(this.props.formData.lastMovement3, 10) +
      parseInt(this.props.formData.lastMovement4, 10);
    return total.toString();
  };

  calculateMovementVarianceTotal = () => {
    let total =
      parseInt(this.props.formData.movementVariance1, 10) +
      parseInt(this.props.formData.movementVariance2, 10) +
      parseInt(this.props.formData.movementVariance3, 10) +
      parseInt(this.props.formData.movementVariance4, 10);
    return total.toString();
  };

  insertCommas = value => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, digits => digits + ",");
  }

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
