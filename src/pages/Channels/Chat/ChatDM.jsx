import React, { useState, useEffect, useRef } from "react";
import { useData } from "../../../context/DataProvider";
import axios from "axios";
import { API_URL } from "../../../constants/Constants";
import SendMessageDM from "./SendMessageDM";
import "./Chat.css";

function ChatDM({ selectedUser }) {
  const { userHeaders } = useData();
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const getMessages = async () => {
    if (!selectedUser) return;

    try {
      const response = await axios.get(
        `${API_URL}/messages?receiver_id=${selectedUser.id}&receiver_class=User`,
        { headers: userHeaders }
      );

      const allMessages = response.data.data || [];

      allMessages.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );

      setMessages(allMessages);
    } catch (error) {
      console.error("Error fetching messages:", error.message);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getMessages();
    const intervalId = setInterval(() => {
      getMessages();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.length > 0 ? (
          messages.map((message) => {
            const {
              id,
              sender: { uid },
              body,
            } = message;
            return (
              <div
                key={id}
                className={`message ${
                  uid === userHeaders.uid ? "sent" : "received"
                }`}
              >
                <p className="textbox">{body}</p>
              </div>
            );
          })
        ) : (
          <div>No messages yet. Start the conversation!</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <SendMessageDM receiver={selectedUser} onMessageSent={getMessages} />
    </div>
  );
}

export default ChatDM;
