import React from "react";
import "./room.css";

const Room = ({ id, name, lastMessage }) => {
  return (
    <div className="room">
      <div className="user-name">{name}</div>
      <div className="last-message">{lastMessage}</div>
    </div>
  );
};

export default Room;