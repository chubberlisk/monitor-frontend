import fetch from 'isomorphic-fetch';
import Return from '../../Domain/Return';
import runtimeEnv from '@mars/heroku-js-runtime-env';

export default class ReturnGateway {
  constructor(apiKeyGateway, locationGateway) {
    this.locationGateway = locationGateway;
    this.apiKeyGateway = apiKeyGateway;
    this.env = runtimeEnv();
  }

  async getReturns(projectId) {
    let rawResponse = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}project/${projectId}/returns`,
      {
        headers: {'Content-Type': 'application/json',
          'API_KEY': this.apiKeyGateway.getApiKey().apiKey},
      },
    ).catch(() => ({ ok: false }));

    if (!rawResponse.ok) return {success: false};

    let response = await rawResponse.json();
    let returns = response.returns;

    return {success: true, returns: returns};
  }

  async baseReturnFor(project_id) {
    let rawResponse = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}project/${project_id}/return`,
      {
        headers: {'Content-Type': 'application/json',
          'API_KEY': this.apiKeyGateway.getApiKey().apiKey},
      },
    ).catch(() => ({ ok: false }));

    if (rawResponse.ok) {
      let jsonResponse = await rawResponse.json();
      let foundReturn = new Return(jsonResponse.baseReturn.data, jsonResponse.baseReturn.schema, jsonResponse.baseReturn.no_of_previous_returns);
      return {success: true, foundReturn};
    } else {
      return {success: false};
    }
  }

  async findById(id, projectId) {
    let rawResponse = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}return/get?id=${projectId}&returnId=${id}`,
      {
        headers: {'Content-Type': 'application/json',
          'API_KEY': this.apiKeyGateway.getApiKey().apiKey},
      },
    ).catch(() => ({ ok: false }));

    if (rawResponse.ok) {
      let foundReturn = await rawResponse.json();
      return {success: true, foundReturn};
    } else {
      return {success: false};
    }
  }

  async create(project_id, data) {
    let rawResponse = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}return/create`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
          'API_KEY': this.apiKeyGateway.getApiKey().apiKey},
        body: JSON.stringify({project_id, data}),
      },
    ).catch(() => ({ ok: false }));

    if (rawResponse.ok) {
      let jsonResponse = await rawResponse.json();
      return {success: true, returnId: jsonResponse.id};
    } else {
      return {success: false};
    }
  }

  async update(project_id, return_id, return_data) {
    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}return/update`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
          'API_KEY': this.apiKeyGateway.getApiKey().apiKey},
        body: JSON.stringify({project_id, return_id, return_data}),
      },
    ).catch(() => ({ ok: false }));

    if (response.ok) {
      return {success: true};
    } else {
      return {success: false};
    }
  }

  async submit(project_id, return_id, data) {
    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}return/submit`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
          'API_KEY': this.apiKeyGateway.getApiKey().apiKey},
        body: JSON.stringify({
          project_id,
          return_id,
          data,
          url: `${await this.locationGateway.getRoot()}/project/${project_id}/return/${return_id}`
        }),
      },
    ).catch(() => ({ ok: false }));

    if (response.ok) {
      return {success: true};
    } else {
      return {success: false};
    }
  }

  async validate(project_id, data, type) {
    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}return/validate`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
          'API_KEY': this.apiKeyGateway.getApiKey().apiKey},
        body: JSON.stringify({type, project_id, data}),
      },
    ).catch(() => ({ ok: false }));

    if (response.ok) {
      let response_json = await response.json();
      return {
        success: true,
        valid: response_json.valid,
        invalidPaths: response_json.invalidPaths,
        prettyInvalidPaths: response_json.prettyInvalidPaths
      }
    } else {
      return { success: false };
    }
  }
}
