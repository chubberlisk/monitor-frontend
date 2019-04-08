import React from "react";

export default class CreateReturnButton extends React.Component {
  onClick = () => {
    this.props.create.execute(this);
  }

  creationSuccessful() {
    this.props.history.push("/project/0/return/1");
  }

  render() {
    return <button data-test="create-button" onClick={this.onClick}></button>;
  }
}
