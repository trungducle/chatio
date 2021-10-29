import React, {useState, useEffect} from "react";
import axios from "axios";
import Room from "./Room";
import "./room.css";
import { TEST_USERS } from "../../dummyData/testUsers";

const RoomList = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    // const getConversations = async () => {
    //   try {
    //     const result = await axios.get("/conversations/7");
    //     console.log(result);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // getConversations();
  }, []);
  const userList = TEST_USERS.map((user) =>
    <Room id={user.id} name={user.name} lastMessage={user.lastMessage} />
  );
  return (
    <div id="user-list">
      {userList}
    </div>
  );
};

export default RoomList;