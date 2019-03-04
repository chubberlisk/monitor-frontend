import SubmitClaim from ".";

describe("SubmitClaim", () => {
  let claimGatewaySpy, presenterSpy;

  function getUseCase(successfulSubmission, id = undefined) {
    claimGatewaySpy = {
      submit: jest.fn(() => ({ success: successfulSubmission, id }))
    };

    return new SubmitClaim(claimGatewaySpy);
  }

  beforeEach(() => {
    presenterSpy = {
      submissionSuccessful: jest.fn(),
      submissionUnsuccessful: jest.fn()
    };
  });

  describe("Example one", () => {
    let useCase;

    describe("With successful submission", () => {
      beforeEach(async () => {
        useCase = getUseCase(true, 1);
        await useCase.execute(presenterSpy, {
          projectId: 1,
          id: 1,
          data: { cats: "meow" },
          schema: { ducks: "quack"}
        });
      });

      it("Passes the data to the gateway", () => {
        expect(claimGatewaySpy.submit).toBeCalledWith(1, 1, { cats: "meow" });
      });

      it("Calls submission successful with the id on the presenter when the submission suceeded", () => {
        expect(presenterSpy.submissionSuccessful).toBeCalledWith(1);
      });
    });

    describe("With unsuccessful submission", () => {
      it("Presenter recieves submission unsuccessful", async () => {
        useCase = getUseCase(false);
        await useCase.execute(presenterSpy, { data: { cats: "meow" } });
        expect(presenterSpy.submissionUnsuccessful).toBeCalled();
      });
    });
  });

  describe("Example two", () => {
    let useCase;

    describe("With successful submission", () => {
      beforeEach(async () => {
        useCase = getUseCase(true, 2);
        await useCase.execute(presenterSpy, {
          projectId: 1415,
          id: 2,
          data: { dogs: "woof" },
          schema: { cow: "moo"}
        });
      });

      it("Passes the data to the gateway", async () => {
        expect(claimGatewaySpy.submit).toBeCalledWith(1415, 2, { dogs: "woof" });
      });

      it("Calls submission successful with the id on the presenter when the submission suceeded", () => {
        expect(presenterSpy.submissionSuccessful).toBeCalledWith(2);
      });
    });

    describe("With unsuccessful submission", () => {
      it("Presenter recieves submission unsuccessful", async () => {
        useCase = getUseCase(false);
        await useCase.execute(presenterSpy, { data: { dogs: "woof" } });
        expect(presenterSpy.submissionUnsuccessful).toBeCalled();
      });
    });
  });
});
