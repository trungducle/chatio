import React from "react";
import "./creategroup.css";

const CreateGroup = (props) => {
  const closeModal = props.closeModal;

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="close-modal">
          <button onClick={() => closeModal(false)}>&#10005;</button>
        </div>
        <div className="title-box">
          <h3 className="title">Create group to chat with your friends</h3>
          <input className="name-input" type="text" placeholder="Group Name" />
        </div>
        <div className="body">
          <h4 className="title">Choose who to add into the group:</h4>
          <form action="" className="friend-list">
            <label className="checkbox-container">Nguyen Tien Dat
              <input type="checkbox" id="user1" name="user1" value="1" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">Nguyen Tien Dat
              <input type="checkbox" id="user2" name="user2" value="2" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">Nguyen Tien Dat
              <input type="checkbox" id="user3" name="user3" value="3" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">Nguyen Tien Dat
              <input type="checkbox" id="user4" name="user4" value="4" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">Nguyen Tien Dat
              <input type="checkbox" id="user5" name="user5" value="5" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">Nguyen Tien Dat
              <input type="checkbox" id="user6" name="user6" value="6" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">Nguyen Tien Dat
              <input type="checkbox" id="user7" name="user7" value="7" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">Nguyen Tien Dat
              <input type="checkbox" id="user8" name="user8" value="8" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">Nguyen Tien Dat
              <input type="checkbox" id="user9" name="user9" value="9" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">Nguyen Tien Dat
              <input type="checkbox" id="user10" name="user10" value="10" />
              <span className="checkmark"></span>
            </label>
          </form>
        </div>
        <div className="footer">
          <button className="cancel-btn" onClick={() => closeModal(false)}>Cancel</button>
          <button className="create-btn">Create</button>
        </div>
      </div>
    </div>
  );
}

export default CreateGroup;