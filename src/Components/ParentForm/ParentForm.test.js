import React from "react";
import ParentForm from ".";
import ArraySubform from "../ArraySubform";
import Sidebar from "../Sidebar";
import { mount, shallow } from "enzyme";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

async function updateFormField(input, value) {
  input.simulate("change", { target: { value } });
  await wait();
}

describe("<ParentForm>", () => {
  let onChangeSpy;

  beforeEach(() => {
    onChangeSpy = jest.fn();
  });

  describe("Using the navbar", () => {
    let wrap;

    beforeEach(() => {
      wrap = mount(
        <ParentForm
          onChange={onChangeSpy}
          schema={{
            type: "object",
            properties: {
              cat: {
                type: "object",
                properties: {
                  name: {
                    type: "string"
                  }
                }
              },
              dog: {
                type: "object",
                properties: {
                  name: {
                    type: "string"
                  }
                }
              }
            }
          }}
        />
      );
    });

    it("takes formData", async () => {
      let input = wrap.find("input").first();
      await updateFormField(input, "Meowwwww");
      expect(wrap.state("formData")).toEqual({ cat: { name: "Meowwwww" } }, 1);
    });

    it("compiles a form from the children", async () => {
      let input = wrap.find('[data-test="cat_subform"] input');
      await updateFormField(input, "Tabby");
      expect(wrap.state("formData")).toEqual({ cat: { name: "Tabby" } }, 1);
    });

    it("triggers the onChange prop it is given", async () => {
      let input = wrap.find(".form-control").first();

      await updateFormField(input, "Tabby");

      expect(onChangeSpy).toHaveBeenCalledWith({
        formData: { cat: { name: "Tabby" } }
      });
    });

    it("displays buttons to change the current view", async () => {
      let cat_label = wrap.find("#cat");
      cat_label.simulate("change", { target: { checked: true } });
      wrap.update();
      expect(wrap.find('[data-test="cat_subform"]').length).toEqual(1);
      expect(wrap.find('[data-test="dog_subform"]').length).toEqual(0);
    });

    it("displays no submit buttons", async () => {
      expect(wrap.find("button").length).toEqual(0);
    });
  });

  describe("When selecting an item in the sidebar", () => {
    let parentForm;

    describe("With an array type", () => {
      beforeEach(() => {
        parentForm = shallow(
          <ParentForm
            onChange={jest.fn()}
            formData={{ cats: [{ name: "Mittens", noise: "Meow" }] }}
            schema={{
              type: "object",
              properties: {
                cats: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string"
                      },
                      noise: {
                        type: "string"
                      }
                    }
                  }
                },
                dogs: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string"
                      },
                      bark: {
                        type: "string"
                      }
                    }
                  }
                }
              }
            }}
          />
        );
      });

      describe("Example one", () => {
        beforeEach(() => {
          parentForm
            .find("Sidebar")
            .props()
            .onItemClick("name", 1);
        });

        it("Sets the selected form section to the one chosen", () => {
          expect(parentForm.state().selectedFormSection).toEqual("name");
        });

        it("Sets the selected form section to the index chosen", () => {
          expect(parentForm.state().selectedFormItemIndex).toEqual(1);
        });
      });

      describe("Example two", () => {
        beforeEach(() => {
          parentForm
            .find("Sidebar")
            .props()
            .onItemClick("noise", 2);
        });

        it("Sets the selected form section to the one chosen", () => {
          expect(parentForm.state().selectedFormSection).toEqual("noise");
        });

        it("Sets the selected form section to the index chosen", () => {
          expect(parentForm.state().selectedFormItemIndex).toEqual(2);
        });
      });

      describe("When using the navbar", () => {
        describe("Example one", () => {
          beforeEach(() => {
            parentForm
              .find("Sidebar")
              .props()
              .onItemClick("noise", 2);

            parentForm
              .find("#cats")
              .props()
              .onClick({ target: { id: "cats" } });
          });

          it("Sets the state to the first property of the selected section", () => {
            expect(parentForm.state().selectedFormSection).toEqual("name");
          });

          it("Sets the selected index to 0", () => {
            expect(parentForm.state().selectedFormItemIndex).toEqual(0);
          });
        });

        describe("Example two", () => {
          beforeEach(() => {
            parentForm
              .find("Sidebar")
              .props()
              .onItemClick("noise", 2);

            parentForm
              .find("#cats")
              .props()
              .onClick({ target: { id: "cats" } });
          });

          it("Sets the state to the first property of the selected section", () => {
            expect(parentForm.state().selectedFormSection).toEqual("name");
          });

          it("Sets the selected index to 0", () => {
            expect(parentForm.state().selectedFormItemIndex).toEqual(0);
          });
        });
      });
    });

    describe("With an object type", () => {
      let documentSpy, documentGatewaySpy, elementSpy;

      beforeEach(() => {
        elementSpy = { scrollIntoView: jest.fn() }
        documentSpy = { getElementById: jest.fn(() => elementSpy) }
        documentGatewaySpy = { getDocument: jest.fn(() => documentSpy) };
        parentForm = shallow(
          <ParentForm
            onChange={jest.fn()}
            formData={{ cats: [{ name: "Mittens", noise: "Meow" }] }}
            documentGateway={documentGatewaySpy}
            schema={{
              type: "object",
              properties: {
                cat: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string"
                    },
                    noise: {
                      type: "string"
                    }
                  }
                },
                dog: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string"
                    },
                    bark: {
                      type: "string"
                    }
                  }
                }
              }
            }}
          />
        );
      });

      describe("Example one", () => {
        beforeEach(() => {
          parentForm
            .find("Sidebar")
            .props()
            .onItemClick("noise");
        });

        it("Gets the document from the document gateway", () => {
          expect(documentGatewaySpy.getDocument).toHaveBeenCalled();
        });

        it("Gets the element from the document by its ID", () => {
          expect(documentSpy.getElementById).toHaveBeenCalledWith("root_noise__title")
        })

        it("Scrolls the element into view", () => {
          expect(elementSpy.scrollIntoView).toHaveBeenCalled()
        })
      });

      describe("Example Two", () => {
        beforeEach(() => {
          parentForm
            .find("Sidebar")
            .props()
            .onItemClick("name");
        });

        it("Gets the document from the document gateway", () => {
          expect(documentGatewaySpy.getDocument).toHaveBeenCalled();
        });

        it("Gets the element from the document by its ID", () => {
          expect(documentSpy.getElementById).toHaveBeenCalledWith("root_name__title")
        })

        it("Scrolls the element into view", () => {
          expect(elementSpy.scrollIntoView).toHaveBeenCalled()
        })
      });
    });
  });

  describe("Given a schema of type object is selected", () => {
    describe("Example one", () => {
      let parentForm;

      beforeEach(() => {
        parentForm = shallow(
          <ParentForm
            onChange={jest.fn()}
            schema={{
              type: "object",
              properties: {
                cat: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string"
                    },
                    noise: {
                      type: "string"
                    }
                  }
                },
                dog: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string"
                    },
                    bark: {
                      type: "string"
                    }
                  }
                }
              }
            }}
          />
        );
      });

      it("Defaults the selected form section to the first property in the object", () => {
        expect(parentForm.state().selectedFormSection).toEqual("name");
      });
    });

    describe("Example two", () => {
      let parentForm;

      beforeEach(() => {
        parentForm = shallow(
          <ParentForm
            onChange={jest.fn()}
            schema={{
              type: "object",
              properties: {
                cow: {
                  type: "object",
                  properties: {
                    farm: {
                      type: "string"
                    },
                    colour: {
                      type: "string"
                    }
                  }
                },
                duck: {
                  type: "object",
                  properties: {
                    lake: {
                      type: "string"
                    },
                    quack: {
                      type: "string"
                    }
                  }
                }
              }
            }}
          />
        );
      });

      it("Defaults the selected form section to the first property in the object", () => {
        expect(parentForm.state().selectedFormSection).toEqual("farm");
      });
    });
  });

  describe("Given a schema of type array is selected", () => {
    let parentForm, onChangeSpy;

    describe("Example one", () => {
      beforeEach(() => {
        onChangeSpy = jest.fn();
        parentForm = shallow(
          <ParentForm
            onChange={jest.fn()}
            schema={{
              type: "object",
              properties: {
                cat: {
                  title: "cat",
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      details: {
                        type: "object",
                        properties: {
                          name: { type: "string" }
                        }
                      }
                    }
                  }
                }
              }
            }}
            formData={{ cat: [{ details: { name: "Meow" } }] }}
            uiSchema={{ cat: { items: { a: "b" } } }}
            onChange={onChangeSpy}
          />
        );
      });

      it("Displays an array subform", () => {
        expect(parentForm.find(ArraySubform).length).toEqual(1);
      });

      it("Passes the selected data into the array subform", () => {
        let subform = parentForm.find(ArraySubform);

        let expectedSchema = {
          title: "cat",
          type: "array",
          items: {
            type: "object",
            properties: {
              details: {
                type: "object",
                properties: {
                  name: { type: "string" }
                }
              }
            }
          }
        };

        expect(subform.props().schema).toEqual(expectedSchema);
        expect(subform.props().data).toEqual([{ details: { name: "Meow" } }]);
        expect(subform.props().uiSchema).toEqual({ a: "b" });
      });

      it("Defaults the selected form section to the first property in the object", () => {
        expect(parentForm.state().selectedFormSection).toEqual("details");
      });

      it("Defaults the selected form index to 0", () => {
        expect(parentForm.state().selectedFormItemIndex).toEqual(0);
      });

      describe("Passes the selected details into the subform", () => {
        describe("Example one", () => {
          it("Passes the selected form section into the subform", () => {
            let selectedFormSection = parentForm.find(ArraySubform).props()
              .selectedFormSection;

            expect(selectedFormSection).toEqual("details");
          });

          it("Passes the selected form index into the subform", () => {
            let selectedIndex = parentForm.find(ArraySubform).props()
              .selectedIndex;

            expect(selectedIndex).toEqual(0);
          });
        });

        describe("Example two", () => {
          beforeEach(() => {
            parentForm
              .find(Sidebar)
              .props()
              .onItemClick("otherDetails", 1);
            parentForm.update();
          });

          it("Passes the selected form section into the subform", () => {
            let selectedFormSection = parentForm.find(ArraySubform).props()
              .selectedFormSection;

            expect(selectedFormSection).toEqual("otherDetails");
          });

          it("Passes the selected form index into the subform", () => {
            let selectedIndex = parentForm.find(ArraySubform).props()
              .selectedIndex;

            expect(selectedIndex).toEqual(1);
          });
        });
      });

      describe("Updates the parent formdata when changing", () => {
        let wrap;

        beforeEach(() => {
          wrap = mount(
            <ParentForm
              onChange={onChangeSpy}
              schema={{
                type: "object",
                properties: {
                  cat: {
                    type: "object",
                    properties: {
                      sound: {
                        type: "string"
                      }
                    }
                  }
                }
              }}
            />
          );
        });

        it("Example one", async () => {
          let input = wrap.find("input").first();
          await updateFormField(input, "meow");

          expect(onChangeSpy).toHaveBeenCalledWith({
            formData: { cat: { sound: "meow" } }
          });
        });

        it("Example two", async () => {
          let input = wrap.find("input").first();
          await updateFormField(input, "bark");

          expect(onChangeSpy).toHaveBeenCalledWith({
            formData: { cat: { sound: "bark" } }
          });
        });
      });
    });

    describe("Example two", () => {
      beforeEach(() => {
        onChangeSpy = jest.fn();
        parentForm = shallow(
          <ParentForm
            onChange={jest.fn()}
            schema={{
              type: "object",
              properties: {
                dog: {
                  title: "dog",
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      noise: {
                        type: "object",
                        properties: {
                          bark: { type: "string" }
                        }
                      }
                    }
                  }
                }
              }
            }}
            formData={{
              dog: [{ noise: { bark: "woof" } }]
            }}
            uiSchema={{ dog: { items: { noise: { bark: "meow" } } } }}
            onChange={onChangeSpy}
          />
        );
      });

      it("Displays an array subform", () => {
        expect(parentForm.find(ArraySubform).length).toEqual(1);
      });

      it("Passes the selected data into the array subform", () => {
        let subform = parentForm.find(ArraySubform);

        let expectedSchema = {
          title: "dog",
          type: "array",
          items: {
            type: "object",
            properties: {
              noise: {
                type: "object",
                properties: {
                  bark: { type: "string" }
                }
              }
            }
          }
        };

        expect(subform.props().schema).toEqual(expectedSchema);
        expect(subform.props().data).toEqual([{ noise: { bark: "woof" } }]);
        expect(subform.props().uiSchema).toEqual({ noise: { bark: "meow" } });
      });

      it("Defaults the selected form section to the first property in the object", () => {
        expect(parentForm.state().selectedFormSection).toEqual("noise");
      });

      describe("Updates the parent formdata when changing", () => {
        let wrap;

        beforeEach(() => {
          wrap = mount(
            <ParentForm
              onChange={onChangeSpy}
              schema={{
                type: "object",
                properties: {
                  dog: {
                    type: "object",
                    properties: {
                      action: {
                        type: "string"
                      }
                    }
                  }
                }
              }}
            />
          );
        });

        it("Example one", async () => {
          let input = wrap.find("input").first();
          await updateFormField(input, "wag");

          expect(onChangeSpy).toHaveBeenCalledWith({
            formData: { dog: { action: "wag" } }
          });
        });

        it("Example two", async () => {
          let input = wrap.find("input").first();
          await updateFormField(input, "chase");

          expect(onChangeSpy).toHaveBeenCalledWith({
            formData: { dog: { action: "chase" } }
          });
        });
      });
    });
  });

  describe("Given no uiSchema for the selected item", () => {
    describe("With an array selected", () => {
      it("Passes an empty uischema to the subform", () => {
        let parentForm = shallow(
          <ParentForm
            onChange={jest.fn()}
            schema={{
              type: "object",
              properties: {
                cat: {
                  title: "cat",
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      details: {
                        type: "object",
                        properties: {
                          name: { type: "string" }
                        }
                      }
                    }
                  }
                }
              }
            }}
            formData={{ cat: [{ details: { name: "Meow" } }] }}
            uiSchema={{ dog: { items: { a: "b" } } }}
            onChange={() => {}}
          />
        );

        let subform = parentForm.find(ArraySubform);
        expect(subform.props().uiSchema).toEqual({});
      });
    });

    describe("With an object selected", () => {
      it("Passes an empty uischema to the subform", () => {
        let parentForm = shallow(
          <ParentForm
            onChange={jest.fn()}
            schema={{
              type: "object",
              properties: {
                cat: {
                  title: "cat",
                  type: "object",
                  properties: {
                    details: {
                      type: "object",
                      properties: {
                        name: { type: "string" }
                      }
                    }
                  }
                }
              }
            }}
            formData={{ cat: [{ details: { name: "Meow" } }] }}
            uiSchema={{ dog: { items: { a: "b" } } }}
            onChange={() => {}}
          />
        );

        let subform = parentForm.find({ "data-test": "cat_subform" });
        expect(subform.props().uiSchema).toEqual({});
      });
    });
  });

  describe("Given a schema with a risk field", () => {
    it("Displays the risk field component", () => {
      let parentForm = mount(
        <ParentForm
          onChange={jest.fn()}
          schema={{
            type: "object",
            properties: {
              cat: {
                type: "object",
                properties: {
                  name: {
                    type: "string"
                  }
                }
              },
              dog: {
                type: "object",
                properties: {
                  name: {
                    type: "string"
                  }
                }
              }
            }
          }}
          uiSchema={{
            cat: {
              "ui:field": "risk"
            }
          }}
        />
      );
      expect(parentForm.find("RiskField").length).toEqual(1);
    });
  });

  describe("Given a schema with a periods field", () => {
    it("Displays the period field component", () => {
      let uiSchema = {
        one: {
          items: {
            periods: {
              items: {},
              "ui:field": "periods",
              "ui:options": {
                addable: false,
                orderables: false,
                removable: false
              }
            }
          }
        }
      };

      let schema = {
        type: "object",
        properties: {
          one: {
            type: "array",
            items: {
              type: "object",
              properties: {
                periods: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      period: {
                        type: "string",
                        title: "Lizard Type",
                        readonly: true
                      },
                      length: {
                        type: "string",
                        title: "How Long",
                        readonly: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };

      let data = {
        one: [
          {
            periods: [
              { period: "scaley", length: "200" },
              { period: "slivery", length: "567" }
            ]
          }
        ]
      };

      let parentForm = mount(
        <ParentForm
          onChange={jest.fn()}
          formData={data}
          schema={schema}
          uiSchema={uiSchema}
        />
      );
      expect(parentForm.find("PeriodsField").length).toEqual(1);
    });
  });

  describe("Given a field with currency", () => {
    it("Displays the risk field component", () => {
      let parentForm = mount(
        <ParentForm
          onChange={jest.fn()}
          schema={{
            type: "object",
            properties: {
              cat: {
                type: "object",
                properties: {
                  name: {
                    type: "string"
                  }
                }
              },
              dog: {
                type: "object",
                properties: {
                  name: {
                    type: "string"
                  }
                }
              }
            }
          }}
          uiSchema={{
            cat: {
              name: {
                "ui:field": "currency"
              }
            }
          }}
        />
      );
      expect(parentForm.find("CurrencyField").length).toEqual(1);
    });
  });
});
