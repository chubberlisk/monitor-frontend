import CreateReturn from ".";

describe("SubmitReturn", () => {
  let returnGatewaySpy, presenterSpy;

  function getUseCase(successfulSubmission, returnId = undefined) {
    returnGatewaySpy = {
      create: jest.fn(() => ({ success: successfulSubmission, returnId }))
    };

    return new CreateReturn(returnGatewaySpy);
  }

  beforeEach(() => {
    presenterSpy = {
      creationSuccessful: jest.fn(),
      creationUnsuccessful: jest.fn()
    };
  });

  describe("Example one", () => {
    let useCase;

    describe("With successful creation", () => {
      beforeEach(async () => {
        useCase = getUseCase(true, 1);
        await useCase.execute(presenterSpy, {
          projectId: 1,
          data: { cats: "meow" },
          schema: { ducks: "quack"}
        });
      });

      it("Passes the data to the gateway", () => {
        expect(returnGatewaySpy.create).toBeCalledWith(1, { cats: "meow" });
      });

      it("Calls creation successful with the id on the presenter when the creation suceeded", () => {
        expect(presenterSpy.creationSuccessful).toBeCalledWith(1);
      });
    });

    describe("With unsuccessful creation", () => {
      it("Presenter recieves creation unsuccessful", async () => {
        useCase = getUseCase(false);
        await useCase.execute(presenterSpy, { data: { cats: "meow" } });
        expect(presenterSpy.creationUnsuccessful).toBeCalled();
      });
    });
  });

  describe("Example two", () => {
    let useCase;

    describe("With successful creation", () => {
      beforeEach(async () => {
        useCase = getUseCase(true, 2);
        await useCase.execute(presenterSpy, {
          projectId: 2,
          data: { dogs: "woof" },
          schema: { cow: "moo"}
        });
      });

      it("Passes the data to the gateway", async () => {
        expect(returnGatewaySpy.create).toBeCalledWith(2, { dogs: "woof" });
      });

      it("Calls creation successful with the id on the presenter when the creation suceeded", () => {
        expect(presenterSpy.creationSuccessful).toBeCalledWith(2);
      });
    });

    describe("With unsuccessful creation", () => {
      it("Presenter recieves creation unsuccessful", async () => {
        useCase = getUseCase(false);
        await useCase.execute(presenterSpy, { data: { dogs: "woof" } });
        expect(presenterSpy.creationUnsuccessful).toBeCalled();
      });
    });
  });
});

