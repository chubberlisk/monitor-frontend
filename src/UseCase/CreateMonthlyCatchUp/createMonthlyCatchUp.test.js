import CreateMonthlyCatchUp from ".";

describe("CreateMonthlyCatchUp", () => {
  describe("Example one", () => {
    it("Calls the create method on the monthly catch up gateway", async () => {
      let monthlyCatchUpSpy = {
        create: jest.fn(() => ({ success: true, monthlyCatchUpId: 42 }))
      };
      let presenterStub = {
        presentCreatedCatchUp: () => {}
      };
      let useCase = new CreateMonthlyCatchUp({
        monthlyCatchUpGateway: monthlyCatchUpSpy
      });

      await useCase.execute(presenterStub, {
        projectId: 1,
        data: { cat: "meow" }
      });

      expect(monthlyCatchUpSpy.create).toHaveBeenCalledWith(1, { cat: "meow" });
    });

    describe("Given creation is successful", () => {
      it("Calls creation successful on the presenter", async () => {
        let monthlyCatchUpStub = {
          create: () => ({ success: true, monthlyCatchUpId: 10 })
        };
        let presenterSpy = {
          presentCreatedCatchUp: jest.fn()
        };

        let useCase = new CreateMonthlyCatchUp({
          monthlyCatchUpGateway: monthlyCatchUpStub
        });

        await useCase.execute(presenterSpy, {
          projectId: 1,
          data: { cat: "meow" }
        });

        expect(presenterSpy.presentCreatedCatchUp).toHaveBeenCalledWith({
          monthlyCatchUpId: 10
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
    it("Calls the create method on the monthly catch up gateway", async () => {
      let monthlyCatchUpSpy = {
        create: jest.fn(() => ({ success: true, monthlyCatchUpId: 42 }))
      };
      let useCase = new CreateMonthlyCatchUp({
        monthlyCatchUpGateway: monthlyCatchUpSpy
      });
      let presenterStub = {
        presentCreatedCatchUp: () => {}
      };

      await useCase.execute(presenterStub, {
        projectId: 2,
        data: { dog: "woof" }
      });

      expect(monthlyCatchUpSpy.create).toHaveBeenCalledWith(2, { dog: "woof" });
    });

    describe("Given creation is successful", () => {
      it("Calls creation successful on the presenter", async () => {
        let monthlyCatchUpStub = {
          create: () => ({ success: true, monthlyCatchUpId: 42 })
        };
        let presenterSpy = {
          presentCreatedCatchUp: jest.fn()
        };
        let useCase = new CreateMonthlyCatchUp({
          monthlyCatchUpGateway: monthlyCatchUpStub
        });

        await useCase.execute(presenterSpy, {
          projectId: 2,
          data: { dog: "woof" }
        });

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
