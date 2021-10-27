import ChatMenu from "./components/chatMenu/ChatMenu";
import Conversation from "./components/Conversation/Conversation";
import { io } from "socket.io-client";
import "./App.css";
import React, { useEffect, useState } from "react";

const App = () => {
  const [socket, setSocket] = useState(io("ws://localhost:9000"));

  // useEffect(() => {
  //   setSocket();
  //   return () => 0;
  // }, []);

  useEffect(() => {
    socket.on("notify", (message) => {
      console.log(message);
    });
    return () => 0; 
  }, [socket]);

  return (
    <div className="App">
      <ChatMenu />
      <Conversation />
    </div>
  );

}

export default App;
