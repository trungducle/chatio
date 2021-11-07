import React from "react";
import "./logoBar.css";

const LogoBar = () => {
  return (
    <div className="logoBar">
      <img src={require('./chatio.png')} alt="Chatio Logo" className="logo"/>
      <div className="new-conversation">
        <span className="material-icons">add_circle</span>
      </div>
    </div>
  );
}

export default LogoBar;