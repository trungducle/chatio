import React, { useContext } from "react";
import { CurrentConversationContext } from "../../contexts/CurrentConversationContext";
import "./room.css";

const Room = (props) => {
  const { setConversationId } = useContext(CurrentConversationContext);

  const showedName = props.name.length > 30
    ? props.name.substring(0, 30) + "..."
    : props.name;
  const showedLatestMessage = props.latestMessage.length > 40
    ? props.latestMessage.substring(0, 40) + "..."
    : props.latestMessage;

  return (
    <div className="room" onClick={() => setConversationId(props.id)} key={props.id}>
      <div className="user-name">{showedName}</div>
      <div className="latest-message">{showedLatestMessage}</div>
    </div>
  );
};

export default Room;