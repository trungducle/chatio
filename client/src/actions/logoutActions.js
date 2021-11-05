export const logoutStart = () => ({
  type: "LOGOUT_START"
});

export const logoutSuccess = () => ({
  type: "LOGOUT_SUCCESS",
});

export const logoutFailure = (error) => ({
  type: "LOGOUT_FAILURE",
  payload: error
});