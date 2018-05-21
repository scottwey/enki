const SET_FORM = "form/SET";
const EDIT_NAME = "form/EDIT_NAME";
const ADD_FIELD = "fields/ADD";
const REMOVE_FIELD = "fields/REMOVE";
const SWAP_FIELD = "fields/SWAP";
const EDIT_FIELD = "fields/EDIT";
const MOVE_FIELD = "fields/MOVE";

const inBounds = (array, index) => !!array[index];
const randomInt = () => Math.floor(Math.random() * 100000000);

const fieldReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_FIELD: {
      return state.concat({ ...action.payload, id: randomInt() });
    }
    case REMOVE_FIELD: {
      return state.filter(({ id }) => id !== action.id);
    }
    case SWAP_FIELD: {
      const { from, to } = action;
      const fromInBounds = inBounds(state, from);
      const toInBounds = inBounds(state, to);
      if (fromInBounds && toInBounds) {
        return state.map((field, index) => {
          if (index === from) {
            return state[to];
          } else if (index === to) {
            return state[from];
          }
          return field;
        });
      }
      return state;
    }
    case MOVE_FIELD: {
      const { from, to } = action;
      const result = [...state];
      const [removed] = result.splice(from, 1);
      result.splice(to, 0, removed);
      return result;
    }
    case EDIT_FIELD: {
      return state.map(
        field =>
          action.id === field.id ? { ...field, ...action.payload } : field
      );
    }
    default: {
      return state;
    }
  }
};

const reducer = (state = { name: "", fields: [] }, action) => {
  switch (action.type) {
    case SET_FORM: {
      return action.form;
    }
    case EDIT_NAME: {
      const { name } = action;
      return { ...state, name };
    }
    default: {
      return { ...state, fields: fieldReducer(state.fields, action) };
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
export const swapField = ({ from, to }) => ({ type: SWAP_FIELD, from, to });
export const moveField = ({ from, to }) => ({ type: MOVE_FIELD, from, to });
