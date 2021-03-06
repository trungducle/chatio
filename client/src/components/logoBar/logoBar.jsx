import React, { useState } from "react";
import CreateGroup from "../createGroup/CreateGroup";
import "./logoBar.css";

const LogoBar = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="logoBar">
      <img src={require("../../assets/chatio.png").default} alt="Chatio Logo" className="logo"/>
      <div 
        className="new-conversation" 
        onClick={() => {
          setOpenModal(true)
        }}
      >
        <span className="material-icons">add_circle</span>
      </div>
      {openModal && <CreateGroup closeModal={setOpenModal}/>}
    </div>
  );
}

export default LogoBar;