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

export const fetchConversations = async (userId) => {
  try {
    return await axios.get(`/conversations/${userId}`);
  } catch (err) {
    console.log(err);
  }
};

export const fetchMessages = async (conversationId) => {
  try {
    return await axios.get(`/messages/${conversationId}`);
  } catch (err) {
    console.log(err);
  }
};

export const postNewMessage = async (conversationId, message) => {
  try {
    axios.post(`/messages/${conversationId}`, message);
  } catch (err) {
    console.log(err);
  }
};