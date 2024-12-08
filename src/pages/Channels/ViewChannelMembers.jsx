import React, { useState } from "react";
import { API_URL } from "../../constants/Constants";
import { useData } from "../../context/DataProvider";
import axios from "axios";
import { useEffect } from "react";

function ViewChannelMembers({ selectedChannelId }) {
  const { userHeaders } = useData();
  const [memberList, setMemberList] = useState([]);

  const getChannelMembers = async () => {
    try {
      const response = await axios.get(
      `${API_URL}/channels/${selectedChannelId}`, { headers: userHeaders });
      const channelUserDetails = response.data.data.channel_members;

      const usersResponse = await axios.get(
      `${API_URL}/users`, { headers: userHeaders });
      const allUsers = usersResponse.data.data;

      const channelUserIds = channelUserDetails.map((individual) => {
        const { user_id } = individual;
        return allUsers.find((user) => user.id == user_id);
      });

      setMemberList(channelUserIds);

    } catch (error) {
      console.error("Error fetching channel members:", error.response?.data?.errors || error.message);
    }
  };

  useEffect(() => {
    if(memberList.length === 0) {
      getChannelMembers();
    }
  })

  return ( 
    <div className="user-list-modal">
      {
        memberList &&
        memberList.map((individual) => {
          const { id, uid } = individual;
          return (
            <div key={id}>
              <p>{uid}</p>
            </div>
          )
        })
      }
    </div>
   );
}
 
export default ViewChannelMembers;