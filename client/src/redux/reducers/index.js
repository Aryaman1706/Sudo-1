import { combineReducers } from "redux";
import authReducer from "./authReducer";
import codeReducer from "./codeReducer";

//combine multiple reducers
export default combineReducers({
  //reducers!!
  code: codeReducer,
  auth: authReducer,
});
