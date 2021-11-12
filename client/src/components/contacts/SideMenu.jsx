import React, { useState, useEffect, useContext } from "react";
import { fetchUsers, fetchRequests, isFriend, sendRequest } from "../../utils/apiCalls";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import LogoBar from "../logoBar/logoBar";
import "./sidemenu.css";

const User = (props) => {
  const { user } = useContext(AuthContext);
  const [friendstatus, setFriendStatus] = useState('');
  const fullname = props.userfullname;
  const email = props.useremail;
  const searchid = props.userid;

  useEffect(() => {
    (async () => {
      const result = await isFriend(user.user_id, searchid);
      setFriendStatus(result.data[0].friend);
    })();
  }, [fullname]);

  const sendFriendRequest = async (event) => {
    await sendRequest(user.user_id, searchid);
  }


  return (
    <div className="user-search">
      <div className="info">
        <div className="user-fullname">{fullname}</div>
        <div className="user-email">{email}</div>
      </div>
      { friendstatus === 1 ?
        <button className="chat-btn">Chat Now</button> :
        <button className="add-btn" onClick={sendFriendRequest}>Add Friend</button>
      }
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
  const [results, setResults] = useState([]);
  const [requests, setRequests] = useState([]);
  const { user } = useContext(AuthContext);

  const handleChange = (event) => {
    setInput(event.target.value);
  }

  useEffect(() => {
    if (input) {
      (async () => {
        const res = await fetchUsers(input);
        setResults(res.data.map((result) => ({
          userid: result.user_id,
          userfullname: result.full_name,
          useremail: result.email
        })));
      })();
    } else {
      setResults([]);
    }
  }, [input]);

  useEffect(() => {
    (async () => {
      const result = await fetchRequests(user.user_id);
      setRequests(result.data.map((request) => ({
        userName: request.full_name,
        userEmail: request.email
      })));
    })();
  }, []);

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
        {results.map((result) => (
          <User
            userid={result.userid}
            userfullname={result.userfullname}
            useremail={result.useremail}
            key={results.indexOf(result)}
          />
        ))}
      </div>
      <div className="menu">
        <Menu lists active={type === "contact" ? "true" : "false"} />
        <Menu requests amount={requests.length} active={type === "request" ? "true" : "false"} />
      </div>
    </div>
  )
};

export default SideMenu;