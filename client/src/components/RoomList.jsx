import React from "react";
import Room from "./Room";

const RoomList = () => {
  const users = [
    {
      name: "alice",
      id: 1,
      lastMessage: "Hello"
    },
    {
      name: "bob",
      id: 2,
      lastMessage: "Hello"
    },
    {
      name: "example of a very long group name",
      id: 3,
      lastMessage: "example of a very long message showed up in this group with a very long name"
    }
  ];

  const userList = users.map((user) => <Room id={user.id} name={user.name} lastMessage={user.lastMessage} />);
  return (
    <div id="user-list">
      <ul>
        {userList}
      </ul>
    </div>
  );
};

export default RoomList;