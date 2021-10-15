import React from "react";

const UserList = () => {
  const users = [
    {
      name: "alice",
      id: 1
    },
    {
      name: "bob",
      id: 2
    }
  ];

  const userList = users.map((user) => (<li className="user" key={user.id}>{user.name}</li>));
  return (
    <ul id="user-list">
      {userList}
    </ul>
  );
};

export default UserList;