import fetch from 'isomorphic-fetch';
import Return from '../../Domain/Return';

export default class ReturnGateway {
  async baseReturnFor(id) {
    let rawResponse = await fetch(
      `${process.env.REACT_APP_HIF_API_URL}project/get-base-return?id=${id}`,
      {
        headers: {'Content-Type': 'application/json'},
      },
    );

    if (rawResponse.ok) {
      let jsonResponse = await rawResponse.json();
      let foundReturn = new Return(jsonResponse.data, jsonResponse.schema);
      return {success: true, foundReturn};
    } else {
      return {success: false};
    }
  }

  async findById(id) {
    let rawResponse = await fetch(
      `${process.env.REACT_APP_HIF_API_URL}return/get?id=${id}`,
      {
        headers: {'Content-Type': 'application/json'},
      },
    );
    if (rawResponse.ok) {
      let foundReturn = await rawResponse.json();
      return {success: true, foundReturn};
    } else {
      return {success: false};
    }
  }

  async create(id, data) {
    let rawResponse = await fetch(
      `${process.env.REACT_APP_HIF_API_URL}return/create`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({project_id: id, data}),
      },
    );

    if (rawResponse.ok) {
      let jsonResponse = await rawResponse.json();
      return {success: true, returnId: jsonResponse.id};
    } else {
      return {success: false};
    }
  }

  async update(return_id, data) {
    let response = await fetch(
      `${process.env.REACT_APP_HIF_API_URL}return/update`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({return_id, data}),
      },
    );

    if (response.ok) {
      return {success: true};
    } else {
      return {success: false};
    }
  }

  async submit(return_id, data) {
    let response = await fetch(
      `${process.env.REACT_APP_HIF_API_URL}return/submit`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({return_id, data}),
      },
    );

    if (response.ok) {
      return {success: true};
    } else {
      return {success: false};
    }
  }
}
