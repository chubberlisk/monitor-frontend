import React from "react";

export default class AdminPageProvider extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      status: "viewing"
    }
  }

  componentDidMount = () => {
    this.props.getProjectAdmin.execute(this, { projectId: this.props.match.params.projectId })
  }
  
  presentAdmin = (adminDetails) => {
    let uiSchema = this.props.generateDisabledUiSchema.execute(adminDetails.schema)

    this.setState({
      loading: false,
      schema: adminDetails.schema,
      data: adminDetails.data,
      uiSchema: uiSchema,
      timestamp: adminDetails.timestamp
    })
  }

  onEditToggle = () => {
    if (this.state.status === "viewing") {
      let uiSchema = this.props.generateUiSchema.execute(this.state.schema)
      
      this.setState({
        uiSchema: uiSchema,
        status: "editting"
      })
    } else { 
      let uiSchema = this.props.generateDisabledUiSchema.execute(this.state.schema)

      this.setState({
        uiSchema: uiSchema,
        status: "viewing"
      })
    }
  }

  render() {
    if (this.state.loading) {
      return <div data-test="loading"/>
    } else {
      return <div>
        {this.props.children({
          projectId: this.props.match.params.projectId,
          schema: this.state.schema,
          data: this.state.data,
          uiSchema: this.state.uiSchema,
          timestamp: this.state.timestamp,
          onEditToggle: this.onEditToggle
        })}
      </div>
    }
  }
}