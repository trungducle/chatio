import React, { useState } from "react";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: "1",
    authenticated: false
  });

  const login = (userId) => {
    setUser((user) => ({
      userId,
      authenticated: true
    }));
  };

  const logout = () => {
    setUser((user) => ({
      ...user,
      authenticated: false
    }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};