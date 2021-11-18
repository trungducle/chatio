import React, { useState, useEffect } from "react";
import { fetchContacts, deleteContact } from "../../utils/apiCalls";
import "./contact.css";

const Friend = (props) => {
  const name = props.name;
  const userid= props.userid;

  const unFriendHandle = async () => {
    await deleteContact(userid);

    window.location.reload();
  }

  return (
    <div className="friend">
      <div className="friend-info">
        <div className="friend-name">{name}</div>
      </div>
      <button className="unfriend-btn" onClick={unFriendHandle}>Unfriend</button>
      {/* <button className="contact-friend-btn">Chat Now</button> */}
    </div>
  );
}

const Contact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await fetchContacts();
      setContacts(result.data.map((contact) => ({
        name: contact.friendName,
        userid: contact.friendId
      })));
    })();
  }, []);

  return (
    <div id="contact-box">
      <div id="box-title">Friend List</div>
      {contacts.map((contact) => (
        <Friend
          name={contact.name}
          userid={contact.userid}
          key={contacts.indexOf(contact)
        }
        />
      ))}
    </div>
  );
}

export default Contact;