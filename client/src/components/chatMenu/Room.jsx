import React from "react";
import "./room.css";

const display = (text, maxLength) => {
  if (typeof text === "string") {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  }
};

const RoomName = (props) => {
  const MAX_NAME_LENGTH = 25;
  return (
    <div
      className="room-name"
    >
      {display(props.name, MAX_NAME_LENGTH)}
    </div>
  )
};

const LatestMessage = (props) => {
  const MAX_DISPLAY_LENGTH = 40;
  return (
    <div
      className="latest-message"
    >
      {display(
        `${props.latestSender}: ${props.latestMessage}`,
        MAX_DISPLAY_LENGTH
      )}
    </div>
  );
};

const Room = (props) => {
  return (
    <div
      className={props.isFocused ? "room focus" : "room"}
      onClick={props.handleClick}
    >
      <RoomName name={props.name} />
      <LatestMessage
        latestMessage={props.latestMessage}
        latestSender={props.latestSender}
      />
    </div>
  )
};

export default Room;