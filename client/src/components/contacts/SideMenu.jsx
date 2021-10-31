import React from "react";
import { Link } from "react-router-dom";
import "./sidemenu.css";

const UserSearchBar = () => {
  return (
    <input id="user-search-bar" type="text" placeholder="Search..." />
  );
};

const TopBar = () => {
  return (
    <div id="user-menu-top">
      <UserSearchBar />
    </div>
  )
}

const User = (props) => {
  const fullname = props.userfullname;
  const email = props.useremail;

  return (
    <div className="user-search">
      <div className="user-fullname">{fullname}</div>
      <div className="user-email">{email}</div>
    </div>
  );
}

const Menu = (props) => {
  const type = props.lists ? "Friend List" : "Friend Requests";
  const amount = props.amount;

  return (
    <Link to={props.lists ? "/contacts/" : "/contacts/requests/"}>
      <div className={props.active === "true" ? "contact-menu active" : "contact-menu"}>
        {type}
        {props.amount ? <span className="badge">{amount}</span> : <span></span>}
      </div>
    </Link>
  );
}

const SideMenu = (props) => {
  const type = props.contact ? "contact" : "request";
  return (
    <div id="side-menu">
      <TopBar />
      <div className="user-search-list">
        <User userfullname="Nguyễn Tiến Đạt" useremail="test@email.com" />
        <User userfullname="Nguyễn Tiến Đạt" useremail="test@email.com" />
        <User userfullname="Nguyễn Tiến Đạt" useremail="test@email.com" />
        <User userfullname="Nguyễn Tiến Đạt" useremail="test@email.com" />
        <User userfullname="Nguyễn Tiến Đạt" useremail="test@email.com" />
        <User userfullname="Nguyễn Tiến Đạt" useremail="test@email.com" />
        <User userfullname="Nguyễn Tiến Đạt" useremail="test@email.com" />
        <User userfullname="Nguyễn Tiến Đạt" useremail="test@email.com" />
        <User userfullname="Nguyễn Tiến Đạt" useremail="test@email.com" />
        <User userfullname="Nguyễn Tiến Đạt" useremail="test@email.com" />
        <User userfullname="Nguyễn Tiến Đạt" useremail="test@email.com" />
        <User userfullname="Nguyễn Tiến Đạt" useremail="test@email.com" />
        <User userfullname="Nguyễn Tiến Đạt" useremail="test@email.com" />
      </div>
      <div className="menu">
        <Menu lists active={type === "contact" ? "true" : "false"} />
        <Menu requests amount="2" active={type === "request" ? "true" : "false"} />
      </div>
    </div>
  )
};

export default SideMenu;