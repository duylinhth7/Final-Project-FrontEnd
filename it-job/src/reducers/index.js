import { combineReducers } from "redux";
import loginReducer from "./loginReducer";

const allReducers = combineReducers({
        loginReducer,
});
export default allReducers;