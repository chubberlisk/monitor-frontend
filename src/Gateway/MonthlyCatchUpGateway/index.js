import fetch from "isomorphic-fetch";
import runtimeEnv from "@mars/heroku-js-runtime-env";

export default class MonthlyCatchUpGateway {
  constructor({ apiKeyGateway }) {
    this.apiKeyGateway = apiKeyGateway;
    this.env = runtimeEnv();
  }

  async create(projectId, data) {
    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}monthly-catch-up/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          API_KEY: this.apiKeyGateway.getApiKey().apiKey
        },
        body: JSON.stringify({ project_id: projectId, data })
      }
    );

    if (response.ok) {
      let responseJson = await response.json();

      return { successful: true, monthlyCatchUpId: responseJson.id };
    } else {
      return { successful: false };
    }
  }

  async findById({ projectId, monthlyCatchUpId }) {
    let response = await fetch(
      `${
        this.env.REACT_APP_HIF_API_URL
      }monthly-catch-up/get?id=${projectId}&monthly_catchup_id=${monthlyCatchUpId}`,
      {
        headers: {
          "Content-Type": "application/json",
          API_KEY: this.apiKeyGateway.getApiKey().apiKey
        }
      }
    );

    if (response.ok) {
      let responseJson = await response.json();

      return {
        successful: true,
        monthlyCatchUp: {
          data: responseJson.data,
          schema: responseJson.schema,
          status: responseJson.status
        }
      };
    } else {
      return { successful: false };
    }
  }
}
