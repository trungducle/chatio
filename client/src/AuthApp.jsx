import React, { useEffect, useState } from "react";
import ChatMenu from "./components/chatMenu/ChatMenu";
import Conversation from "./components/conversation/Conversation";
import NavigationPanel from "./components/navigation/NavigationPanel";
import SideMenu from "./components/contacts/SideMenu";
import FriendRequest from "./components/requests/FriendRequest";
import Contact from "./components/contacts/Contact";
import { fetchConversations } from "./utils/apiCalls";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import socket from "./socket";

const Home = (props) => {
  return (
    <>
      <NavigationPanel chat />
      <ChatMenu {...props} />
      <Conversation />
    </>
  )
};

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

const AuthApp = () => {
  const [roomList, setRoomList] = useState({
    value: [],
    isLoading: false
  });

  // fetch conversations on first load
  useEffect(() => {
    (async () => {
      setRoomList({ value: [], isLoading: true });
      try {
        const result = await fetchConversations();
        setRoomList({
          value: result.data,
          isLoading: false
        });
        socket.emit("join rooms", result.data.map((conv) => conv.id));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home
            roomList={roomList}
            setRoomList={setRoomList}
          />
        </Route>
        <Route path="/contacts">
          <Contacts />
        </Route>
      </Switch>
    </Router>
  );
};

export default AuthApp;