import React, { useRef, useState, useEffect, useContext } from "react";
import { CurrentConversationContext } from "../../contexts/CurrentConversationContext";
import socket from "../../socket";
import { fetchMessages, postNewMessage, leaveConversation } from "../../utils/apiCalls";
import "./conversation.css";

const Message = (props) => {
  return (
    <div className={props.own ? "message-item own" : "message-item"}>
      <div className="sender-name">{props.own ? "" : props.sender}</div>
      <p className="message-text">{props.body}</p>
    </div>
  );
};

const ConversationTopBar = (props) => {
  const conversationId = props.conversationId;

  const leaveConv = async (e) => {
    await leaveConversation(conversationId);

    window.location.reload(); //again, need reconsideration
  }

  return (
    <div className="conversation-top">
      <div id="room-name">{props.conversationName}</div>
      <button id="leave-btn" onClick={leaveConv}>Leave</button>
      <button id="customize-btn">Customize</button>
    </div>
  );
};

const MessageBox = (props) => {
  const isNew = props.isNew;
  const [messages, setMessages] = useState({
    value: [],
    isLoading: false
  });
  const messageEndRef = useRef(null);
  const { conversation, setConversation } = useContext(CurrentConversationContext);
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: "auto" });
  };

  const sendMessage = async (event) => {
    if ((event.type === "keydown" && event.key === "Enter")
      || event.type === "click") {
      if (input) {
        const newMessage = {
          body: input
        };

        setConversation((prevConv) => ({
          ...prevConv,
          latestMessage: {
            sender: "You",
            body: input
          }
        }));

        setInput("");

        setMessages((prevMessages) => ({
          value: [
            ...prevMessages.value, {
              body: newMessage.body,
              sender: "You",
              isOwn: true
            }
          ],
          isLoading: false
        }));

        socket.emit("send message", {
          body: newMessage.body,
          conversationId: conversation.id
        });

        await postNewMessage(conversation.id, newMessage);
      }
    }
  };

  useEffect(() => {
    (async () => {
      setMessages({ value: [], isLoading: true });
      const result = await fetchMessages(conversation.id);
      setMessages({
        value: result.data,
        isLoading: false
      });
    })();
  }, [conversation.id]);

  useEffect(() => {
    socket.on("send message", (msg) => {
      if (msg.conversationId === conversation.id) {
        const { sender, body, isOwn } = msg;
        setMessages((prevMessages) => ({
          isLoading: false,
          value: [...prevMessages.value, { sender, body, isOwn }]
        }));
      }
    });
  }, []);

  useEffect(scrollToBottom, [messages.value]);

  return (
    <>
      <div id="message-display">
        {isNew ? (
          <div className="empty-conversation">Let's talk now!</div>
        ) : messages.isLoading ? (
          <span id="messages-loading">Loading messages...</span>
        ) : messages.value.map((msg) => (
          <Message
            sender={msg.sender}
            body={msg.body}
            own={msg.isOwn}
            key={messages.value.indexOf(msg)}
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
          <ConversationTopBar conversationName={conversation.name} conversationId={conversation.id} />
          <MessageBox isNew={conversation.latestMessage.body === '' ? true : false} />
        </> : <span id="no-conversation">Start chatting now!</span>
      }
    </div>
  );
};

export default Conversation;