import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Select from "react-select";
import axios from "axios";
import { API_URL } from "../../constants/Constants";
import { useData } from "../../context/DataProvider";

Modal.setAppElement("body");

function DirectMessageModal({ isOpen, onClose, onMessageSent }) {
  const { userHeaders } = useData();
  const [users, setUsers] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/users`, {
          headers: userHeaders,
        });
        setUsers(
          response.data.data.map((user) => ({
            value: user.id,
            label: user.email,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen, userHeaders]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedRecipient) return;

    const messageInfo = {
      receiver_id: selectedRecipient.value,
      receiver_class: "User",
      body: message,
    };

    try {
      const response = await axios.post(`${API_URL}/messages`, messageInfo, {
        headers: userHeaders,
      });
      setMessage("");
      if (onMessageSent) onMessageSent();
      onClose();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Send a Direct Message</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="recipient">Recipient:</label>
          <Select
            id="recipient"
            options={users}
            value={selectedRecipient}
            onChange={setSelectedRecipient}
            placeholder="Select recipient by email"
            isClearable
            isSearchable
          />
        </div>

        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message..."
          />
        </div>

        <button type="submit">Send Message</button>
      </form>
    </Modal>
  );
}

export default DirectMessageModal;
