export default class CreateMonthlyCatchUp {
  constructor({ monthlyCatchUpGateway }) {
    this.monthlyCatchUpGateway = monthlyCatchUpGateway;
  }

  async execute(presenter, { projectId, data }) {
    let { success, monthlyCatchUpId } = await this.monthlyCatchUpGateway.create(
      projectId,
      data
    );

    if (success) {
      presenter.presentCreatedCatchUp({ monthlyCatchUpId });
    } else {
      presenter.presentUnsuccessfulCreation();
    }
  }
}
