import React, { useState, useEffect } from "react";
import { rejectRequest, acceptRequest, fetchRequests } from "../../utils/apiCalls";
import "./friendrequest.css";
// import socket from "../../socket";

const Request = (props) => {
  const name = props.name;
  const userid = props.userid;
  // const email = props.email;
  // const { user } = useContext(AuthContext);

  const accRequest = async (e) => {
    await acceptRequest(userid);
    window.location.reload();
  }

  const declineRequest = async (e) => {
    await rejectRequest(userid);
    window.location.reload();
  }

  return (
    <div className="user-request">
      <div className="user-info">
        <div className="user-request-name">{name}</div>
        {/* <div className="user-request-mail">{email}</div> */}
      </div>
      <button className="decline-btn" onClick={declineRequest}>Decline</button>
      <button className="accept-btn" onClick={accRequest}>Accept</button>
    </div>
  );
}

const FriendRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await fetchRequests();
      setRequests(result.data.map((request) => ({
        userName: request.full_name,
        userEmail: request.email,
        userId: request.sender_id
      })));
    })();
  }, []);

  return (
    <div id="request-box">
      <div id="request-box-title">Friend Requests</div>
      {requests.map((request) => (
        <Request
          name={request.userName}
          email={request.userEmail}
          userid={request.userId}
          key={requests.indexOf(request)}
        />
      ))}
    </div>
  );
}

export default FriendRequest;