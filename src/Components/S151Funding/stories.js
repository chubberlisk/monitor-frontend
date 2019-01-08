import React from "react";
import S151Funding from ".";

import { storiesOf } from "@storybook/react";

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
    period: "2019/20",
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

let noVariance = [
  {
    period: "2018/19",
    instalment1: "1234",
    instalment2: "5678",
    instalment3: "9101",
    instalment4: "4312",
    baselineVariance1: "",
    baselineVariance2: "",
    baselineVariance3: "",
    baselineVariance4: "",
    total: "12356789",
    lastMovement1: null,
    lastMovement2: null,
    lastMovement3: null,
    lastMovement4: null
  }
];

storiesOf("S151Funding", module)
  .add("Default", () => <S151Funding formData={formData} />)
  .add("No Variance", () => <S151Funding formData={noVariance} />);
