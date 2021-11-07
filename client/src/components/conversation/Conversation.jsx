import React, { useRef, useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CurrentConversationContext } from "../../contexts/CurrentConversationContext";
import socket from "../../socket";
import { fetchMessages, postNewMessage } from "../../utils/apiCalls";
import "./conversation.css";

const Message = (props) => {
  return (
    <div className={props.own ? "message-item own" : "message-item"}>
      <div className="sender-name">{props.own ? "" : props.senderName}</div>
      <p className="message-text">{props.body}</p>
    </div>
  );
};

const ConversationTopBar = (props) => (
  <div className="conversation-top">
    <div id="room-name">{props.conversationName}</div>
    <button id="leave-btn">Leave</button>
    <button id="customize-btn">Customize</button>
  </div>
  
);

const MessageBox = () => {
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);
  const { user } = useContext(AuthContext);
  const { conversation, setConversation } = useContext(CurrentConversationContext);
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const sendMessage = async (event) => {
    if ((event.type === "keydown" && event.key === "Enter")
      || event.type === "click") {
      if (input) {
        const newMessage = {
          senderId: user.user_id,
          messageBody: input
        };

        setConversation((prevConv) => ({
          ...prevConv,
          latestMessage: {
            senderId: user.user_id,
            senderName: `${user.first_name} ${user.last_name}`,
            body: input
          }
        }));

        setInput("");

        setMessages((prevMessages) => [...prevMessages, {
          ...newMessage,
          senderName: `${user.first_name} ${user.last_name}`,
          messageId: prevMessages.length + 1
        }]);

        socket.emit("send message", {
          ...newMessage,
          senderName: `${user.first_name} ${user.last_name}`,
          conversationId: conversation.id
        });

        await postNewMessage(conversation.id, newMessage);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const result = await fetchMessages(conversation.id);
      setMessages(result.data.map((msg) => ({
        senderId: msg.sender_id,
        senderName: msg.sender_name,
        messageBody: msg.message_body
      })));
    })();
  }, [conversation.id]);

  useEffect(() => {
    socket.on("send message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, {
        senderId: msg.senderId,
        senderName: msg.senderName,
        messageBody: msg.messageBody
      }]);
    });
  }, []);

  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  return (
    <>
      <div id="message-display">
        {messages.map((msg) => (
          <Message
            senderName={`${msg.senderName}`}
            own={msg.senderId === user.user_id}
            body={msg.messageBody}
            key={messages.indexOf(msg)}
          />
        ))}
        <div
          style={{ float: "left", clear: "both" }}
          ref={messageEndRef}>
        </div>
      </div>

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
    </>
  );
};

const Conversation = () => {
  const { conversation } = useContext(CurrentConversationContext);
  return (
    <div id="message-box">
      {conversation.id ?
        <>
          <ConversationTopBar conversationName={conversation.name} />
          <MessageBox />
        </> : <span id="no-conversation">Start chatting now!</span>
      }
    </div>
  );
};

export default Conversation;