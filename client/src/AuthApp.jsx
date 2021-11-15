import React, { useEffect, useState, useContext, useReducer } from "react";
import ChatMenu from "./components/chatMenu/ChatMenu";
import Conversation from "./components/conversation/Conversation";
import NavigationPanel from "./components/navigation/NavigationPanel";
import SideMenu from "./components/contacts/SideMenu";
import FriendRequest from "./components/requests/FriendRequest";
import Contact from "./components/contacts/Contact";
// import { AuthContext } from "./contexts/AuthContext";
// import { CurrentConversationContext } from "./contexts/CurrentConversationContext";
// import roomsReducer from "./reducers/roomsReducer";
import { fetchConversations } from "./utils/apiCalls";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import socket from "./socket";

const Home = (props) => (
  <>
    <NavigationPanel chat />
    <ChatMenu {...props} />
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

const AuthApp = () => {
  const [roomList, setRoomList] = useState({
    value: [],
    isLoading: false
  });

  // console.log(socket);

  // const [userGlobalState, dispatch] = useReducer(reducer, {
  //   roomList: {
  //     value: [],
  //     isLoading: false
  //   },

  // })

  // const { user } = useContext(AuthContext);
  // console.log(user);

  // fetch conversations on first load
  useEffect(() => {
    (async () => {
      setRoomList({ value: [], isLoading: true })
      try {
      const result = await fetchConversations();
      // const convList = result.data.map((conv) => ({
      //   id: conv.id,
      //   name: conv.name,
      //   latestMessage: {
      //     sender: conv.sender,
      //     body: conv.body
      //     // senderId: conv.senderId,
      //     // senderName: conv.senderName,
      //     // byCurrentUser: conv.byCurrentUser
      //   }
      // }));
      console.log(JSON.stringify(result.data));
      setRoomList({ value: result.data, isLoading: false });
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