import React from "react";
import "./contact.css";

const Friend = (props) => {
  const name = props.name;
  const email = props.email;

  return (
    <div className="friend">
      <div className="friend-info">
        <div className="friend-name">{name}</div>
        <div class="friend-mail">{email}</div>
      </div>
      <button className="unfriend-btn">Unfriend</button>
      <button className="contact-friend-btn">Chat Now</button>
    </div>
  );
}

const Contact = () => {
  return(
    <div id="contact-box">
      <div id="box-title">Friend List</div>
      <Friend name="Nguyen Tien Dat" email="test@gmail.com" />
      <Friend name="Nguyen Tien Dat" email="test@gmail.com" />
      <Friend name="Nguyen Tien Dat" email="test@gmail.com" />
      <Friend name="Nguyen Tien Dat" email="test@gmail.com" />
      <Friend name="Nguyen Tien Dat" email="test@gmail.com" />
      <Friend name="Nguyen Tien Dat" email="test@gmail.com" />
      <Friend name="Nguyen Tien Dat" email="test@gmail.com" />
    </div>
  );
}

export default Contact;