import React from "react";
import PropTypes from "prop-types";
import AmendBaselineButton from '../AmendBaselineButton';

export default class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  presentProject = async projectData => {
    let disabledUiSchema = this.props.generateSubmittedUiSchema.execute(projectData.schema)
    let uiSchema = this.props.generateUISchema.execute(projectData.schema, projectData.status)

    await this.setState({
      loading: false,
      formData: projectData.data,
      formSchema: projectData.schema,
      formUiSchema: uiSchema,
      disabledUiSchema: disabledUiSchema,
      projectStatus: projectData.status,
      projectType: projectData.type,
      timestamp: projectData.timestamp
    });
  };

  presentProjectNotFound = async () => {
  };

  fetchData = async () => {
    await this.props.getProject.execute(this, {
      id: this.props.match.params.projectId
    });
  };

  componentDidMount() {
    document.title = "Project - Homes England Monitor";
    this.fetchData();
  }

  renderForm() {
    return (
      <div>
        {this.props.children({
          projectStatus: this.state.projectStatus,
          formData: this.state.formData,
          formSchema: this.state.formSchema,
          formUiSchema: this.state.formUiSchema,
          disabledUiSchema: this.state.disabledUiSchema,
          projectType: this.state.projectType,
          timestamp: this.state.timestamp
        })}
      </div>
    );
  }

  render() {
    if (this.state.loading) {
      return <div data-test="loading">Loading project homepage...</div>;
    } else {
      return (
        <div>
          {this.renderForm()}
        </div>
      );
    }
  }
}

ProjectPage.propTypes = {
  getProject: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string.isRequired
    })
  })
};
