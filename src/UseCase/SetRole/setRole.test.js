import SetRole from ".";

describe("GetRole", () => {

  describe("Example 1", () => {
    it("Calls the user role gateway", () => {
      let cookieUserRoleSpy = {
        setUserRole: jest.fn()
      }
      let useCase = new SetRole(cookieUserRoleSpy);
      useCase.execute("Local Authority");
      expect(cookieUserRoleSpy.setUserRole).toHaveBeenCalledWith("Local Authority");
    });
  });

  describe("Example 2", () => {
    it("Calls the user role gateway", () => {
      let cookieUserRoleSpy = {
        setUserRole: jest.fn()
      }
      let useCase = new SetRole(cookieUserRoleSpy);
      useCase.execute("Homes England");
      expect(cookieUserRoleSpy.setUserRole).toHaveBeenCalledWith("Homes England");
    });
  });
});
