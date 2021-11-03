import React from "react";
import { Link } from "react-router-dom";
import "./navigationPanel.css";

const NavigationPanel = (props) => {
  return (
    <div id="navigation-panel">
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
  );
};

export default NavigationPanel;