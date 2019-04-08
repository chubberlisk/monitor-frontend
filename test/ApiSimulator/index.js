import nock from "nock";

class APISimulator {
  constructor(url) {
    this.url = url;
  }

  getBaseline(type, projectSchema) {
    let response = {projectSchema};
    let baselineRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .get(`/baseline/${type}`);
    return new APIResponse(baselineRequest, response);
  }

  createProject(name, type, id) {
    let response = {id};
    let projectRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .post("/project/create", {name, type});

      return new APIResponse(projectRequest, response);
  }

  createReturn(project_id, data, id) {
    let response = {id};
    let projectRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .post("/return/create", {project_id: String(project_id), data});

      return new APIResponse(projectRequest, response);
  }

  createClaim(project_id, data, id) {
    let response = {id};
    let projectRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .post("/claim/create", {project_id: String(project_id), data});

      return new APIResponse(projectRequest, response);
  }

  updateProject(project_data, project_id, response = {errors: []}, timestamp = "0") {
    let projectRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .persist()
      .post("/project/update", {project_id: ""+project_id, project_data, timestamp});

    return new APIResponse(projectRequest, response);
  }

  validateProject(project_id, type, data, response) {
    let projectRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .post("/project/validate", {project_id: ""+project_id, type, data});

    return new APIResponse(projectRequest, response);
  }

  submitProject(project_id) {
    let response = { };
    let projectRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .post("/project/submit", { url: `${window.location.origin}/project/${project_id}`, project_id: ""+project_id});

    return new APIResponse(projectRequest, response);
  }

  getProject(schema, data, status, type, timestamp = 0) {
    let response = { schema, data, status, type, timestamp };
    let projectRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .get("/project/find?id=0");
    return new APIResponse(projectRequest, response);
  }

  amendBaseline(baselineId, projectId, data, timestamp = 0) {
    let response = {baselineId, timestamp}
    let request = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .post("/baseline/amend", {project_id: ""+projectId, data, timestamp});

    return new APIResponse(request, response);
  }

  getBaseReturn(schema = {}, data = {}) {
    let response = { baseReturn: { schema, data } };
    let returnRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .get("/project/0/return");
    return new APIResponse(returnRequest, response);
  }

  getReturn(schema = {}, data = {}) {
    let response = { schema, data };
    let returnRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .get("/return/get?id=0&returnId=1");
    return new APIResponse(returnRequest, response);
  }

  getReturns(data = {}) {
    let response = data;
    let returnRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .get("/project/0/returns");
    return new APIResponse(returnRequest, response);
  }

  getBaseClaim(schema = {}, data = {}) {
    let response = { baseClaim: { schema, data } };
    let claimRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .get("/project/0/claim");
    return new APIResponse(claimRequest, response);
  }

  getClaim(schema = {}, data = {}) {
    let response = { schema, data };
    let claimRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .get("/claim/get?id=0&claimId=1");
    return new APIResponse(claimRequest, response);
  }

  getUserProjects(project_list = []) {
    let response = { project_list } ;
    let returnRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .get("/user/projects");
    return new APIResponse(returnRequest, response);
  }

  expendEmptyTokenForProject() {
    let request = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .post("/token/expend", {});

    return new APIResponse(request, { apiKey: "abc", role: "Homes England" });
  }

  expendToken(access_token, role = "Homes England") {
    let request = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .post("/token/expend", { access_token });

    return new APIResponse(request, { apiKey: "abc", role });
  }

  checkApiKey(project_id, valid = true, role = "Homes England") {
    let request = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .post("/apikey/check", { project_id });

    return new APIResponse(request, { success: true, valid, role });
  }
}

class APIResponse {
  constructor(request, response = {}) {
    this.request = request;
    this.response = response;
  }

  successfully(status = 200) {
    this.request.reply(status, this.response);
  }

  unsuccessfully() {
    this.request.reply(500);
  }

  unauthorised() {
    this.request.reply(401);
  }
}

export default APISimulator;
