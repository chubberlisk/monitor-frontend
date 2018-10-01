import nock from 'nock';
import Return from '../../Domain/Return';
import ReturnGateway from '.';

describe('Return Gateway', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  let apiKeyGateway;

  describe('validation', () => {
    describe('Example 1', () => {
      let validationRequest, response;
      let data = {
        dogs: 'woof'
      };
      let type = 'hif';
      let project_id = 1;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        apiKeyGateway = {getApiKey: () => 'superSecret'}
        validationRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .matchHeader('API_KEY', 'superSecret')
          .post('/return/validate',{type, project_id, data})
          .reply(200, {valid: true, invalidPaths: []});
        let gateway = new ReturnGateway(apiKeyGateway);

        response = await gateway.validate(project_id, data);
      });

      it('fetches validation from the API', () => {
        expect(validationRequest.isDone()).toBeTruthy();
      });

      it('returns a list of paths that were invalid', ()=>{
        expect(response).toEqual({invalidPaths: [], valid: true});
      });
    });

    describe('Example 2', () => {
      let validationRequest, response;
      let data = {
        cats: 'meow'
      };
      let type = 'hif';
      let project_id = 1;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        apiKeyGateway = {getApiKey: () => 'megaSecret'}
        validationRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .matchHeader('API_KEY', 'megaSecret')
          .post('/return/validate',{type, project_id, data})
          .reply(200, {valid: false, invalidPaths: ['cats']});
        let gateway = new ReturnGateway(apiKeyGateway);

        response = await gateway.validate(project_id, data);
      });

      it('fetches validation from the API', () => {
        expect(validationRequest.isDone()).toBeTruthy();
      });

      it('returns a list of paths that were invalid', ()=>{
        expect(response).toEqual({invalidPaths: ['cats'], valid: false});
      });
    });
  });

  describe('#FindById', () => {
    describe('Given a Return is found', () => {
      let returnRequest, response;

      describe('Example one', () => {
        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
          apiKeyGateway = {getApiKey: () => 'catz'};
          returnRequest = nock('http://cat.meow')
            .matchHeader('Content-Type', 'application/json')
            .get('/return/get?id=1')
            .reply(200, {data: {some: 'data'}, schema: {some: 'schema'}, status: 'Draft'});
          let gateway = new ReturnGateway(apiKeyGateway);
          response = await gateway.findById(1);
        });

        it('Fetches the return from the API', () => {
          expect(returnRequest.isDone()).toBeTruthy();
        });

        it('Returns the response from the api', () => {
          let expectedReturn = new Return({some: 'data'}, {some: 'schema'});
          expect(response.success).toEqual(true);
          expect(response.foundReturn.data).toEqual({some: 'data'});
          expect(response.foundReturn.schema).toEqual({some: 'schema'});
          expect(response.foundReturn.status).toEqual('Draft');
        });
      });

      describe('Example two', () => {
        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = 'http://dog.woof/';
          apiKeyGateway = {getApiKey: () => 'doggy'};

          let returnRequest = nock('http://dog.woof')
            .matchHeader('Content-Type', 'application/json')
            .get('/return/get?id=5')
            .reply(200, {data: {cats: 'meow'}, schema: {dogs: 'woof'}, status: 'Submitted'});
          let gateway = new ReturnGateway(apiKeyGateway);
          response = await gateway.findById(5);
        });

        it('Fetches the return from the API', () => {
          expect(returnRequest.isDone()).toBeTruthy();
        });

        it('Returns the response from the api', () => {
          let expectedReturn = new Return({cats: 'meow'}, {dogs: 'woof'});
          expect(response.success).toEqual(true);
          expect(response.foundReturn.data).toEqual({cats: 'meow'});
          expect(response.foundReturn.schema).toEqual({dogs: 'woof'});
          expect(response.foundReturn.status).toEqual('Submitted');
        });
      });
    });

    describe('Given a return is not found', () => {
      it('Returns unsuccessful', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://dog.woof/';
        let returnRequest = nock('http://dog.woof')
          .matchHeader('Content-Type', 'application/json')
          .get('/return/get?id=5')
          .reply(404);
        let gateway = new ReturnGateway(apiKeyGateway);
        let response = await gateway.findById(5);
        expect(response).toEqual({success: false});
      });
    });
  });

  describe('#Submit', () => {
    describe('Example one', () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway(apiKeyGateway);
      });

      it('Submits the data to the API', async () => {
        let submitReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/submit', {project_id: 1, return_id: 1, data: {cats: 'meow'}})
          .reply(200);
        await gateway.submit(1, 1, {cats: 'meow'});

        expect(submitReturnRequest.isDone()).toBeTruthy();
      });

      it('Returns successful & the return id', async () => {
        let submitReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/submit', {project_id: 1, return_id: 1, data: {cats: 'meow'}})
          .reply(200, {id: 1});
        let response = await gateway.submit(1, 1, {cats: 'meow'});
        expect(response).toEqual({success: true});
      });
    });

    describe('Example two', () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway(apiKeyGateway);
      });

      it('Submits the data to the API', async () => {
        let submitReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/submit', {project_id: 255, return_id: 2, data: {dogs: 'woof'}})
          .reply(200);
        await gateway.submit(255, 2, {dogs: 'woof'});

        expect(submitReturnRequest.isDone()).toBeTruthy();
      });

      it('Returns successful & the return id', async () => {
        let submitReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/submit', {project_id: 255, return_id: 2, data: {dogs: 'woof'}})
          .reply(200, {id: 2});
        let response = await gateway.submit(255, 2, {dogs: 'woof'});
        expect(response).toEqual({success: true});
      });
    });

    describe('With an unsuccessful response', () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway(apiKeyGateway);
      });

      it('Returns unsuccessful', async () => {
        let submitReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/submit', {project_id: 255, return_id: 2, data: {dogs: 'woof'}})
          .reply(500);
        let response = await gateway.submit(255, 2, {dogs: 'woof'});

        expect(response.success).toBeFalsy();
      });
    });
  });

  describe('#BaseReturnFor', () => {
    describe('Given a Return is found', () => {
      let returnRequest, response;

      describe('Example one', () => {
        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
          returnRequest = nock('http://cat.meow')
            .matchHeader('Content-Type', 'application/json')
            .get('/project/1/return')
            .reply(200, {
              baseReturn: {data: {some: 'data'}, schema: {some: 'schema'}},
            });
          let gateway = new ReturnGateway(apiKeyGateway);
          response = await gateway.baseReturnFor(1);
        });

        it('Fetches the return from the API', () => {
          expect(returnRequest.isDone()).toBeTruthy();
        });

        it('Returns the response from the api', () => {
          let expectedReturn = new Return({some: 'data'}, {some: 'schema'});
          expect(response.success).toEqual(true);
          expect(response.foundReturn.data).toEqual({some: 'data'});
          expect(response.foundReturn.schema).toEqual({some: 'schema'});
        });
      });

      describe('Example two', () => {
        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = 'http://dog.woof/';
          let returnRequest = nock('http://dog.woof')
            .matchHeader('Content-Type', 'application/json')
            .get('/project/5/return')
            .reply(200, {
              baseReturn: {data: {cats: 'meow'}, schema: {dogs: 'woof'}},
            });
          let gateway = new ReturnGateway(apiKeyGateway);
          response = await gateway.baseReturnFor(5);
        });

        it('Fetches the return from the API', () => {
          expect(returnRequest.isDone()).toBeTruthy();
        });

        it('Returns the response from the api', () => {
          let expectedReturn = new Return({cats: 'meow'}, {dogs: 'woof'});
          expect(response.success).toEqual(true);
          expect(response.foundReturn.data).toEqual({cats: 'meow'});
          expect(response.foundReturn.schema).toEqual({dogs: 'woof'});
        });
      });
    });

    describe('Given a return is not found', () => {
      it('Returns unsuccessful', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://dog.woof/';
        let returnRequest = nock('http://dog.woof')
          .matchHeader('Content-Type', 'application/json')
          .get('/project/5/return')
          .reply(404);
        let gateway = new ReturnGateway(apiKeyGateway);
        let response = await gateway.baseReturnFor(5);
        expect(response).toEqual({success: false});
      });
    });
  });

  describe('#Create', () => {
    describe('Example one', () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway(apiKeyGateway);
      });

      it('Submits the data to the API', async () => {
        let createReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/create', {project_id: 1, data: {cats: 'meow'}})
          .reply(200, {id: 1});
        await gateway.create(1, {cats: 'meow'});

        expect(createReturnRequest.isDone()).toBeTruthy();
      });

      it('Returns successful & the return id', async () => {
        let createReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/create', {project_id: 1, data: {cats: 'meow'}})
          .reply(200, {id: 1});
        let response = await gateway.create(1, {cats: 'meow'});
        expect(response).toEqual({success: true, returnId: 1});
      });
    });

    describe('Example two', () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway(apiKeyGateway);
      });

      it('Submits the data to the API', async () => {
        let createReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/create', {project_id: 2, data: {dogs: 'woof'}})
          .reply(200, {id: 2});
        await gateway.create(2, {dogs: 'woof'});

        expect(createReturnRequest.isDone()).toBeTruthy();
      });

      it('Returns successful & the return id', async () => {
        let createReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/create', {project_id: 2, data: {dogs: 'woof'}})
          .reply(200, {id: 2});
        let response = await gateway.create(2, {dogs: 'woof'});
        expect(response).toEqual({success: true, returnId: 2});
      });
    });

    describe('With an unsuccessful response', () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway(apiKeyGateway);
      });

      it('Returns unsuccessful', async () => {
        let createReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/create', {project_id: 2, data: {dogs: 'woof'}})
          .reply(500);
        let response = await gateway.create(2, {dogs: 'woof'});

        expect(response.success).toBeFalsy();
      });
    });
  });

  describe('#Update', () => {
    describe('Example one', () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway(apiKeyGateway);
      });

      it('Submits the data to the API', async () => {
        let updateReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/update', {project_id: 9, return_id: 1, return_data: {cats: 'meow'}})
          .reply(200);
        await gateway.update(9, 1, {cats: 'meow'});

        expect(updateReturnRequest.isDone()).toBeTruthy();
      });

      it('Returns successful', async () => {
        let updateReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/update', {project_id: 6, return_id: 1, return_data: {cats: 'meow'}})
          .reply(200);
        let response = await gateway.update(6, 1, {cats: 'meow'});
        expect(response).toEqual({success: true});
      });
    });

    describe('Example two', () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway(apiKeyGateway);
      });

      it('Submits the data to the API', async () => {
        let updateReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/update', {project_id: 4, return_id: 2, return_data: {dogs: 'woof'}})
          .reply(200);
        await gateway.update(4, 2, {dogs: 'woof'});

        expect(updateReturnRequest.isDone()).toBeTruthy();
      });

      it('Returns successful', async () => {
        let updateReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/update', {project_id: 4, return_id: 2, return_data: {dogs: 'woof'}})
          .reply(200);
        let response = await gateway.update(4, 2, {dogs: 'woof'});
        expect(response).toEqual({success: true});
      });
    });

    describe('With an unsuccessful response', () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway(apiKeyGateway);
      });

      it('Returns unsuccessful', async () => {
        let updateReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/update', {project_id: 12, return_id: 2, return_data: {dogs: 'woof'}})
          .reply(500);
        let response = await gateway.update(12, 2, {dogs: 'woof'});

        expect(response.success).toBeFalsy();
      });
    });
  });
});
