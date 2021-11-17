import React, { useState, useEffect } from "react";
import { fetchContacts } from "../../utils/apiCalls";
import "./contact.css";

const Friend = (props) => {
  const name = props.name;
  const email = props.email;

  return (
    <div className="friend">
      <div className="friend-info">
        <div className="friend-name">{name}</div>
        <div className="friend-mail">{email}</div>
      </div>
      <button className="unfriend-btn">Unfriend</button>
      <button className="contact-friend-btn">Chat Now</button>
    </div>
  );
}

const Contact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await fetchContacts();
      console.log(result);
      setContacts(result.data.map((contact) => ({
        name: contact.friendName
      })));
    })();
  }, []);

  return (
    <div id="contact-box">
      <div id="box-title">Friend List</div>
      {contacts.map((contact) => (
        <Friend
          name={contact.name}
          key={contacts.indexOf(contact)
        }
        />
      ))}
    </div>
  );
}

export default Contact;