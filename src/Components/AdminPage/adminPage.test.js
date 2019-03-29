import React from "react";
import AdminPage from ".";
import { mount } from "enzyme";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

describe("<AdminPage>", () => {
  let documentGatewaySpy = jest.fn();
  describe("LA users", () => {
    let getRoleSpy = {execute: jest.fn(() => ({role: "Local Authority"}))};
    describe("Example 1", () => {
    let page;
      beforeEach(() => {
        page = mount(
          <AdminPage
            update = {jest.fn()}
            status = {"viewing"}
            documentGateway={documentGatewaySpy}
            match={{ params: { projectId: 1 }}}
            timestamp = {1234}
            data = {{ dark: { cat: 'purr' }}}
            getRole={getRoleSpy}
            schema = {{
              type: "object",
              properties: {
                dark: {
                  type: "object",
                  properties: {
                    cat: {
                      type: "string"
                    }
                  }
                }
              }
            }}
            uiSchema = {{dark: { cat: {prop: 'writable'}}}}
          />
        )
      });

      describe("Parent Form", () => {
        it("Renders the parent form", () => {
          expect(page.find("ParentForm").length).toEqual(1)
        });
  
        it("Passes the schema to parent form", () => {
          expect(page.find("ParentForm").props().schema).toEqual(
            {
              type: "object", 
              properties: {
                admin : {
                  type: "object",
                  title: "Project Admin",
                  properties: {
                    dark: {
                      type: "object",
                      properties: {
                        cat: {
                          type: "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          )
        });
  
        it("Passes the form data to parent form", () => {
          expect(page.find("ParentForm").props().formData).toEqual(
            {
              admin: {
                dark: { cat: 'purr' }
              }
            }
          )
        });
  
        it("Passes the ui schema to parent form", () => {
          expect(page.find("ParentForm").props().uiSchema).toEqual(
            { admin: {dark: { cat: {prop: 'writable'}}}}
          )
        });
  
        it("Passes get role to the parent form", () => {
          expect(page.find("ParentForm").props().getRole).toEqual(getRoleSpy)
        });

        it("Passes document gateway to the parent form", () => {
          expect(page.find("ParentForm").props().documentGateway).toEqual(documentGatewaySpy)
        });
      });

      describe("Viewing the information", () => {
        it("doesn't render an edit button", () => {
          expect(page.find("[data-test='edit-button']").length).toEqual(0);
        });
      
        it("doesn't render a save button ", () => {
          expect(page.find("[data-test='save-button']").length).toEqual(0);
        });
      });
    });
  
    describe("Example 2", () => {
    let page, updateAdminSpy;
      beforeEach(() => {
        updateAdminSpy = { execute: jest.fn((presenter, _) => presenter.projectUpdated([], 1234))}
        page = mount(
          <AdminPage
            update = {updateAdminSpy}
            status = {"viewing"}
            match={{ params: { projectId: 3 }}}
            getRole={getRoleSpy}
            timestamp = { 3333 }
            schema = {{
              type: "object",
              properties: {
                schema: {
                  type: "string"
                }
              }
            }}
            data = {{ name: 'name'}}
            uiSchema = {{schema: {prop:'enabled'}}}
          />
        )
      });

      it("Passes the schema to parent form", () => {
        expect(page.find("ParentForm").props().schema).toEqual(
          {
            type: "object",
            properties: {
              admin: {
                type: "object",
                title: "Project Admin",
                properties: {
                  schema: {
                    type: "string"
                  }
                }
              }
            }
          }
        )
      });

      it("Passes the form data to parent form", () => {
        expect(page.find("ParentForm").props().formData).toEqual(
          {
            admin: {
              name: 'name'
            }
          }
        )
      });

      it("Passes the ui schema to parent form", () => {
        expect(page.find("ParentForm").props().uiSchema).toEqual(
          { admin: { schema: {prop: 'enabled'}}}
        )
      });

    });
  });

  describe("Homes England Users", () => {
    let getRoleSpy = {execute: jest.fn(() => ({role: "Homes England"}))};
    describe("Example 1", () => {
    let page, updateAdminSpy, editSpy;
      beforeEach(() => {
        editSpy = jest.fn();
        updateAdminSpy = { execute: jest.fn((presenter, _) => presenter.projectUpdated([], 1234))}
        page = mount(
          <AdminPage
            documentGateway={documentGatewaySpy}
            update = {updateAdminSpy}
            status = {"viewing"}
            onEdit = {editSpy}
            match={{ params: { projectId: 1 }}}
            timestamp = {1234}
            data = {{ dark: { cat: 'purr' }}}
            getRole={getRoleSpy}
            schema = {{
              type: "object",
              properties: {
                dark: {
                  type: "object",
                  properties: {
                    cat: {
                      type: "string"
                    }
                  }
                }
              }
            }}
            uiSchema = {{dark: { cat: { prop: 'writable'}}}}
          />
        )
      });

      describe("Viewing the information", () => {
        it("renders an edit button", () => {
          expect(page.find("[data-test='edit-button']").length).toEqual(1);
        });
      
        it("doesn't render a save button ", () => {
          expect(page.find("[data-test='save-button']").length).toEqual(0);
        });
      });

      describe("Editting the information", () => {
        beforeEach(() => {
          page.find("[data-test='edit-button']").simulate('click')
        });

        it("doesn't render an edit button", async () => {
          await page.update()
          expect(page.find("[data-test='edit-button']").length).toEqual(0);
        });
      
        it("renders a save button", async () => {
          await page.update()
          expect(page.find("[data-test='save-button']").length).toEqual(1);
        });

        it("Calls the update use case with updated data when clicking the button", async () => {
          page.find('input[type="text"]').simulate('change', {target: {value: 'dog'} })
          await wait();
          page.find("[data-test='save-button']").simulate('click')
  
          expect(updateAdminSpy.execute).toHaveBeenCalledWith(expect.anything(), {
            projectId: 1,
            data: { dark: { cat: 'dog' }},
            timestamp: 1234
          })
        });
      });

      describe("Finished editting", () => {
        beforeEach(async () => {
          page.find("[data-test='edit-button']").simulate('click')
          await wait();
          page.find('input[type="text"]').simulate('change', {target: {value: 'dog'} })
          await wait();
          page.find("[data-test='save-button']").simulate('click')
          await page.update();
        });

        it("Displays a save success message", () => {
          expect(page.find('[data-test="save-success"]').length).toEqual(1)
        });
        
        it("renders an edit button", () => {
          expect(page.find("[data-test='edit-button']").length).toEqual(1);
        });
      
        it("doesn't render a save button ", () => {
          expect(page.find("[data-test='save-button']").length).toEqual(0);
        });
      });
    });
  
    describe("Example 2", () => {
    let page, updateAdminSpy;
      beforeEach(() => {
        updateAdminSpy = { execute: jest.fn((presenter, _) => presenter.projectUpdated([], 1234))}
        page = mount(
          <AdminPage
            documentGateway={documentGatewaySpy}
            update = {updateAdminSpy}
            status = {"viewing"}
            onEdit = {jest.fn()}
            match={{ params: { projectId: 3 }}}
            getRole={getRoleSpy}
            timestamp = { 3333 }
            schema = {{
              type: "object",
              properties: {
                schema: {
                  type: "string"
                }
              }
            }}
            data = {{ name: 'name'}}
            uiSchema = {{schema: {prop: 'enabled'}}}
          />
        )
      });
  
      describe("Editting the inforamtion", () => {
        beforeEach(() => {
          page.find("[data-test='edit-button']").simulate('click')
        });

        it("calls the update use case with the data when clicking the button", async () => {
          await page.update()
          page.find("[data-test='save-button']").simulate('click')
          expect(updateAdminSpy.execute).toHaveBeenCalledWith(expect.anything(), {
            projectId: 3,
            data: { name: 'name'},
            timestamp: 3333
          })
        });

        it("Calls the update use case with updated data when clickign the button", async () => {
          page.find('input[type="text"]').simulate('change', {target: {value: 'quack'} })
          await wait();
          page.find("[data-test='save-button']").simulate('click')

          expect(updateAdminSpy.execute).toHaveBeenCalledWith(expect.anything(), {
            projectId: 3,
            data: { schema: 'quack', name: 'name'},
            timestamp: 3333
          })
        });
      })
    });

    describe("unsuccessful update", () => {
      describe("no repsonse from api", () => {
        let page, updateAdminSpy;
        beforeEach(() => {
          updateAdminSpy = { execute: jest.fn((presenter, _) => presenter.projectNotUpdated())}
          page = mount(
            <AdminPage
              documentGateway={documentGatewaySpy}
              status={"viewing"}
              onEdit={jest.fn()}
              update = {updateAdminSpy}
              match={{ params: { projectId: 1 }}}
              timestamp = {1234}
              data = {{ dark: { cat: 'purr' }}}
              getRole={getRoleSpy}
              schema = {{
                type: "object",
                properties: {
                  dark: {
                    type: "object",
                    properties: {
                      cat: {
                        type: "string"
                      }
                    }
                  }
                }
              }}
              uiSchema = {{dark: { cat: {prop:'writable'}}}}
            />
          )
        });
  
        it("Displays a timeout error", async () => {
          page.find('[data-test="edit-button"]').simulate('click')
          await wait();
          await page.update();
          page.find('[data-test="save-button"]').simulate('click')
  
          expect(page.find('[data-test="save-unsuccessful-error"]').length).toEqual(1)
        });
      });
  
      describe("incorrect timestamp error", () => {
        let page, updateAdminSpy;
        beforeEach(() => {
          updateAdminSpy = { execute: jest.fn((presenter, _) => presenter.projectUpdated(['incorrect_timestamp'], 1234))}
          page = mount(
            <AdminPage
              documentGateway={documentGatewaySpy}
              status={"viewing"}
              onEdit={jest.fn()}
              update = {updateAdminSpy}
              match={{ params: { projectId: 1 }}}
              timestamp = {1234}
              data = {{ dark: { cat: 'purr' }}}
              getRole={getRoleSpy}
              schema = {{
                type: "object",
                properties: {
                  dark: {
                    type: "object",
                    properties: {
                      cat: {
                        type: "string"
                      }
                    }
                  }
                }
              }}
              uiSchema = {{dark: { cat: {prop: 'writable'}}}}
            />
          )
        });
  
        it("Displays an overwriting error", async () => {
          page.find('[data-test="edit-button"]').simulate('click')
          await wait();
          await page.update()
          page.find('[data-test="save-button"]').simulate('click')
  
          expect(page.find('[data-test="overwriting-error"]').length).toEqual(1)
        });
      });
    });
  });
});