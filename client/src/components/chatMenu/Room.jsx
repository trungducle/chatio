import React from "react";
import "./room.css";

const Room = (props) => {
  const showedName = props.name.length > 30
    ? props.name.substring(0, 30) + "..."
    : props.name;
  const showedLastMessage = props.lastMessage.length > 40
    ? props.lastMessage.substring(0, 40) + "..."
    : props.lastMessage;

  return (
    <div className="room" onClick={props.setConversationOnDisplay} key={props.id}>
      <div className="user-name">{showedName}</div>
      <div className="last-message">{showedLastMessage}</div>
    </div>
  );
};

export default Room;