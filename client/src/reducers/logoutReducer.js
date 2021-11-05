export const logoutReducer = (state, action) => {
  switch (action.type) {
    case "LOGOUT_START":
      return {
        user: state.user,
        isLoading: true,
        error: false
      };
    case "LOGOUT_SUCCESS":
      return {
        user: null,
        isLoading: false,
        error: false
      };
    case "LOGOUT_FAILURE":
      return {
        user: state.user,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};