import React, { useState, useContext, useEffect } from "react";
import { fetchRequests } from "../../utils/apiCalls";
import { AuthContext } from "../../contexts/AuthContext";
import "./friendrequest.css";
import socket from "../../socket";

const Request = (props) => {
  const name = props.name;

  const handleDecline = async () => {
    
  };

  const handleAccept = async () => {

  };

  return (
    <div className="user-request">
      <div className="user-info">
        <div className="user-request-name">{name}</div>
        {/* <div className="user-request-mail">{email}</div> */}
      </div>
      <button
        className="decline-btn"
        onClick={handleDecline}
      >
        Decline
      </button>
      <button
        className="accept-btn"
        onClick={handleAccept}
      >
        Accept
      </button>
    </div>
  );
}

const FriendRequest = () => {
  const [requests, setRequests] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const result = await fetchRequests(user.user_id);
      setRequests(result.data.map((request) => ({
        userName: request.full_name,
        userEmail: request.email
      })));
    })();
  }, []);

  return(
    <div id="request-box">
      <div id="request-box-title">Friend Requests</div>
      {requests.map((request) => (
        <Request
          name={request.userName}
          email={request.userEmail}
          key={requests.indexOf(request)}
        />
      ))}
    </div>
  );
}

export default FriendRequest;