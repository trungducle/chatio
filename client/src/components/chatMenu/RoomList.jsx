import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "./Room";
import "./room.css";
import { TEST_USERS } from "../../dummyData/testUsers";

const RoomList = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const result = await axios.get("/conversations/7");
        const realResult = result.data.map((res) => ({
          id: res.conversation_id,
          name: res.name,
          lastMessage: res.last_message
        }));
        setConversations([...realResult, ...TEST_USERS]);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, []);


  return (
    <div id="user-list">
      {conversations.map((conv) => (
        <Room name={conv.name} lastMessage={conv.lastMessage} key={conv.id} />
      ))}
    </div>
  );
};

export default RoomList;