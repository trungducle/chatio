import React from "react";
import Room from "./Room";
import "./room.css";
import { TEST_USERS } from "../../dummyData/testUsers";

const RoomList = () => {
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