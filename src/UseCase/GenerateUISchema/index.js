import merge from "utils-merge2";

export default class GenerateUISchema {
  constructor(userRoleCookieGateway) {
    this.userRoleGateway = userRoleCookieGateway;
  }
  execute(data, noOfPreviousReturns) {
    let userRole = this.userRoleGateway.getUserRole().userRole;

    return this.generateUISchema(data.properties, userRole, noOfPreviousReturns);
  }

  generateUISchema(data, role, noOfPreviousReturns) {
    let ret = {};
    Object.entries(data).forEach(([key, value]) => {
      if (value.type === "object") {
        ret[key] = this.generateSchemaForObject(value, role, noOfPreviousReturns);
      } else if (value.type === "array") {
        ret[key] = this.generateSchemaForArray(value, role, noOfPreviousReturns);
      } else {
        let itemSchema = this.generateSchemaForProperties(value, role, noOfPreviousReturns);
        if (itemSchema) {
          ret[key] = itemSchema;
        }
      }
    });
    return ret;
  }

  generateSchemaForObject(value, role, noOfPreviousReturns) {
    let ret = this.generateUISchema(value.properties, role, noOfPreviousReturns);
    let uiField = this.getUIFieldForObject(value);

    if (uiField) {
      ret["ui:field"] = uiField;
    }

    if (value.dependencies) {
      let dependencySchema = this.generateSchemaForDependencies(value, role, noOfPreviousReturns);
      ret = merge(ret, dependencySchema);
    }

    return ret;
  }

  generateSchemaForArray(value, role, noOfPreviousReturns) {
    if (value.uploadFile) {
      return {"ui:field": "uploadFile"}
    }

    let ret = {};
    ret["ui:options"] = {
      addable: this.isAdjustableArray(value, role),
      orderable: false,
      removable: this.isAdjustableArray(value, role)
    };

    if (value.items.type === "object") {
      ret["items"] = this.generateSchemaForObject(value.items, role, noOfPreviousReturns);
    } else {
      ret["items"] = this.generateSchemaForProperties(value.items, role, noOfPreviousReturns)
    }


    if (value.items.horizontal) {
      ret["items"]["ui:field"] = "horizontal";
    } else if (value.items.risk) {
      ret["items"]["ui:field"] = "risk";
    } else if (value.items.base) {
      ret["items"]["ui:field"] = "base";
    } else if (value.periods) {
      ret["ui:field"] = "periods";
    } else if (value.items.milestone) {
      ret["items"]["ui:field"] = "milestone"
    } else if (value.quarterly) {
      ret["ui:field"] = "quarterly";
    }

    if (value.numbered) {
      ret["ui:field"] = "numbered";
    }

    if (value.items.calculation) {
      ret["items"]["ui:field"] = "calculated";
    }
    if (value.items.validated) {
      ret["items"]["ui:field"] = "validated";
    }

    return ret;
  }

  generateSchemaForDependencies(value, role, noOfPreviousReturns) {
    let reducer = (acc, dependency) =>
      merge(acc, this.generateSchemaForObject(dependency, role, noOfPreviousReturns));

    let dependencies = Object.values(value.dependencies)[0];
    return dependencies.oneOf.reduce(reducer, {});
  }

  generateSchemaForProperties(item, role, noOfPreviousReturns) {
    let schema = {}

    if (item.downloadURI) {
      schema["ui:widget"] = "downloadable";
    }

    if (item.extendedText) {
      schema["ui:widget"] = "textarea";
    }

    if (item.format === "date") {
      schema["ui:widget"] = "britishDate";
    }

    if (item.financialYear) {
      schema["ui:widget"] = "financialYear";
    }

    if (item.percentage) {
      schema["ui:widget"] = "percentage";
    }

    if (item.hidden) {
      schema["ui:widget"] = "hidden";
    }

    if (item.uploadFile) {
      schema["ui:field"] = "uploadFile";
    }

    if (item.readonly === true) {
      schema["ui:disabled"] = true;
    }

    if (item.readonly_after_return <= noOfPreviousReturns) {
      schema["ui:disabled"] = true;
    }

    if (item.laReadOnly && (role !== "Homes England" && role !== "Superuser")) {
      schema["ui:disabled"] = true;
    }

    if (item.s151WriteOnly && (role !== "Local Authority" && role !== "Superuser")) {
      schema["ui:disabled"] = true;
    }

    if (item.base) {
      schema["ui:field"] = "base";
    }

    if(item.linkToInfra) {
      schema["ui:widget"] = "pickInfrastructure";
    }

    if(item.periods) {
      schema["ui:field"] = "periods";
    }

    if(item.currency) {
      schema["ui:widget"] = "currency";
    }

    if(item.radio) {
      schema["ui:widget"] = "radio";
    }

    if(Object.keys(schema).length === 0) {
      return undefined;
    }

    return schema;
  }

  isAdjustableArray(arr, role) {
    if (
      arr.addable ||
      (
        arr.heAdjustableOnly && (
          role === "Homes England" ||
          role === "Superuser"
        )
      )
    ) {
      return true;
    }
    return false;
  }

  getUIFieldForObject(obj) {
    if (obj.calculation) {
      return "calculated";
    }

    if (obj.horizontal) {
      return "horizontal";
    }

    if (obj.variance) {
      return "variance";
    }

    if (obj.base) {
      return "base";
    }

    if (obj.milestone) {
      return "milestone";
    }

    if (obj.validated) {
      return "validated";
    }
  }
}
