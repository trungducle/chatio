import React, { useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";

const INITIAL_LOGIN_STATE = {
  user: null,
  isLoading: false,
  error: false
};

export const AuthContext = React.createContext(INITIAL_LOGIN_STATE);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loginReducer, INITIAL_LOGIN_STATE);

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