import { functions as validationFunctions } from "validations";

// returns an object with field names as keys and validation error messages as values

const validate = (fields, values) =>
  fields.reduce((errorsObject, field) => {
    const { id, validations: fieldValidations } = field;
    const value = values[id];
    if (id && fieldValidations) {
      //pull the first validation failure from all of the validations to be run
      const [result] = fieldValidations
        .map(validationName => {
          const validationToRun = validationFunctions[validationName];
          if (validationToRun) {
            return validationToRun(value);
          }
          // should never happen unless there are deprecations
          console.error(`no validation with the name ${validationName}`);
          return undefined;
        })
        //filter out undefined values
        .filter(validationResult => validationResult);
      if (result) {
        errorsObject[id] = result;
      }
    }
    return errorsObject;
  }, {});

export default validate;
