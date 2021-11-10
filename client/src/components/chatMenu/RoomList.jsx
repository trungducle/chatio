import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CurrentConversationContext } from "../../contexts/CurrentConversationContext";
import Room from "./Room";
import socket from "../../socket";
import "./room.css";

const RoomList = (props) => {
  const { user } = useContext(AuthContext);
  const { conversation, setConversation } = useContext(CurrentConversationContext);

  // update name and latest message on receiving a new message
  useEffect(() => {
    socket.on("send message", (msg) => {
      if (msg.conversationId === conversation.id) {
        setConversation((prevConv) => ({
          ...prevConv,
          latestMessage: {
            body: msg.messageBody,
            senderId: msg.senderId,
            senderName: msg.senderName
          }
        }));
      }

      props.setRoomList((prevList) => ({
        isLoading: false,
        value: prevList.value.map((room) => {
          if (room.id === msg.conversationId) {
            const { latestMessage } = room;
            latestMessage.senderId = msg.senderId;
            latestMessage.senderName = msg.senderName;
            latestMessage.body = msg.messageBody;
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
          latestMessage.senderId = conversation.latestMessage.senderId;
          latestMessage.senderName = conversation.latestMessage.senderName;
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
          latestSenderName={
            room.latestMessage.senderId === user.user_id
              ? "You"
              : room.latestMessage.senderName
          }
          latestSenderId={room.latestMessage.senderId}
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