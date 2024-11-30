import "./SendMessage.css";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../constants/Constants";
import { useData } from "../../../context/DataProvider";

function SendMessage({ selectedChannelId, onMessageSent }) {
  const { userHeaders } = useData();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const messageInfo = {
        receiver_id: selectedChannelId,
        receiver_class: "Channel",
        body: message,
      };

      const response = await axios.post(`${API_URL}/messages`, messageInfo, { headers: userHeaders });

      const { data } = response;

      if (data.data) {
        setMessage(""); 
        if (onMessageSent) onMessageSent(); 
      }

      if (data.errors) {
        console.error(data.errors);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="sendMessage">
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          className="input-style"
          onChange={(event) => setMessage(event.target.value)}
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

export default SendMessage;
