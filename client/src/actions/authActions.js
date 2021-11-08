export const notLoggedIn = () => ({
  type: "NOT_LOGGED_IN"
});

export const loggedIn = (user) => ({
  type: "LOGGED_IN",
  payload: user
});

export const loginStart = () => ({
  type: "LOGIN_START"
});

export const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error
});

export const logoutStart = () => ({
  type: "LOGOUT_START"
});

export const logoutFailure = (error) => ({
  type: "LOGOUT_FAILURE",
  payload: error
});
