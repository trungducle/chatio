import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CurrentConversationContext } from "../../contexts/CurrentConversationContext";
import { fetchConversations } from "../../utils/apiCalls";
import Room from "./Room";
import "./room.css";

const RoomList = () => {
  const [roomList, setRoomList] = useState([]);
  const [roomIdOnFocus, setRoomIdOnFocus] = useState(-1);
  const { user } = useContext(AuthContext);
  const { setConversation } = useContext(CurrentConversationContext);

  const onRoomSelected = (room) => {
    setConversation({
      id: room.id,
      name: room.name,
      latestMessage: room.latestMessage
    });

    setRoomIdOnFocus(room.id);
  };

  useEffect(() => {
    (async () => {
      const result = await fetchConversations(user.user_id);
      setRoomList(result.data.map((res) => ({
        id: res.conversation_id,
        name: res.name,
        latestMessage: res.latest_message
      })));
    })();
  }, [user.user_id]);

  return (
    <div id="room-list">
      {roomList.map((room) => (
        <Room
          name={room.name}
          latestMessage={room.latestMessage}
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