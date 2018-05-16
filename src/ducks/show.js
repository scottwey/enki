const TOGGLE = "show/TOGGLE";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE: {
      const { id } = action;
      const next = !state[id];
      return { ...state, [id]: next };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

export const toggle = ({ id }) => ({ type: TOGGLE, id });
