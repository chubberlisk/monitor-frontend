import React from "react";
import PropTypes from "prop-types";

export default class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  presentProject = async projectData => {
    let uiSchema = {}
    if(projectData.status==="LA Draft") {
      uiSchema = this.props.generateReadOnlySchema.execute(projectData.schema, 'laReadOnly');
    }

    await this.setState({
      loading: false,
      formData: projectData.data,
      formSchema: projectData.schema,
      formUiSchema: uiSchema,
      projectStatus: projectData.status
    });
  };    

  presentProjectNotFound = async () => {};

  fetchData = () => {
    this.props.getProject.execute(this, {
      id: this.props.match.params.id
    });
  };

  componentDidMount() {
    document.title = "Project - Homes England Monitor";
    this.fetchData();
  }

  createReturn = async e => {
    this.props.history.push(`/project/${this.props.match.params.id}/return`);
    e.preventDefault();
  };

  renderForm() {
    if (this.state.loading) {
      return <div />;
    }

    return (
      <div>
        {this.props.children({
          projectStatus: this.state.projectStatus,
          formData: this.state.formData,
          formSchema: this.state.formSchema,
          formUiSchema: this.state.formUiSchema
        })}
      </div>
    );
  }

  render() {
    return (
      <div className="container-fluid">
        {this.renderForm()}
      </div>
    );
  }
}

ProjectPage.propTypes = {
  getProject: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
};
