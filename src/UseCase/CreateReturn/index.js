export default class CreateReturn {
  constructor(returnGateway) {
    this.returnGateway = returnGateway;
  }

  async execute(presenter, request) {
    let { success, returnId } = await this.returnGateway.create(
      request.projectId,
      request.data
    );

    if (success) {
      await presenter.creationSuccessful(returnId);
    } else {
      await presenter.creationUnsuccessful();
    }
  }
}
