import axios from "axios";
import { loginStart, loginSuccess, loginFailure } from "../actions/loginActions";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch(loginStart());
  try {
    const result = await axios.post("/login", userCredentials);
    dispatch(loginSuccess(result.data));
  } catch (err) {
    dispatch(loginFailure(err));
  }
};

export const signupCall = async (userInfo) => {
  try {
    await axios.post("/signup", userInfo);
  } catch (err) {
    console.log(err);
  }
};