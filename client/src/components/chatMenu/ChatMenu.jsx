import React from "react";
import RoomList from "./RoomList";
import "./chatMenu.css";

const MainSearchBar = () => {
  return (
    <input id="main-search-bar" type="text" placeholder="Search in Chat.IO..." />
  );
};

const NavigationMenu = () => {
  // TODO
  return (
    <nav></nav>
  );
};

const TopBar = () => {
  return (
    <div id="chat-menu-top">
      <NavigationMenu />
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
