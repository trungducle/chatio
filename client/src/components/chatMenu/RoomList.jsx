import React, { useEffect, useContext } from "react";
import { CurrentConversationContext } from "../../contexts/CurrentConversationContext";
import Room from "./Room";
import socket from "../../socket";
import "./room.css";

const RoomList = (props) => {
  const { conversation, setConversation } = useContext(CurrentConversationContext);

  // update name and latest message on receiving a new message
  useEffect(() => {
    socket.on("send message", (msg) => {
      const { conversationId, sender, body } = msg;
      if (conversationId === conversation.id) {
        setConversation((prevConv) => ({
          ...prevConv,
          latestMessage: {
            sender,
            body
          }
        }));
      }

      props.setRoomList((prevList) => ({
        isLoading: false,
        value: prevList.value.map((room) => {
          if (room.id === conversationId) {
            const { latestMessage } = room;
            latestMessage.sender = sender;
            latestMessage.body = body;
          }
          return room;
        })
      }));
    });
  }, []);

  // update name and latest message on sending a new message
  useEffect(() => {
    props.setRoomList((prevList) => ({
      isLoading: false,
      value: prevList.value.map((room) => {
        if (room.id === conversation.id) {
          const { latestMessage } = room;
          latestMessage.sender = conversation.latestMessage.sender;
          latestMessage.body = conversation.latestMessage.body;
        }
        return room;
      })
    }));
  }, [conversation.latestMessage]);

  const onRoomSelected = (room) => {
    setConversation({
      id: room.id,
      name: room.name,
      latestMessage: room.latestMessage
    });
  };

  return (
    <div id="room-list">
      {props.roomList.value.map((room) => (
        <Room
          name={room.name}
          latestMessage={room.latestMessage.body}
          latestSender={room.latestMessage.sender}
          key={room.id}
          id={room.id}
          handleClick={() => onRoomSelected(room)}
          isFocused={conversation.id === room.id}
        />
      ))}
    </div>
  );
};

export default RoomList;