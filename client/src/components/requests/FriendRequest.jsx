import React from "react";
import "./friendrequest.css";

const Request = (props) => {
  const name = props.name;
  const email = props.email;

  return (
    <div className="user-request">
      <div className="user-info">
        <div className="user-request-name">{name}</div>
        <div className="user-request-mail">{email}</div>
      </div>
      <button className="decline-btn">Decline</button>
      <button className="accept-btn">Accept</button>
    </div>
  );
}

const FriendRequest = () => {
  return(
    <div id="request-box">
      <div id="request-box-title">Friend Requests</div>
      <Request name="Nguyen Tien Dat" email="test@gmail.com" />
      <Request name="Nguyen Tien Dat" email="test@gmail.com" />
    </div>
  );
}

export default FriendRequest;