import GetProjectURL from '.';

describe("GetProjectURL", () => {
  describe("Example 1", () => {
    let locationGatewayStub, getProjectURL, response;
    beforeEach(() => {
      locationGatewayStub = { 
        origin: jest.fn(() => "https://myurl"),
        getProjectURL: jest.fn( (projectId) => "https://myurl/this/is/a/project/3")
      }

      getProjectURL = new GetProjectURL(locationGatewayStub)
      response = getProjectURL.execute(3)
    });

    it("Calls the get Location gateway", () => {
      expect(locationGatewayStub.getProjectURL).toHaveBeenCalled()
    }); 

    it("return what the gateway returns", () => {
      expect(response).toEqual("https://myurl/this/is/a/project/3")
    });
  });

  describe("Example 2", () => {
    let locationGatewayStub, getProjectURL, response;
    beforeEach(() => {
      locationGatewayStub = { 
        origin: jest.fn( () => "https://mysecondurl"),
        getProjectURL: jest.fn( (projectId) => "https://another/this/is/a/project/7")
      }

      getProjectURL = new GetProjectURL(locationGatewayStub)
      response = getProjectURL.execute(7)
    });

    it("Calls the get Location gateway", () => {
      expect(locationGatewayStub.getProjectURL).toHaveBeenCalled()
    }); 

    it("return what the gateway returns", () => {
      expect(response).toEqual("https://another/this/is/a/project/7")
    });
  });
});