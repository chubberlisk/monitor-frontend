import GetProjectAdmin from '.';

describe('GetProjectAdmin', () => {
  let projectGatewaySpy;

  function getUseCase(foundProjectAdmin) {
    projectGatewaySpy = {
      getAdmin: jest.fn(() => ({
        success: true,
        adminSchema: foundProjectAdmin.schema,
        adminData: foundProjectAdmin.data,
        timestamp: foundProjectAdmin.timestamp
      })),
    };
    return new GetProjectAdmin(projectGatewaySpy);
  }

  describe('Given a project is successfully found', () => {
    describe('Example one', () => {
      let foundProjectAdmin, useCase;

      beforeEach(() => {
        foundProjectAdmin = {
          timestamp: 12,
          data: {
            claim: 'cat',
          },
          schema: { moo: 'duck' }
        };

        useCase = getUseCase(foundProjectAdmin);
      });

      it('Calls the gateway with the correct ID', async () => {
        let presenterSpy = {presentAdmin: jest.fn()};
        await useCase.execute(presenterSpy, {projectId: 2});
        expect(projectGatewaySpy.getAdmin).toBeCalledWith(2);
      });

      it('Presents the project admin data', async () => {
        let presenterSpy = {presentAdmin: jest.fn()};
        await useCase.execute(presenterSpy, {projectId: 2});
        expect(presenterSpy.presentAdmin).toBeCalledWith(foundProjectAdmin);
      });
    });

    describe('Example two', () => {
      let foundProjectAdmin, useCase;

      beforeEach(() => {
        foundProjectAdmin = {
          timestamp: 56,
          data: {
            duck: 'quack',
          },
          schema: {wolf: 'Awoo'}
        };

        useCase = getUseCase(foundProjectAdmin);
      });

      it('Calls the gateway with the correct ID', async () => {
        let presenterSpy = {presentAdmin: jest.fn()};
        await useCase.execute(presenterSpy, {projectId: 6});
        expect(projectGatewaySpy.getAdmin).toBeCalledWith(6);
      });

      it('Presents the project', async () => {
        let presenterSpy = {presentAdmin: jest.fn()};
        await useCase.execute(presenterSpy, {projectId: 6});
        expect(presenterSpy.presentAdmin).toBeCalledWith(foundProjectAdmin);
      });
    });
  });

  describe('Given a project is not found', () => {
    it('Presents the admin not found', async () => {
      let projectGatewaySpy = {
        getAdmin: jest.fn(() => ({success: false})),
      };
      let useCase = new GetProjectAdmin(projectGatewaySpy);
      let presenterSpy = {adminNotFound: jest.fn()};
      await useCase.execute(presenterSpy, {projectId: 6});
      expect(presenterSpy.adminNotFound).toBeCalled();
    });
  });
});
