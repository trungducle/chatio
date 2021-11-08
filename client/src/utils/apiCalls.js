import axios from "axios";
import { loginStart, loginSuccess, loginFailure } from "../actions/loginActions";
import { logoutFailure, logoutStart, logoutSuccess } from "../actions/logoutActions";
import socket from "../socket";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch(loginStart());
  try {
    const result = await axios.post("/login", userCredentials);
    dispatch(loginSuccess(result.data));
    socket.auth = {
      userInfo: {
        userId: result.data.user_id,
        name: `${result.data.first_name} ${result.data.last_name}`
      }
    };
    socket.connect();
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

export const logoutCall = async (userId, dispatch) => {
  dispatch(logoutStart());
  try {
    console.log(`userId at logoutCall: ${userId}`);
    await axios.post("/logout", { userId });
    dispatch(logoutSuccess());

  } catch (err) {
    dispatch(logoutFailure(err));
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

export const fetchUsers = async(userName) => {
  try {
    return await axios.get(`/users/search?value=${userName}`);
  } catch (err) {
    console.log(err);
  }
}

export const fetchContacts = async(userId) => {
  try {
    return await axios.get(`/contacts/${userId}`);
  } catch (err) {
    console.log(err);
  }
}