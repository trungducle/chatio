import React, { useEffect, useState } from "react";
import RoomList from "./RoomList";
import LogoBar from "../logoBar/logoBar";
import "./chatMenu.css";

const MainSearchBar = () => {
  const [searchPattern, setSearchPattern] = useState("");

  useEffect(() => {

  }, [searchPattern]);

  return (
    <input
      id="main-search-bar"
      type="search"
      placeholder="Search in Chat.IO..."
      onChange={(e) => setSearchPattern(e.target.value)}
    />
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
