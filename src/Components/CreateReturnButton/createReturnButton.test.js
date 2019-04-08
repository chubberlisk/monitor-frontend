import React from "react";
import {mount} from "enzyme";
import CreateReturnButton from ".";

//We'll also need to get the base return
describe("<CreateReturnButton>", () => {
  describe("Example 1", () => {
    it("Calls the getBase usecase", async () => {
      let createReturnSpy = {execute: jest.fn(async (presenter) => {})}
      let getBase = {execute: jest.fn(async (presenter) => {})}
      let wrap = mount(<CreateReturnButton projectId={0} getBase={getBase} create={createReturnSpy} history={[]}/>);

      wrap.find("button[data-test='create-button']").simulate("click");
      await wrap.update();
      expect(createReturnSpy.execute).toHaveBeenCalledWith(expect.anything());
    });

    it("Calls the create usecase", async () => {
      let createReturnSpy = {execute: jest.fn(async (presenter) => {})}
      let wrap = mount(<CreateReturnButton projectId={0} create={createReturnSpy} history={[]}/>);

      wrap.find("button[data-test='create-button']").simulate("click");
      await wrap.update();
      expect(createReturnSpy.execute).toHaveBeenCalledWith(expect.anything());
    });

    it("Navigates on recieving the callback", async () => {
      let createReturnSpy = {execute: jest.fn(async (presenter) => {await presenter.creationSuccessful(1)})}
      let historySpy = [];
      let wrap = mount(<CreateReturnButton projectId={0} create={createReturnSpy} history={historySpy}/>);

      wrap.find("button[data-test='create-button']").simulate("click");
      await wrap.update();
      expect(historySpy).toEqual(["/project/0/return/1"]);
    });
  });

  /*describe("Example 2", () => {
    it("Calls the create usecase", async () => {
      let createReturnSpy = {execute: jest.fn(async (presenter) => await presenter.creationSuccessful(3))}
      let wrap = mount(<CreateReturnButton create={createReturnSpy} location={[]}/>);

      wrap.find("button").simulate("click");
      await wrap.update();
      expect(wrap.execute).toHaveBeenCalledWith(expect.anything());
    });
  });*/
});
