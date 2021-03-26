import { LOGIN_USER, LOGIN_ERROR, LOGOUT_USER } from "../types";
import axios from "../../utils/axios";

export const loginUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/user/profile", {
      withCredentials: true,
    });
    console.log(res.data);
    dispatch({
      type: LOGIN_USER,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGIN_ERROR,
      payload: "Something went wrong",
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get("/auth/logout", {
      withCredentials: true,
    });
    dispatch({
      type: LOGOUT_USER,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGIN_ERROR,
      payload: "Something went wrong",
    });
  }
};
