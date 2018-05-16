import { combineReducers } from "redux";
import form from "ducks/form";
import show from "ducks/show";

const rootReducer = combineReducers({ form, show });

export default rootReducer;
