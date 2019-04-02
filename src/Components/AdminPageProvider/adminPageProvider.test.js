import React from "react";
import AdminPageProvider from ".";
import { shallow } from "enzyme";

describe("<AdminPageProvider>", () => {
  describe("Loading", () => {
    it("Shows loading when first mounted", () => {
      let page = shallow(
        <AdminPageProvider
          getProjectAdmin = {{ execute: () => {}}}
          generateUiSchema = { { execute: () => {}}}
          generateDisabledUiSchema = { { execute: () => {}} }
          match={{ params: { projectId: 1 }}}  
        >
          {() => {}}
        </AdminPageProvider>)
        
        expect(page.find('[data-test="loading"]').length).toEqual(1)
    });
  });

  describe("Loaded", () => {
    describe("Example 1", () => {
    let page, getProjectadminSpy, generateDisabledUiSchemaSpy, childrenSpy, generateUiSchemaSpy;
  
      beforeEach(() => {
        getProjectadminSpy = { execute: jest.fn((presenter, id) => presenter.presentAdmin({
          data: { name: 'name' },
          schema: {schema: 'schema'},
          timestamp: 1234
        }))}
        generateUiSchemaSpy = { execute: jest.fn((_) => ({uiSchema: 'enabled'})) };
        generateDisabledUiSchemaSpy = { execute: jest.fn((_) => ({uiSchema: 'enabled'})) };

        childrenSpy = jest.fn()
        page = shallow(
          <AdminPageProvider
            getProjectAdmin = {getProjectadminSpy}
            generateDisabledUiSchema = {generateDisabledUiSchemaSpy}
            generateUiSchema = { generateUiSchemaSpy}
            match={{ params: { projectId: 1 }}}  
          >
            {childrenSpy}
          </AdminPageProvider>
        )
      });
    
      it("Calls the get project admin use case", () => {
        expect(getProjectadminSpy.execute).toHaveBeenCalledWith(expect.anything(),{ projectId: 1 })
      });
  
      it("Stops loading when the use case has repsonded", async () => {
        await page.update();
        expect(page.find('[data-test="loading"]').length).toEqual(0)
      });

      it("It generates a disabled ui schema", () => {
        expect(generateDisabledUiSchemaSpy.execute).toHaveBeenCalledWith({schema: 'schema'})
      });
  
      it("Renders it's children", () => {
        expect(childrenSpy).toHaveBeenCalled()
      });
  
      it("Passes the responses from the usecases to it's children", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          schema: { schema: 'schema'},
          data: { name: 'name'},
          uiSchema: {uiSchema: 'enabled'},
          timestamp: 1234,
          projectId: 1,
          onEditToggle: expect.anything()
        })
      });
    });
  
    describe("Example 2", () => {
    let getProjectadminSpy, childrenSpy, generateUiSchemaSpy, generateDisabledUiSchemaSpy;
  
      beforeEach(() => {
        getProjectadminSpy = { execute: jest.fn((presenter, id) => presenter.presentAdmin({
          data: { meow: 'purr' },
          schema: {dark: 'louder'},
          timestamp: 3333
        }))}      
        generateUiSchemaSpy = { execute: jest.fn((_) => ({uiSchema: 'writable'})) };
        generateDisabledUiSchemaSpy = { execute: jest.fn((_) => ({uiSchema: 'enabled'})) };
        childrenSpy = jest.fn()
        shallow(
          <AdminPageProvider
            getProjectAdmin = {getProjectadminSpy}
            generateDisabledUiSchema = { generateUiSchemaSpy}
            generateUiSchema = { generateDisabledUiSchemaSpy}
            match={{ params: { projectId: 3 }}}
          >
            {childrenSpy}
          </AdminPageProvider>
        )
      });
  
      it("Calls the get project admin use case", () => {
        expect(getProjectadminSpy.execute).toHaveBeenCalledWith(expect.anything(),{ projectId: 3 })
      });
  
      it("Passes the responses from the usecase to it's children", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          projectId: 3,
          onEditToggle: expect.anything(),
          data: { meow: 'purr' },
          schema: {dark: 'louder'},
          uiSchema: {uiSchema: 'writable'},
          timestamp: 3333
        })
      });
    });
  });
});