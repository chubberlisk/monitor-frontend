import React from "react";

export default class S151Funding extends React.Component {
  constructor(props) {
    super(props);
  }

  renderBaseline = () => {
    let index = 0;
    return (
      <div className="row" data-test="baseline">
        <div className="col-md-2" data-test="period">
          {this.props.formData[index].period}
        </div>
        <div className="col-md-2" data-test="baseline1">
          {this.props.formData[index].instalment1}
        </div>
        <div className="col-md-2" data-test="baseline2">
          {this.props.formData[index].instalment2}
        </div>
        <div className="col-md-2" data-test="baseline3">
          {this.props.formData[index].instalment3}
        </div>
        <div className="col-md-2" data-test="baseline4">
          {this.props.formData[index].instalment4}
        </div>
        <div className="col-md-2" data-test="total">
          {this.props.formData[index].total}
        </div>
      </div>
    );
  };

  renderVariance = () => {
    let index = 0;
    return (
      <div className="row" data-test="variance">
        <div className="col-md-2" data-test="" />
        <div className="col-md-2" data-test="variance1">
          {this.props.formData[index].baselineVariance1}
        </div>
        <div className="col-md-2" data-test="variance2">
          {this.props.formData[index].baselineVariance2}
        </div>
        <div className="col-md-2" data-test="variance3">
          {this.props.formData[index].baselineVariance3}
        </div>
        <div className="col-md-2" data-test="variance4">
          {this.props.formData[index].baselineVariance4}
        </div>
        <div className="col-md-2" data-test="varianceTotal">
          {this.calculateVarianceTotal(index)}
        </div>
      </div>
    );
  };

  renderMovement = () => {
    let index = 0;
    return (
      <div className="row" data-test="lastMovement">
        <div className="col-md-2" data-test="" />
        <div className="col-md-2" data-test="movement1">
          {this.props.formData[index].lastMovement1}
        </div>
        <div className="col-md-2" data-test="movement2">
          {this.props.formData[index].lastMovement2}
        </div>
        <div className="col-md-2" data-test="movement3">
          {this.props.formData[index].lastMovement3}
        </div>
        <div className="col-md-2" data-test="movement4">
          {this.props.formData[index].lastMovement4}
        </div>
        <div className="col-md-2" data-test="movementTotal">
          {this.calculateMovementTotal(index)}
        </div>
      </div>
    );
  };

  renderMovementVariance = () => {
    let index = 0;
    return (
      <div className="row" data-test="movementVariance">
        <div className="col-md-2" data-test="" />
        <div className="col-md-2" data-test="movementVar1">
          {this.props.formData[index].movementVariance1}
        </div>
        <div className="col-md-2" data-test="movementVar2">
          {this.props.formData[index].movementVariance2}
        </div>
        <div className="col-md-2" data-test="movementVar3">
          {this.props.formData[index].movementVariance3}
        </div>
        <div className="col-md-2" data-test="movementVar4">
          {this.props.formData[index].movementVariance4}
        </div>
        <div className="col-md-2" data-test="movementVarTotal">
          {this.calculateMovementVarianceTotal(index)}
        </div>
      </div>
    );
  };

  calculateVarianceTotal = index => {
    return (
      parseInt(this.props.formData[index].baselineVariance1) +
      parseInt(this.props.formData[index].baselineVariance2) +
      parseInt(this.props.formData[index].baselineVariance3) +
      parseInt(this.props.formData[index].baselineVariance4)
    );
  };

  calculateMovementTotal = index => {
    return (
      parseInt(this.props.formData[index].lastMovement1) +
      parseInt(this.props.formData[index].lastMovement2) +
      parseInt(this.props.formData[index].lastMovement3) +
      parseInt(this.props.formData[index].lastMovement4)
    );
  };

  calculateMovementVarianceTotal = index => {
    return (
      parseInt(this.props.formData[index].movementVariance1) +
      parseInt(this.props.formData[index].movementVariance2) +
      parseInt(this.props.formData[index].movementVariance3) +
      parseInt(this.props.formData[index].movementVariance4)
    );
  };

  renderHeader = () => {
    return (
      <div className="row" data-test="header">
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
