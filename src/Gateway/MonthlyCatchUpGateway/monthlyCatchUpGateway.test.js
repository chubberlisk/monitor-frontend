import nock from "nock";
import MonthlyCatchUpGateway from ".";

describe("MonthlyCatchUpGateway", () => {
  describe("#Create", () => {
    describe("Example one", () => {
      it("Passes the data and the project id to the api", async () => {
        let apiKeyGatewayStub = { getApiKey: () => ({ apiKey: "meowKey" }) };

        process.env.REACT_APP_HIF_API_URL = "https://meow.cat/";
        let request = nock("https://meow.cat/")
          .matchHeader("Content-Type", "application/json")
          .post("/monthly-catch-up/create", {
            project_id: 1,
            data: { cat: "meow" }
          })
          .reply(200, { id: 10 });

        let gateway = new MonthlyCatchUpGateway({
          apiKeyGateway: apiKeyGatewayStub
        });

        await gateway.create(1, { cat: "meow" });

        expect(request.isDone()).toBeTruthy();
      });

      it("Passes the API key to the URL", async () => {
        let apiKeyGatewayStub = { getApiKey: () => ({ apiKey: "meowKey" }) };

        process.env.REACT_APP_HIF_API_URL = "https://meow.cat/";
        let request = nock("https://meow.cat/")
          .matchHeader("Content-Type", "application/json")
          .matchHeader("API_KEY", "meowKey")
          .post("/monthly-catch-up/create", {
            project_id: 1,
            data: { cat: "meow" }
          })
          .reply(200, { id: 10 });

        let gateway = new MonthlyCatchUpGateway({
          apiKeyGateway: apiKeyGatewayStub
        });
        await gateway.create(1, { cat: "meow" });

        expect(request.isDone()).toBeTruthy();
      });

      describe("Given it is successful", () => {
        it("Returns successful with the created id", async () => {
          let apiKeyGatewayStub = { getApiKey: () => ({ apiKey: "meowKey" }) };

          process.env.REACT_APP_HIF_API_URL = "https://meow.cat/";
          let request = nock("https://meow.cat/")
            .matchHeader("Content-Type", "application/json")
            .matchHeader("API_KEY", "meowKey")
            .post("/monthly-catch-up/create", {
              project_id: 1,
              data: { cat: "meow" }
            })
            .reply(200, { id: 10 });

          let gateway = new MonthlyCatchUpGateway({
            apiKeyGateway: apiKeyGatewayStub
          });
          let response = await gateway.create(1, { cat: "meow" });

          expect(response.successful).toEqual(true);
          expect(response.monthlyCatchUpId).toEqual(10)
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
      it("Passes the data and the project id to the api", async () => {
        let apiKeyGatewayStub = { getApiKey: () => ({ apiKey: "meowKey" }) };

        process.env.REACT_APP_HIF_API_URL = "https://woof.dog/";
        let request = nock("https://woof.dog/")
          .matchHeader("Content-Type", "application/json")
          .post("/monthly-catch-up/create", {
            project_id: 2,
            data: { dog: "woof" }
          })
          .reply(200, { id: 11 });

        let gateway = new MonthlyCatchUpGateway({
          apiKeyGateway: apiKeyGatewayStub
        });

        await gateway.create(2, { dog: "woof" });

        expect(request.isDone()).toBeTruthy();
      });

      it("Passes the API key to the URL", async () => {
        let apiKeyGatewayStub = { getApiKey: () => ({ apiKey: "woofKey" }) };

        process.env.REACT_APP_HIF_API_URL = "https://woof.dog/";
        let request = nock("https://woof.dog/")
          .matchHeader("Content-Type", "application/json")
          .matchHeader("API_KEY", "woofKey")
          .post("/monthly-catch-up/create", {
            project_id: 2,
            data: { dog: "woof" }
          })
          .reply(200, { id: 11 });

        let gateway = new MonthlyCatchUpGateway({
          apiKeyGateway: apiKeyGatewayStub
        });

        await gateway.create(2, { dog: "woof" });

        expect(request.isDone()).toBeTruthy();
      });

      describe("Given it is successful", () => {
        it("Returns successful with the created id", async () => {
          let apiKeyGatewayStub = { getApiKey: () => ({ apiKey: "dogKey" }) };

          process.env.REACT_APP_HIF_API_URL = "https://woof.dog/";
          let request = nock("https://woof.dog/")
            .matchHeader("Content-Type", "application/json")
            .matchHeader("API_KEY", "dogKey")
            .post("/monthly-catch-up/create", {
              project_id: 2,
              data: { dog: "woof" }
            })
            .reply(200, { id: 11 });

          let gateway = new MonthlyCatchUpGateway({
            apiKeyGateway: apiKeyGatewayStub
          });
          let response = await gateway.create(2, { dog: "woof" });

          expect(response.successful).toEqual(true);
          expect(response.monthlyCatchUpId).toEqual(11)
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
});
