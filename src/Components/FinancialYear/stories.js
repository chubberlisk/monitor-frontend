import React from 'react';
import { storiesOf } from "@storybook/react";

import FinancialYear from '.';

storiesOf('<FinancialYear>', module)
  .add('Default', () => {
    return (
      <FinancialYear value="2021-10-01" onChange={(e) => {console.log(e);}}/>
    )
  })
