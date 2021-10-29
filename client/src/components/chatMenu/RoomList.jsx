import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "./Room";
import "./room.css";
import { TEST_USERS } from "../../utils/testUsers";

const RoomList = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const result = await axios.get("/conversations/7");
        const realResult = result.data.map((res) => ({
          id: res.conversation_id,
          name: res.name,
          latestMessage: res.latest_message
        }));
        console.log(realResult);
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
        <Room name={conv.name} latestMessage={conv.latestMessage} key={conv.id} />
      ))}
    </div>
  );
};

export default RoomList;