const SET_FORM = "form/SET";
const EDIT_NAME = "form/EDIT_NAME";
const ADD_FIELD = "fields/ADD";
const REMOVE_FIELD = "fields/REMOVE";
const SWAP_FIELD = "fields/SWAP";
const EDIT_FIELD = "fields/EDIT";
const MOVE_FIELD = "fields/MOVE";
const ADD_VALIDATION = "validation/ADD";
const REMOVE_VALIDATION = "validation/REMOVE";
const TOGGLE_VALIDATION = "validation/TOGGLE";

const validationReducer = (validations = [], action) => {
  switch (action.type) {
    case TOGGLE_VALIDATION: {
      if (validations.includes(action.validation)) {
        return validations.filter(
          validation => !validation === action.validation
        );
      }
      return validations.concat(action.validation);
    }
    case ADD_VALIDATION: {
      if (!validations.includes(action.validation)) {
        return validations.concat(action.validation);
      }
      return validations;
    }
    case REMOVE_VALIDATION: {
      return validations.filter(
        validation => !validation === action.validation
      );
    }
    default:
      return validations;
  }
};

const inBounds = (array, index) => !!array[index];
const randomInt = () => Math.floor(Math.random() * 100000000);

const fieldReducer = (fields = [], action) => {
  switch (action.type) {
    case ADD_FIELD: {
      return fields.concat({ ...action.payload, id: randomInt() });
    }
    case REMOVE_FIELD: {
      return fields.filter(({ id }) => id !== action.id);
    }
    case SWAP_FIELD: {
      const { from, to } = action;
      const fromInBounds = inBounds(fields, from);
      const toInBounds = inBounds(fields, to);
      if (fromInBounds && toInBounds) {
        return fields.map((field, index) => {
          if (index === from) {
            return fields[to];
          } else if (index === to) {
            return fields[from];
          }
          return field;
        });
      }
      return fields;
    }
    case MOVE_FIELD: {
      const { from, to } = action;
      const result = [...fields];
      const [removed] = result.splice(from, 1);
      result.splice(to, 0, removed);
      return result;
    }
    case EDIT_FIELD: {
      return fields.map(
        field =>
          action.id === field.id ? { ...field, ...action.payload } : field
      );
    }
    case TOGGLE_VALIDATION:
    case ADD_VALIDATION:
    case REMOVE_VALIDATION: {
      return fields.map(
        field =>
          action.id === field.id
            ? {
                ...field,
                validations: validationReducer(field.validations, action)
              }
            : field
      );
    }
    default: {
      return fields;
    }
  }
};

const reducer = (form = { name: "", fields: [] }, action) => {
  switch (action.type) {
    case SET_FORM: {
      return action.form;
    }
    case EDIT_NAME: {
      const { name } = action;
      return { ...form, name };
    }
    default: {
      return { ...form, fields: fieldReducer(form.fields, action) };
    }
  }
};

export default reducer;

export const setForm = ({ form }) => ({ type: SET_FORM, form });
export const editName = ({ name }) => ({ type: EDIT_NAME, name });
export const addField = ({ payload }) => ({ type: ADD_FIELD, payload });
export const removeField = ({ id }) => ({ type: REMOVE_FIELD, id });
export const editField = ({ id, payload }) => ({
  type: EDIT_FIELD,
  id,
  payload
});
export const toggleValidation = ({ id, validation }) => ({
  type: TOGGLE_VALIDATION,
  id,
  validation
});
export const addValidation = ({ id, validation }) => ({
  type: ADD_VALIDATION,
  id,
  validation
});
export const removeValidation = ({ id, validation }) => ({
  type: REMOVE_VALIDATION,
  id,
  validation
});

export const swapField = ({ from, to }) => ({ type: SWAP_FIELD, from, to });
export const moveField = ({ from, to }) => ({ type: MOVE_FIELD, from, to });
