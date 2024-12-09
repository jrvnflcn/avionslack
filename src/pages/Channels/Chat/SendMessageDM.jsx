import React, { useState } from "react";
import { useData } from "../../../context/DataProvider";
import axios from "axios";
import { API_URL } from "../../../constants/Constants";
import "./SendMessage.css";

function SendMessageDM({ receiver, onMessageSent }) {
  const { userHeaders } = useData();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      await axios.post(
        `${API_URL}/messages`,
        {
          receiver_id: receiver.id,
          receiver_class: "User",
          body: message,
        },
        { headers: userHeaders }
      );

      setMessage("");
      onMessageSent();
    } catch (error) {
      setError("Failed to send message. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="sendMessage">
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          className="input-style"
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyPress}
          value={message}
          placeholder="Write a message..."
        />
        <button type="submit">
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </form>
    </div>
  );
}

export default SendMessageDM;
