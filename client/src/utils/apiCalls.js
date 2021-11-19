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
    dispatch(loginFailure(err.response.data));
  }
};

export const signupCall = async (userInfo, dispatch) => {
  dispatch({ type: "SIGNUP_START" });
  try {
    const result = await axios.post("/auth/signup", userInfo);
    dispatch({ type: "SIGNUP_SUCCESS", payload: result.data });
  } catch (err) {
    dispatch({ type: "SIGNUP_FAILURE", payload: err.response.data });
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

export const fetchMessagesPartially = async (conversationId, offset, count) => {
  try {
    return await axios.get(
      `/conversations/${conversationId}/parts?offset=${offset}&count=${count}`,
      getAuthHeader()
    );
  } catch (err) {
    console.log(err);
  }
}

export const postNewMessage = async (conversationId, message) => {
  try {
    axios.post(`/conversations/${conversationId}`, message, getAuthHeader());
  } catch (err) {
    console.log(err);
  }
};

export const fetchUsers = async (pattern) => {
  try {
    return await axios.get(`/users/search?value=${pattern}`, getAuthHeader());
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

export const deleteContact = async (userid) => {
  try {
    await axios.delete(`/contacts/${userid}`, getAuthHeader());
  } catch (err) {
    console.log(err);
  }
}

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

export const cancelRequest = async (recipientId) => {
  try {
    axios.delete(`/requests?to=${recipientId}`, getAuthHeader());
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
};

export const leaveConversation = async (conversationId) => {
  try {
    axios.put("/conversations", {
      conversation: conversationId
    }, getAuthHeader());
  } catch (err) {
    console.log(err);
  }
}

export const updateUserName = async (firstName, lastName, dispatch) => {
  dispatch({ type: "UPDATE_START" });
  try {
    const result = await axios.put("/info/fullname", {
      firstName, lastName
    }, getAuthHeader());
    dispatch({ type: "UPDATE_SUCCESS", payload: result.data });
  } catch (err) {
    dispatch({ type: "UPDATE_FAILURE", payload: err.response.data });
  }
}

export const updateEmail = async (email, dispatch) => {
  dispatch({ type: "UPDATE_START" });
  try {
    const result = await axios.put("/info/email", {
      email
    }, getAuthHeader());
    dispatch({ type: "UPDATE_SUCCESS", payload: result.data });
  } catch (err) {
    dispatch({ type: "UPDATE_FAILURE", payload: err.response.data });
  }
}

export const updatePassword = async (password, dispatch) => {
  dispatch({ type: "UPDATE_START" });
  try {
    const result = await axios.put("/info/password", {
      password
    }, getAuthHeader());
    dispatch({ type: "UPDATE_SUCCESS", payload: result.data });
  } catch (err) {
    dispatch({ type: "UPDATE_FAILURE", payload: err.response.data });
  }
}
