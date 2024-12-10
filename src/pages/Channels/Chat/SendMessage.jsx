import "./SendMessage.css";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../constants/Constants";
import { useData } from "../../../context/DataProvider";
import EmojiPicker from "emoji-picker-react";

function SendMessage({ selectedChannelId, onMessageSent }) {
  const { userHeaders } = useData();
  const [message, setMessage] = useState("");
  // const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    try {
      const messageInfo = {
        receiver_id: selectedChannelId,
        receiver_class: "Channel",
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

  // const handleEmoji = (e) => {
  //   setText((prev) => prev + e.emoji);
  //   setOpen(false);
  // };

  return (
    <div className="sendMessage">
      <div className="emoji">
        <i className="fa-solid fa-b"></i>
        <i className="fa-solid fa-italic"></i>
        <i className="fa-regular fa-face-smile" /* onClick={() => setOpen(prev => !prev)} */></i>
        {/* <div className="picker">
          <EmojiPicker open={open} onEmojiClick={handleEmoji} />
        </div> */}
      </div>
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

export default SendMessage;
