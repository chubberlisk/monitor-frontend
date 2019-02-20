import React from "react";
import { mount } from "enzyme";
import InfrastructureAdditionPage from ".";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

describe("Infrastructure Addition page", () => {
  let component, getProjectUseCase, updateProjectUseCase, history;

  describe("Example 1", () => {
    beforeEach(async () => {
      history = ["/project/6", "/project/3/infrastructures"];
      getProjectUseCase = {
        execute: jest.fn(
          async (presenter) => presenter.presentProject({
            schema: {
              type: "object",
              properties: {
                infrastructures: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      information: {
                        type: "string"
                      }
                    }
                  }
                },
                other: {
                  type: "object",
                  properties: {
                    value: {
                      type: "string"
                    }
                  }
                }
              }
            },
            data: {
              infrastructures: [
                {information: "Value"}
              ],
              other: {
                value: "data"
              }
            }
          })
        )
      };

      updateProjectUseCase= {execute: jest.fn(async (presenter, id) => { await presenter.projectUpdated("", 13) })}

      component = mount(<
        InfrastructureAdditionPage
        history={history}
        getProject={getProjectUseCase}
        updateProject={updateProjectUseCase}
        match={{ params: { id: 3, type: 'ff' } }}
      />);

      await component.update();
    });

    it("Displays a form with only infrastructures", () => {
      expect(component.find("Form").props().schema).toEqual(
        {
          type: "array",
          items: {
            type: "object",
            properties: {
              information: {
                type: "string"
              }
            }
          }
        }
      );

      expect(component.find("Form").props().formData).toEqual(
        [
          {information: "Value"}
        ]
      );
    });

    it("Calls the getProject use case", () => {
      expect(getProjectUseCase.execute).toHaveBeenCalledWith(expect.anything(), {id: 3});
    });

    it("Navigates away when submitted", async () => {
      component.find("Form").simulate("submit");
      await wait();
      await component.update();
      expect(history).toEqual(["/project/6", "/project/3/infrastructures", "/project/3/new"]);
    });

    it("Calls the updateProject use case when submitted", async () => {
      component.find("Form").simulate("submit");
      await wait();
      await component.update();

      expect(updateProjectUseCase.execute).toHaveBeenCalledWith(expect.anything(), 3, {
        infrastructures: [
          {information: "Value"}
        ],
        other: {
          value: "data"
        }
      }, 0);
    });

    it("Calls the updateProject use case with the correct data when edited", async () => {
      component.find("input").at(0).simulate("change", {target: {value: "cat"}});
      component.find("Form").simulate("submit");
      await wait();
      await component.update();

      expect(updateProjectUseCase.execute).toHaveBeenCalledWith(expect.anything(), 3, {
        infrastructures: [
          {information: "cat"}
        ],
        other: {
          value: "data"
        }
      }, 0);
    });
  });

  describe("Example 2", () => {
    beforeEach(async () => {
      history = ["/project/1/infrastructures"];
      getProjectUseCase = {
        execute: jest.fn(
          async (presenter) => await presenter.presentProject({
            schema: {
              type: 'object',
              properties: {
                infrastructures: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string"
                      },
                      information: {
                        type: "string"
                      }
                    }
                  }
                },
                extra: {
                  type: "object",
                  properties: {
                    misc: {
                      type: "string"
                    }
                  }
                }
              }
            },
            data: {
              infrastructures: [
                {name: "Alex"},
                {information: "Extra"}
              ],
              extra: {
                misc: "Some data"
              }
            }
          })
        )
      };

      updateProjectUseCase= {execute: jest.fn(async (presenter, id) => { await presenter.projectUpdated("", 15) })}

      component = mount(<
        InfrastructureAdditionPage
        history={history}
        getProject={getProjectUseCase}
        updateProject={updateProjectUseCase}
        match={{ params: { id: 1, type: 'ff' } }}
      />);

      await component.update();
    });

    it("Displays a form with only infrastructures", () => {
      expect(component.find("Form").props().schema).toEqual(
        {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string"
              },
              information: {
                type: "string"
              }
            }
          }
        }
      );

      expect(component.find("Form").props().formData).toEqual(
        [
          {name: "Alex"},
          {information: "Extra"}
        ]
      );
    });

    it("Calls the getProject use case", () => {
      expect(getProjectUseCase.execute).toHaveBeenCalledWith(expect.anything(), {id: 1});
    });

    it("Navigates away when submitted", async () => {
      component.find("Form").simulate("submit");
      await wait();
      await component.update();
      expect(history).toEqual(["/project/1/infrastructures", "/project/1/new"]);
    });

    it("Calls the updateProject use case when submitted", async () => {
      component.find("Form").simulate("submit");
      await wait();
      await component.update();

      expect(updateProjectUseCase.execute).toHaveBeenCalledWith(expect.anything(), 1, {
        infrastructures: [
          {name: "Alex"},
          {information: "Extra"}
        ],
        extra: {
          misc: "Some data"
        }
      }, 0);
    });

    it("Calls the updateProject use case with the correct data when edited", async () => {
      component.find("input").at(0).simulate("change", {target: {value: "dog"}});
      component.find("Form").simulate("submit");
      await wait();
      await component.update();

      expect(updateProjectUseCase.execute).toHaveBeenCalledWith(expect.anything(), 1, {
        infrastructures: [
          {name: "dog"},
          {information: "Extra"}
        ],
        extra: {
          misc: "Some data"
        }
      }, 0);
    });
  });
});