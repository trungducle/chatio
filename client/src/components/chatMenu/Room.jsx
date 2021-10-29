import React from "react";
import "./room.css";

const Room = ({ id, name, lastMessage }) => {
  const showedName = name.length > 30? name.substring(0,30) + "..." : name;
  const showedLastMessage = lastMessage.length > 40? lastMessage.substring(0,40) + "..." : lastMessage;

  return (
    <div className="room">
      <div className="user-name">{showedName}</div>
      <div className="last-message">{showedLastMessage}</div>
    </div>
  );
};

export default Room;