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
      const messages = response.data.data;
      setMessageList(messages);
    } catch (error) {
      if (error.response?.data?.errors) {
        console.error("Cannot get messages:", error.response.data.errors);
      } else {
        console.error("Error fetching messages:", error);
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getMessages();
    }, 500);

    return () => clearInterval(intervalId);
    }, [selectedChannelId]
  );

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messageList &&
          messageList.map((chatMessage) => {
            const { id, sender: { uid }, body } = chatMessage;
            return (
              <div key={id}>
                <h5>
                  {uid}
                </h5>
                <p className="textbox">{body}</p>
              </div>
            );
          })}
        {!messageList.length && <div>No messages available</div>}
      </div>

      <SendMessage selectedChannelId={selectedChannelId} onMessageSent={getMessages} />
    </div>
  );
}

export default Chat;
