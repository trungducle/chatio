// conversations
export const fetchConversationsStart = () => ({
  type: "CONVERSATIONS_START"
});

export const fetchConversationsSuccess = (conversations) => ({
  type: "CONVERSATIONS_SUCCESS",
  payload: conversations
});

export const fetchConversationsFailure = (error) => ({
  type: "CONVERSATIONS_FAILURE",
  payload: error
});


// messages
export const fetchMessagesStart = () => ({
  type: "MESSAGES_START"
});

export const fetchMessagesSuccess = (messages) => ({
  type: "MESSAGES_SUCCESS",
  payload: messages
});

export const fetchMessagesFailure = (error) => ({
  type: "MESSAGES_FAILURE",
  payload: error
});


// friends
export const fetchFriendsStart = () => ({
  type: "FRIENDS_START"
});

export const fetchFriendsSuccess = (friends) => ({
  type: "FRIENDS_SUCCESS",
  payload: friends
});

export const fetchFriendsFailure = (error) => ({
  type: "FRIENDS_FAILURE",
  payload: error
});


// pending requests
export const fetchPendingRequestsStart = () => ({
  type: "REQUESTS_START"
});

export const fetchPendingRequestsSuccess = (requests) => ({
  type: "REQUESTS_SUCCESS",
  payload: requests
});

export const fetchPendingRequestsStart = (error) => ({
  type: "REQUESTS_FAILURE",
  payload: error
});