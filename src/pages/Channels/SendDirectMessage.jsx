import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants/Constants";
import { useData } from "../../context/DataProvider";

function SendDirectMessage({ selectedUserId, onMessageSent }) {
  const { userHeaders } = useData();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; 
    try {
      const messageInfo = {
        receiver_id: selectedUserId,
        receiver_class: "User",
        body: message,
      };

      const response = await axios.post(`${API_URL}/messages`, messageInfo, {
        headers: userHeaders,
      });

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e); 
    }
  };

  return (
    <div className="channel-send-directmessage">
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
          Send Message
        </button>
      </form>
    </div>
  );
}

export default SendDirectMessage;
