import nock from "nock";
import BaselineGateway from ".";
import Project from "../../Domain/Project";

describe("BaselineGateway", () => {
  afterEach(() => {
    nock.cleanAll();
  })

  describe("#AmendBaseline", () => {
    describe("Example 1", () => {
      let gateway, apiKeyGateway, amendBaselineRequest;
      beforeEach(async () => {
        apiKeyGateway = {
          getApiKey: jest.fn(() => ({ apiKey: "superSecret" }))
        };

        process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
        gateway = new BaselineGateway(apiKeyGateway);

        amendBaselineRequest = nock("http://cat.meow")
        .matchHeader("Content-Type", "application/json")
        .post("/baseline/amend", { project_id: 1 })
        .reply(200, {baselineId: 3, errors: ['error']});
      });

      describe("Connection successful", () => {
        it("Submits the data to the API", async () => {
          await gateway.amend(1, {}, 0);

          expect(amendBaselineRequest.isDone()).toBeTruthy();
        });

        it("Responds with the id from the api", async () => {
          let response = await gateway.amend(1, {}, 0);

          expect(response.baselineId).toEqual(3)
        });

        it("Responds with any errors from the api", async () => {
          let response = await gateway.amend(1, {}, 0);

          expect(response.errors).toEqual(['error'])
        });
      });

      describe("Connection failure", () => {
        it("Returns success as false", async () => {
          nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/baseline/amend", { baseline_id: 3 })
          .socketDelay(2000);
          let response = await gateway.amend(3);

          expect(response).toEqual({ success: false });
        });
      });
    });

    describe("Example 2", () => {
      let gateway, apiKeyGateway, amendBaselineRequest;
      beforeEach(async () => {
        apiKeyGateway = {
          getApiKey: jest.fn(() => ({ apiKey: "superSecret" }))
        };

        process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
        gateway = new BaselineGateway(apiKeyGateway);

        amendBaselineRequest = nock("http://cat.meow")
        .matchHeader("Content-Type", "application/json")
        .post("/baseline/amend", { project_id: 4 })
        .reply(200, {baselineId: 7, errors: []});
      });

      describe("Connection successful", () => {
        it("Submits the data to the API", async () => {
          await gateway.amend(4, {blah: 'data'}, 4);

          expect(amendBaselineRequest.isDone()).toBeTruthy();
        });

        it("Responds with the id from the api", async () => {
          let response = await gateway.amend(4, {blah: 'data'}, 4);

          expect(response.baselineId).toEqual(7)
        });

        it("Responds with any errors from the api", async () => {
          let response = await gateway.amend(4, {blah: 'data'}, 4);

          expect(response.errors).toEqual([])
        });
      });

      describe("Connection failure", () => {
        it("Returns success as false", async () => {
          nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/baseline/amend", { baseline_id: 7, blah: 'blah' })
          .socketDelay(2000);
          let response = await gateway.amend(7);

          expect(response).toEqual({ success: false });
        });
      });
    });
  });

  describe("#GetAllBaselines", () => {
    describe("Example 1", () => {
      let gateway, apiKeyGateway, getAllBaselinesRequest;
      beforeEach(async () => {
        apiKeyGateway = {
          getApiKey: jest.fn(() => ({ apiKey: "superSecret" }))
        };

        process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
        gateway = new BaselineGateway(apiKeyGateway);


        getAllBaselinesRequest = nock("http://cat.meow")
        .matchHeader("Content-Type", "application/json")
        .get("/project/1/baselines")
        .reply(200, {baselines: [{data: {cats: "meow"}, id: 5}]});
      });

      describe("Connection successful", () => {
        it("Sends a request to the API", async () => {
          await gateway.getAllBaselines(1)
          expect(getAllBaselinesRequest).toBeTruthy();
        });

        it("Returns the baselines from the api", async () => {
          let response = await gateway.getAllBaselines(1)
          expect(response.baselines).toEqual([{data: {cats: "meow"}, id: 5}])
        });
      });

      describe("Connection unsuccessful", () => {
        it("returns unsuccessful", async () => {
          nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .get("/project/1/baselines")
          .reply(200);
          let response = await gateway.getAllBaselines(3);

          expect(response).toEqual({ success: false });
        });
      });
    });

    describe("Example 2", () => {
      let gateway, apiKeyGateway, getAllBaselinesRequest;
      beforeEach(async () => {
        apiKeyGateway = {
          getApiKey: jest.fn(() => ({ apiKey: "superSecret" }))
        };

        process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
        gateway = new BaselineGateway(apiKeyGateway);

        getAllBaselinesRequest = nock("http://cat.meow")
        .matchHeader("Content-Type", "application/json")
        .get("/project/4/baselines")
        .reply(200, {baselines: [{data: {dogs: "woof"}, id: 8}, {data: {}, id: 12}]});
      });

      describe("Connection successful", () => {
        it("Sends a request to the API", async () => {
          await gateway.getAllBaselines(4)
          expect(getAllBaselinesRequest).toBeTruthy();
        });

        it("Returns the baselines from the api", async () => {
          let response = await gateway.getAllBaselines(4)
          expect(response.baselines).toEqual([{data: {dogs: "woof"}, id: 8}, {data: {}, id: 12}])
        });
      });

      describe("Connection unsuccessful", () => {
        it("returns unsuccessful", async () => {
          nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .get("/project/1/baselines")
          .reply(200);
          let response = await gateway.getAllBaselines(3);

          expect(response).toEqual({ success: false });
        });
      });
    });
  });

  describe("#Submit", () => {
    describe("Example 1", () => {
      let gateway, apiKeyGateway;
      beforeEach(async () => {
        apiKeyGateway = {
          getApiKey: jest.fn(() => ({ apiKey: "superSecret" }))
        };

        process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
        gateway = new BaselineGateway(apiKeyGateway);
      });

      describe("Connection successful", () => {
        it("Submits the data to the API", async () => {
          let submitBaselineRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/baseline/submit", { baseline_id: 1 })
          .reply(200);
          await gateway.submit(1);

          expect(submitBaselineRequest.isDone()).toBeTruthy();
        });

        it("Returns successful", async () => {
          nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/baseline/submit", { baseline_id: 3 })
          .reply(200);
          let response = await gateway.submit(3);

          expect(response).toEqual({ success: true });
        });
      });

      describe("Connection failure", () => {
        it("Returns success as false", async () => {
          nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/baseline/submit", { baseline_id: 3 })
          .socketDelay(2000);
          let response = await gateway.submit(3);

          expect(response).toEqual({ success: false });
        });
      });
    });

    describe("Example 2", () => {
      let gateway, apiKeyGateway;
      beforeEach(async () => {
        apiKeyGateway = {
          getApiKey: jest.fn(() => ({ apiKey: "superSecret" }))
        };

        process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
        gateway = new BaselineGateway(apiKeyGateway);
      });

      describe("Connection successful", () => {
        it("Submits the data to the API", async () => {
          let submitBaselineRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/baseline/submit", { baseline_id: 6 })
          .reply(200);
          await gateway.submit(6);

          expect(submitBaselineRequest.isDone()).toBeTruthy();
        });

        it("Returns successful", async () => {
          nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/baseline/submit", { baseline_id: 4 })
          .reply(200);
          let response = await gateway.submit(4);

          expect(response).toEqual({ success: true });
        });
      });

      describe("Connection failure", () => {
        it("Returns success as false", async () => {
          nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/baseline/submit", { baseline_id: 4 })
          .socketDelay(2000);
          let response = await gateway.submit(4);

          expect(response).toEqual({ success: false });
        });
      });
    });
  });

  describe("#Update", () => {
    describe("Example one", () => {
      describe("Connection successful", () => {
        let gateway;
        let apiKeyGateway = {
          getApiKey: jest.fn(() => ({ apiKey: "superSecret" }))
        };

        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = "http://rabbits.jump/";
          gateway = new BaselineGateway(apiKeyGateway);
        });

        it("Submits data to the API", async () => {
          let updateProjectRequest = nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/baseline/update", {
            project_id: 2,
            project_data: { rabbits: "hop" },
            timestamp: "123456"
          })
          .reply(200, { errors: [], timestamp: "2" });
          await gateway.update(2, { rabbits: "hop" }, "123456");

          expect(updateProjectRequest.isDone()).toBeTruthy();
        });

        it("Returns successful", async () => {
          nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/baseline/update", {
            project_id: 2,
            project_data: { rabbits: "hop" },
            timestamp: "123456"
          })
          .reply(200, { errors: ["some_errors"], timestamp: "567" });
          let response = await gateway.update(2, { rabbits: "hop" }, "123456");

          expect(response).toEqual({ success: true, errors: ["some_errors"], new_timestamp: "567" });
        });

        it("Returns unsuccessful", async () => {
          nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/baseline/update", {
            project_id: 2,
            project_data: { rabbits: "hop" },
            timestamp: "123456"
          })
          .reply(500, {});
          let response = await gateway.update(2, { rabbits: "hop" }, "123456");

          expect(response).toEqual({ success: false });
        });
      });
      describe("Connection failure", () => {
        it("Returns success as false", async () => {
          process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
          let apiKeyGateway = {
            getApiKey: jest.fn(() => ({ apiKey: "superSecret" }))
          };

          nock("http://rabbits.jump")
            .matchHeader("Content-Type", "application/json")
            .post("/baseline/update", {
              project_id: 2,
              project_data: { rabbits: "hop" },
              timestamp: "123456"
            })
            .socketDelay(2000);

          let gateway = new BaselineGateway(apiKeyGateway);
          let response = await gateway.update(2, { rabbits: "hop" }, "123456");
          expect(response).toEqual({ success: false });
        });
      });
    });
    describe("Example two", () => {
      let gateway;
      let apiKeyGateway = {
        getApiKey: jest.fn(() => ({ apiKey: "superSecret" }))
      };

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = "http://rabbits.jump/";
        gateway = new BaselineGateway(apiKeyGateway);
      });

      it("Submits data to the API", async () => {
        let updateProjectRequest = nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/baseline/update", {
            project_id: 6,
            project_data: { cows: "moo" }
          })
          .reply(200, {errors: [], timestamp: "0"});
        await gateway.update(6, { cows: "moo" });

        expect(updateProjectRequest.isDone()).toBeTruthy();
      });

      it("Returns successful", async () => {
        nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/baseline/update", {
            project_id: 6,
            project_data: { cows: "moo" },
            timestamp: "2343"
          })
          .reply(200, { errors: ["more_errors"], timestamp: "789"});
        let response = await gateway.update(6, { cows: "moo" }, "2343");
        expect(response).toEqual({ success: true, errors: ["more_errors"], new_timestamp: "789" });
      });

      it("Returns unsuccessful", async () => {
        nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/baseline/update", {
            project_id: 6,
            project_data: { cows: "moo" },
            timestamp: "2343"
          })
          .reply(403, {});
        let response = await gateway.update(6, { cows: "moo" }, "2343");
        expect(response).toEqual({ success: false });
      });
    });
  });
});
