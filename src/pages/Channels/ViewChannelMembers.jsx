import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../constants/Constants";
import { useData } from "../../context/DataProvider";

function ViewChannelMembers({ selectedChannelId, onClose }) {
  const { userHeaders } = useData();
  const [memberList, setMemberList] = useState([]);

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

      const memberDetails = channelMembers.map((member) => {
        const user = allUsers.find((user) => user.id === member.user_id);
        return user ? { user_id: member.user_id, uid: user.uid } : null;
      }).filter(Boolean);

      setMemberList(memberDetails);
    } catch (error) {
      console.error(
        "Error fetching channel members:",
        error.response?.data?.errors || error.message
      );
    }
  };

  return (
    <div className="user-list-modal">
      <div className="modal-header">
        <h3>Channel Members</h3>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="modal-body">
        {memberList.length > 0 ? (
          <ul>
            {memberList.map((member) => (
              <li key={member.user_id}>{member.uid}</li>
            ))}
          </ul>
        ) : (
          <p>No members found for this channel.</p>
        )}
      </div>
    </div>
  );
}

export default ViewChannelMembers;
