import merge from "utils-merge2";

export default class GenerateDisabledUISchema {
  constructor(generateUISchemaUseCase, userRoleStorageGateway) {
    this.generateUISchemaUseCase = generateUISchemaUseCase;
    this.userRoleStorageGateway = userRoleStorageGateway;
  }

  execute(data) {
    this.role = this.userRoleStorageGateway.getUserRole().userRole;
    let generatedUISchema = this.generateUISchemaUseCase.execute(data);
    let generatedDisabledUISchema = this.generateUISchema(data.properties);
    return merge(generatedUISchema, generatedDisabledUISchema);
  }

  generateUISchema(data) {
    let ret = {};
    Object.entries(data).forEach(([key, value]) => {
      if (value.type === "object") {
        ret[key] = this.generateSchemaForObject(value)
      } else if (value.type === "array") {
        ret[key] = this.generateSchemaForArray(value);
      } else {
        ret[key] = this.generateSchemaForItem(value);
      }
    });

    return ret;
  }

  generateSchemaForObject(object) {
    let schema = this.generateUISchema(object.properties)
    let dependencySchema = this.generateDependencySchema(object)
    return this.mergeObjects(schema, dependencySchema)
  }

  generateSchemaForArray(value) {
    let schema;

    if (value.heAlwaysWritable && this.role === "Homes England") {
      schema = {};
    } else {
      schema = {
        "ui:options": {
          addable: false,
          orderable: false,
          removable: false
        }
      }
    };
    if (value.items.type === "string") {
      schema.items = this.generateSchemaForItem(value.items)
    } else {
      schema.items = this.generateUISchema(value.items.properties);
    }

    return schema;
  }

  generateDependencySchema(value) {
    if(!value.dependencies) {
      return {};
    }

    let reducer = (acc, dependency) =>
      this.mergeObjects(acc, this.generateUISchema(dependency.properties));

    let schema = Object.values(value.dependencies)[0];
    return schema.oneOf.reduce(reducer, {});
  }

  generateSchemaForItem(item) {
    if (item.heAlwaysWritable && this.role === "Homes England") return {};

    if (item.hidden) {
      return { "ui:widget": "hidden" };
    } else {
      return { "ui:disabled": true };
    }
  }

  mergeObjects(one, two) {
    return { ...one, ...two };
  }
}
