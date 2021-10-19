import React from "react";
import "./conversation.css";

const Message = (props) => {
  return (
    <div className={props.own ? "message-item own" : "message-item"}>
      <div className="sender">{props.own ? "" : <strong>Alice</strong>}</div>
      <p className="message-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nemo eaque, sunt praesentium nostrum earum excepturi maxime quis exercitationem porro laudantium quae blanditiis distinctio et! Et dicta inventore eaque laborum?</p>
    </div>
  );
};

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  sendMessage() {
    if (this.state.input) {
      this.setState({
        input: ""
      });
    }
  }

  render() {
    return (
      <div id="message-input">
        <input type="text" value={this.state.input} onChange={this.handleChange} />
        <button onClick={this.sendMessage}>Send</button>
      </div>
    );
  }
}

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: ""
    };

    this.appendMessage = this.appendMessage.bind(this);
  }

  appendMessage(event) {
    this.setState((state) => ({
      messages: state.messages + event.target.value
    }));
  }

  render() {
    return (
      <div id="message-box">
        <div id="room-name">alice</div>
        <div id="message-display">
          <Message senderName="alice" />
          <Message senderName="alice" />
          <Message senderName="alice" />
          <Message senderName="alice" own />
          <Message senderName="alice" own />
          <Message senderName="alice" />
          <Message senderName="alice" />
          <Message senderName="alice" />
        </div>
        <MessageInput />
      </div>
    );
  }
}

export default Conversation;