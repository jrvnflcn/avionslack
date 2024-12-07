import React, { useState } from "react";
import { API_URL } from "../../constants/Constants";
import { useData } from "../../context/DataProvider";
import axios from "axios";

function ViewChannelMembers({ selectedChannelId }) {
  const { userHeaders } = useData();
  const [memberList, setMemberList] = useState([]);

  const getChannelDetails = async () => {
    try {
      if (!selectedChannelId) return; 
      const response = await axios.get(
        `${API_URL}/channels/${selectedChannelId}`,
        { headers: userHeaders }
      );
      const channelMembers = response.data.data.channel_members;

      // CONTINUE HERE

      setMessageList((prevMessages) => {
        if (JSON.stringify(prevMessages) !== JSON.stringify(newMessages)) {
          scrollToBottom();
          return newMessages;
        }
        return prevMessages;
      });
    } catch (error) {
      console.error("Error fetching messages:", error.response?.data?.errors || error.message);
    }
  };

  return ( 
    <div className="user-list-modal">

    </div>
   );
}
 
export default ViewChannelMembers;