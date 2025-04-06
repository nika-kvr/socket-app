import { useEffect, useState } from "react";
import "./App.css";

import { io } from "socket.io-client";
const socket = io("https://socket-app-1-mdy2.onrender.com/");

function App() {
  const [roomId, setRoomId] = useState("");
  const [email, setEmail] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [privateMsg, setPrivateMsg] = useState("");
  const [privateMsgData, setPrivateMsgData] = useState([]);

  const [recievedData, setRecievedData] = useState([]);

  const handleClick = () => {
    socket.emit("joinRoom", roomId);
    setShowChat(true);
  };
  const handlePrivateMsg = () => {
    socket.emit("onPrivateMessage", {
      roomId,
      email,
      time: new Date().toISOString(),
      privateMsg,
    });
  };

  useEffect(() => {
    socket.on("privateMessage", (data) => {
      setPrivateMsgData((prev) => [...prev, data]);
    });
  }, []);

  // useEffect(() => {
  //   socket.on("message", (data) => {
  //     console.log(data, "data from socket");
  //     setRecievedData((prev) => [...prev, data]);
  //   });
  // }, []);

  return (
    <div>
      {showChat ? (
        <div>
          <input
            type="text"
            placeholder="ented message"
            onChange={(e) => {
              setPrivateMsg(e.target.value);
            }}
            value={privateMsg}
          />
          <button onClick={handlePrivateMsg}>GAGZAVNE</button>
          <div className="wrapper">
            {privateMsgData.map((el, i) => (
              <div
                className={`chat ${el.email === email ? "end" : "start"}`}
                key={i}
              >
                <h2>{el.privateMsg}</h2>
                <h5>{el.email}</h5>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="enter email"
            value={email}
          />
          <input
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
            placeholder="enter room id"
            value={roomId}
          />
          <button onClick={handleClick}>join room</button>
        </div>
      )}
    </div>
  );
}

export default App;
