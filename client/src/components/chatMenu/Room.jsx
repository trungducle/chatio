import React, { useContext, useEffect, useState } from "react";
import { CurrentConversationContext } from "../../contexts/CurrentConversationContext";
import "./room.css";

const Room = (props) => {
  // const { conversation, setConversation } = useContext(CurrentConversationContext);
  // const [latestMessage, setLatestMessage] = useState(conversation.latestMessage);
  const MAX_NAME_LENGTH = 25;
  const MAX_LATEST_MESSAGE_LENGTH = 40;

  const display = (text, maxLength) => {
    if (typeof text === "string") {
      return text.length > maxLength
        ? `${text.substring(0, maxLength)}...`
        : text;
    }
  };

  // const showName = () => props.name.length > MAX_NAME_LENGTH
  //   ? props.name.substring(0, MAX_NAME_LENGTH) + "..."
  //   : props.name;
  // const showLatestMessage = () => latestMessage.length > MAX_LATEST_MESSAGE_LENGTH
  //   ? latestMessage.substring(0, MAX_LATEST_MESSAGE_LENGTH) + "..."
  //   : latestMessage;

  

  // useEffect(() => {
  //   setLatestMessage(conversation.latestMessage);
  // }, [conversation]);

  return (
    <div
      className={props.isFocused ? "room focus" : "room"}
      onClick={props.handleClick}
    >
      <div className="room-name">{display(props.name, MAX_NAME_LENGTH)}</div>
      <div className="latest-message">{display(props.latestMessage, MAX_LATEST_MESSAGE_LENGTH)}</div>
    </div>
  );
};

export default Room;