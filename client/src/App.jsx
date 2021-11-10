import "./App.css";
import React, { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import AuthApp from "./AuthApp";
import UnauthApp from "./UnauthApp";
import { CurrentConversationProvider } from "./contexts/CurrentConversationContext";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      {user ? (
        <CurrentConversationProvider>
          <AuthApp />
        </CurrentConversationProvider>
      ) : <UnauthApp />}
    </div>
  );
};

export default App;
