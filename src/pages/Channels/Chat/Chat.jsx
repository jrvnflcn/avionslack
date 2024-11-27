import React, { useState, useEffect } from "react";
import { useData } from "../../../context/DataProvider";
import axios from "axios";
import { API_URL } from "../../../constants/Constants";

function Chat() {
  const { userHeaders } = useData();
  const [messageList, setMessageList] = useState([]);

  const getMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/messages?receiver_id=4&receiver_class=Channel`, { headers: userHeaders });
      const messages = response.data.body;
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
    <div>
      {
        messageList &&
        messageList.map((chatMessage) => {
          const { id, body } = chatMessage;
          return (
            <div key={id}>
              <p>{body}</p>
            </div>
          )
        })
      }
      { !messageList && <div>No messages available</div> }
    </div>
  );
}

export default Chat;
