import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import PageWrapper from "../components/PageWrapper";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

function ChatPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [currentUser] = useState(
    user?.email || "Guest_User"
  );

  const receiver = "otherUser";

  const roomId = [currentUser, receiver].sort().join("_");

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    console.log("Joining room:", roomId);

    socket.emit("joinRoom", roomId);

    socket.on("receiveMessage", (data) => {
      console.log(" Received:", data);
      setMessages((prev) => [...prev, data.message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const messageData = {
      sender: currentUser,
      text: input,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("sendMessage", {
      roomId,
      message: messageData,
    });

    setInput("");
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gray-100 p-8">
        <h2 className="text-2xl font-bold mb-6">
          Private Chat
        </h2>

        <div className="bg-white p-6 rounded-xl shadow-lg h-96 overflow-y-auto flex flex-col">
          {messages.map((msg, i) => {
            const isMe = msg.sender === currentUser;

            return (
              <div
                key={i}
                className={`mb-3 max-w-xs p-3 rounded-xl text-sm ${
                  isMe
                    ? "bg-green-500 text-white self-end"
                    : "bg-gray-300 text-black self-start"
                }`}
              >
                <div className="font-bold text-xs mb-1">
                  {msg.sender}
                </div>
                <div>{msg.text}</div>
                <div className="text-[10px] opacity-70 text-right">
                  {msg.time}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex mt-4">
          <input
            className="flex-1 p-3 border rounded-l"
            placeholder="Type message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="bg-green-600 text-white px-6 rounded-r"
          >
            Send
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}

export default ChatPage;