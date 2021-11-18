export const updateReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_START":
      return {
        message: null,
        error: null
      };
    case "UPDATE_FAILURE":
      return {
        message: null,
        error: action.payload
      };
    case "UPDATE_SUCCESS":
      return {
        message: action.payload,
        error: null
      };
    default:
      return state;
  }
};