const roomsReducer = (state, action) => {
  switch (action.type) {
    case "CONVERSATIONS_START":
      return {
        value: [],
        isLoading: true,
        error: false
      };
    case "CONVERSATIONS_SUCCESS":
      return {
        value: action.payload,
        isLoading: false,
        error: false
      };
    case "CONVERSATIONS_FAILURE":
      return {
        value: [],
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
};

export default roomsReducer;