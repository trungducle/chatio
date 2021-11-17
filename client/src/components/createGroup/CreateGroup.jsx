import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { fetchContacts, createConversation } from "../../utils/apiCalls";
import "./creategroup.css";

const UserLabel = (props) => {
  const name = props.name;
  const userid = props.userid;
  const labelid = `user${userid}`;

  return (
    <label className="checkbox-container" htmlFor={labelid}>{name}
      <input type="checkbox" id={labelid} name={labelid} value={userid} />
      <span className="checkmark"></span>
    </label>
  );
}

const CreateGroup = (props) => {
  const [contacts, setContacts] = useState([]);
  const closeModal = props.closeModal;
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const result = await fetchContacts();
      setContacts(result.data.map((contact) => ({
        name: contact.friendName,
        userid: contact.friendId
      })));
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const conversationName = e.target[0].value;
    const users = [];
    for (var i = 1; i < e.target.length - 2; i++) {
      if (e.target[i].checked) {
        users.push(e.target[i].value);
      }
    }
    await createConversation(conversationName, users);
    closeModal(false);
    window.location.reload(); // need to reconsider for more reasonable solution
  }

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="close-modal">
          <button onClick={() => closeModal(false)}>&#10005;</button>
        </div>
        <div className="title-box">
          <h3 className="title">Create group to chat with your friends</h3>
        </div>
        <div className="body">
          <form id="friend-list" onSubmit={(e) => handleSubmit(e)}>
            <input className="name-input" type="text" placeholder="Group Name" required />
            <h4 className="title">Choose who to add into the group:</h4>
            <div className="labels">
              {contacts.map((contact) => (
                <UserLabel
                  name={contact.name}
                  userid={contact.userid}
                  key={contacts.indexOf(contact)}
                />
              ))}
            </div>
            <div className="buttons">
              <button className="cancel-btn" onClick={() => closeModal(false)}>Cancel</button>
              <button className="create-btn" type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateGroup;