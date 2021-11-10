export const firstLoadReducer = (state, action) => {
  switch (action.type) {
    case "CONVERSATIONS_START":
      return {
        ...state,
        roomList: {
          value: [],
          isLoading: true,
          error: false
        }
      };
    case "CONVERSATIONS_SUCCESS":
      return {
        ...state,
        roomList: {
          value: action.payload,
          isLoading: false,
          error: false
        }
      };
    case "CONVERSATIONS_FAILURE":
      return {
        ...state,
        roomList: {
          value: [],
          isLoading: false,
          error: true
        }
      };
    case "MESSAGES_START":
      return {
        ...state,
        roomList: {
          value: [],
          isLoading: true,
          error: false
        }
      };
    default:
      break;
  }
}