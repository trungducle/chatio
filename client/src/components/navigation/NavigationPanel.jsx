import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { logoutCall } from "../../utils/apiCalls";
import UserManagement from "../userManagement/UserManagement";
import "./navigationPanel.css";

const SettingButton = () => {
  const { dispatch } = useContext(AuthContext);
  const [openSetting, setOpenSetting] = useState(false);
  const [userManagement, setUserManagement] = useState(false);
  const history = useHistory();

  const handleSetting = () => {
    if (openSetting === false) {
      setOpenSetting(true);
    } else {
      setOpenSetting(false);
    }
  }

  const handleLogout = () => {
    logoutCall(dispatch);
    history.push("/");
  };

  const handleManagement = (state) => {
    setUserManagement(state);
  }

  return (
    <div id="setting-btns">
      {userManagement && <UserManagement closeModal={handleManagement} />}
      {openSetting &&
      <>
        <div id="logout-btn" onClick={handleLogout}>
        <span className="material-icons">logout</span>
        </div>
        <div id="manage-btn" onClick={handleManagement}>
          <span className="material-icons">manage_accounts</span>
        </div>
      </>
      }
      <div id="setting-btn" onClick={handleSetting}>
        <span className="material-icons">settings</span>
      </div>
    </div>
  );
};

const NavigationPanel = (props) => {
  return (
    <div id="navigation-panel">
      <div id="nav-menu">
        <ul>
          <li className={props.chat ? "category active" : "category"}>
            <Link to="/">
              <span className="material-icons">forum</span>
            </Link>
          </li>
          <li className={props.contact ? "category active" : "category"}>
            <Link to="/contacts">
              <span className="material-icons">contacts</span>
            </Link>
          </li>
        </ul>
      </div>
      <SettingButton />
    </div>
  );
};

export default NavigationPanel;