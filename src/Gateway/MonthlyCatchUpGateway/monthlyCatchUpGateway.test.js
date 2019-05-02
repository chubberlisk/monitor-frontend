import nock from "nock";
import MonthlyCatchUpGateway from ".";

class APIResponse {
  constructor(request, response = {}) {
    this.request = request;
    this.response = response;
  }

  successfully(status = 200) {
    return this.request.reply(status, this.response);
  }

  unsuccessfully() {
    return this.request.reply(500);
  }
}

class MonthlyCatchUpApiSimulator {
  constructor({ baseUrl, apiKey }) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  createMonthlyCatchUp({ projectId, data, response }) {
    let request = nock(this.baseUrl)
      .matchHeader("Content-Type", "application/json")
      .matchHeader("API_KEY", this.apiKey)
      .post("/monthly-catch-up/create", {
        project_id: projectId,
        data
      });

    return new APIResponse(request, response);
  }

  findMonthlyCatchUpById({ projectId, monthlyCatchUpId, response }) {
    let request = nock(this.baseUrl)
      .matchHeader("Content-Type", "application/json")
      .matchHeader("API_KEY", this.apiKey)
      .get(
        `/monthly-catch-up/get?id=${projectId}&monthly_catchup_id=${monthlyCatchUpId}`
      );

    return new APIResponse(request, response);
  }

  updateMonthlyCatchUp({ projectId, monthlyCatchUpId, data, response }) {
    let request = nock(this.baseUrl)
      .matchHeader("Content-Type", "application/json")
      .matchHeader("API_KEY", this.apiKey)
      .post("/monthly-catch-up/update", {
        project_id: projectId,
        monthly_catchup_id: monthlyCatchUpId,
        data
      });

    return new APIResponse(request, response);
  }

  submitMonthlyCatchUp({ projectId, monthlyCatchUpId, response }) {
    let request = nock(this.baseUrl)
      .matchHeader("Content-Type", "application/json")
      .matchHeader("API_KEY", this.apiKey)
      .post("/monthly-catch-up/submit", {
        project_id: projectId,
        monthly_catchup_id: monthlyCatchUpId
      });

    return new APIResponse(request, response);
  }
}

