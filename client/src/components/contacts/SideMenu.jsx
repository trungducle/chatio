import React, { useState, useEffect } from "react";
import { fetchUsers, fetchRequests, sendRequest, cancelRequest } from "../../utils/apiCalls";
import { Link } from "react-router-dom";
import LogoBar from "../logoBar/logoBar";
import "./sidemenu.css";

const User = (props) => {
  const fullname = props.userfullname;
  const contactId = props.userid;

  const [isRequestSent, setIsRequestSent] = useState(props.isPending);

  const toggleRequest = async () => {
    if (isRequestSent) {
      await cancelRequest(contactId);
      setIsRequestSent(false);
    } else {
      await sendRequest(contactId);
      setIsRequestSent(true);
    }
  };

  return (
    <div className="user-search">
      <div className="info">
        <div className="user-fullname">{fullname}</div>
      </div>
      {props.isFriend
        ? (
          // <button className="chat-btn">Chat Now</button>
          <></>
        ) : (
          <button
            className={isRequestSent ? "add-btn req-sent" : "add-btn"}
            onClick={toggleRequest}
          >
            {isRequestSent ? "Cancel" : "Add Friend"}
          </button>
        )
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
  const [visibleLabel, setVisibleLabel] = useState(false);
  const [friendsResult, setFriendsResult] = useState([]);
  const [strangersResult, setStrangersResult] = useState([]);
  const [requests, setRequests] = useState([]);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    if (input) {
      (async () => {
        const res = await fetchUsers(input);

        setFriendsResult(res.data.friends.map((user) => ({
          userId: user.user_id,
          fullName: user.full_name,
          email: user.email,
          isFriend: user.is_friend,
          isPending: user.is_pending
        })));

        setStrangersResult(res.data.strangers.map((user) => ({
          userId: user.user_id,
          fullName: user.full_name,
          email: user.email,
          isFriend: user.is_friend,
          isPending: user.is_pending
        })));

        setVisibleLabel(true);
      })();
    } else {
      setFriendsResult([]);
      setStrangersResult([]);
      setVisibleLabel(false);
    }
  }, [input]);

  useEffect(() => {
    (async () => {
      const result = await fetchRequests();
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
          type="search"
          placeholder="Search..."
          value={input}
          onChange={handleChange}
        />
      </div>
      <div className="user-search-list">
        <div id="friends-result">
          <h5 className={visibleLabel ? "visible-label" : undefined}>FRIENDS</h5>
          {friendsResult.map((result) => (
            <User
              userid={result.userId}
              userfullname={result.fullName}
              useremail={result.email}
              isFriend={result.isFriend}
              isPending={result.isPending}
              key={friendsResult.indexOf(result)}
            />
          ))}
        </div>
        <div id="strangers-result">
          <h5 className={visibleLabel ? "visible-label" : undefined}>OTHERS</h5>
          {strangersResult.map((result) => (
            <User
              userid={result.userId}
              userfullname={result.fullName}
              useremail={result.email}
              isFriend={result.isFriend}
              isPending={result.isPending}
              key={strangersResult.indexOf(result)}
            />
          ))}
        </div>
      </div>
      <div className="menu">
        <Menu lists active={type === "contact" ? "true" : "false"} />
        <Menu requests amount={requests.length} active={type === "request" ? "true" : "false"} />
      </div>
    </div>
  )
};

export default SideMenu;