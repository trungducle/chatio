import ChatMenu from "./components/chatMenu/ChatMenu";
import Conversation from "./components/conversation/Conversation";
import { io } from "socket.io-client";
import "./App.css";
import React, { useEffect, useState, useContext, useRef } from "react";
import { LogIn } from "./components/login/LogIn";
import { SignUp } from "./components/signup/SignUp";
import NavigationPanel from "./components/navigation/NavigationPanel";
import SideMenu from "./components/contacts/SideMenu";
import FriendRequest from "./components/requests/FriendRequest";
import Contact from "./components/contacts/Contact";
import { AuthContext } from "./contexts/AuthContext";
import {
  CurrentConversationProvider
} from "./contexts/CurrentConversationContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
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

const Contacts = () => {
  return (
    <div className="App">
      <NavigationPanel contact />
      <Router>
        <Switch>
          <Route path="/contacts/requests">
            <SideMenu request />
            <FriendRequest />
          </Route>
          <Route exact path="/contacts/">
            <SideMenu contact />
            <Contact />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export const App = () => {
  const { user } = useContext(AuthContext);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:9000");
    return () => {
      socket.current.close();
    }
  }, []);

  useEffect(() => {
    socket.current.on("notify", (message) => {
      console.log(message);
    });
  }, [socket]);

  useEffect(() => {
    socket.current.emit("send userId", user?.user_id);
    socket.current.on("get users", (users) => {
      console.log(users);
    });
  }, [user, socket]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <LogIn />}
          {/* <Home /> */}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <LogIn />}
        </Route>
        <Route path="/signup">
          {user ? <Redirect to="/" /> : <SignUp />}
        </Route>
        <Route path="/contacts">
          {user ? <Contacts /> : <LogIn />}
          {/* <Contacts /> */}
        </Route>
      </Switch>
    </Router>
  );
};
