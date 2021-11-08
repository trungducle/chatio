import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { logoutCall } from "../../utils/apiCalls";
import "./navigationPanel.css";

const LogoutButton = () => {
  const { user, dispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleClick = () => {
    logoutCall({ userId: user.user_id }, dispatch);
    history.push("/");
  };

  return (
    <button type="button" id="logout-btn" onClick={handleClick}>
      <span className="material-icons">logout</span>
    </button>
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
      <LogoutButton />
    </div>
  );
};

export default NavigationPanel;