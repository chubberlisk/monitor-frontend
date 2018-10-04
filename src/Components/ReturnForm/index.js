import React from 'react';
import ParentForm from '../ParentForm'
import './style.css';

export default class ReturnForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {formData: props.data};
  }

  renderActions = () => {
    if (this.props.status === 'Submitted') {
      return <div />;
    }

    if (this.props.status === 'New') {
      return (
        <div className="col-md-offset-3 col-md-9 return-actions">
          <button
            className="btn btn-primary return-btn"
            data-test="create-return-button"
            onClick={() => this.props.onCreate(this.state.formData)}>
            Create Draft Return
          </button>
        </div>
      );
    }

    if (this.props.status == 'Updating') {
      return (
        <div className="col-md-offset-3 col-md-9 return-actions">
          <button
            className="btn return-btn disabled"
            data-test="disabled-save-return-button">
            Save Draft
          </button>
          <button
            className="btn return-btn disabled"
            data-test="disabled-submit-return-button">
            Submit Return
          </button>
        </div>
      );
    }

    return (
      <div className="col-md-offset-3 col-md-9 return-actions">
        <button
          className="btn btn-secondary return-btn"
          data-test="save-return-button"
          onClick={() => this.props.onSave(this.state.formData)}>
          Save Draft
        </button>
        <button
          className="btn btn-primary return-btn"
          data-test="submit-return-button"
          onClick={() => this.props.onSubmit(this.state.formData)}>
          Submit Return
        </button>
      </div>
    );
  };

  onFormChange = ({formData}) => {
    this.setState({formData});
    if (this.props.onChange) {
      this.props.onChange(this.state.formData);
    }
  }
  render() {
    return (
      <div>
        <ParentForm
          schema={this.props.schema}
          uiSchema={this.props.uiSchema}
          formData={this.state.formData}
          onChange={this.onFormChange}
          >
          {this.renderActions()}
        </ParentForm>
      </div>
    );
  }
}
