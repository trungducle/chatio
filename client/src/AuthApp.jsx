import React, { useEffect, useState, useContext, useReducer } from "react";
import ChatMenu from "./components/chatMenu/ChatMenu";
import Conversation from "./components/conversation/Conversation";
import NavigationPanel from "./components/navigation/NavigationPanel";
import SideMenu from "./components/contacts/SideMenu";
import FriendRequest from "./components/requests/FriendRequest";
import Contact from "./components/contacts/Contact";
import { AuthContext } from "./contexts/AuthContext";
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

  // const [userGlobalState, dispatch] = useReducer(reducer, {
  //   roomList: {
  //     value: [],
  //     isLoading: false
  //   },

  // })

  const { user } = useContext(AuthContext);

  // fetch conversations on first load
  useEffect(() => {
    (async () => {
      setRoomList({ value: [], isLoading: true })
      const result = await fetchConversations(user.user_id);
      const convList = result.data.map((res) => ({
        id: res.conversation_id,
        name: res.name,
        latestMessage: {
          senderId: res.latest_sender_id,
          senderName: res.latest_sender_name,
          body: res.latest_message
        }
      }));
      setRoomList({ value: convList, isLoading: false });
      socket.emit("join rooms", convList.map((conv) => conv.id));
    })();
  }, []);

  // useEffect(() => {
  //   socket.on("notify", (message) => {
  //     console.log(message);
  //   });

  //   socket.on("get users", (users) => {
  //     console.log(users);
  //   });

  //   return () => {
  //     socket.close();
  //   }
  // }, []);

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