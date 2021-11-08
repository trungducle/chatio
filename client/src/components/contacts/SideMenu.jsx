import React, { useState, useEffect } from "react";
import { fetchUsers } from "../../utils/apiCalls";
import { Link } from "react-router-dom";
import LogoBar from "../logoBar/logoBar";
import "./sidemenu.css";

const User = (props) => {
  const fullname = props.userfullname;
  const email = props.useremail;

  return (
    <div className="user-search">
      <div className="user-fullname">{fullname}</div>
      <div className="user-email">{email}</div>
    </div>
  );
}

const Menu = (props) => {
  const type = props.lists ? "Friend List" : "Friend Requests";
  const amount = props.amount;

  return (
    <Link to={props.lists ? "/contacts/" : "/contacts/requests/"}>
      <div className={props.active === "true" ? "contact-menu active" : "contact-menu"}>
        {type}
        {props.amount ? <span className="badge">{amount}</span> : <span></span>}
      </div>
    </Link>
  );
}

const SideMenu = (props) => {
  const type = props.contact ? "contact" : "request";
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);

  const handleChange = (event) => {
    setInput(event.target.value);
  }

  useEffect(() => {
    if (input) {
      console.log(input);
      (async () => {
        const result = await fetchUsers(input);
        setUsers(result.data.map((user) => ({
          userfullname: user.full_name
        })));
      })();
    } else {
      setUsers([]);
    }
  }, [input]);

  return (
    <div id="side-menu">
      <div id="user-menu-top">
        <LogoBar />
        <input
          id="user-search-bar"
          type="text"
          placeholder="Search..."
          value={input}
          onChange={handleChange}
        />
      </div>
      <div className="user-search-list">
        {users.map((user) => (
          <User
            userfullname={user.userfullname}
            key={users.indexOf(user)}
          />
        ))}
      </div>
      <div className="menu">
        <Menu lists active={type === "contact" ? "true" : "false"} />
        <Menu requests amount="2" active={type === "request" ? "true" : "false"} />
      </div>
    </div>
  )
};

export default SideMenu;