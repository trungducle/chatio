import React from "react";
import RoomList from "./RoomList";
import LogoBar from "../logoBar/logoBar";
import "./chatMenu.css";

const MainSearchBar = () => {
  return (
    <input id="main-search-bar" type="text" placeholder="Search in Chat.IO..." />
  );
};

const TopBar = () => {
  return (
    <div id="chat-menu-top">
      <LogoBar />
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
