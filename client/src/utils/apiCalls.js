import axios from "axios";
import {
  loginStart, loginFailure, loggedIn,
  logoutStart, logoutFailure, notLoggedIn
} from "../actions/authActions";
import socket from "../socket";

const getAuthHeader = () => {
  const accessToken = localStorage.getItem("a_token");
  if (!accessToken) return null;
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };
}

export const loginCall = async (userCredentials, dispatch) => {
  dispatch(loginStart());
  try {
    const result = await axios.post("/auth/login", userCredentials);
    localStorage.setItem("a_token", result.data.accessToken);
    dispatch(loggedIn(result.data));
  } catch (err) {
    dispatch(loginFailure(err));
  }
};

export const signupCall = async (userInfo) => {
  try {
    await axios.post("/auth/signup", userInfo);
  } catch (err) {
    console.log(err);
  }
};

export const logoutCall = async (dispatch) => {
  dispatch(logoutStart());
  try {
    await axios.post("/auth/logout", {}, getAuthHeader());
    localStorage.removeItem("a_token");
    dispatch(notLoggedIn());
    socket.disconnect();
  } catch (err) {
    dispatch(logoutFailure(err));
  }
};

export const fetchConversations = async () => {
  try {
    return await axios.get("/conversations", getAuthHeader());
  } catch (err) {
    console.log(err);
  }
};

export const fetchMessages = async (conversationId) => {
  try {
    return await axios.get(`/conversations/${conversationId}`, getAuthHeader());
  } catch (err) {
    console.log(err);
  }
};

export const postNewMessage = async (conversationId, message) => {
  try {
    axios.post(`/conversations/${conversationId}`, message, getAuthHeader());
  } catch (err) {
    console.log(err);
  }
};

export const fetchUsers = async (userName) => {
  try {
    return await axios.get(`/users/search?value=${userName}`);
  } catch (err) {
    console.log(err);
  }
};

export const fetchContacts = async () => {
  try {
    return await axios.get("/contacts", getAuthHeader());
  } catch (err) {
    console.log(err);
  }
};

export const fetchRequests = async () => {
  try {
    return await axios.get("/requests", getAuthHeader());
  } catch (err) {
    console.log(err);
  }
};

export const sendRequest = async (recipientId) => {
  try {
    axios.post("/requests", {
      recipient: recipientId
    }, getAuthHeader());
  } catch (err) {
    console.log(err);
  }
};

export const rejectRequest = async (senderId) => {
  try {
    axios.put("/requests/reject", {
      sender: senderId,
    }, getAuthHeader());
  } catch (err) {
    console.log(err);
  }
};

export const acceptRequest = async (senderId) => {
  try {
    axios.put("/requests/accept", {
      sender: senderId,
    }, getAuthHeader());
  } catch (err) {
    console.log(err);
  }
};

export const isFriend = async (contactId) => {
  try {
    return await axios.get(`/users/friends?contact=${contactId}`, getAuthHeader());
  } catch (err) {
    console.log(err);
  }
};

export const createConversation = async (conversationName, users) => {
  try {
    axios.post("/conversations", {
      name: conversationName, 
      participantId: users
    }, getAuthHeader());
  } catch (err) {
    console.log(err);
  }
}

export const leaveConversation = async (conversationId) => {
  try {
    axios.put("/conversations", {
      conversation: conversationId 
    }, getAuthHeader());
  } catch (err) {
    console.log(err);
  }
}
