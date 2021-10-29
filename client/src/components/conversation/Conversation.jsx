import React, { useRef, useState, useEffect } from "react";
import "./conversation.css";

const Message = (props) => {
  return (
    <div className={props.own ? "message-item own" : "message-item"}>
      <div className="sender">{props.own ? "" : <strong>Alice</strong>}</div>
      <p className="message-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nemo eaque, sunt praesentium nostrum earum excepturi maxime quis exercitationem porro laudantium quae blanditiis distinctio et! Et dicta inventore eaque laborum?</p>
    </div>
  );
};

const MessageInput = () => {
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const sendMessage = (event) => {
    if ((event.type === "keydown" && event.key === "Enter")
      || event.type === "click") {
      if (input) {
        setInput("");
      }
    }
  }

  return (
    <div id="message-input">
      <input
        type="text"
        value={input}
        placeholder="Aa"
        onChange={handleChange}
        onKeyDown={sendMessage}
      />
      <button onClick={sendMessage}>
        <span className="material-icons">send</span>
      </button>
    </div>
  );
};

const ConversationTopBar = (props) => (
  <div id="room-name">{props.name}</div>
);

const MessageDisplay = () => {
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);

  const appendMessage = (event) => {
    setMessages((prevMessages) => [...prevMessages, event.target.value]);
  };

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: "auto" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div id="message-display">
      <Message senderName="alice" />
      <Message senderName="alice" />
      <Message senderName="alice" />
      <Message senderName="me" own />
      <Message senderName="me" own />
      <Message senderName="alice" />
      <Message senderName="alice" />
      <Message senderName="alice" />
      <div
        style={{ float: "left", clear: "both" }}
        ref={messageEndRef}>
      </div>
    </div>
  );
};

const Conversation = () => {
  return (
    <div id="message-box">
      <ConversationTopBar name="alice" />
      <MessageDisplay />
      <MessageInput />
    </div>
  );
};

export default Conversation;