describe("MonthlyCatchUpGateway", () => {
  let apiKeyGatewayStub, request, gateway, response, simulator;

  describe("#Create", () => {
    describe("Example one", () => {
      beforeEach(() => {
        process.env.REACT_APP_HIF_API_URL = "https://meow.cat/";
        apiKeyGatewayStub = { getApiKey: () => ({ apiKey: "meowKey" }) };

        simulator = new MonthlyCatchUpApiSimulator({
          baseUrl: "https://meow.cat",
          apiKey: "meowKey"
        });
      });

      describe("Given it is successful", () => {
        beforeEach(async () => {
          request = simulator
            .createMonthlyCatchUp({
              projectId: 1,
              data: { cat: "meow" },
              response: { id: 10 }
            })
            .successfully();

          gateway = new MonthlyCatchUpGateway({
            apiKeyGateway: apiKeyGatewayStub
          });

          response = await gateway.create(1, { cat: "meow" });
        });

        it("Passes the data and the project id to the api", async () => {
          expect(request.isDone()).toBeTruthy();
        });

        it("Passes the API key to the URL", async () => {
          expect(request.isDone()).toBeTruthy();
        });

        it("Returns successful with the created id", async () => {
          expect(response.successful).toEqual(true);
          expect(response.monthlyCatchUpId).toEqual(10);
        });
      });

      describe("Given it is unsuccessful", () => {
        it("Returns unsuccessful with the created id", async () => {
          simulator
            .createMonthlyCatchUp({ projectId: 1, data: { cat: "meow" } })
            .unsuccessfully();

          let gateway = new MonthlyCatchUpGateway({
            apiKeyGateway: apiKeyGatewayStub
          });
          let response = await gateway.create(1, { cat: "meow" });

          expect(response.successful).toEqual(false);
        });
      });
    });

    describe("Example two", () => {
      beforeEach(() => {
        process.env.REACT_APP_HIF_API_URL = "https://woof.dog/";
        apiKeyGatewayStub = { getApiKey: () => ({ apiKey: "woofKey" }) };

        simulator = new MonthlyCatchUpApiSimulator({
          baseUrl: "https://woof.dog/",
          apiKey: "woofKey"
        });
      });

      describe("Given it is successful", () => {
        beforeEach(async () => {
          request = simulator
            .createMonthlyCatchUp({
              projectId: 2,
              data: { dog: "woof" },
              response: { id: 11 }
            })
            .successfully();

          gateway = new MonthlyCatchUpGateway({
            apiKeyGateway: apiKeyGatewayStub
          });

          response = await gateway.create(2, { dog: "woof" });
        });

        it("Passes the data and the project id to the api", async () => {
          expect(request.isDone()).toBeTruthy();
        });

        it("Passes the API key to the URL", async () => {
          expect(request.isDone()).toBeTruthy();
        });

        it("Returns successful with the created id", async () => {
          expect(response.successful).toEqual(true);
          expect(response.monthlyCatchUpId).toEqual(11);
        });
      });

      describe("Given it is unsuccessful", () => {
        it("Returns unsuccessful with the created id", async () => {
          simulator
            .createMonthlyCatchUp({
              projectId: 2,
              data: { dog: "woof" },
              response: { id: 11 }
            })
            .unsuccessfully();

          let gateway = new MonthlyCatchUpGateway({
            apiKeyGateway: apiKeyGatewayStub
          });
          let response = await gateway.create(2, { dog: "woof" });

          expect(response.successful).toEqual(false);
        });
      });
    });
  });

  describe("#FindById", () => {
    beforeEach(() => {
      process.env.REACT_APP_HIF_API_URL = "https://meow.cat/";
      apiKeyGatewayStub = { getApiKey: () => ({ apiKey: "meowKey" }) };

      simulator = new MonthlyCatchUpApiSimulator({
        baseUrl: "https://meow.cat",
        apiKey: "meowKey"
      });
    });

    describe("Example one", () => {
      describe("Given a monthly catch up is found", () => {
        beforeEach(async () => {
          request = simulator
            .findMonthlyCatchUpById({
              projectId: 1,
              monthlyCatchUpId: 1,
              response: {
                data: { cat: "meow" },
                schema: { cate: "meow meow" },
                status: "Draft"
              }
            })
            .successfully();

          gateway = new MonthlyCatchUpGateway({
            apiKeyGateway: apiKeyGatewayStub
          });

          response = await gateway.findById({
            projectId: 1,
            monthlyCatchUpId: 1
          });
        });

        it("Gets the catch up from the API", () => {
          expect(request.isDone()).toBeTruthy();
        });

        it("Returns successful with the monthly catch up", async () => {
          expect(response.successful).toBeTruthy();
          expect(response.monthlyCatchUp).toEqual({
            data: { cat: "meow" },
            schema: { cate: "meow meow" },
            status: "Draft"
          });
        });

        it("Returns unsuccessful", async () => {
          request = simulator
            .findMonthlyCatchUpById({
              projectId: 1,
              monthlyCatchUpId: 1
            })
            .unsuccessfully();

          gateway = new MonthlyCatchUpGateway({
            apiKeyGateway: apiKeyGatewayStub
          });

          response = await gateway.findById({
            projectId: 1,
            monthlyCatchUpId: 1
          });

          expect(response.successful).toBeFalsy();
        });
      });
    });

    describe("Example two", () => {
      describe("Given a monthly catch up is found", () => {
        beforeEach(async () => {
          request = simulator
            .findMonthlyCatchUpById({
              projectId: 5,
              monthlyCatchUpId: 7,
              response: {
                data: { dog: "woof" },
                schema: { dogs: "woof woof" },
                status: "Submitted"
              }
            })
            .successfully();

          gateway = new MonthlyCatchUpGateway({
            apiKeyGateway: apiKeyGatewayStub
          });

          response = await gateway.findById({
            projectId: 5,
            monthlyCatchUpId: 7
          });
        });

        it("Gets the catch up from the API", () => {
          expect(request.isDone()).toBeTruthy();
        });

        it("Returns successful with the monthly catch up", async () => {
          expect(response.successful).toBeTruthy();
          expect(response.monthlyCatchUp).toEqual({
            data: { dog: "woof" },
            schema: { dogs: "woof woof" },
            status: "Submitted"
          });
        });
      });

      describe("Given a monthly catch up is not found", () => {
        it("Returns unsuccessful", async () => {
          request = simulator
            .findMonthlyCatchUpById({
              projectId: 5,
              monthlyCatchUpId: 7
            })
            .unsuccessfully();

          gateway = new MonthlyCatchUpGateway({
            apiKeyGateway: apiKeyGatewayStub
          });

          response = await gateway.findById({
            projectId: 5,
            monthlyCatchUpId: 7
          });

          expect(response.successful).toBeFalsy();
        });
      });
    });
  });

  describe("#Update", () => {
    describe("Example one", () => {
      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = "https://meow.cat/";
        apiKeyGatewayStub = { getApiKey: () => ({ apiKey: "meowKey" }) };

        simulator = new MonthlyCatchUpApiSimulator({
          baseUrl: "https://meow.cat",
          apiKey: "meowKey"
        });

        request = simulator
          .updateMonthlyCatchUp({
            projectId: 1,
            monthlyCatchUpId: 1,
            data: { cat: "meow" },
            response: {}
          })
          .successfully();

        gateway = new MonthlyCatchUpGateway({
          apiKeyGateway: apiKeyGatewayStub
        });

        response = await gateway.update({
          projectId: 1,
          monthlyCatchUpId: 1,
          data: { cat: "meow" }
        });
      });

      describe("Given it is successful", () => {
        it("Updates the catch up from the API", async () => {
          expect(request.isDone()).toBeTruthy();
        });
  
        it("Returns successful with the monthly catch up", async () => {
          expect(response.successful).toBeTruthy();
        });
      });

      describe("Given it is unsuccessful", () => {
        it("Returns unsuccessful", async () => {
          simulator
            .updateMonthlyCatchUp({
              projectId: 1,
              monthlyCatchUpId: 1,
              data: { cat: "meow" },
              response: {}
            })
            .unsuccessfully();

          gateway = new MonthlyCatchUpGateway({
            apiKeyGateway: apiKeyGatewayStub
          });

          response = await gateway.update({
            projectId: 1,
            monthlyCatchUpId: 1,
            data: { cat: "meow" }
          });

          expect(response.successful).toBeFalsy();
        });
      });
    });

    describe("Example two", () => {
      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = "https://woof.dog/";
        apiKeyGatewayStub = { getApiKey: () => ({ apiKey: "woofKey" }) };

        simulator = new MonthlyCatchUpApiSimulator({
          baseUrl: "https://woof.dog",
          apiKey: "woofKey"
        });

        request = simulator
          .updateMonthlyCatchUp({
            projectId: 101,
            monthlyCatchUpId: 99,
            data: { dog: "woof" },
            response: {}
          })
          .successfully();

        gateway = new MonthlyCatchUpGateway({
          apiKeyGateway: apiKeyGatewayStub
        });

        response = await gateway.update({
          projectId: 101,
          monthlyCatchUpId: 99,
          data: { dog: "woof" }
        });
      });

      describe("Given it is successful", () => {
        it("Updates the catch up from the API", async () => {
          expect(request.isDone()).toBeTruthy();
        });
  
        it("Returns successful with the monthly catch up", async () => {
          expect(response.successful).toBeTruthy();
        });
      });

      describe("Given it is unsuccessful", () => {
        it("Returns unsuccessful", async () => {
          simulator
            .updateMonthlyCatchUp({
              projectId: 101,
              monthlyCatchUpId: 99,
              data: { dog: "woof" },
              response: {}
            })
            .unsuccessfully();

          gateway = new MonthlyCatchUpGateway({
            apiKeyGateway: apiKeyGatewayStub
          });

          response = await gateway.update({
            projectId: 101,
            monthlyCatchUpId: 99,
            data: { dog: "woof" }
          });

          expect(response.successful).toBeFalsy();
        });
      });
    });
  });
});
