import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import Room from "./Room";
import "./room.css";

const RoomList = () => {
  const [conversations, setConversations] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const result = await axios.get(`/conversations/${user.user_id}`);
        const resultOnDisplay = result.data.map((res) => ({
          id: res.conversation_id,
          name: res.name,
          latestMessage: res.latest_message
        }));
        setConversations(resultOnDisplay);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, []);


  return (
    <div id="room-list">
      {conversations.map((conv) => (
        <Room name={conv.name} latestMessage={conv.latestMessage} key={conv.id} />
      ))}
    </div>
  );
};

export default RoomList;