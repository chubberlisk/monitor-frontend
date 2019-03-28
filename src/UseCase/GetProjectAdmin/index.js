export default class GetProjectAdmin {
  constructor(projectGateway) {
    this.projectGateway = projectGateway;
  }

  async execute(presenter, request) {
    let {success, adminData, adminSchema, timestamp} = await this.projectGateway.getAdmin(request.projectId);
    if (success) {
      presenter.presentAdmin({
        data: adminData,
        schema: adminSchema,
        timestamp: timestamp
      });
    } else {
      presenter.adminNotFound();
    }
  }
}
