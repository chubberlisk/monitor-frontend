import nock from "nock";
import MonthlyCatchUpGateway from ".";

describe("MonthlyCatchUpGateway", () => {
  let apiKeyGatewayStub, request, gateway, response;

  describe("#Create", () => {
    describe("Example one", () => {
      describe("Given it is successful", () => {
        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = "https://meow.cat/";
          apiKeyGatewayStub = { getApiKey: () => ({ apiKey: "meowKey" }) };

          request = nock("https://meow.cat/")
            .matchHeader("Content-Type", "application/json")
            .matchHeader("API_KEY", "meowKey")
            .post("/monthly-catch-up/create", {
              project_id: 1,
              data: { cat: "meow" }
            })
            .reply(200, { id: 10 });

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
          let apiKeyGatewayStub = { getApiKey: () => ({ apiKey: "meowKey" }) };

          process.env.REACT_APP_HIF_API_URL = "https://meow.cat/";
          nock("https://meow.cat/")
            .matchHeader("Content-Type", "application/json")
            .matchHeader("API_KEY", "meowKey")
            .post("/monthly-catch-up/create", {
              project_id: 1,
              data: { cat: "meow" }
            })
            .reply(500);

          let gateway = new MonthlyCatchUpGateway({
            apiKeyGateway: apiKeyGatewayStub
          });
          let response = await gateway.create(1, { cat: "meow" });

          expect(response.successful).toEqual(false);
        });
      });
    });

    describe("Example two", () => {
      describe("Given it is successful", () => {
        beforeEach(async () => {
          apiKeyGatewayStub = { getApiKey: () => ({ apiKey: "woofKey" }) };
          process.env.REACT_APP_HIF_API_URL = "https://woof.dog/";
          request = nock("https://woof.dog/")
            .matchHeader("Content-Type", "application/json")
            .matchHeader("API_KEY", "woofKey")
            .post("/monthly-catch-up/create", {
              project_id: 2,
              data: { dog: "woof" }
            })
            .reply(200, { id: 11 });
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
          let apiKeyGatewayStub = { getApiKey: () => ({ apiKey: "woofers" }) };

          process.env.REACT_APP_HIF_API_URL = "https://dog.woof/";
          nock("https://dog.woof/")
            .matchHeader("Content-Type", "application/json")
            .matchHeader("API_KEY", "woofers")
            .post("/monthly-catch-up/create", {
              project_id: 2,
              data: { dog: "woof" }
            })
            .reply(500);

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
    describe("Example one", () => {
      describe("Given a monthly catch up is found", () => {
        beforeEach(async () => {
          apiKeyGatewayStub = { getApiKey: () => ({ apiKey: "meowKey" }) };
          process.env.REACT_APP_HIF_API_URL = "https://cat.meow/";
          request = nock("https://cat.meow/")
            .matchHeader("Content-Type", "application/json")
            .matchHeader("API_KEY", "meowKey")
            .get("/monthly-catch-up/get?id=1&monthly_catchup_id=1")
            .reply(200, {
              data: { cat: "meow" },
              schema: { cate: "meow meow" },
              status: "Draft"
            });

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
          apiKeyGatewayStub = { getApiKey: () => ({ apiKey: "meowKey" }) };
          process.env.REACT_APP_HIF_API_URL = "https://cat.meow/";
          request = nock("https://cat.meow/")
            .matchHeader("Content-Type", "application/json")
            .matchHeader("API_KEY", "meowKey")
            .get("/monthly-catch-up/get?id=1&monthly_catchup_id=1")
            .reply(404);

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
          apiKeyGatewayStub = { getApiKey: () => ({ apiKey: "dogs4lyf" }) };
          process.env.REACT_APP_HIF_API_URL = "https://dog.life/";
          request = nock("https://dog.life/")
            .matchHeader("Content-Type", "application/json")
            .matchHeader("API_KEY", "dogs4lyf")
            .get("/monthly-catch-up/get?id=5&monthly_catchup_id=7")
            .reply(200, {
              data: { dog: "woof" },
              schema: { dogs: "woof woof" },
              status: "Submitted"
            });

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
          apiKeyGatewayStub = { getApiKey: () => ({ apiKey: "dogs4lyf" }) };
          process.env.REACT_APP_HIF_API_URL = "https://dog.life/";
          request = nock("https://dog.life/")
            .matchHeader("Content-Type", "application/json")
            .matchHeader("API_KEY", "dogs4lyf")
            .get("/monthly-catch-up/get?id=5&monthly_catchup_id=7")
            .reply(404);

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
});
