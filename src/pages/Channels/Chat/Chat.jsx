import "./Chat.css"
import React, { useState, useEffect } from "react";
import { useData } from "../../../context/DataProvider";
import axios from "axios";
import { API_URL } from "../../../constants/Constants";
import SendMessage from "./SendMessage";

function Chat() {
  const { userHeaders } = useData();
  const [messageList, setMessageList] = useState([]);

  const getMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/messages?receiver_id=4&receiver_class=Channel`, { headers: userHeaders });
      const messages = response.data.data;
      setMessageList(messages);
    } catch (error) {
      if (error.response.data.errors) {
        return alert("Cannot get messages");
      }
    }
  }

  useEffect(() => {
    getMessages();
  })

  return (
    <div className="chat-container">
      <div>
        {
          messageList &&
          messageList.map((chatMessage) => {
            const { id, sender:{uid}, body } = chatMessage;
            return (
              <div key={id}>
                <p>{uid}: {body}</p>
              </div>
            )
          })
        }
        { !messageList && <div>No messages available</div> }
      </div>
      
      <SendMessage />
    </div>
  );
}

export default Chat;
