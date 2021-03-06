export const authReducer = (state, action) => {
  switch (action.type) {
    case "NOT_LOGGED_IN":
      return {
        user: null,
        isLoading: false,
        error: false
      };
    case "LOGGED_IN":
      return {
        user: action.payload,
        isLoading: false,
        error: false
      };
    case "LOGIN_START":
      return {
        user: null,
        isLoading: true,
        error: false
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isLoading: false,
        error: action.payload
      };
    case "LOGOUT_START":
      return {
        user: state.user,
        isLoading: true,
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

export const signupReducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP_START":
      return {
        message: null,
        isLoading: true,
        error: null
      };
    case "SIGNUP_SUCCESS":
      return {
        message: action.payload,
        isLoading: false,
        error: null
      };
    case "SIGNUP_FAILURE":
      return {
        message: null,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};