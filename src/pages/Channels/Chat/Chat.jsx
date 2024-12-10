import "./Chat.css";
import React, { useState, useEffect, useRef } from "react";
import { useData } from "../../../context/DataProvider";
import axios from "axios";
import { API_URL } from "../../../constants/Constants";
import SendMessage from "./SendMessage";

function Chat({ selectedChannelId }) {
  const { userHeaders } = useData();
  const [messageList, setMessageList] = useState([]);
  const messagesEndRef = useRef(null);

  const getMessages = async () => {
    try {
      if (!selectedChannelId) return;
      const response = await axios.get(
        `${API_URL}/messages?receiver_id=${selectedChannelId}&receiver_class=Channel`,
        { headers: userHeaders }
      );
      const newMessages = response.data.data;
      setMessageList((prevMessages) => {
        if (JSON.stringify(prevMessages) !== JSON.stringify(newMessages)) {
          return newMessages;
        }
        return prevMessages;
      });
    } catch (error) {
      console.error(
        "Error fetching messages:",
        error.response?.data?.errors || error.message
      );
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!selectedChannelId) return;

    getMessages();
    const intervalId = setInterval(() => {
      getMessages();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [selectedChannelId]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messageList.length > 0 ? (
          messageList.map((chatMessage) => {
            const {
              id,
              sender: { uid },
              body,
              created_at
            } = chatMessage;
            return (
              <div
                key={id}
                className={`message ${
                  uid === userHeaders.uid ? "sent" : "received"
                }`}
              >
                <h5 className="sender-name">{uid}</h5>
                <p className="textbox">{body}</p>
                <p className="timestamp">{new Date(created_at).toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit"})}</p>
              </div>
            );
          })
        ) : (
          <div>No messages available</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <SendMessage
        selectedChannelId={selectedChannelId}
        onMessageSent={getMessages}
      />
    </div>
  );
}

export default Chat;
