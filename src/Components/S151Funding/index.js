import React from "react";

export default class S151Funding extends React.Component {
  constructor(props) {
    super(props);
  }

  renderBaseline = index => {
    return (
      <div className="row" data-test={`baseline-${index}`}>
        <div className="col-md-2" data-test={`period-${index}`}>
          {this.props.formData[index].period}
        </div>
        <div className="col-md-2" data-test={`baseline1-${index}`}>
          {this.props.formData[index].instalment1}
        </div>
        <div className="col-md-2" data-test={`baseline2-${index}`}>
          {this.props.formData[index].instalment2}
        </div>
        <div className="col-md-2" data-test={`baseline3-${index}`}>
          {this.props.formData[index].instalment3}
        </div>
        <div className="col-md-2" data-test={`baseline4-${index}`}>
          {this.props.formData[index].instalment4}
        </div>
        <div className="col-md-2" data-test={`total-${index}`}>
          {this.props.formData[index].total}
        </div>
      </div>
    );
  };

  renderVariance = index => {
    return (
      <div className="row" data-test={`variance-${index}`}>
        <div className="col-md-2" />
        <div className="col-md-2" data-test={`variance1-${index}`}>
          {this.props.formData[index].baselineVariance1}
        </div>
        <div className="col-md-2" data-test={`variance2-${index}`}>
          {this.props.formData[index].baselineVariance2}
        </div>
        <div className="col-md-2" data-test={`variance3-${index}`}>
          {this.props.formData[index].baselineVariance3}
        </div>
        <div className="col-md-2" data-test={`variance4-${index}`}>
          {this.props.formData[index].baselineVariance4}
        </div>
        <div className="col-md-2" data-test={`varianceTotal-${index}`}>
          {this.calculateVarianceTotal(index)}
        </div>
      </div>
    );
  };

  renderMovement = index => {
    return (
      <div className="row" data-test={`lastMovement-${index}`}>
        <div className="col-md-2" />
        <div className="col-md-2" data-test={`movement1-${index}`}>
          {this.props.formData[index].lastMovement1}
        </div>
        <div className="col-md-2" data-test={`movement2-${index}`}>
          {this.props.formData[index].lastMovement2}
        </div>
        <div className="col-md-2" data-test={`movement3-${index}`}>
          {this.props.formData[index].lastMovement3}
        </div>
        <div className="col-md-2" data-test={`movement4-${index}`}>
          {this.props.formData[index].lastMovement4}
        </div>
        <div className="col-md-2" data-test={`movementTotal-${index}`}>
          {this.calculateMovementTotal(index)}
        </div>
      </div>
    );
  };

  renderMovementVariance = index => {
    return (
      <div className="row" data-test={`movementVariance-${index}`}>
        <div className="col-md-2" />
        <div className="col-md-2" data-test={`movementVar1-${index}`}>
          {this.props.formData[index].movementVariance1}
        </div>
        <div className="col-md-2" data-test={`movementVar2-${index}`}>
          {this.props.formData[index].movementVariance2}
        </div>
        <div className="col-md-2" data-test={`movementVar3-${index}`}>
          {this.props.formData[index].movementVariance3}
        </div>
        <div className="col-md-2" data-test={`movementVar4-${index}`}>
          {this.props.formData[index].movementVariance4}
        </div>
        <div className="col-md-2" data-test={`movementVarTotal-${index}`}>
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

  renderBody = () => {
    let arrayLength = this.props.formData.length;
    for (let index = 0; index < arrayLength; index++) {
      return (
        <div>
          {this.renderBaseline(index)}
          {this.renderVariance(index)}
          {this.renderMovement(index)}
          {this.renderMovementVariance(index)}
        </div>
      );
    }
  };

  render = () => {
    return (
      <div>
        {this.renderHeader()}
        {this.renderBody()}
      </div>
    );
  };
}
