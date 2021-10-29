import React from "react";
import "./navigationPanel.css";

const NavigationPanel = (props) => {
  return (
    <div id="navigation-panel">
      <ul>
        <li>
          <a href="#" className={props.chat ? "category active" : "category"}>
          <span class="material-icons">forum</span>
          </a>
        </li>
        <li>
          <a href="#" className={props.contact ? "category active" : "category"}>
          <span class="material-icons">contacts</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavigationPanel;