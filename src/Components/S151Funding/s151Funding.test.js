import S151Funding from ".";
import { shallow } from "enzyme";
import React from "react";

describe("s151 Funding", () => {
  describe("1 item", () => {
    describe("Example 1", () => {
      let schema = {
        type: "array",
        title: "Data",
        items: {
          type: "object",
          properties: {
            period: {
              title: "Year",
              type: "string",
              readonly: true
            },
            instalment1: {
              title: "1st Instalment",
              type: "string",
              readonly: true
            },
            instalment2: {
              title: "2nd Instalment",
              type: "string",
              readonly: true
            },
            instalment3: {
              title: "3rd Instalment",
              type: "string",
              readonly: true
            },
            instalment4: {
              title: "4th Instalment",
              type: "string",
              readonly: true
            },
            total: {
              title: "Total",
              type: "string",
              readonly: true
            },
            baselineVariance1: {
              title: "1st Instalment",
              type: "string",
              readonly: true
            },
            baselineVariance2: {
              title: "2nd Instalment",
              type: "string",
              readonly: true
            },
            baselineVariance3: {
              title: "3rd Instalment",
              type: "string",
              readonly: true
            },
            baselineVariance4: {
              title: "4th Instalment",
              type: "string",
              readonly: true
            }
          }
        }
      };
      let formData = [
        {
          period: "2018/19",
          instalment1: "1234",
          instalment2: "5678",
          instalment3: "9101",
          instalment4: "4312",
          baselineVariance1: "321",
          baselineVariance2: "322",
          baselineVariance3: "323",
          baselineVariance4: "324",
          total: "12356789",
          lastMovement1: "1",
          lastMovement2: "2",
          lastMovement3: "3",
          lastMovement4: "4",
          movementVariance1: "4",
          movementVariance2: "3",
          movementVariance3: "2",
          movementVariance4: "1"
        }
      ];
      let field = shallow(<S151Funding formData={formData} />);

      it("Renders the header row", () => {
        expect(field.find("[data-test='header']").length).toEqual(1);
      });

      describe("Baseline row", () => {
        it("Renders the baseline row", () => {
          expect(field.find("[data-test='baseline-0']").length).toEqual(1);
        });

        it("Renders the period field correctly", () => {
          expect(field.find("[data-test='period-0']").text()).toEqual(
            "2018/19"
          );
        });

        it("Renders the baseline 1 field correctly", () => {
          expect(field.find("[data-test='baseline1-0']").text()).toEqual(
            "1234"
          );
        });

        it("Renders the baseline 2 field correctly", () => {
          expect(field.find("[data-test='baseline2-0']").text()).toEqual(
            "5678"
          );
        });

        it("Renders the baseline 3 field correctly", () => {
          expect(field.find("[data-test='baseline3-0']").text()).toEqual(
            "9101"
          );
        });

        it("Renders the baseline 4 field correctly", () => {
          expect(field.find("[data-test='baseline4-0']").text()).toEqual(
            "4312"
          );
        });

        it("Renders the total field correctly", () => {
          expect(field.find("[data-test='total-0']").text()).toEqual(
            "12356789"
          );
        });
      });

      describe("Variance row", () => {
        it("Renders the variance row", () => {
          expect(field.find("[data-test='variance-0']").length).toEqual(1);
        });

        it("Renders the variance 1 field correctly", () => {
          expect(field.find("[data-test='variance1-0']").text()).toEqual("321");
        });

        it("Renders the variance 2 field correctly", () => {
          expect(field.find("[data-test='variance2-0']").text()).toEqual("322");
        });

        it("Renders the variance 3 field correctly", () => {
          expect(field.find("[data-test='variance3-0']").text()).toEqual("323");
        });

        it("Renders the variance 4 field correctly", () => {
          expect(field.find("[data-test='variance4-0']").text()).toEqual("324");
        });

        it("Renders the total field correctly", () => {
          expect(field.find("[data-test='varianceTotal-0']").text()).toEqual(
            "1290"
          );
        });
      });

      describe("Last Movement row", () => {
        it("Renders the last movement row", () => {
          expect(field.find("[data-test='lastMovement-0']").length).toEqual(1);
        });

        it("Renders the movement 1 field correctly", () => {
          expect(field.find("[data-test='movement1-0']").text()).toEqual("1");
        });

        it("Renders the movement 2 field correctly", () => {
          expect(field.find("[data-test='movement2-0']").text()).toEqual("2");
        });

        it("Renders the movement 3 field correctly", () => {
          expect(field.find("[data-test='movement3-0']").text()).toEqual("3");
        });

        it("Renders the movement 4 field correctly", () => {
          expect(field.find("[data-test='movement4-0']").text()).toEqual("4");
        });

        it("Renders the total field correctly", () => {
          expect(field.find("[data-test='movementTotal-0']").text()).toEqual(
            "10"
          );
        });
      });

      describe("Movement Variance row", () => {
        it("Renders the movement variance row", () => {
          expect(field.find("[data-test='movementVariance-0']").length).toEqual(
            1
          );
        });

        it("Renders the movement variance 1 field correctly", () => {
          expect(field.find("[data-test='movementVar1-0']").text()).toEqual(
            "4"
          );
        });

        it("Renders the movement variance 2 field correctly", () => {
          expect(field.find("[data-test='movementVar2-0']").text()).toEqual(
            "3"
          );
        });

        it("Renders the movement variance 3 field correctly", () => {
          expect(field.find("[data-test='movementVar3-0']").text()).toEqual(
            "2"
          );
        });

        it("Renders the movement variance 4 field correctly", () => {
          expect(field.find("[data-test='movementVar4-0']").text()).toEqual(
            "1"
          );
        });

        it("Renders the total field correctly", () => {
          expect(field.find("[data-test='movementVarTotal-0']").text()).toEqual(
            "10"
          );
        });
      });
    });
  });

  describe("2 items", () => {
    describe("Example 1", () => {
      let schema = {
        type: "array",
        title: "Data",
        items: {
          type: "object",
          properties: {
            period: {
              title: "Year",
              type: "string",
              readonly: true
            },
            instalment1: {
              title: "1st Instalment",
              type: "string",
              readonly: true
            },
            instalment2: {
              title: "2nd Instalment",
              type: "string",
              readonly: true
            },
            instalment3: {
              title: "3rd Instalment",
              type: "string",
              readonly: true
            },
            instalment4: {
              title: "4th Instalment",
              type: "string",
              readonly: true
            },
            total: {
              title: "Total",
              type: "string",
              readonly: true
            },
            baselineVariance1: {
              title: "1st Instalment",
              type: "string",
              readonly: true
            },
            baselineVariance2: {
              title: "2nd Instalment",
              type: "string",
              readonly: true
            },
            baselineVariance3: {
              title: "3rd Instalment",
              type: "string",
              readonly: true
            },
            baselineVariance4: {
              title: "4th Instalment",
              type: "string",
              readonly: true
            }
          }
        }
      };
      let formData = [
        {
          period: "2018/19",
          instalment1: "1234",
          instalment2: "5678",
          instalment3: "9101",
          instalment4: "4312",
          baselineVariance1: "321",
          baselineVariance2: "322",
          baselineVariance3: "323",
          baselineVariance4: "324",
          total: "12356789",
          lastMovement1: "1",
          lastMovement2: "2",
          lastMovement3: "3",
          lastMovement4: "4",
          movementVariance1: "4",
          movementVariance2: "3",
          movementVariance3: "2",
          movementVariance4: "1"
        },
        {
          period: "2018/19",
          instalment1: "1234",
          instalment2: "5678",
          instalment3: "9101",
          instalment4: "4312",
          baselineVariance1: "321",
          baselineVariance2: "322",
          baselineVariance3: "323",
          baselineVariance4: "324",
          total: "12356789",
          lastMovement1: "1",
          lastMovement2: "2",
          lastMovement3: "3",
          lastMovement4: "4",
          movementVariance1: "4",
          movementVariance2: "3",
          movementVariance3: "2",
          movementVariance4: "1"
        }
      ];
      let field = shallow(<S151Funding formData={formData} />);

      it("Renders the header row", () => {
        expect(field.find("[data-test='header']").length).toEqual(1);
      });

      describe("Baseline row 0", () => {
        it("Renders the baseline row", () => {
          expect(field.find("[data-test='baseline-0']").length).toEqual(1);
        });

        it("Renders the period field correctly", () => {
          expect(field.find("[data-test='period-0']").text()).toEqual(
            "2018/19"
          );
        });

        it("Renders the baseline 1 field correctly", () => {
          expect(field.find("[data-test='baseline1-0']").text()).toEqual(
            "1234"
          );
        });

        it("Renders the baseline 2 field correctly", () => {
          expect(field.find("[data-test='baseline2-0']").text()).toEqual(
            "5678"
          );
        });

        it("Renders the baseline 3 field correctly", () => {
          expect(field.find("[data-test='baseline3-0']").text()).toEqual(
            "9101"
          );
        });

        it("Renders the baseline 4 field correctly", () => {
          expect(field.find("[data-test='baseline4-0']").text()).toEqual(
            "4312"
          );
        });

        it("Renders the total field correctly", () => {
          expect(field.find("[data-test='total-0']").text()).toEqual(
            "12356789"
          );
        });
      });

      describe("Baseline row 1", () => {
        it("Renders the baseline row", () => {
          expect(field.find("[data-test='baseline-1']").length).toEqual(1);
        });

        it("Renders the period field correctly", () => {
          expect(field.find("[data-test='period-1']").text()).toEqual(
            "2018/19"
          );
        });

        it("Renders the baseline 1 field correctly", () => {
          expect(field.find("[data-test='baseline1-1']").text()).toEqual(
            "1234"
          );
        });

        it("Renders the baseline 2 field correctly", () => {
          expect(field.find("[data-test='baseline2-1']").text()).toEqual(
            "5678"
          );
        });

        it("Renders the baseline 3 field correctly", () => {
          expect(field.find("[data-test='baseline3-1']").text()).toEqual(
            "9101"
          );
        });

        it("Renders the baseline 4 field correctly", () => {
          expect(field.find("[data-test='baseline4-1']").text()).toEqual(
            "4312"
          );
        });

        it("Renders the total field correctly", () => {
          expect(field.find("[data-test='total-1']").text()).toEqual(
            "12356789"
          );
        });
      });

      describe("Variance row 0", () => {
        it("Renders the variance row", () => {
          expect(field.find("[data-test='variance-0']").length).toEqual(1);
        });

        it("Renders the variance 1 field correctly", () => {
          expect(field.find("[data-test='variance1-0']").text()).toEqual("321");
        });

        it("Renders the variance 2 field correctly", () => {
          expect(field.find("[data-test='variance2-0']").text()).toEqual("322");
        });

        it("Renders the variance 3 field correctly", () => {
          expect(field.find("[data-test='variance3-0']").text()).toEqual("323");
        });

        it("Renders the variance 4 field correctly", () => {
          expect(field.find("[data-test='variance4-0']").text()).toEqual("324");
        });

        it("Renders the total field correctly", () => {
          expect(field.find("[data-test='varianceTotal-0']").text()).toEqual(
            "1290"
          );
        });
      });

      describe("Variance row 1", () => {
        it("Renders the variance row", () => {
          expect(field.find("[data-test='variance-1']").length).toEqual(1);
        });

        it("Renders the variance 1 field correctly", () => {
          expect(field.find("[data-test='variance1-1']").text()).toEqual("321");
        });

        it("Renders the variance 2 field correctly", () => {
          expect(field.find("[data-test='variance2-1']").text()).toEqual("322");
        });

        it("Renders the variance 3 field correctly", () => {
          expect(field.find("[data-test='variance3-1']").text()).toEqual("323");
        });

        it("Renders the variance 4 field correctly", () => {
          expect(field.find("[data-test='variance4-1']").text()).toEqual("324");
        });

        it("Renders the total field correctly", () => {
          expect(field.find("[data-test='varianceTotal-1']").text()).toEqual(
            "1290"
          );
        });
      });

      describe("Last Movement row 0", () => {
        it("Renders the last movement row", () => {
          expect(field.find("[data-test='lastMovement-0']").length).toEqual(1);
        });

        it("Renders the movement 1 field correctly", () => {
          expect(field.find("[data-test='movement1-0']").text()).toEqual("1");
        });

        it("Renders the movement 2 field correctly", () => {
          expect(field.find("[data-test='movement2-0']").text()).toEqual("2");
        });

        it("Renders the movement 3 field correctly", () => {
          expect(field.find("[data-test='movement3-0']").text()).toEqual("3");
        });

        it("Renders the movement 4 field correctly", () => {
          expect(field.find("[data-test='movement4-0']").text()).toEqual("4");
        });

        it("Renders the total field correctly", () => {
          expect(field.find("[data-test='movementTotal-0']").text()).toEqual(
            "10"
          );
        });
      });

      describe("Last Movement row 1", () => {
        it("Renders the last movement row", () => {
          expect(field.find("[data-test='lastMovement-1']").length).toEqual(1);
        });

        it("Renders the movement 1 field correctly", () => {
          expect(field.find("[data-test='movement1-1']").text()).toEqual("1");
        });

        it("Renders the movement 2 field correctly", () => {
          expect(field.find("[data-test='movement2-1']").text()).toEqual("2");
        });

        it("Renders the movement 3 field correctly", () => {
          expect(field.find("[data-test='movement3-1']").text()).toEqual("3");
        });

        it("Renders the movement 4 field correctly", () => {
          expect(field.find("[data-test='movement4-1']").text()).toEqual("4");
        });

        it("Renders the total field correctly", () => {
          expect(field.find("[data-test='movementTotal-1']").text()).toEqual(
            "10"
          );
        });
      });

      describe("Movement Variance row 0", () => {
        it("Renders the movement variance row", () => {
          expect(field.find("[data-test='movementVariance-0']").length).toEqual(
            1
          );
        });

        it("Renders the movement variance 1 field correctly", () => {
          expect(field.find("[data-test='movementVar1-0']").text()).toEqual(
            "4"
          );
        });

        it("Renders the movement variance 2 field correctly", () => {
          expect(field.find("[data-test='movementVar2-0']").text()).toEqual(
            "3"
          );
        });

        it("Renders the movement variance 3 field correctly", () => {
          expect(field.find("[data-test='movementVar3-0']").text()).toEqual(
            "2"
          );
        });

        it("Renders the movement variance 4 field correctly", () => {
          expect(field.find("[data-test='movementVar4-0']").text()).toEqual(
            "1"
          );
        });

        it("Renders the total field correctly", () => {
          expect(field.find("[data-test='movementVarTotal-0']").text()).toEqual(
            "10"
          );
        });
      });

      describe("Movement Variance row 1", () => {
        it("Renders the movement variance row", () => {
          expect(field.find("[data-test='movementVariance-1']").length).toEqual(
            1
          );
        });

        it("Renders the movement variance 1 field correctly", () => {
          expect(field.find("[data-test='movementVar1-1']").text()).toEqual(
            "4"
          );
        });

        it("Renders the movement variance 2 field correctly", () => {
          expect(field.find("[data-test='movementVar2-1']").text()).toEqual(
            "3"
          );
        });

        it("Renders the movement variance 3 field correctly", () => {
          expect(field.find("[data-test='movementVar3-1']").text()).toEqual(
            "2"
          );
        });

        it("Renders the movement variance 4 field correctly", () => {
          expect(field.find("[data-test='movementVar4-1']").text()).toEqual(
            "1"
          );
        });

        it("Renders the total field correctly", () => {
          expect(field.find("[data-test='movementVarTotal-1']").text()).toEqual(
            "10"
          );
        });
      });
    });
  });
});
