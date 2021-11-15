import "./App.css";
import React, { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import AuthApp from "./AuthApp";
import UnauthApp from "./UnauthApp";
import { CurrentConversationProvider } from "./contexts/CurrentConversationContext";
import socket from "./socket";

const App = () => {
  const { user } = useContext(AuthContext); // somehow this line is a must for the app to work :D ??
  const token = localStorage.getItem("a_token");

  socket.auth = {
    accessToken: token
  };
  socket.connect();

  return (
    <div className="App">
      {token ? (
        <CurrentConversationProvider>
          <AuthApp />
        </CurrentConversationProvider>
      ) : <UnauthApp />}
    </div>
  );
};

export default App;
