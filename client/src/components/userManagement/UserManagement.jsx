import React, { useRef, useState, useReducer } from "react";
import { updateUserName, updateEmail, updatePassword } from "../../utils/apiCalls";
import { updateReducer } from "../../reducers/updateReducer";
import jwt_decode from "jwt-decode";
import "./usermanagement.css";

const UserManagement = (props) => {
  const closeModal = props.closeModal;
  const accessToken = localStorage.getItem("a_token");
  const currentInfo = jwt_decode(accessToken);
  const currentfName = currentInfo.firstName;
  const currentlName = currentInfo.lastName;
  const currentEmail = currentInfo.email;
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPw, setEditPw] = useState(false);
  const [updateState, updateDispatch] = useReducer(updateReducer, {
    message: null,
    error: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (window.confirm("Update your change?")) {
      if (firstName.current.value && lastName.current.value) {
        await updateUserName(firstName.current.value, lastName.current.value, updateDispatch);
      } else if (!firstName.current.value && lastName.current.value) {
        await updateUserName(currentfName, lastName.current.value, updateDispatch);
      } else if (firstName.current.value && !lastName.current.value, updateDispatch) {
        await updateUserName(firstName.current.value, currentlName, updateDispatch);
      }

      if (email.current.value) {
        await updateEmail(email.current.value, updateDispatch);
      }

      if (password.current.value) {
        await updatePassword(password.current.value, updateDispatch);
      }
    }
  };

  const handleEditName = () => {
    if (editName) {
      setEditName(false);
    } else {
      setEditName(true);
    }
  };

  const handleEditEmail = () => {
    if (editEmail) {
      setEditEmail(false);
    } else {
      setEditEmail(true);
    }
  };

  const handleEditPw = () => {
    if (editPw) {
      setEditPw(false);
    } else {
      setEditPw(true);
    }
  };

  return (
    <div id="um-background">
      <div id="um-container">
        <div id="close-um">
          <button onClick={() => closeModal(false)}>&#10005;</button>
        </div>
        <div className="title-box">
          <h3 className="title">Manage your account information</h3>
          <div className="warning">
            Warning: You may need to logout for the changes to take effect.
          </div>
          <div className={updateState.message ? "update-success show" : "update-success"}>
            Updated! Please logout for the changes to take effect.
          </div>
        </div>
        <div className="um-body">
          <form id="account-management" onSubmit={handleSubmit}>
            <label htmlFor="um-fname">
              Full Name: {currentfName + ' ' + currentlName}
              <span className="edit-enable" onClick={handleEditName}>Edit</span>
            </label>
            <input
              className={editName ? "update-input" : "update-input hide"}
              type="text"
              name="um-fname"
              id="um-fname"
              placeholder='First Name'
              ref={firstName}
            />
            <input
              className={editName ? "update-input" : "update-input hide"}
              type="text"
              name="um-lname"
              id="um-lname"
              placeholder='Last Name'
              ref={lastName}
            />
            <label htmlFor="um-email">
              Email: {currentEmail}
              <span className="edit-enable" onClick={handleEditEmail}>Edit</span>
            </label>
            <input
              className={editEmail ? "update-input" : "update-input hide"}
              type="text"
              name="um-email"
              id="um-email"
              placeholder="Email"
              pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              ref={email}
            />
            <div className={updateState.error ? "update-error show" : "update-error"}>
              Email already in use with another account!
            </div>
            <label htmlFor="um-pw">
              Password: **********
              <span className="edit-enable" onClick={handleEditPw}>Edit</span>
            </label>
            <input
              className={editPw ? "update-input" : "update-input hide"}
              type="password"
              name="um-pw"
              id="um-pw"
              placeholder="Password"
              ref={password}
            />
            <div id="um-buttons">
              <button className="cancelum-btn" onClick={() => closeModal(false)}>Cancel</button>
              <button className="updateum-btn" type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;