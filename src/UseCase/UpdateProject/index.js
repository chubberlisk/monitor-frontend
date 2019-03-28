export default class UpdateProject {
  constructor(baselineGateway) {
    this.baselineGateway = baselineGateway
  }

  async execute(presenter, request) {
    let {success, errors, new_timestamp} = await this.baselineGateway.update(request.projectId, request.data, request.timestamp);

    if (success) {
      presenter.projectUpdated(errors, new_timestamp);
    } else {
      presenter.projectNotUpdated();
    }
  }
}
