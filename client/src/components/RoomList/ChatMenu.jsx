import React from "react";
import RoomList from "./RoomList";
import "./chatMenu.css";

const MainSearchBar = () => {
  return (
    // <div id="main-search-bar">
      <input id="main-search-bar" type="text" placeholder="Search in Chat.IO..." />
    // </div>
  );
};

const TopBar = () => {
  return (
    <div id="chat-menu-top">
      <MainSearchBar />
    </div>
  )
}

const ChatMenu = () => {
  return (
    <div id="chat-menu">
      <TopBar />
      <RoomList />
    </div>
  )
};

export default ChatMenu;
