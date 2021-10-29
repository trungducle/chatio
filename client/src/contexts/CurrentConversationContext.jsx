import React, { useState } from "react";

export const CurrentConversationContext = React.createContext();

export const CurrentConversationProvider = ({ children }) => {
  const [conversationId, setConversationId] = useState();

  return (
    <CurrentConversationContext.Provider value={{
      conversationId,
      setConversationId
    }}>
      {children}
    </CurrentConversationContext.Provider>
  );
};