import React, { useContext, useReducer } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { logoutReducer } from "../../reducers/logoutReducer";
import { logoutCall } from "../../utils/apiCalls";
import "./navigationPanel.css";

const LogoutButton = () => {
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer(logoutReducer, {
    user,
    isLoading: false,
    error: false
  });
  const history = useHistory();

  const handleClick = () => {
    console.log(`userId at LogoutButton: ${user.user_id}`);
    logoutCall(user.user_id, dispatch);
    history.push("/");
    console.log(user);
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