import ChatMenu from "./components/chatMenu/ChatMenu";
import Conversation from "./components/conversation/Conversation";
// import { io } from "socket.io-client";
import "./App.css";
import React, { useEffect, useState, useContext } from "react";
import { LogIn } from "./components/login/LogIn";
import { SignUp } from "./components/signup/SignUp";
import NavigationPanel from "./components/navigation/NavigationPanel";
import { AuthContext } from "./contexts/AuthContext";
import {
  CurrentConversationProvider
} from "./contexts/CurrentConversationContext";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const Home = () => {
  return (
    <div className="App">
      <NavigationPanel chat />
      <CurrentConversationProvider>
        <ChatMenu />
        <Conversation />
      </CurrentConversationProvider>
    </div>
  );
};

function App() {
  // const [socket, setSocket] = useState(io("ws://localhost:9000"));
  // useEffect(() => {
  //   socket.on("notify", (message) => {
  //     console.log(message);
  //   });
  //   return () => 0; 
  // }, [socket]);

  // const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/">
          {/* {user.authenticated ? <Home /> : <LogIn />} */}
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
