import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Select from "react-select";
import axios from "axios";
import { API_URL } from "../../constants/Constants";
import { useData } from "../../context/DataProvider";

function AddUserToChannel({ selectedChannelId }) {
  const { userHeaders } = useData();
  const [newMember, setNewMember] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const memberInfo = {
        id: Number(selectedChannelId),
        member_id: Number(newMember)
      }

      const response = await axios.post(
        `${API_URL}/channel/add_member`, memberInfo, 
        { headers: userHeaders }
      );

      const { data } = response;

      if (data.data) {
        return alert("Successfully added member!");
      }
    } catch (error) {
      console.error(
        "Error fetching channel members:",
        error.response?.data?.errors || error.message
      );
    };
  };

  return ( 
    <div className="channel-add-member">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="number"
            onChange={(e) => setNewMember(e.target.value)}
            placeholder="Member ID"
          />
        </div>
        <button type="submit">Add Member</button>
        {/* {<div className="error-message">Error</div>} */}
      </form>
    </div>
  );
};
 
export default AddUserToChannel;