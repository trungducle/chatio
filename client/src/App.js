import ChatMenu from "./components/chatMenu/ChatMenu";
import Conversation from "./components/conversation/Conversation";
// import { io } from "socket.io-client";
import "./App.css";
import React, { useEffect, useState, useContext } from "react";
import { LogIn } from "./components/login/LogIn";
import { SignUp } from "./components/signup/SignUp";
import { AuthContext } from "./contexts/AuthContext";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const Home = () => {
  return (
    <div className="App">
      <ChatMenu />
      <Conversation />
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
  // return (
  //   <div className="App">
  //     <ChatMenu />
  //     <Conversation />
  //   </div>
  // );
  const { user } = useContext(AuthContext);
  // return user.authenticated ? (
  //   <Home />
  // ) : <LogIn />;
  // return <SignUp />;
  return (
    <Router>
      {/* {user.authenticated ? <Home /> : <LogIn />} */}
      <Switch>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
