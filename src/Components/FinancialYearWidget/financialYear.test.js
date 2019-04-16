import React from 'react';
import {mount} from 'enzyme';
import FinancialYearWidget from '.';

describe("<FinancialYearWidget>", () => {
  describe("Example 1", () => {
    describe("Sets the input box value", () => {
      it("Given a year", () => {
        let wrap = mount(<FinancialYearWidget value="2021-03-31" onChange={() => {}}/>);
        expect(wrap.find("[data-test='start-year']").props().value).toEqual("2020");
      });

      it("Given the legacy format", () => {
        let wrap = mount(<FinancialYearWidget value="2020/21" onChange={() => {}}/>);
        expect(wrap.find("[data-test='start-year']").props().value).toEqual("2020");
      });

      it("Given no value", () => {
        let wrap = mount(<FinancialYearWidget onChange={() => {}}/>);
        expect(wrap.find("[data-test='start-year']").props().value).toEqual("");
      });
    });

    describe("When a year is entered", () => {
      it("Calls onChange with the correct ISO date", () => {
        let onChangeSpy = jest.fn();
        let wrap = mount(<FinancialYearWidget onChange={onChangeSpy}/>);
        wrap
          .find("[data-test='start-year']")
          .simulate("change", {target: {value: "2020"}});
        expect(onChangeSpy).toHaveBeenCalledWith("2021-03-31");
      });
    });

    describe("Displays end year", () => {
      it("Given a year", () => {
        let wrap = mount(<FinancialYearWidget value="2021-03-31" onChange={() => {}}/>);
        expect(wrap.find("[data-test='end-year']").text()).toEqual("/21");
      });
    });
  });

  describe("Example 2", () => {
    describe("Sets the input box value", () => {
      it("Given a year", () => {
        let wrap = mount(<FinancialYearWidget value="1990-03-31" onChange={() => {}}/>);
        expect(wrap.find("[data-test='start-year']").props().value).toEqual("1989");
      });

      it("Given the legacy format", () => {
        let wrap = mount(<FinancialYearWidget value="1990/91" onChange={() => {}}/>);
        expect(wrap.find("[data-test='start-year']").props().value).toEqual("1990");
      });

      it("Given no value", () => {
        let wrap = mount(<FinancialYearWidget onChange={() => {}}/>);
        expect(wrap.find("[data-test='start-year']").props().value).toEqual("");
      });
    });

    describe("When a year is entered", () => {
      it("Calls onChange with the correct ISO date", () => {
        let onChangeSpy = jest.fn();
        let wrap = mount(<FinancialYearWidget onChange={onChangeSpy}/>);
        wrap
          .find("[data-test='start-year']")
          .simulate("change", {target: {value: "1989"}});
        expect(onChangeSpy).toHaveBeenCalledWith("1990-03-31");
      });
    });

    describe("Displays end year", () => {
      it("Given a year", () => {
        let wrap = mount(<FinancialYearWidget value="1990-03-31" onChange={() => {}}/>);
        expect(wrap.find("[data-test='end-year']").text()).toEqual("/90");
      });
    });
  })
});
