export default class UpdateProject {
  constructor(gateway) {
    this.gateway = gateway
  }

  async execute(presenter, request) {
    let {success, errors, new_timestamp} = await this.gateway.update(request.projectId, request.data, request.timestamp);

    if (success) {
      presenter.projectUpdated(errors, new_timestamp);
    } else {
      presenter.projectNotUpdated();
    }
  }
}
