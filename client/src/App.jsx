import Home from "./components/Home";
import Welcome from "./components/Welcome";
import {Routes, Route} from "react-router-dom";
import socketContext from "./utils/socketContext";
import {io} from "socket.io-client";
import RoomCreate from "./components/RoomCreate";
import RoomJoin from "./components/RoomJoin";
const socket = io(import.meta.env.VITE_SERVER_URL, {
  transports: ["websocket"],
});

function App() {
  return (
    <div className="App">
      <socketContext.Provider value={socket}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/room/:id" element={<Home />} />
          <Route path="/create-room" element={<RoomCreate />} />
          <Route path="/join-room" element={<RoomJoin />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </socketContext.Provider>
    </div>
  );
}

export default App;



