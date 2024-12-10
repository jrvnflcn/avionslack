import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Select from "react-select";
import axios from "axios";
import { API_URL } from "../../constants/Constants";
import "./AddChannelModal.css";

Modal.setAppElement("body");

function AddChannelModal({
  isOpen,
  onRequestClose,
  userHeaders,
  onChannelAdded,
}) {
  const [channelName, setChannelName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: userHeaders,
      });
      console.log("Fetched users: ", response.data.data);
      setUsers(response.data.data);
    } catch (error) {
      alert("Cannot get users");
    }
  };

  useEffect(() => {
    if (isOpen) {
      getUsers();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!channelName || selectedMembers.length === 0) {
      alert("Please provide a channel name and select at least one member.");
      return;
    }

    console.log("Selected Members: ", selectedMembers);
    const userIds = selectedMembers.map((user) => user.value);
    console.log("User IDs being sent: ", userIds);

    try {
      const response = await axios.post(
        `${API_URL}/channels`,
        {
          name: channelName,
          user_ids: userIds,
        },
        {
          headers: userHeaders,
        }
      );
      onChannelAdded(response.data);
      onRequestClose();
    } catch (error) {
      alert("Error creating channel");
      console.error("Error creating channel:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Add a New Channel</h2>
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <div>
          <label htmlFor="channel-name">Channel Name:</label>
          <input
            type="text"
            id="channel-name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            maxLength="15"
            required
          />
        </div>

        <div>
          <label htmlFor="members">Select Members:</label>
          <Select
            id="members"
            options={users.map((user) => ({
              value: user.id,
              label: user.email,
            }))}
            isMulti
            onChange={setSelectedMembers}
            placeholder="Start typing to search members..."
          />
        </div>

        <button type="submit">Create Channel</button>
      </form>
    </Modal>
  );
}

export default AddChannelModal;
