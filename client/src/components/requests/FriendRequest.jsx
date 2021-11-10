import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { fetchPendingRequests } from "../../utils/apiCalls";
import "./friendrequest.css";

const Request = (props) => {
  const name = props.name;
  // const email = props.email;

  return (
    <div className="user-request">
      <div className="user-info">
        <div className="user-request-name">{name}</div>
        {/* <div className="user-request-mail">{email}</div> */}
      </div>
      <button className="decline-btn">Decline</button>
      <button className="accept-btn">Accept</button>
    </div>
  );
}

const FriendRequest = () => {
  const [requests, setRequests] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const result = await fetchPendingRequests(user.user_id);
      setRequests(result.data.map((req) => ({
        recipientName: req.full_name
      })));
    })();
  }, []);
  return (
    <div id="request-box">
      <div id="request-box-title">Friend Requests</div>
      {/* <Request name="Nguyen Tien Dat" email="test@gmail.com" />
      <Request name="Nguyen Tien Dat" email="test@gmail.com" /> */}
      {requests.map((req) => (
        <Request name={req.recipientName} key={requests.indexOf(req)} />
      ))}
    </div>
  );
}

export default FriendRequest;