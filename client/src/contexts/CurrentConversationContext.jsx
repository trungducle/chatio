import React, { useState } from "react";

export const CurrentConversationContext = React.createContext();

export const CurrentConversationProvider = ({ children }) => {
  const [conversation, setConversation] = useState({
    id: null,
    name: "",
    latestMessage: ""
  });

  return (
    <CurrentConversationContext.Provider value={{
      conversation,
      setConversation
    }}>
      {children}
    </CurrentConversationContext.Provider>
  );
};