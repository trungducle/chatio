import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CurrentConversationContext } from "../../contexts/CurrentConversationContext";
import { fetchConversations } from "../../utils/apiCalls";
import Room from "./Room";
import socket from "../../socket";
import "./room.css";

const RoomList = () => {
  const [roomList, setRoomList] = useState([]);
  const [roomIdOnFocus, setRoomIdOnFocus] = useState(-1);
  const { user } = useContext(AuthContext);
  const { conversation, setConversation } = useContext(CurrentConversationContext);

  // fetch conversations on first load
  useEffect(() => {
    (async () => {
      const result = await fetchConversations(user.user_id);
      const convList = result.data.map((res) => ({
        id: res.conversation_id,
        name: res.name,
        latestMessage: {
          senderId: res.latest_sender_id,
          senderName: res.latest_sender_name,
          body: res.latest_message
        }
      }));
      setRoomList(convList);
      socket.emit("join rooms", convList.map((conv) => conv.id));
    })();
  }, []);
  
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
      
      setRoomList((prevList) => prevList.map((room) => {
        if (room.id === msg.conversationId) {
          const { latestMessage } = room;
          latestMessage.senderId = msg.senderId;
          latestMessage.senderName = msg.senderName;
          latestMessage.body = msg.messageBody;
        }
        return room;
      }));
    });
  }, []);
  
  // update name and latest message on sending a new message
  useEffect(() => {
    setRoomList((prevList) => prevList.map((room) => {
      if (room.id === conversation.id) {
        const { latestMessage } = room;
        latestMessage.senderId = conversation.latestMessage.senderId;
        latestMessage.senderName = conversation.latestMessage.senderName;
        latestMessage.body = conversation.latestMessage.body;
      }
      return room;
    }));
  }, [conversation.latestMessage]);
  
  const onRoomSelected = (room) => {
    if (!conversation.id || conversation.id !== room.id) {
      setConversation({
        id: room.id,
        name: room.name,
        latestMessage: room.latestMessage
      });
    }
    setRoomIdOnFocus(room.id);
  };

  return (
    <div id="room-list">
      {roomList.map((room) => (
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
          isFocused={roomIdOnFocus === room.id}
        />
      ))}
    </div>
  );
};

export default RoomList;