import RoleSwitcher from ".";
import React from "react";
import { mount } from "enzyme";

describe("<RoleSwitcher>", () => {
  describe("Example 1", () => {
    it("Calls the getRole usecase on creation", () => {
      let setRoleUsecase = { execute: jest.fn() }
      let getRoleUsecase = { execute: jest.fn(() => ({role: "Homes England"})) }

      let wrap = mount(<RoleSwitcher setRole={setRoleUsecase} getRole={getRoleUsecase}/>);

      expect(getRoleUsecase.execute).toHaveBeenCalled();
    });

    it("Gives the selector value of the current role", () => {
      let setRoleUsecase = { execute: jest.fn() }
      let getRoleUsecase = { execute: jest.fn(() => ({role: "Homes England"})) }

      let wrap = mount(<RoleSwitcher setRole={setRoleUsecase} getRole={getRoleUsecase}/>);

      expect(wrap.find("[data-test='role-selector']").props().value).toEqual("Homes England");
    });

    it("Calls the setRole usecase on change", () => {
      let setRoleUsecase = { execute: jest.fn() }
      let getRoleUsecase = { execute: jest.fn(() => ({role: "Homes England"})) }

      let wrap = mount(<RoleSwitcher setRole={setRoleUsecase} getRole={getRoleUsecase}/>);

      wrap.find("[data-test='role-selector']").simulate("change", {target: {value: "Local Authority"}});

      expect(setRoleUsecase.execute).toHaveBeenCalledWith("Local Authority");
    });
  });

  describe("Example 2", () => {
    it("Calls the getRole usecase on creation", () => {
      let setRoleUsecase = { execute: jest.fn() }
      let getRoleUsecase = { execute: jest.fn(() => ({role: "Local Authority"})) }

      let wrap = mount(<RoleSwitcher setRole={setRoleUsecase} getRole={getRoleUsecase}/>);

      expect(getRoleUsecase.execute).toHaveBeenCalled();
    });

    it("Gives the selector value of the current role", () => {
      let setRoleUsecase = { execute: jest.fn() }
      let getRoleUsecase = { execute: jest.fn(() => ({role: "Local Authority"})) }

      let wrap = mount(<RoleSwitcher setRole={setRoleUsecase} getRole={getRoleUsecase}/>);

      expect(wrap.find("[data-test='role-selector']").props().value).toEqual("Local Authority");
    });

    it("Calls the setRole usecase on change", () => {
      let setRoleUsecase = { execute: jest.fn() }
      let getRoleUsecase = { execute: jest.fn(() => ({role: "Local Authority"})) }

      let wrap = mount(<RoleSwitcher setRole={setRoleUsecase} getRole={getRoleUsecase}/>);

      wrap.find("[data-test='role-selector']").simulate("change", {target: {value: "Homes England"}});

      expect(setRoleUsecase.execute).toHaveBeenCalledWith("Homes England");
    });
  });
});
