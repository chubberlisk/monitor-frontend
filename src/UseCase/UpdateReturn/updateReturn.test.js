import UpdateReturn from ".";

describe("UpdateReturn", () => {
  let returnGatewaySpy, presenterSpy;

  function getUseCase(successfulUpdate, returnId, projectId) {
    returnGatewaySpy = {
      update: jest.fn(() => ({ success: successfulUpdate, projectId, returnId }))
    };

    return new UpdateReturn(returnGatewaySpy);
  }

  beforeEach(() => {
    presenterSpy = {
      updateSuccessful: jest.fn(),
      updateUnsuccessful: jest.fn()
    };
  });

  describe("Example one", () => {
    let useCase;

    describe("With successful update", () => {
      beforeEach(async () => {
        useCase = getUseCase(true, 1, 9);
        await useCase.execute(presenterSpy, {
          projectId: 9,
          returnId: 1,
          data: { cats: "meow" },
          schema: { ducks: "quack"}
        });
      });

      it("Passes the data to the gateway", () => {
        expect(returnGatewaySpy.update).toBeCalledWith(9, 1, { cats: "meow" });
      });

      it("Calls update successful with the id on the presenter when the update suceeded", () => {
        expect(presenterSpy.updateSuccessful).toBeCalledWith(1);
      });
    });

    describe("With unsuccessful update", () => {
      it("Presenter recieves update unsuccessful", async () => {
        useCase = getUseCase(false);
        await useCase.execute(presenterSpy, { data: { cats: "meow" } });
        expect(presenterSpy.updateUnsuccessful).toBeCalled();
      });
    });
  });

  describe("Example two", () => {
    let useCase;

    describe("With successful update", () => {
      beforeEach(async () => {
        useCase = getUseCase(true, 2, 3);
        await useCase.execute(presenterSpy, {
          projectId: 3,
          returnId: 2,
          data: { dogs: "woof" },
          schema: { cow: "moo"}
        });
      });

      it("Passes the data to the gateway", async () => {
        expect(returnGatewaySpy.update).toBeCalledWith(3, 2, { dogs: "woof" });
      });

      it("Calls update successful with the id on the presenter when the update suceeded", () => {
        expect(presenterSpy.updateSuccessful).toBeCalledWith(2);
      });
    });

    describe("With unsuccessful update", () => {
      it("Presenter recieves update unsuccessful", async () => {
        useCase = getUseCase(false);
        await useCase.execute(presenterSpy, { data: { dogs: "woof" } });
        expect(presenterSpy.updateUnsuccessful).toBeCalled();
      });
    });
  });
});
