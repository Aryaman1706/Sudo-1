import { combineReducers } from "redux";
import authReducer from "./authReducer";
import codeReducer from "./codeReducer";
import crdtReducer from "./crdtReducer";

//combine multiple reducers
export default combineReducers({
  //reducers!!
  code: codeReducer,
  auth: authReducer,
  crdt: crdtReducer,
});
