import ChatMenu from "./components/RoomList/ChatMenu";
import Conversation from "./components/Conversation/Conversation";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ChatMenu />
      <Conversation /> 
    </div>
  );
}

export default App;
