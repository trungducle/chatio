import ChatMenu from "./components/chatMenu/ChatMenu";
import Conversation from "./components/conversation/Conversation";
import { io } from "socket.io-client";
import "./App.css";
import React, { useEffect, useState } from "react";
import { LogIn } from "./components/login/LogIn";
import { SignUp } from "./components/signup/SignUp";

function App() {
  // const [socket, setSocket] = useState(io("ws://localhost:9000"));
  // useEffect(() => {
  //   socket.on("notify", (message) => {
  //     console.log(message);
  //   });
  //   return () => 0; 
  // }, [socket]);
  return (
    <div className="App">
      <ChatMenu />
      <Conversation />
    </div>
  );
  // return <LogIn />
  // return <SignUp />;
}

export default App;
