import React from "react";
import "./room.css";

const Room = ({ id, name, lastMessage }) => {
  return (
    <li key={id}>
      <div className="user-name">{name}</div>
      <div className="last-message">{lastMessage}</div>
    </li>
  );
};

export default Room;