import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Select from "react-select";
import axios from "axios";
import { API_URL } from "../../constants/Constants";
import "./AddChannelModal.css";

Modal.setAppElement("#root");

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
    try {
      const response = await axios.post(
        `${API_URL}/channels`,
        {
          name: channelName,
          members: selectedMembers.map((user) => user.value),
        },
        {
          headers: userHeaders,
        }
      );
      onChannelAdded(response.data);
      onRequestClose();
    } catch (error) {
      alert("Error creating channel");
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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="channel-name">Channel Name:</label>
          <input
            type="text"
            id="channel-name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="members">Select Members:</label>
          <Select
            id="members"
            options={users.map((user) => ({
              value: user.id,
              label: user.name,
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
