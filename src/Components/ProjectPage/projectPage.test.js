import React from "react";
import ProjectPage from ".";
import { shallow } from "enzyme";

describe("<ProjectPage>", () => {
  let page, getProjectSpy, childrenSpy, GenerateReadOnlySchemaSpy, UISchema;

  describe("Example one", () => {
    describe("When loading the project", () => {
      beforeEach(() => {
        getProjectSpy = { execute: jest.fn() };
        page = shallow(
          <ProjectPage match={{ params: { id: "1" } }} getProject={getProjectSpy}>
            {() => {}}
          </ProjectPage>
        );
      });

      it("Calls the getProject usecase when loaded", () => {
        expect(getProjectSpy.execute).toHaveBeenCalledWith(expect.anything(), {
          id: "1"
        });
      });

      it("Sets loading to true when first mounted", () => {
        expect(page.state().loading).toEqual(true);
      });
    });

    describe("When the project is loaded and is of status draft", () => {
      beforeEach(() => {
        UISchema = {};

        getProjectSpy = {
          execute: (presenter, _) =>
            presenter.presentProject({
              data: { meow: true },
              schema: { hello: "hi" },
              status: 'Draft'
            })
        };
        childrenSpy = jest.fn();

        page = shallow(
          <ProjectPage match={{ params: { id: "2" } }} getProject={getProjectSpy}>
            {childrenSpy}
          </ProjectPage>
        );
      });

      it("Sets loading to false when the project is presented", () => {
        expect(page.state().loading).toEqual(false);
      });

      it("Holds the formData when the project is presented", () => {
        expect(page.state().formData).toEqual({ meow: true });
      });

      it("Holds the formSchema when the project is presented", () => {
        expect(page.state().formSchema).toEqual({ hello: "hi" });
      });

      it("Holds the projectStatus when the project is presented", () => {
        expect(page.state().projectStatus).toEqual('Draft');
      });

      it("Holds th uischema as an empty hash", () => {
        expect(page.state().formUiSchema).toEqual({})
      });

      it("Renders null", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          projectStatus: "Draft",
          formData: { meow: true },
          formSchema: { hello: "hi" },
          formUiSchema: UISchema
        });
      });
    });
  });

  describe("Example two", () => {
    describe("When loading the project", () => {
      beforeEach(() => {
        UISchema = {}
        getProjectSpy = { execute: jest.fn() };
        page = shallow(
          <ProjectPage match={{ params: { id: "2" } }} getProject={getProjectSpy}>
            {() => {}}
          </ProjectPage>
        );
      });
      it("Calls the getProject usecase when loaded", () => {
        expect(getProjectSpy.execute).toHaveBeenCalledWith(expect.anything(), {
          id: "2"
        });
      });

      it("Sets loading to true when first mounted", () => {
        expect(page.state().loading).toEqual(true);
      });
    });

    describe("When the project is loaded", () => {
      beforeEach(() => {
        getProjectSpy = {
          execute: (presenter, _) =>
            presenter.presentProject({
              data: { woof: false },
              schema: { goodbye: "see ya" },
              status: "Submitted"
            })
        };

        childrenSpy = jest.fn();

        page = shallow(
          <ProjectPage match={{ params: { id: "2" } }} getProject={getProjectSpy}>
            {childrenSpy}
          </ProjectPage>
        );
      });

      it("Sets loading to false when the project is presented", () => {
        expect(page.state().loading).toEqual(false);
      });

      it("Holds the formData when the project is presented", () => {
        expect(page.state().formData).toEqual({ woof: false });
      });

      it("Holds the formSchema when the project is presented", () => {
        expect(page.state().formSchema).toEqual({ goodbye: "see ya" });
      });

      it("Holds the projectStatus when the project is presented", () => {
        expect(page.state().projectStatus).toEqual('Submitted');
      });

      it("Renders the children with the formData and schema populated from the state", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          projectStatus: "Submitted",
          formData: { woof: false },
          formSchema: { goodbye: "see ya" },
          formUiSchema: {},
        });
      });
    });
  });

  describe("When project is in LA Draft status", () => {
    describe("Example 1", () => {
      beforeEach(() => {
        getProjectSpy = {
          execute: (presenter, _) =>
            presenter.presentProject({
              data: { heya: 'Bye' },
              schema: { readonly: true, title: 'Heya' },
              status: "LA Draft"
            })
        };
  
        GenerateReadOnlySchemaSpy = {
          execute: (data) => (
             { heya: {'ui:disabled' : true} }
          )
        }
  
        childrenSpy = jest.fn();
  
        page = shallow(
          <ProjectPage match={{ params: { id: "2" } }} generateReadOnlySchema={GenerateReadOnlySchemaSpy} getProject={getProjectSpy}>
            {childrenSpy}
          </ProjectPage>
        );
      });
  
      it("Holds the Ui Schema for read only objects", () => {
        expect(page.state().formUiSchema).toEqual({heya: {'ui:disabled': true}})
      });

      it("Renders the children with the Ui schema populated from the state", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          projectStatus: "LA Draft",
          formData: { heya: 'Bye' },
          formSchema: { readonly: true, title: 'Heya' },
          formUiSchema: { heya: {'ui:disabled' : true} }
        });
      });
    });

    describe("Example 2", () => {
      beforeEach(() => {
        getProjectSpy = {
          execute: (presenter, _) =>
            presenter.presentProject({
              data: { hi: 'Bye' },
              schema: {hi: { readonly: true, title: 'Heya' }, bye: { title: 'Boo'}},
              status: "LA Draft"
            })
        };

  
        GenerateReadOnlySchemaSpy = {
          execute: (data) => (
             { bye: {'ui:disabled' : true} }
          )
        }
  
        childrenSpy = jest.fn();
  
        page = shallow(
          <ProjectPage match={{ params: { id: "2" } }} generateReadOnlySchema={GenerateReadOnlySchemaSpy} getProject={getProjectSpy}>
            {childrenSpy}
          </ProjectPage>
        );
      });
      it("Holds the UI Schema for read only objects", () => {
        expect(page.state().formUiSchema).toEqual({ bye: {'ui:disabled' : true} })
      });

      it("Renders the children with the Ui schema populated from the state", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          projectStatus: "LA Draft",
          formData: { hi: 'Bye' },
          formSchema: {hi: { readonly: true, title: 'Heya' }, bye: { title: 'Boo'}},
          formUiSchema: { bye: {'ui:disabled' : true} }
        });
      });
    });
  });

});
