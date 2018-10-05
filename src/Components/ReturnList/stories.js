import React from "react";
import { storiesOf } from "@storybook/react";
import ReturnList from ".";

storiesOf("ReturnList", module)
  .add("default", () => (
    <ReturnList
      schema={{ title: "Cat Housing" }}
      formData={{
        returns: [
          {
            id: "1",
            project_id: "1",
            status: "Draft",
            updates: [
              {
                changed: "Yes"
              }
            ]
          }
        ]
      }}
    />
  ))
  .add("multiple returns", () => (
    <ReturnList
      schema={{ title: "Kittens Housing Association" }}
      formData={{
        returns: [
          {
            id: "1",
            project_id: "1",
            status: "Draft",
            updates: [
              {
                changed: "Yes"
              }
            ]
          },
          {
            id: "2",
            project_id: "1",
            status: "Submitted",
            updates: [
              {
                changed: "Some"
              }
            ]
          }
        ]
      }}
    />
  ));