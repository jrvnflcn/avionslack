import "./ViewChannelMembers.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { API_URL } from "../../constants/Constants";
import { useData } from "../../context/DataProvider";
import SendDirectMessage from "./SendDirectMessage";

Modal.setAppElement("#root");

function ViewChannelMembers({ selectedChannelId, onClose }) {
  const { userHeaders } = useData();
  const [memberList, setMemberList] = useState([]);
  const [isSendDMOpen, setIsSendDMOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (selectedChannelId) {
      getChannelMembers();
    }
  }, [selectedChannelId]);

  const getChannelMembers = async () => {
    try {
      const channelResponse = await axios.get(
        `${API_URL}/channels/${selectedChannelId}`,
        { headers: userHeaders }
      );
      const channelMembers = channelResponse.data.data.channel_members;

      const usersResponse = await axios.get(`${API_URL}/users`, {
        headers: userHeaders,
      });
      const allUsers = usersResponse.data.data;

      const memberDetails = channelMembers
        .map((member) => {
          const user = allUsers.find((user) => user.id === member.user_id);
          return user ? { user_id: member.user_id, uid: user.uid } : null;
        })
        .filter(Boolean);

      setMemberList(memberDetails);
    } catch (error) {
      console.error(
        "Error fetching channel members:",
        error.response?.data?.errors || error.message
      );
    }
  };

  const handleAddMember = async () => {
    try {
      const usersResponse = await axios.get(`${API_URL}/users`, {
        headers: userHeaders,
      });
      const allUsers = usersResponse.data.data;

      const user = allUsers.find((user) => user.email === emailInput.trim());
      if (!user) {
        setErrorMessage("User with this email does not exist.");
        return;
      }

      await axios.post(
        `${API_URL}/channel/add_member`,
        { id: selectedChannelId, member_id: user.id },
        { headers: userHeaders }
      );

      setErrorMessage("");
      setEmailInput("");
      getChannelMembers();  
    } catch (error) {
      console.error("Error adding member:", error.response?.data?.errors || error.message);
      setErrorMessage("Failed to add member to the channel.");
    }
  };

  return (
    <div className="user-list-modal">
      <div className="modal-header">
        <h3>Channel Members</h3>
        <button onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="modal-body">
        {memberList.length > 0 ? (
          <ul>
            {memberList.map((member) => (
              <li key={member.user_id}>
                {member.uid}
                <button onClick={() => setIsSendDMOpen(true)}>
                  <i className="fa-solid fa-paper-plane"></i>
                </button>

                <Modal
                  isOpen={isSendDMOpen}
                  onRequestClose={() => setIsSendDMOpen(false)}
                  className="modal"
                  overlayClassName="overlay"
                >
                  <SendDirectMessage selectedUserId={member.user_id} />
                </Modal>
              </li>
            ))}
          </ul>
        ) : (
          <p>No members found for this channel.</p>
        )}
        <div className="add-member-section">
          <h4>Add a Member</h4>
          <input
            type="email"
            placeholder="Enter member's email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <button onClick={handleAddMember}>Add Member</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default ViewChannelMembers;
