import React from "react";
import ParentForm from "../ParentForm";

export default class AdminPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: this.props.data,
      timestamp: this.props.timestamp,
      status: "viewing"
    }
  }

  onChange = async data => {
    await this.setState({
      data: data.formData.admin
    })
  }

  projectUpdated = (errors, timestamp) => {
    if (errors && errors.length > 0) {
      this.setState({
        updateError: "overwrite"
      })
    } else {
      this.setState({
        timestamp: timestamp,
        status: "updated"
      })
    }
  }
  
  projectNotUpdated= () => {
    this.setState({
      updateError: "timeout"
    })
  }

  update = async () => {
    this.setState({
      status: "updating"
    });

    await this.props.onEditToggle()

    await this.props.update.execute(this, {
      projectId: this.props.projectId,
      data: this.state.data,
      timestamp: this.state.timestamp
    })
  }

  edit = async () => {
    await this.props.onEditToggle();
    
    await this.setState({
      status: "editting"
    })
  }

  saveButton = () => (
    <button
      data-test="save-button"
      onClick={this.update}
      className = "btn btn-primary form-button"
    >
      Save Project Admin
    </button>
  )

  editButton = () => (
    <button
      data-test="edit-button"
      onClick={this.edit}
      className = "btn btn-primary form-button"
    >
      Edit Project Admin
    </button>
  )

  renderButton = () => {
    if (this.props.getRole.execute().role === "Local Authority") {
      return <div/>
    } 
    if (this.state.status === "viewing" || this.state.status === "updated") {
      return this.editButton()
    } else if (this.state.status === "editting") {
      return this.saveButton()
    }
  }

  renderMessages = () => {
    if(this.state.status === "updated") {
      return this.renderSaveSuccess()
    } else if (this.state.updateError === "overwrite") {
      return this.renderOverWritingError()
    } else if (this.state.updateError === "timeout") {
      return this.renderSaveError()
    }
  }


  renderOverWritingError = () => (
      <div
        className="alert alert-danger"
        role="alert"
        data-test="overwriting-error"
      >
        <strong>Error:</strong> You cannot save as newer data has already been saved to the system.<br />
      </div>
    );

  renderSaveSuccess = () => (
    <div
      data-test="save-success"
      role="alert"
      className="alert alert-success"
    >
      Update Successful!
    </div>
  )

  renderSaveError = () => (
    <div
      className="alert alert-danger"
      role="alert"
      data-test="save-unsuccessful-error">
      <strong>Error:</strong> Failed to save, please ensure that you are connected to the internet.
    </div>
    )

  composeAdminSchema = () => {
    return {
      type: "object",
      properties: {
        admin: {
          type: "object",
          title: "Project Admin",
          properties: this.props.schema.properties
        }
      }
    }
  }

  composeUISchema = () => (
    {
      admin: this.props.uiSchema
    }
  )

  composeFormData = () => (
    {
      admin: this.state.data
    }
  )


  render() {
    return <div>
      {this.renderMessages()}
      <div className="col-md-offset-3 col-md-9">
        {this.renderButton()}
      </div>
      <ParentForm
        schema={this.composeAdminSchema()}
        uiSchema={this.composeUISchema()}
        formData={this.composeFormData()}
        getRole={this.props.getRole}
        onChange = { this.onChange }
        documentGateway={this.props.documentGateway}
      />
    </div>
  }
}