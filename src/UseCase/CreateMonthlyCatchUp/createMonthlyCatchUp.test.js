import CreateMonthlyCatchUp from ".";

describe("CreateMonthlyCatchUp", () => {
  let monthlyCatchUpStub, presenterSpy, useCase;

  describe("Example one", () => {
    describe("Given creation is successful", () => {
      beforeEach(async () => {
        monthlyCatchUpStub = {
          create: jest.fn(() => ({ success: true, monthlyCatchUpId: 42 }))
        };
        presenterSpy = {
          presentCreatedCatchUp: jest.fn()
        };
        useCase = new CreateMonthlyCatchUp({
          monthlyCatchUpGateway: monthlyCatchUpStub
        });
        await useCase.execute(presenterSpy, {
          projectId: 1,
          data: { cat: "meow" }
        });
      });

      it("Calls the create method on the monthly catch up gateway", async () => {
        expect(monthlyCatchUpStub.create).toHaveBeenCalledWith(1, {
          cat: "meow"
        });
      });

      it("Calls creation successful on the presenter", async () => {
        expect(presenterSpy.presentCreatedCatchUp).toHaveBeenCalledWith({
          monthlyCatchUpId: 42
        });
      });
    });

    describe("Given creation is not successful", () => {
      it("Call creation unsuccessful on the presenter", async () => {
        let monthlyCatchUpStub = {
          create: () => ({ success: false })
        };

        let presenterSpy = {
          presentUnsuccessfulCreation: jest.fn()
        };

        let useCase = new CreateMonthlyCatchUp({
          monthlyCatchUpGateway: monthlyCatchUpStub
        });

        await useCase.execute(presenterSpy, {
          projectId: 1,
          data: { cat: "meow" }
        });

        expect(presenterSpy.presentUnsuccessfulCreation).toHaveBeenCalled();
      });
    });
  });

  describe("Example two", () => {
    describe("Given creation is successful", () => {
      beforeEach(async () => {
        monthlyCatchUpStub = {
          create: jest.fn(() => ({ success: true, monthlyCatchUpId: 42 }))
        };
        useCase = new CreateMonthlyCatchUp({
          monthlyCatchUpGateway: monthlyCatchUpStub
        });
        presenterSpy = {
          presentCreatedCatchUp: jest.fn()
        };
        await useCase.execute(presenterSpy, {
          projectId: 2,
          data: { dog: "woof" }
        });
      });

      it("Calls the create method on the monthly catch up gateway", async () => {
        expect(monthlyCatchUpStub.create).toHaveBeenCalledWith(2, { dog: "woof" });
      });

      it("Calls creation successful on the presenter", async () => {
        expect(presenterSpy.presentCreatedCatchUp).toHaveBeenCalledWith({
          monthlyCatchUpId: 42
        });
      });
    });

    describe("Given creation is not successful", () => {
      it("Call creation unsuccessful on the presenter", async () => {
        let monthlyCatchUpStub = {
          create: () => ({ success: false })
        };
        let presenterSpy = {
          presentUnsuccessfulCreation: jest.fn()
        };
        let useCase = new CreateMonthlyCatchUp({
          monthlyCatchUpGateway: monthlyCatchUpStub
        });

        await useCase.execute(presenterSpy, {
          projectId: 10,
          data: { dog: "woof" }
        });

        expect(presenterSpy.presentUnsuccessfulCreation).toHaveBeenCalled();
      });
    });
  });
});
