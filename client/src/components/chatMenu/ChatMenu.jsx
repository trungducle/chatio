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

const ChatMenu = (props) => {
  return (
    <div id="chat-menu">
      <TopBar />
      {props.roomList.isLoading ? (
        <span id="rooms-loading">Loading conversations...</span>
      ) : (
        <RoomList {...props} />
      )}
    </div>
  )
};

export default ChatMenu;
