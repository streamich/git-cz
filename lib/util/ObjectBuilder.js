class ObjectBuilder {
  constructor (initial) {
    this.currentObject = initial || {};
  }

  /**
   * @param {boolean} condition
   * @returns {{ add: ConditionalObjectBuilder["add"] }}
   */
  if (condition) {
    return {
      add: (mappedValues) => {
        if (condition) {
          return this.add(mappedValues);
        }

        return this;
      }
    };
  }

  /**
   * @param {{ [key: string]: value }} mappedValues
   * @returns {ConditionalObjectBuilder}
   */
  add (mappedValues) {
    Object.keys(mappedValues)
      .forEach((key) => {
        this.currentObject[key] = mappedValues[key];
      });

    return this;
  }

  build () {
    return this.currentObject;
  }
}

module.exports = ObjectBuilder;
