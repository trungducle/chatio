import React from "react";

const Message = ({ props }) => {
  return (
    <div className='message-item'>
      <div><b>{this.props.senderName}</b></div>
      <span>{this.props.text}</span>
    </div>
  );
};

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage() {
    if (this.state.input !== "") {
      this.setState({
        input: ""
      });
    }
  }

  render() {
    return (
      <div id="message-input">
        <input type="text" />
        <button onClick={this.sendMessage}>Send</button>
      </div>
    );
  }
}

class MessageBox extends React.Component {
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
        <textarea name="message-display" id="message-display" value={this.state.messages} disabled></textarea>
        <MessageInput />
      </div>
    );
  }
}

// const MessageBox = () => {
//   return (
//     <div id="message-box"></div>
//   );
// };

export default MessageBox;