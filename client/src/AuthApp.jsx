import React, { useEffect } from "react";
import ChatMenu from "./components/chatMenu/ChatMenu";
import Conversation from "./components/conversation/Conversation";
import NavigationPanel from "./components/navigation/NavigationPanel";
import SideMenu from "./components/contacts/SideMenu";
import FriendRequest from "./components/requests/FriendRequest";
import Contact from "./components/contacts/Contact";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import socket from "./socket";

const Home = () => (
  <>
    <NavigationPanel chat />
    <ChatMenu />
    <Conversation />
  </>
);


const Contacts = () => {
  return (
    <>
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
    </>
  );
};

export const AuthApp = () => {
  useEffect(() => {
    socket.on("notify", (message) => {
      console.log(message);
    });

    socket.on("get users", (users) => {
      console.log(users);
    });

    return () => {
      socket.close();
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/contacts">
          <Contacts />
        </Route>
      </Switch>
    </Router>
  );
};