import React, { useReducer } from "react";
import { authReducer } from "../reducers/authReducer";

const INITIAL_USER_STATE = {
  user: null,
  isLoading: false,
  error: false
};

export const AuthContext = React.createContext(INITIAL_USER_STATE);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_USER_STATE);

  return (
    <AuthContext.Provider value={{
      user: state.user,
      isLoading: state.isLoading,
      error: state.error,
      dispatch
    }}>
      {children}
    </AuthContext.Provider>
  );
};